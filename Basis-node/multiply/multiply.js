const fs = require('fs')
const colors = require('colors')


let data = '';

let createFile = (base, limit=10) => {
    return new Promise((resolve, reject) => {

        if(!Number(base)){
            reject('Its not a number');
            return;
        }
        for (let x = 1; x <= limit; x++) {
            data += `base ${base} * ${x} = ${x*base}\n`
        }

        fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
            if 
                (err) reject(err)
            else 
                resolve(`table-${base}.txt`) 
        });
    })
}

let listarInfo = (base, limit = 10) => {
        for (let x = 1; x <= limit; x++) {
          console.log(  data += `base ${base} * ${x} = ${x*base}`.red)
        }
}

// export this function
module.exports = {
    createFile,
    listarInfo
}