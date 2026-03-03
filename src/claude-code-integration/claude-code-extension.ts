/**
 * Claude Code Extension Registration for HeadElf
 *
 * Registers the /skills and /agents slash commands with Claude Code
 */

import { slashCommands } from './slash-commands';

// Claude Code extension interface (based on standard extension patterns)
export interface ClaudeCodeExtension {
  name: string;
  version: string;
  commands: Record<string, ClaudeCodeCommand>;
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

export interface ClaudeCodeCommand {
  name: string;
  description: string;
  handler: () => Promise<string>;
}

export class HeadElfExtension implements ClaudeCodeExtension {
  name = 'HeadElf';
  version = '1.0.0';

  commands: Record<string, ClaudeCodeCommand> = {
    skills: {
      name: 'skills',
      description: 'List all available HeadElf skills organized by category',
      handler: slashCommands.skills
    },
    agents: {
      name: 'agents',
      description: 'List all available HeadElf subagents and their capabilities',
      handler: slashCommands.agents
    }
  };

  async activate(): Promise<void> {
    console.log('HeadElf extension activated');
    // Additional activation logic if needed
  }

  async deactivate(): Promise<void> {
    console.log('HeadElf extension deactivated');
    // Cleanup logic if needed
  }
}

// Export the extension instance for Claude Code to register
export const headElfExtension = new HeadElfExtension();