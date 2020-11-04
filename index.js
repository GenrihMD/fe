#!/usr/bin/env node

const execa = require('execa')
const commander = require('commander')
const Listr = require('listr')
const chalk = require('chalk')

console.log(chalk.blue('Welcome to FE, the frontend cli toolbox!'))



const tasks = new Listr([
    {
		title: 'Success',
		task: () => 'Foo'
	},
])

tasks.run().catch( e => { } )
