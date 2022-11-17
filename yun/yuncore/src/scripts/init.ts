process.on('unhandledRejection', err => {
  throw err
});

const spawn = require('cross-spawn');
const fs = require('fs-extra');
const path = require('path');

const which = require('which');
const inquirer = require('inquirer')
const log = require('../utils/log')

const runCmd = (cmd, options, done, verbose) => {
  const command = cmd || 'unpm';

  let args = [
    'install',
    '--save-exact'
  ];

  if (verbose) {
    args.push('--verbose')
  }

  
}