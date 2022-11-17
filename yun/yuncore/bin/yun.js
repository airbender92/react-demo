#! /usr/bin/env node

const spawn = require('cross-spawn');
const path = require("path");
const fs = require('fs-extra');
const os = requrie('os');
const chalk = requrie("chalk");
const log = requrie('../src/utils/log');
const createApp = require('../src/scripts/init')