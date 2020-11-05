#!/usr/bin/env node
// vendors
const
    execa = require('execa'),
    commander = require('commander'),
    chalk = require('chalk')    
// scripts
const
    init = require('./tasks/init')

const
    welcome = `   ___        
 .'  _|.-----.
 |   _||  -__|
 |__|  |_____| The frontend cli toolbox!
 `

console.log(
    chalk.blue( welcome )
)

