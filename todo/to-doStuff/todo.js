const fs = require('fs');

let toDoList = [];

const create = (description) => {

    getDB()
    let toDo = {
        description: description,
        completed: false
    };

    toDoList.push(toDo)
    saveToDb()
    return toDo;
}

const saveToDb = () => {
    let data = JSON.stringify(toDoList);
    fs.writeFile('db/data.json', data, (err) => {
        if(err) throw (err)
    })
}

const getDB = () => {
    try{
        toDoList = require('../db/data.json')

    }catch (err){
        toDoList = []
    }
}

const getList = () => {
    getDB()
    return toDoList;
}

const update = (description, completed = true) => {
    getDB()
    let index = toDoList.findIndex(activity => {
        return activity.description === description;
    })

    if(index >=0){
        toDoList[index].completed = completed;
        saveToDb()
        return true
    }else{
        return false
    }

 
}


const deleteActivity = (description) => {
    getDB()
    let newList = toDoList.filter(el => el.description != description )

    if (toDoList.length === newList.length)
        return false
    else toDoList = newList
        saveToDb()
        return true
}


module.exports = {
    create,
    getDB,
    getList,
    update,
    deleteActivity
}