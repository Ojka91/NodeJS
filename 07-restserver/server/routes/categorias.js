const express = require('express');
let { verificarToken, verificarUsuarioAdmin } =  require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categoria')


//=====================
// Mostrar todo
//=====================
app.get('/categoria', verificarToken, (req, res) => {
   
    Categoria.find({})
        .populate('user', 'nombre email')
        .exec((err, categorias) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }else{
            return res.json({
                ok: true,
                result: categorias
            })
        }

    })


})


//=====================
// Mostrar una por ID
//=====================
app.get('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id

    Categoria.findById(id, (err, categorias) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!categorias){
            return res.status(400).json({
                ok: false,
                err: 'not found'
            })
        }
        else{
            return res.json({
                ok: true,
                result: categorias
            })
        }

    })

    
})

//=====================
// Crear nueva categoria
//=====================
app.post('/categoria', verificarToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        description: body.description,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaBD) => {
        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }
        if(!categoriaBD){
            res.status(400).json({
                ok: false,
                err
            })
        }else{
            res.json({
                ok: true,
                category: categoriaBD
            })
        }
    })
})

//=====================
// Modificar categoria
//=====================
app.put('/categoria/:id', verificarToken, (req,res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        description: body.description
    }
    Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators: true}, (err, categoriaDB) => {
       
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err: 'categoria not found'
            });
        }else{

            res.json({
                ok: true,
                categoria: categoriaDB
            });
        }
    })

})


//=====================
// Eliminar
//=====================
app.delete('/categoria/:id', [verificarToken, verificarUsuarioAdmin], (req, res) => {
//solo admin puede borrar
let id = req.params.id;

    let cambiaEstado = {
        state: false
    }
    Categoria.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, deletedCategory) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!deletedCategory){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Category not found"
                }
            })
        }
        res.json({
            ok:true,
            usuario: deletedCategory
        })
    })
})

module.exports = app