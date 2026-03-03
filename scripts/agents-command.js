#!/usr/bin/env node
/**
 * HeadElf Agents Command - Standalone Executable
 *
 * Provides direct access to HeadElf subagents listing without requiring slash command integration
 */

const path = require('path');
const projectRoot = path.dirname(__dirname);

// Set the working directory to the project root
process.chdir(projectRoot);

const { handleAgentsCommand } = require('../dist/claude-code-integration/slash-commands.js');

async function main() {
  try {
    const output = await handleAgentsCommand();
    console.log(output);
  } catch (error) {
    console.error('Error executing agents command:', error.message);
    process.exit(1);
  }
}

main();