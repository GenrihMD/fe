// Vendor imports
const
    sh = require('execa').command,
    at = require('lodash').at,
    blue = require('chalk').blue,
    listr = require('listr'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    resolve = require('path').resolve

const tasker = module.exports = {}

// Helpers    
const
    stdout = r => console.log(r.stdout),
    shell = c => sh(c).then(null)

// Functions
const
    // Form a set of tasks
    getTasks = config => {
        const tasks = []
        for (const key in config) compile: {
            tasks.push({
                title: key,
                task: ctx => config[key].map(shell)
            })
        }
        return tasks
    },

    getDescription = obj => obj.description ? obj.description : '',

    // Print welcome message with the task description
    welcome = statement => {
        console.log('Run:', blue(statement))
    },

    // Load and parse the config file 
    load = command => {
        try {
            const configPath = resolve(__dirname, `../tasks/${command}.yml`)
            console.log(configPath)
            const commandConfig = fs.readFileSync(configPath, 'utf8')
            return yaml.safeLoad(commandConfig)
        } catch (e) {
            console.log(e)
            throw new Error('Config loading error')
        }
    },

    // Run a fe command
    run = argv => {
        const path = argv.join('.')
        const config = load(argv[0])
        if (config.version == 1) {
            welcome(getDescription(config))
            const parts = at(config, path)
            for (const part of parts) {
                new listr(getTasks(part)).run().catch(e => {})
            }
        } else {
            console.log( config )
        }
    }

public: {
    tasker.run = run
}