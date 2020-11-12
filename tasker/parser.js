const {
    copyFileSync,
} = require('fs')

const parser = module.exports = {}

const 
    getCopy = (src, dist) => {
        return async () => {}
    },
    getMove = (src, dist) => {
        return async () => {}
    },
    getAdd = (name) => {
        return async () => {}
    },
    getRemove = (name) => {
        return async () => {}
    },
    getRename = (oldName, newName) => {
        return async () => {

        }
    },
    
const 
    parse = (line) => {
        const words = line.split(' ')
        const action = words[0]
        const args = words.slice(1, words.lenght)

    }
