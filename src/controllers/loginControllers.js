// Requerer as variáveis de ambiente
require('dotenv').config();

// Requerer dependências
const users = require('../models/Users');
const comparePasswordService = require('../services/compare_password_service');
const jwt = require('jsonwebtoken');
const sendError = require('../utils/sendErrorResponse');

class LoginController{
    async login(req, res){
        let {usuario, password} = req.body
        let user = await users.findByUsuario(usuario)
        console.log(user)
        if(user.values != undefined){
            let passValiated = comparePasswordService(password, user.values.passwd)
            if(!passValiated){
               res.status(406).json({success: false, message:"Senha Invalida"})
            }else{
               let token = jwt.sign({usuario: user.values.usuario, role: user.values.tipo},process.env.SECRET,{expiresIn: 5000}) 
               res.status(200).json({success: true, token: token})
            }
        }else{
            user.values == undefined
            ? res.status(406).json({success: false, message:'Usuário não encontrado'})
            : res.status(404).json({success: false, message: user.error})
        }
    }

}

module.exports = new LoginController;