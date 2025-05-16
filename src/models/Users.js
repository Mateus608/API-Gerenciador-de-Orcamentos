//importar a conexao BD
const knex = require('../config/data')

class Users {

    //criar um metodo para buscar todos os usuarios do banco
    async findAll() {
        try {
            let users = await knex.select(["idusers", "usuario", "codigo"]).table('users')
            return { validated: true, values: users }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    //criar um metado para buscar um usuario especifico
    async findByCodigo(codigo) {
        try {
            let user = await knex.select(["idusers", "usuario", "codigo", "passwd", "tipo"]).where({ codigo: codigo }).table('users')
            return user.length > 0
                ? { validated: true, values: user }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async create(usuario, nome, passwd, codigo, tipo) {
        try {
            await knex.insert({
                usuario: usuario,
                nome: nome,
                password_hash: passwd,
                codigo: codigo,
                role_id: tipo
            }).table('users')

            return { validated: true }

        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async delete(id) {
        //varificar se o usuario existe
        let user = await this.findById(id)
        if (user.values != undefined) {
            //realizar a exclusão do usuário do banco
            try {
                await knex.delete().where({ id: id }).table('users')
                return { validated: true, message: "Usuário Excluido com Sucesso!" }

            } catch (error) {
                return { validated: false, error: error }
            }
        } else {
            return { validated: false, error: "Usuário não existente, portanto não pode ser alterado!" }
        }
    }

}

module.exports = new Users()