// Vendor imports
const
    sh      = require('execa').command,
    at      = require('lodash').at,
    blue    = require('chalk').blue,
    listr   = require('listr'),
    fs      = require('fs'),
    yaml    = require('js-yaml'),
    dirname = require('path').dirname
    
const tasker = module.exports = {}

// Helpers    
const 
    stdout = r => console.log(r.stdout),
    shell  = c => sh( c ).then( null )
        
// Functions
const
    // Print welcome message with the task description
    welcome = statement => {
        console.log( 'Run:', blue(statement) )
    },
    
    // Load and parse the config file 
    load = command => {
        try {
            const commandConfig = fs.readFileSync(`${__dirname}/tasks/${command}.yml`, 'utf8')
            return yaml.safeLoad(commandConfig)
        } catch {
            throw new Error('Config loading error')
        }
    },

    // Form a set of tasks
    getTasks = config => {
        const tasks = []
        for (const key in config) compile: {
            tasks.push({
                title: key,
                task: ctx => config[key].map( shell )
            })
        }
        return tasks
    },

    getDescription = obj => {
        return obj.description ?? '' 
    }

    // Run a fe command
    run = argv => {
        const path = argv.join('.')
        const config = load(argv[0])
        welcome( getDescription( config ) )
        const parts = at(config, path)
        for (const part of parts) {
            new listr(getTasks(part)).run().catch(e => { })
        }        
    }

public: {
    tasker.run = run
}
