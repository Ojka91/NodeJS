const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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
            expiresIn: 60 * 60 * 24 * 30 //30 dias token
        })
        res.json({
            ok: true,
            usuario: userDB,
            token
        })
    })


})


//configuracion google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        pic: payload.picture,
        google: true
    }
}


app.post('/google', async (req, res) => {

    let token = req.body.idtoken
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            })
        })


    Usuario.findOne({
        email: googleUser.email
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        else if (usuarioDB) {
            if (usuarioDB.google == false) {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            msg: 'Usa ña autenticacion normañ'
                        }
                    })

                } else {
                    let token = jwt.sign({
                        user: usuarioDB
                    }, process.env.SEED, {
                        expiresIn: process.env.TOKEN_EXPIRATION //30 dias token
                    })
                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                    })
                }
            } else {
                //Si el user no existe en bdd
                let user = new Usuario();
                user.nombre = googleUser.nombre;
                user.email = googleUser.email;
                user.img = googleUser.picture;
                user.google = true;
                user.password = ':)'

                user.save((err, userDB) => {
                    if (err) {

                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }
                })
                let token = jwt.sign({
                    user
                }, process.env.SEED, {
                    expiresIn: process.env.TOKEN_EXPIRATION //30 dias token
                })
                res.json({
                    ok: true,
                    user,
                    token
                })
            }



        }

    })


})

module.exports = app