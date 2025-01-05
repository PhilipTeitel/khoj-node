#! /usr/bin/env node
'use strict'
const {readFileSync} = require('node:fs')
const {spawnSync} = require('node:child_process')
const path = require('node:path')
const khojProcess = require('./khojProcess')
// const khojOptions = readFileSync('~/.khoj/khojOptions.json').toJSON()

const whereIsBuff = spawnSync('whereis', ['-q','khoj']).stdout
const buffLength = whereIsBuff.length
const khojLocation = whereIsBuff.slice(0, buffLength - 1).toString()
console.log(`khoj found at: ${khojLocation}.`)
khojProcess(khojLocation)




