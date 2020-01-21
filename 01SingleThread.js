/* Single Thread */

'use strict'

function singleThread(){
    console.log("Node process")
    console.log("ID process" + process.pid)
    console.log("Title process" + process.title)
    console.log("Directory Node" + process.execPath)
    console.log("Directory Actual" + process.cwd())
    console.log("Directory process" + process.execPath)
    console.log("Directory process" + process.execPath)
    console.log("Directory process" + process.execPath)
    console.log("Directory process" + process.execPath)

}

singleThread();

console.log('---------------')

for (const key in process.argv) {
    if (process.argv.hasOwnProperty(key)) {
        const element = process.argv[key];
        console.log(element)
    }
}

