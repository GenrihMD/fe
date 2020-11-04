
const
    execa = require('execa'),
    Listr = require('listr'),
    chalk = require('chalk')


module.exports = () => {
    const tasks = new Listr([
        {
            title: 'Success',
            task: () => 'Foo'
        },
    ])

    tasks.run().catch( e => { } )
}

