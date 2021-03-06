const jwt = require('jsonwebtoken')

//===================
// Verificar token
//===================

let verificarToken = (req, res, next) => {

    let token = req.get('token')

    jwt.verify(token, process.env.SEED , (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Not valid token'
                }
            })
        }

        req.usuario = decoded.user;
        next()

    })

}


//===================
// Verificar Admin Role 
//===================

let verificarUsuarioAdmin = (req, res, next) =>  {

    let usuario = req.usuario;

    if(usuario.rol != 'ADMIN_ROLE'){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No tienes permisos weon'
            }
        })
    }else{
        next()
    }
    
}

//===================
// Verificar Token img 
//===================
let verificarTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED , (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Not valid token'
                }
            })
        }

        req.usuario = decoded.user;
        next()

    })


}


module.exports = {
    verificarToken,
    verificarUsuarioAdmin,
    verificarTokenImg
}