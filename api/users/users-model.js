const db = require('../../data/dbConfig')

module.exports = {
    async register(user) {
        try {
            const [id] = await db('users').insert(user, 'id')
            return db('users').where({id}).first()
        } catch (err) {
            'username taken'
        }
    },
    userByUsername(username){
        return db('users').where({'username': username}).first()
    },
    findBy(filter) {
        return db('users').where(filter).first()
    }
}