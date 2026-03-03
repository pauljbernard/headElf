/**
 * Claude Code Slash Commands for HeadElf
 *
 * Implements /skills and /agents commands to list available HeadElf capabilities
 * within the Claude Code environment.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

export interface SkillInfo {
  name: string;
  path: string;
  category: string;
  description?: string;
  executiveLevel?: string;
}

export interface SubagentInfo {
  name: string;
  path: string;
  category: string;
  description?: string;
  capabilities?: string[];
}

export class HeadElfSlashCommands {
  private projectRoot: string;
  private skillsPath: string;
  private subagentsPath: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.skillsPath = path.join(projectRoot, 'skills');
    this.subagentsPath = path.join(projectRoot, 'subagents');
  }

  /**
   * List all available skills
   */
  async listSkills(): Promise<string> {
    try {
      const skills = await this.discoverSkills();

      if (skills.length === 0) {
        return "No HeadElf skills found in the current directory.";
      }

      // Group skills by category
      const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {} as Record<string, SkillInfo[]>);

      let output = `## HeadElf Skills (${skills.length} total)\n\n`;

      for (const [category, categorySkills] of Object.entries(skillsByCategory)) {
        output += `### ${this.formatCategoryName(category)}\n`;
        categorySkills.forEach(skill => {
          output += `- **${skill.name}**`;
          if (skill.description) {
            output += `: ${skill.description.substring(0, 100)}${skill.description.length > 100 ? '...' : ''}`;
          }
          if (skill.executiveLevel) {
            output += ` [${skill.executiveLevel}]`;
          }
          output += `\n`;
        });
        output += '\n';
      }

      output += `\nUse specific skill names in your requests to activate HeadElf capabilities.`;

      return output;
    } catch (error) {
      return `Error listing skills: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * List all available subagents
   */
  async listSubagents(): Promise<string> {
    try {
      const subagents = await this.discoverSubagents();

      if (subagents.length === 0) {
        return "No HeadElf subagents found in the current directory.";
      }

      // Group subagents by category
      const subagentsByCategory = subagents.reduce((acc, subagent) => {
        if (!acc[subagent.category]) acc[subagent.category] = [];
        acc[subagent.category].push(subagent);
        return acc;
      }, {} as Record<string, SubagentInfo[]>);

      let output = `## HeadElf Subagents (${subagents.length} total)\n\n`;

      for (const [category, categorySubagents] of Object.entries(subagentsByCategory)) {
        output += `### ${this.formatCategoryName(category)}\n`;
        categorySubagents.forEach(subagent => {
          output += `- **${subagent.name}**`;
          if (subagent.description) {
            output += `: ${subagent.description.substring(0, 100)}${subagent.description.length > 100 ? '...' : ''}`;
          }
          if (subagent.capabilities && subagent.capabilities.length > 0) {
            output += ` (${subagent.capabilities.slice(0, 3).join(', ')}${subagent.capabilities.length > 3 ? '...' : ''})`;
          }
          output += `\n`;
        });
        output += '\n';
      }

      output += `\nUse subagent names to delegate complex tasks requiring specialized expertise.`;

      return output;
    } catch (error) {
      return `Error listing subagents: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Discover all skills in the project
   */
  async discoverSkills(): Promise<SkillInfo[]> {
    const skills: SkillInfo[] = [];

    if (!fs.existsSync(this.skillsPath)) {
      return skills;
    }

    const categories = fs.readdirSync(this.skillsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const category of categories) {
      const categoryPath = path.join(this.skillsPath, category);
      await this.discoverSkillsInCategory(categoryPath, category, skills);
    }

    return skills.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Discover skills within a category
   */
  private async discoverSkillsInCategory(categoryPath: string, category: string, skills: SkillInfo[]): Promise<void> {
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(categoryPath, item.name);

      if (item.isDirectory()) {
        // Check if this directory contains a skill.md
        const skillMdPath = path.join(itemPath, 'skill.md');
        if (fs.existsSync(skillMdPath)) {
          const skillInfo = await this.parseSkillInfo(skillMdPath, item.name, category);
          skills.push(skillInfo);
        } else {
          // Recursively check subdirectories
          await this.discoverSkillsInCategory(itemPath, `${category}/${item.name}`, skills);
        }
      }
    }
  }

  /**
   * Parse skill information from skill.md file
   */
  private async parseSkillInfo(skillMdPath: string, skillName: string, category: string): Promise<SkillInfo> {
    try {
      const content = fs.readFileSync(skillMdPath, 'utf8');

      // Extract description from the first paragraph after the title
      const lines = content.split('\n');
      let description = '';
      let executiveLevel = '';

      let foundTitle = false;
      for (const line of lines) {
        if (line.startsWith('# ') && !foundTitle) {
          foundTitle = true;
          continue;
        }

        if (foundTitle && line.trim() && !line.startsWith('#') && !description) {
          description = line.trim();
        }

        // Look for executive level indicators
        if (line.toLowerCase().includes('executive level') || line.toLowerCase().includes('c-suite')) {
          const match = line.match(/(?:level|role):\s*([A-Z_]+)/i);
          if (match) {
            executiveLevel = match[1];
          }
        }

        if (description && executiveLevel) break;
      }

      return {
        name: this.formatSkillName(skillName),
        path: skillMdPath,
        category,
        description,
        executiveLevel
      };
    } catch (error) {
      return {
        name: this.formatSkillName(skillName),
        path: skillMdPath,
        category,
        description: 'Description unavailable'
      };
    }
  }

  /**
   * Discover all subagents in the project
   */
  async discoverSubagents(): Promise<SubagentInfo[]> {
    const subagents: SubagentInfo[] = [];

    if (!fs.existsSync(this.subagentsPath)) {
      return subagents;
    }

    await this.discoverSubagentsRecursive(this.subagentsPath, '', subagents);
    return subagents.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Recursively discover subagents
   */
  private async discoverSubagentsRecursive(currentPath: string, category: string, subagents: SubagentInfo[]): Promise<void> {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(currentPath, item.name);

      if (item.isDirectory()) {
        // Check if this directory contains a subagent.md
        const subagentMdPath = path.join(itemPath, 'subagent.md');
        if (fs.existsSync(subagentMdPath)) {
          const subagentInfo = await this.parseSubagentInfo(
            subagentMdPath,
            item.name,
            category || 'core'
          );
          subagents.push(subagentInfo);
        } else {
          // Recursively check subdirectories
          const newCategory = category ? `${category}/${item.name}` : item.name;
          await this.discoverSubagentsRecursive(itemPath, newCategory, subagents);
        }
      }
    }
  }

  /**
   * Parse subagent information from subagent.md file
   */
  private async parseSubagentInfo(subagentMdPath: string, subagentName: string, category: string): Promise<SubagentInfo> {
    try {
      const content = fs.readFileSync(subagentMdPath, 'utf8');

      // Extract description and capabilities
      const lines = content.split('\n');
      let description = '';
      const capabilities: string[] = [];

      let foundTitle = false;
      let inCapabilitiesSection = false;

      for (const line of lines) {
        if (line.startsWith('# ') && !foundTitle) {
          foundTitle = true;
          continue;
        }

        if (foundTitle && line.trim() && !line.startsWith('#') && !description && !line.startsWith('-')) {
          description = line.trim();
        }

        // Look for capabilities section
        if (line.toLowerCase().includes('capabilities') || line.toLowerCase().includes('abilities')) {
          inCapabilitiesSection = true;
          continue;
        }

        if (inCapabilitiesSection && line.startsWith('- ')) {
          capabilities.push(line.substring(2).trim());
        } else if (inCapabilitiesSection && line.startsWith('#')) {
          inCapabilitiesSection = false;
        }
      }

      return {
        name: this.formatSubagentName(subagentName),
        path: subagentMdPath,
        category,
        description,
        capabilities: capabilities.slice(0, 5) // Limit to first 5 capabilities
      };
    } catch (error) {
      return {
        name: this.formatSubagentName(subagentName),
        path: subagentMdPath,
        category,
        description: 'Description unavailable'
      };
    }
  }

  /**
   * Format category name for display
   */
  private formatCategoryName(category: string): string {
    return category
      .split('/')
      .map(part => part.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '))
      .join(' / ');
  }

  /**
   * Format skill name for display
   */
  private formatSkillName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Format subagent name for display
   */
  private formatSubagentName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

/**
 * Main HeadElf command that activates the executive intelligence framework
 */
export async function handleHeadElfCommand(): Promise<string> {
  const commander = new HeadElfSlashCommands();

  try {
    const skills = await commander.discoverSkills();
    const subagents = await commander.discoverSubagents();

    return `┌─────────────────────────────────────────────────────────┐
│                    HEADELF INTELLIGENCE                 │
│              Executive Framework Activated              │
└─────────────────────────────────────────────────────────┘

🎯 **EXECUTIVE INTELLIGENCE FRAMEWORK ACTIVATED**

**World-Class Output Quality**: McKinsey/Bain/BCG-standard executive intelligence now active

**Executive Capabilities Loaded**:
• **${skills.length} Advanced Skills** across ${new Set(skills.map(s => s.category)).size} executive domains
• **${subagents.length} Specialized Subagents** for cross-functional coordination
• **Professional Output Templates** for all executive roles
• **Quality Assurance Framework** ensuring consulting-grade deliverables

📊 **AVAILABLE COMMANDS**

**Browse Capabilities**:
\`/skills\` - List all ${skills.length} executive skills by category
\`/agents\` - List all ${subagents.length} specialized subagents

**Usage Examples**:
\`Read the CTO Intelligence skill and analyze our technology strategy\`
\`Use the Executive Orchestrator subagent for M&A analysis\`
\`Apply CFO Intelligence to our capital allocation decisions\`

💡 **WORLD-CLASS EXECUTIVE OUTPUT QUALITY**

🎯 **AUTOMATIC APPLICATION**: All HeadElf responses now automatically apply McKinsey/Bain/BCG-quality formatting including:
• **Executive Summary** - 30-second CEO-level clarity with confidence levels
• **Strategic Recommendations** - Specific, actionable guidance with timeline/investment
• **Business Impact** - Quantified value creation, ROI, and competitive advantage
• **Implementation Roadmap** - Detailed execution planning with milestones
• **Risk Assessment** - Comprehensive analysis with mitigation strategies
• **Professional Formatting** - Consulting-grade presentation with HeadElf branding

📋 **QUALITY STANDARDS ENFORCED**:
• Anti-hedging language enforcement (no "it depends", "we should evaluate")
• Executive authority demonstration with conviction levels
• Stakeholder-appropriate communication for Fortune 500 boardrooms
• Structured decision frameworks with clear accountability

⚠️ **CRITICAL**: The Executive Output Framework is now automatically applied to ALL HeadElf interactions. Every response will meet world-class consulting standards without requiring explicit instruction.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HeadElf Executive Intelligence Framework | Status: Active
Quality Standards: McKinsey/Bain/BCG Level | Output Format: Professional
Generated: ${new Date().toISOString()}`;

  } catch (error) {
    return `❌ **HeadElf Framework Activation Failed**

Error: ${error instanceof Error ? error.message : 'Unknown error'}

Please ensure you are in a HeadElf project directory with skills/ and subagents/ folders.

For setup instructions, visit: https://pauljbernard.github.io/headElf/getting-started/`;
  }
}

// Main command handlers for Claude Code integration
export async function handleSkillsCommand(): Promise<string> {
  const commander = new HeadElfSlashCommands();
  return await commander.listSkills();
}

export async function handleAgentsCommand(): Promise<string> {
  const commander = new HeadElfSlashCommands();
  return await commander.listSubagents();
}

// Export for direct usage
export const slashCommands = {
  headelf: handleHeadElfCommand,
  skills: handleSkillsCommand,
  agents: handleAgentsCommand
};