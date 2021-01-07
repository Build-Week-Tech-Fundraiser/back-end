const request = require('supertest')
const express = require('express')

const router = require('./users-router')
const db = require('../../data/dbConfig')

const user1 = { username: 'testUser', password:'abc123', firstname:'test', lastname:'user'}
const user2 = { username: 'testUser2', password:'abc1234', firstname:'test2', lastname:'user2'}

const server = express()

server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use('/', router)

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

describe.skip('endpoints for /api/users', () => {
    describe('[POST] /register', () => {
        it('reponds with 201 on success', async () => {
            const res = await request(server).post('/register').send(user1)
            expect(res.status).toBe(201)
        })
        it('returns a newly created user on success', async () => {
            const res = await request(server).post('/register').send(user1)
            expect(res.body).toHaveProperty('username', user1.username)
            expect(res.body).toHaveProperty('firstname', user1.firstname)
            expect(res.body).toHaveProperty('lastname', user1.lastname)
        })
        it('hashes password on success', async () => {
            const res = await request(server).post('/register').send(user1)
            expect(res.body.password).not.toHaveProperty('password', user1.password)
        })
        it('returns token on success', async () => {
            const res = await request(server).post('/register').send(user1)
            expect(res.body).toHaveProperty('token')
        })
        it('responds with 400 on error', async () => {
            await db('users').insert(user1)
            const res = await request(server).post('/register').send(user1)
            expect(res.status).toBe(400)
        })
        it('responds with message on error', async () => {
            await db('users').insert(user1)
            const res = await request(server).post('/register').send(user1)
            expect(res.body).toHaveProperty('message')
        })
    })
    describe('[POST] /login', () => {
        it('responds with 200 on success', async () => {
            await request(server).post('/register').send(user1)
            const res = await request(server).post('/login').send(user1)
            expect(res.status).toBe(200)
        })
        it('returns object with message and token on success', async () => {
            await request(server).post('/register').send(user1)
            const res = await request(server).post('/login').send(user1)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('message')
        })
        it("returns error if missing login info", async () => {
            await request(server).post('/register').send(user1)
            const res = await request(server).post('/login').send({username:'testuser', password:'abc1234'})
            expect(JSON.stringify(res.body)).toMatch(/invalid/)

        })
    })
    describe('[GET] /all', () => {
        it('returns message if no token is in header', async () => {
            const res = await request(server).get('/all')
            expect(res.body).toHaveProperty('message')
        })
        it('returns array of existing users', async () => {
            const user = await request(server).post('/register').send(user1)
            let res = await request(server).get('/all').set({Authorization:user.body.token})
            expect(res.body).toHaveLength(1)
            await db('users').insert(user2)
            res = await request(server).get('/all').set({Authorization:user.body.token})
            expect(res.body).toHaveLength(2)
            expect(res.body[0]).toHaveProperty('username', user1.username)
            expect(res.body[1]).toHaveProperty('username', user2.username)
        })
    })
    describe('[GET] /:username', () => {
        it('returns messge if no token is in header', async () => {
            const res = await request(server).get('/testUser')
            expect(res.body).toHaveProperty('message')
        })
        it('returns user object with id, username, firstname, lastname', async () => {
            const user = await request(server).post('/register').send(user1)
            let res = await request(server).get('/testUser').set({Authorization:user.body.token})
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('firstname')
            expect(res.body).toHaveProperty('lastname')
        })
        it('returns message if user does not exist', async () => {
            const user = await request(server).post('/register').send(user1)
            let res = await request(server).get('/tetUser').set({Authorization:user.body.token})
            expect(res.body).toHaveProperty('message')
        })
    })
})