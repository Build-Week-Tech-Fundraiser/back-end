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
        it('User.register, registers a new user on db', async () => {
            const initialUsers = await db('users')
            expect(initialUsers).toHaveLength(0)
            await Users.register(user1)
            const users = await db('users')
            expect(users).toBeDefined()
            expect(users).toHaveLength(1)
            expect(users[0]).toMatchObject(user1)
        })
        it('User.register, returns registered user, and id upon success', async () => {
            const results = await Users.register(user2)
            expect(results).toMatchObject(user2)
            expect(results).toHaveProperty('id')
        })
        it('User.register, returns "Username Taken" message upon failure', async () => {
            await Users.register(user1)
            const results = await Users.register(user1)
            expect(results.message).toMatch(/Username Taken/)
        })
    })
    describe('Users.usersByUsername', () => {
        it('Users.userByUsername, returns undefined if not found', async () => {
            const results = await Users.userByUsername(user1.username)
            expect(results).toBeUndefined()
        })
        it('Users.userByUsername, returns user object without password if found', async () => {
            await db('users').insert(user1)
            const results = await Users.userByUsername(user1.username)
            expect(results).toHaveProperty('username')
            expect(results).toHaveProperty('firstname')
            expect(results).toHaveProperty('lastname')
            expect(results).not.toHaveProperty('password')
        })
    })
    describe('Users.findAll', () => {
        it('Users.findAll, returns empty array if no users exist', async () => {
            const results = await Users.findAll()
            expect(results).toHaveLength(0)
        })
        it('Users.findAll, retuns array of users object with id,username,firstname,lastname', async () => {
            await db('users').insert(user1)
            await db('users').insert(user2)
            const results = await Users.findAll()
            expect(results).toHaveLength(2)
            expect(results[0]).toHaveProperty('username', user1.username)
            expect(results[0]).toHaveProperty('firstname', user1.firstname)
            expect(results[0]).toHaveProperty('lastname', user1.lastname)
            expect(results[0]).toHaveProperty('id')
            expect(results[1]).toHaveProperty('username', user2.username)
            expect(results[1]).toHaveProperty('firstname', user2.firstname)
            expect(results[1]).toHaveProperty('lastname', user2.lastname)
            expect(results[1]).toHaveProperty('id')

        })
    })
})