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

describe('endpoints for /api/users', () => {
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
    })
})