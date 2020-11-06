#!/usr/bin/env node
// Vendors
const
    { blue } = require('chalk'),    
    { hideBin } = require('yargs/yargs')

// Script runner
const
    tasker = require('./tasker')

const
    help =  `usage: fe [command]`,
    welcome = `   ___        
 .'  _|.-----.
 |   _||  -__|
 |__|  |_____| The frontend cli toolbox!
`
    
init: {
    // some init do
}

main: {
    const command = hideBin(process.argv)
    
    if (command.length < 1) {
        console.log( blue(welcome))
        console.log(help, '\n')
    } else {
        tasker.run(command)
    }
}
