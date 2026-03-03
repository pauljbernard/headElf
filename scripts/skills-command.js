#!/usr/bin/env node
/**
 * HeadElf Skills Command - Standalone Executable
 *
 * Provides direct access to HeadElf skills listing without requiring slash command integration
 */

const path = require('path');
const projectRoot = path.dirname(__dirname);

// Set the working directory to the project root
process.chdir(projectRoot);

const { handleSkillsCommand } = require('../dist/claude-code-integration/slash-commands.js');

async function main() {
  try {
    const output = await handleSkillsCommand();
    console.log(output);
  } catch (error) {
    console.error('Error executing skills command:', error.message);
    process.exit(1);
  }
}

main();