import mysql = require ('mysql');

export default class MySQL{

    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '12345',
            database: 'typescript'
        })
        this.conectarDB();
    }


    private conectarDB(){
        this.cnn.connect(( err: mysql.MysqlError) => {
            if(err){
                console.log(err.message)
                return
            }
            this.conectado= true;
            console.log('Base de datos online')
        })
    }
}