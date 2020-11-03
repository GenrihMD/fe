const execa = require('execa')
const Listr = require('listr')
const chalk = require('chalk')

console.log(chalk.blue('FE is a frontend cli toolbox!'))

const tasks = new Listr([
    {
		title: 'Success',
		task: () => 'Foo'
	},
])

tasks.run().catch( e => { } )
