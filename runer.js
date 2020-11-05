// Vendors
const
    { command: sh } = require('execa'),
    { at }          = require('lodash'),
    { blue }        = require('chalk'),
    listr           = require('listr'),
    fs              = require('fs'),
    yaml            = require('js-yaml')
    
// Helpers    
const 
    stdout = r => console.log(r.stdout),
    shell  = c => sh( c ).then( null )
        
// Functions
const
    welcome = config => {
        if ('description' in config) {
            console.log( 'Run:', blue(config.description) )
        }
    },
    
    load = command => {
        try {
            const commandConfig = fs.readFileSync(`./tasks/${command}.yml`, 'utf8')
            return yaml.safeLoad(commandConfig)
        } catch (e) {
            throw e
            // throw new Error('Config loading error')
        }
    },

    getTasks = config => {
        const tasks = []
        for (const key in config) compile: {
            tasks.push({
                title: key,
                task: ctx => config[key].map( shell )
            })
        }
        return tasks
    }

    exec = argv => {
        const path = argv.join('.')
        const config = load(argv[0])
        welcome(config)
        const parts = at(config, path)
        for (const part of parts) {
            new listr(getTasks(part)).run().catch(e => { })
        }        
    }

module.exports = exec
