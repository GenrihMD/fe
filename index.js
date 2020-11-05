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
`,
    help =  `usage: fe [command]`

main: {
    const argv = hideBin(process.argv)
    
    if (argv.length < 1) {
        console.log(chalk.blue( welcome ))
        console.log( help, '\n' )
    } else {
        run(argv)
    }
}
