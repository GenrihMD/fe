const {
    copyFileSync,
} = require('fs')

const parser = module.exports = {}

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
        return async () => {

        }
    },

    // The move action getter
    getMove = args => {
        checkArgsNum( args, 2 )
        return async () => {}
    },

    // The add action getter
    getAdd = args => {
        checkArgsNum( args, 2 )
        return async () => {}
    },

    // The remove action getter
    getRemove = args => {
        checkArgsNum( args, 2 )
        return async () => {}
    },

    // The rename action getter
    getRename = args => {
        checkArgsNum( args, 2 )
        return async () => {

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
    parse = (line) => {
        const words = line.split(' ')
        const action = words[0]
        const args = words.slice(1, words.lenght)

        if (action in actionGetters) {
            return actionGetters[ action ]( args )
        } else {
            throw new Error('Invalid action')
        }
    }

public: {
    parser.parse = parse
}
