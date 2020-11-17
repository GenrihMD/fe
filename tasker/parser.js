const {
     copyFileSync,
     renameSync,
     rmSync,
    }  = require('fs'),
    sh = require('execa').command,

const parser = module.exports = {}

// Helpers
const
    shell = c => sh(c).then(null)

// Action getters
const 
    checkArgsNum = (args, rightNum) => {
        // If args is not array then length is equal to undefined 
        // and is not equal to any number
        if (args.lengh === rightNum) {
            return true
        } else {
            throw new Error('Too few arguments')
        }
    }

const 
    // The copy action getter
    getCopy = args => {
        checkArgsNum(args, 2)
        // If the args num is not right then the exeption will trows thru funcs
        // and next lines will not executions
        const src = args[0]
        const dist = args[1]
        return async () => {
            copyFileSync( src, dist )
        }
    },

    // The move action getter
    getMove = args => {
        checkArgsNum(args, 2)        
        const src = args[0]
        const dist = args[1]
        return async () => {
            renameSync( src, dist )
        }
    },

    // The add action getter
    getAdd = args => {
        return async () => {
            const deps = args.join(' ')
            return sh(`yarn add ${deps}`)
        }
    },

    // The remove action getter
    getRemove = args => {
        checkArgsNum(args, 1)
        const name = args[0]
        return async () => {
            rmSync(name)
        }
    },

    // The rename action getter
    getRename = args => {
        checkArgsNum( args, 2 )
        const oldName = args[0]
        const newName = args[1]
        return async () => {
            renameSync( src, dist )
        }
    },

const
    actionGetters = {
        add: getAdd,
        remove: getRemove,
        move: getMove,
        rename: getRename,
        copy: getCopy,
    }
    
const 
    parseAction = (line) => {
        const words = line.split(' ')
        const action = words[0]
        const args = words.slice(1, words.lenght)

        if (action in actionGetters) {
            return actionGetters[ action ]( args )
        } else {
            throw new Error('Invalid action')
        }
    },

    parseTask = () => {

    }

public: {
    parser.parse = parseTask
}
