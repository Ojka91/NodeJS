const fs = require('fs')

let data = '';

let createFile = (base) => {
    return new Promise((resolve, reject) => {

        if(!Number(base)){
            reject('Its not a number');
            return;
        }
        for (let x = 1; x <= 10; x++) {
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

// export this function
module.exports = {
    createFile
}