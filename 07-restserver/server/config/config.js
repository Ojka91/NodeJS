// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
//heroku te una variable de entorn que es diu NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Database
// ============================
let urlDB
if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/coffe'
}else {
    urlDB = process.env.MONGO_URI //mongodb+srv://cafe-user:1234@cluster0-r9ycz.mongodb.net/test seteada a heroku
}

process.env.URLDB = urlDB;


// ============================
//  Token Expiration
// ============================
//60 seconds
//60 minutes
//24 hours
//30 days

process.env.TOKEN_EXPIRATION = 60*60*24*30


// ============================
//  SEED autenticacion
// ============================

process.env.SEED = process.env.SEED || 'el-secreto-mejor-guardado'