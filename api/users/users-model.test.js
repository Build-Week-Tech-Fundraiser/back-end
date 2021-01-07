const Users = require('./users-model')
const db = require('../../data/dbConfig')

const user1 = { username: 'testUser', password:'abc123', firstname:'test', lastname:'user'}
const user2 = { username: 'testUser2', password:'abc1234', firstname:'test2', lastname:'user2'}

beforeAll( async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach( async () => {
    await db('users').truncate()
})
afterAll( async () => {
    await db.destroy()
})

describe('User-model', () => {
    describe('Users.register', () => {
        it('User.register, registers a new user on db', () => {
            
        })
    })
})