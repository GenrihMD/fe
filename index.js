#!/usr/bin/env node
// Vendors
const
    commander = require('commander'),
    chalk = require('chalk')    

// Scripts
const
    run = require('./runer')

const
    welcome = `   ___        
 .'  _|.-----.
 |   _||  -__|
 |__|  |_____| The frontend cli toolbox!
 `

console.log(
    chalk.blue( welcome )
)

run('init')