//Scope var -> everything
//Scope let -> self

var name = 'VarName';
let surname = 'LetName'

if(true){
    var name = "NameChanged" 
} 
if(true){
    let surname = 'LetChanged'
} 

console.log(name)
console.log(surname)