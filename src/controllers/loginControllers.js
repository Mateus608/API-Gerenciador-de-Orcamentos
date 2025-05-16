//requerer as variáveis de ambiente
require('dotenv').config()
//requerer o models usuario
const users                  = require('../models/Users')
//requerer a função de comparar senha
const comparePasswordService = require('../services/compare_password_service')
//requerer a biblioteca jwt
const jwt                    = require('jsonwebtoken')
//requerer função saída de erro
const sendError              = require('../utils/sendErrorResponse')

class LoginController {
    async login(req, res){
        let {codigo, password} = req.body
        let user = await users.findByCodigo(codigo)
        
        if(user.values != undefined){
            let passValiated = comparePasswordService(password, user.values.passwd)
            if(!passValiated){
               sendError( res, 406, "Senha Invalida")
            }else{
               let token = jwt.sign({codigo: user.values.codigo, role: user.values.tipo},process.env.SECRET,{expiresIn: 5000}) 
               res.status(200).json({success: true, token: token})

            }
        }else{
            user.values == undefined
            ? sendError( res, 406, 'Código não encontrado não encontrado')
            : res.status(404).json({success: false, message: user.error})
        }
    }

}

module.exports = new LoginController