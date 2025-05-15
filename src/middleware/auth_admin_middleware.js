//requerer dotenv
require('dotenv').config();
//requerer jwt
const jwt = require('jsonwebtoken');
//requerer função de saída de erro.
const sendError = require('../utils/sendErrorResponse');

//Inicializa middleware
module.exports = function(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken !== undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET);

            if (decoded.role === 1) {
                return next();
            } else {
                return sendError(res, 403, 'Usuário sem permissão');
            }

        } catch (error) {
            return sendError(res, 401, 'Token inválido');
        }

    } else {
        return sendError(res, 401, 'Usuário não autenticado');
    }
};
