let employers = [{
    id:1,
    name:'Oscar'
},
{
    id:2,
    name:"Joan"
},
{
    id:3,
    name:"Jaime"
}]

let salary=[{
    id:1,
    salary:1000
},
{
    id:2,
    salary:3000
}]


let getEmployer = (id, callback) =>{
    let employerBD = employers.find(employer => employer.id === id)

    if(!employerBD){
        callback(`Doesnt exist that employer with id ${id}`)
    }else{
        callback(null, employerBD)
    }
}

let getSalary = (employer, callback) => {
    let salaryBD = salary.find(salary => salary.id === employer.id)

    if(!salaryBD){
        callback(`The employer ${employer.name} does not have salayr in our db`)
    }else{
        callback(null, {
            name: employer.name,
            salary: salaryBD.salary})
    }
}

getEmployer(1, (err, employer) => {
    if(err){
        return console.log(err)
    }
    getSalary(employer, (err, res) => {
        if(err){
            return console.log(err)
        }else{
            console.log(`Salary of ${res.name} is ${res.salary}`)
        }
    })
})



