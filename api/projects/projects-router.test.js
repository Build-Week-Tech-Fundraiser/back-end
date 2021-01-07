const request = require('supertest')
const express = require('express')

const router = require('./projects-router')
const db = require('../../data/dbConfig')
const makeToken = require('../../utils/makeToken')

const server = express()

server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use('/', router)

const token = makeToken({id:999, username:'token'})

beforeAll( async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach( async () => {
    await db.seed.run()
})
afterEach( async () => {
    await db('projects').truncate()
    await db('project_funders').truncate()
    await db('users').truncate()
})
afterAll( async () => {
    await db.destroy()
})

describe('Endpoints for /api/projects', () => {
    describe('[GET] / ', () => {
        it('returns all existing projects', async () => {
            const res = await request(server).get('/')
            expect(res.body.length).toBeGreaterThan(0)
        })
        it('returns objects that have id, title, host, description, funders', async () => {
            const res = await request(server).get('/')
            expect(res.body[0]).toHaveProperty('id')
            expect(res.body[0]).toHaveProperty('title')
            expect(res.body[0]).toHaveProperty('host')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('funders')
            expect(res.body[1]).toHaveProperty('id')
            expect(res.body[1]).toHaveProperty('title')
            expect(res.body[1]).toHaveProperty('host')
            expect(res.body[1]).toHaveProperty('description')
            expect(res.body[1]).toHaveProperty('funders')
        })
    })
    describe('[GET] /:id', () => {
        it('resturns all existing projects for specific id', async () => {
            
        })
    })
})