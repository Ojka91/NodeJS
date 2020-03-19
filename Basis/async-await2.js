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



let getEmployer = async (id) =>{


        let employerBD = employers.find(employer => employer.id === id)

        if(!employerBD){
            throw new Error(`Doesnt exist that employer with id ${id}`)
        }else{
            return(employerBD)
        }
 

}

let getSalary =  async(employer) =>{

        let salaryBD = salary.find(salares => salares.id === employer.id)

        if(!salaryBD){
            throw new Error("Noay salario pa este personaje")
        }else{
            return{
                name: employer.name,
                salary: salaryBD.salary
            }
        }

   
}

let getInfo = async (id) => {
    let employer = await getEmployer(id) 
    let resp = await getSalary(employer)


    return `${resp.name} have a salary of ${resp.salary}`
}

getInfo(5).then(msg => console.log(msg))
.catch(e => {
    console.log(e)
})

