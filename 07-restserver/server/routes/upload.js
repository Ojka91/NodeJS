const express = require('express');
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')

const app = express();

const Usuario = require('../models/user')
const Producto = require('../models/producto')

//default options
app.use(fileUpload())

app.put('/upload/:tipo/:id', (req, res) => {
    var tipo = req.params.tipo
    var id = req.params.id

    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No hay archivo seleccionado para subir'
            }
        })
    }

    //validar tipos
    let tiposValidos = ['productos', 'usuarios']
    if(tiposValidos.indexOf(tipo) <0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El tipo no es valido. Deben ser ' + tiposValidos.join('.')
            }
        })
    }


    let archivo = req.files.archivo;
    let splittedName = archivo.name.split('.')
    let extension = splittedName[splittedName.length - 1]

    //Extensiones permitidad
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']

    if(extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok:false,
            msg: 'Las extensiones validas son solo ' + extensionesValidas.join('.')
        })
    }

    //Cambiar nombre archivo 
    
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

    archivo.mv(`./uploads/${tipo}/${nombreArchivo}`, (err) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        //Aqui imagen ya esta subida

        if(tipo === 'usuarios'){

            imagenUsuario(id, res, nombreArchivo)
        }else{
            imagenProducto(id, res, nombreArchivo)
        }



        
    })
})


function imagenUsuario(id, res, nombreArchivo){

    Usuario.findById(id, (err, usuarioDB) => {
        if(err){
            borraArchivo(nombreArchivo, 'usuarios')

            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            borraArchivo(nombreArchivo, 'usuarios')
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        borraArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) =>{
           
            res.json({
                ok: true,
                usuario: usuarioGuardado, 
                img: nombreArchivo
            })
        }) 


      
    })

}

function imagenProducto(id, res, nombreArchivo){

    Producto.findById(id, (err, productoDB) => {
        if(err){
            borraArchivo(nombreArchivo, 'productos')

            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            borraArchivo(nombreArchivo, 'productos')
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        borraArchivo(productoDB.img, 'productos')

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) =>{
           
            res.json({
                ok: true,
                producto: productoGuardado, 
                img: nombreArchivo
            })
        }) 


      
    })

}

function borraArchivo(nombreImagen, tipo){
    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if( fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg)
    }
}


module.exports = app;