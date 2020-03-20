setTimeout(() => {
    console.log('Hi World')
}, 3000);

let getUserById = (id, callback) => {

    let user = {
        name: 'Oscar',
        id //same as id: id (or in java, id = this.id)
    }
    if(id === 20 ){
        callback(`User with id ${id} does not exist`)
    }else{
        callback(null, user);
    }
    

}

getUserById(1, (err, user)=>{
    if(err){
        return console.log(err)
        
    } 
    console.log('User from databse', user)
})