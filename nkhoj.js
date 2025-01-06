#! /usr/bin/env node
'use strict'
const {readFileSync} = require('node:fs')
const {spawnSync} = require('node:child_process')
const os = require('node:os')
const path = require('path')
const khojProcess = require('./khojProcess')
const configFilePath = path.join(os.homedir(), '.khoj/nkhojConfig.json')
const khojOptions = JSON.parse(readFileSync(configFilePath, 'utf-8'))

const whereIsBuff = spawnSync('whereis', ['-q','khoj']).stdout
const buffLength = whereIsBuff.length
const khojLocation = whereIsBuff.slice(0, buffLength - 1).toString()
console.log(`khoj found at: ${khojLocation}.`)


khojProcess(khojLocation, khojOptions.env)




