// Vendors
const
    execa = require('execa'),
    listr = require('listr'),
    chalk = require('chalk'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    _ = require('lodash')
    
// Helpers    
const 
    writeExecStdout = r => console.log(r.stdout),
    execInShall = c => execa.shell( c ).then( writeExecStdout )
    

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
                task: () => config[key].map( execInShall )
            })
        }
        return tasks
    }

    exec = script => {
        const path = script.replace(' ', '.')
        const command = script.split(' ')[0]
        const config = load(command)
        const parts = _.at(config, path)
        for (const part of parts){
            new listr(getTasks(part)).run().catch(e => { })}
        
    }

module.exports = exec
