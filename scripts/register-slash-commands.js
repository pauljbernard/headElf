#!/usr/bin/env node

/**
 * Registration Script for HeadElf Slash Commands
 *
 * This script registers the /skills and /agents commands with Claude Code
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Claude Code configuration directory
const CLAUDE_CODE_CONFIG_DIR = path.join(os.homedir(), '.claude');
const EXTENSIONS_DIR = path.join(CLAUDE_CODE_CONFIG_DIR, 'extensions');
const COMMANDS_FILE = path.join(CLAUDE_CODE_CONFIG_DIR, 'commands.json');

// HeadElf commands configuration
const HEADELF_COMMANDS = {
  skills: {
    name: 'skills',
    description: 'List all available HeadElf skills organized by category',
    type: 'node_script',
    script: path.join(__dirname, '..', 'dist', 'claude-code-integration', 'slash-commands.js'),
    function: 'handleSkillsCommand'
  },
  agents: {
    name: 'agents',
    description: 'List all available HeadElf subagents and their capabilities',
    type: 'node_script',
    script: path.join(__dirname, '..', 'dist', 'claude-code-integration', 'slash-commands.js'),
    function: 'handleAgentsCommand'
  }
};

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
    console.log(`✓ Directory ensured: ${dirPath}`);
  } catch (error) {
    console.error(`✗ Failed to create directory ${dirPath}:`, error.message);
    throw error;
  }
}

async function loadExistingCommands() {
  try {
    if (fs.existsSync(COMMANDS_FILE)) {
      const content = await fs.promises.readFile(COMMANDS_FILE, 'utf8');
      return JSON.parse(content);
    }
    return {};
  } catch (error) {
    console.log('No existing commands file found, creating new one');
    return {};
  }
}

async function saveCommands(commands) {
  try {
    const content = JSON.stringify(commands, null, 2);
    await fs.promises.writeFile(COMMANDS_FILE, content, 'utf8');
    console.log(`✓ Commands saved to: ${COMMANDS_FILE}`);
  } catch (error) {
    console.error(`✗ Failed to save commands:`, error.message);
    throw error;
  }
}

async function registerCommands() {
  try {
    console.log('🚀 Registering HeadElf slash commands with Claude Code...');

    // Ensure Claude Code config directory exists
    await ensureDirectoryExists(CLAUDE_CODE_CONFIG_DIR);
    await ensureDirectoryExists(EXTENSIONS_DIR);

    // Load existing commands
    const existingCommands = await loadExistingCommands();
    console.log(`📖 Loaded ${Object.keys(existingCommands).length} existing commands`);

    // Add HeadElf commands
    const updatedCommands = {
      ...existingCommands,
      ...HEADELF_COMMANDS
    };

    // Save updated commands
    await saveCommands(updatedCommands);

    console.log('✅ Successfully registered HeadElf commands:');
    console.log('   • /skills - List all available HeadElf skills');
    console.log('   • /agents - List all available HeadElf subagents');
    console.log('');
    console.log('🎯 Commands are now available in Claude Code!');
    console.log('   Try typing "/skills" or "/agents" in Claude Code');

  } catch (error) {
    console.error('❌ Failed to register commands:', error.message);
    process.exit(1);
  }
}

async function unregisterCommands() {
  try {
    console.log('🗑️  Unregistering HeadElf slash commands...');

    const existingCommands = await loadExistingCommands();

    // Remove HeadElf commands
    delete existingCommands.skills;
    delete existingCommands.agents;

    await saveCommands(existingCommands);
    console.log('✅ HeadElf commands unregistered');

  } catch (error) {
    console.error('❌ Failed to unregister commands:', error.message);
    process.exit(1);
  }
}

async function listCommands() {
  try {
    const commands = await loadExistingCommands();
    console.log('📋 Currently registered commands:');

    if (Object.keys(commands).length === 0) {
      console.log('   (No commands registered)');
      return;
    }

    Object.entries(commands).forEach(([name, config]) => {
      console.log(`   • /${name} - ${config.description}`);
    });

  } catch (error) {
    console.error('❌ Failed to list commands:', error.message);
  }
}

// Main execution
async function main() {
  const action = process.argv[2] || 'register';

  switch (action) {
    case 'register':
      await registerCommands();
      break;
    case 'unregister':
      await unregisterCommands();
      break;
    case 'list':
      await listCommands();
      break;
    default:
      console.log('Usage: node register-slash-commands.js [register|unregister|list]');
      process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  registerCommands,
  unregisterCommands,
  listCommands,
  HEADELF_COMMANDS
};