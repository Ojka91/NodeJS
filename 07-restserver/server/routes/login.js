const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/user')
const app = express()

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({
        email: body.email
    }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!userDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password are wrong'
                }
            })

        }
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password are wrong'
                }
            })
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, {
            expiresIn: 60*60*24*30 //30 dias token
        })
        res.json({
            ok: true,
            usuario: userDB,
            token
        })
    })


})


module.exports = app