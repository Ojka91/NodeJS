const argv = require('./config/yargs').argv;
const colors = require('colors');
const toDO = require('./to-doStuff/todo');

let command = argv._[0]

switch (command) {
    case 'create':
        let activity = toDO.create(argv.description)
        console.log(activity)
        break
    case 'show':
        let getInfo = toDO.getList();
        for (const activity of getInfo) {
            console.log('================='.green)
            console.log(activity.description)
            console.log('State: ' + activity.completed)
        }
        break
    case 'update':
        let update = toDO.update(argv.description, argv.completed)
        console.log(update)
        break
    case 'delete':
        let deleteActivity = toDO.deleteActivity(argv.description)
        console.log(deleteActivity)
        break
    default:
        console.log('Cmmand not found'.red)
}