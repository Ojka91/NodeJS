const express = require('express')

const {
    verificarToken,
    verificarUsuarioAdmin
} = require('../middlewares/autenticacion')

let app = express()

let Producto = require('../models/producto')

//======================
// Obtener productos
//======================
app.get('/producto', verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({
            disponible: true
        })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            } else {
                return res.json({
                    ok: true,
                    result: productos
                })
            }

        })
})

//======================
// Obtener producto by id
//======================
app.get('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    err: 'not found'
                })
            } else {
                return res.json({
                    ok: true,
                    result: productos
                })
            }

        })
})


//======================
// Crea producto 
//======================
app.post('/producto', verificarToken, (req, res) => {
    //create products
    // populate usuario categoria
    let body = req.body;

    let newProduct = new Producto({
        usuario: body.usuario,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
    });

    newProduct.save((err, product) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }
        if (!product) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                producto: product
            })
        }
    })
})



//======================
// Update producto 
//======================
app.post('/producto/:id', verificarToken, (req, res) => {
    //update productos
    let id = req.params.id;
    let body = req.body;


    Producto.findById(id, (err, productDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productDB) {
            res.status(400).json({
                ok: false,
                err: 'producto not found'
            });
        } else {

            productDB.nombre = body.nombre;
            productDB.precioUni = body.precioUni;
            productDB.categoria = body.categoria;
            productDB.disponible = body.disponible;
            productDB.descripcion = body.description;

            productDB.save((err, productoGuardado) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    producto: productoGuardado
                });
            })

        }
    })

})

//======================
// Crea producto 
//======================

app.get('/producto/buscar/:termino', verificarToken, (req, res) => {
    var termino = req.params.termino
    let regex = new RegExp(termino, 'i')
    Producto.find({nombre: regex})
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }else{
                res.json({
                    ok: true,
                    producto: productos
                });
            }

        })
})

//======================
// Delete producto 
//======================
app.delete('/producto/:id', [verificarToken], (req, res) => {
    //delete productos
    //state to false
    let id = req.params.id;

    let cambiaEstado = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, cambiaEstado, {
        new: true
    }, (err, deteledProduct) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!deteledProduct) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Product not found"
                }
            })
        }
        res.json({
            ok: true,
            usuario: deteledProduct
        })
    })
})

module.exports = app