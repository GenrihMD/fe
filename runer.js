// Vendors
const
    execa = require('execa'),
    listr = require('listr'),
    chalk = require('chalk'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    _ = require('lodash')
    
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
        for (const key in config) {
            tasks.push({
                title: key,
                task: () => config[key].map( c => execa(c) )
            })
        }
        return tasks
    }

    exec = script => {
        const path = script.replace(' ', '.')
        const command = script.split(' ')[0]
        const config = load(command)
        const commands = _.at(config, path)
        // console.log(getTasks(commands))
        new listr(getTasks(commands)).run().catch(e => { })
    }

module.exports = exec
