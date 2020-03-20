let getName = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Fernando')
        }, 3000);
    }) 
}

let greetings = async () => {

    let name = await getName()
    return `Hi ${name}`
}

greetings().then(name => {
    console.log(name)
})
