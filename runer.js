// Vendors
const
    { command: sh } = require('execa'),
    { at }          = require('lodash'),
    listr           = require('listr'),
    chalk           = require('chalk'),
    fs              = require('fs'),
    yaml            = require('js-yaml')
    
// Helpers    
const 
    stdout = r => console.log(r.stdout),
    shell  = c => sh( c ).then( null )
        
// Functions
const
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
        const parts = at(config, path)
        for (const part of parts) {
            new listr(getTasks(part)).run().catch(e => { })
        }        
    }

module.exports = exec
