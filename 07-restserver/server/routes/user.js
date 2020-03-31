const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/user')
const app = express()

app.get('/usuario', function (req, res) {
    let from = req.query.from || 0;
    from = Number(from)

    let limit = req.query.limit || 5;
    limit = Number(limit)

    Usuario.find({})
            .skip(from)
            .limit(limit)
            .exec((err, users) => {
                if(err){
                    return  res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({}, (err, counter) => {
                        res.json({
                        ok:true,
                        users,
                        counter
                    });
                })
            })
});

app.post('/usuario', function (req, res) {

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

app.put('/usuario/:id', function (req, res) {

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

app.delete('/usuario', function (req, res) {
    res.json('delete Usuario');
});

module.exports = app