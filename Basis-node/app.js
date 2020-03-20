//const multiply = require('./multiply/multiply')
//multiply.createfile()

//detructuring like this, you can call function directly
const { createFile } = require('./multiply/multiply')



let argv = process.argv;
let parameter = argv[2];
let base = parameter.split('=')[1]
console.log(base)

createFile(base)
    .then(file => console.log(`File created ${file}`))
    .catch(e => console.log(e))


  