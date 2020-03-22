const des = {
    description: {
        demand: true,
        alias: 'd'
    }
}

const update = {
    description: {
        demand: true,
        alias: 'd'
    },
    completed: {
        alias: 'c',
        default: true,  
        desc: 'Completed'
    }
}

const show = {
    show: {
        alias: 's'
    }
}

const argv = require('yargs')
    .command('create', 'Create TODO', des)
    .command('update', 'Description', update)
    .command('show', 'Show info')
    .command('delete', 'Delete activity', des)
    .help()
    .argv;


    module.exports = {
        argv
    }