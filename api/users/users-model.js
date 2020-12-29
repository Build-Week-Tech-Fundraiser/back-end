const db = require('../../data/dbConfig')

module.exports = {
    async register(user) {
        try {
            const [id] = await db('users').insert(user, 'id')
            return db('users').where({id}).first()
        } catch (err) {
            return {
                message:`Username Taken`,
                error: err.message
            }
        }
    },
    userByUsername(username){
        return db('users')
        .select('id')
        .select('username')
        .select('firstname')
        .select('lastname')
        .where({'username': username}).first()
    },
    findBy(filter) {
        return db('users').where(filter).first()
    }
}