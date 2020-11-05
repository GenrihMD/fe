#!/usr/bin/env node
// Vendors
const
    yargs = require('yargs'),
    chalk = require('chalk'),    
    { hideBin } = require('yargs/helpers')

// Scripts
const
    run = require('./runer')

const
    welcome = `   ___        
 .'  _|.-----.
 |   _||  -__|
 |__|  |_____| The frontend cli toolbox!
 `

main: {

    const argv = hideBin(process.argv)
    
    if (!argv) {
        console.log(
            chalk.blue( argv )
        )
    } else {
        run(argv)
    }
   
}
