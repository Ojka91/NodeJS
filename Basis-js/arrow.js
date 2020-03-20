/*
function add (a, b){
    return a+b
}
*/


let add = (a,b) => a + b;

let greet = name => `Hi ${name}`;

console.log(`${add(9,6)} ${greet('Joan')}`)

let deadpool = {
    name: 'Wade',
    surname: 'Winston',
    power: 'Regeneration',
    getName(){
        return `${this.name} ${this.surname} have the power ${this.power}`
    }
    
}

console.log(deadpool.getName())