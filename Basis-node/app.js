//const multiply = require('./multiply/multiply')
//multiply.createfile()

//detructuring like this, you can call function directly
const {
    createFile,
    listarInfo
} = require('./multiply/multiply')

const argv = require('./config/yargs').argv;
const colors = require('colors')

let argv2 = process.argv;
//let parameter = argv[2];
//let base = parameter.split('=')[1]
console.log(argv)
//console.log(argv2)
let command = argv._[0]


switch (command) {
    case 'listar':
        listarInfo(argv.base, argv.limite)
        break;
    case 'create':
        console.log(argv.base)
        createFile(argv.base, argv.limite)
            .then(file => console.log(`File created ${file.red}`.blue))
            .catch(e => console.log(e))
        break
    default:
        console.log('Command not known')
}

/*createFile(base)
    .then(file => console.log(`File created ${file}`))
    .catch(e => console.log(e))
*/