const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/user')
const { verificarToken, verificarUsuarioAdmin }  = require('../middlewares/autenticacion')
const app = express()

app.get('/usuario', verificarToken ,  (req, res) => {


    let from = req.query.from || 0;
    from = Number(from)

    let limit = req.query.limit || 5;
    limit = Number(limit)

    let usersActivos = {
        state: true
    }

    Usuario.find(usersActivos, 'nombre email rol estado google img')
            .skip(from)
            .limit(limit)
            .exec((err, users) => {
                if(err){
                    return  res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count(usersActivos, (err, counter) => {
                        res.json({
                        ok:true,
                        users,
                        counter
                    });
                })
            })
});

app.post('/usuario',[verificarToken, verificarUsuarioAdmin], (req, res) => {

    let body = req.body;

    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    })

    user.save((err, userDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {


            res.json({
                ok: true,
                user: userDB
            });
        }
    })

});

app.put('/usuario/:id', [verificarToken, verificarUsuarioAdmin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
       
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }else{

            res.json({
                ok: true,
                usuario: userDB
            });
        }
    })


});

app.delete('/usuario/:id', [verificarToken, verificarUsuarioAdmin], (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        state: false
    }

    //Usuario.findByIdAndRemove(id, (err, deletedUser) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, deletedUser) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!deletedUser){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "User not found"
                }
            })
        }
        res.json({
            ok:true,
            usuario: deletedUser
        })
    })
});

module.exports = app