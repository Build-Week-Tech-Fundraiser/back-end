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
        it('returns a specific project using id', async () => {
            const res = await request(server).get('/1')
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('host')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('funders')
        })
        it('returns "No Project Found" if there is no match', async () => {
            const res = await request(server).get('/77')
            expect(res.body).toMatch(/No Project/)
        })
    })
    describe('[GET] /user/:id', () => {
        it('returns an array of project objects related to the user id', async () => {
            const res = await request(server).get('/user/1')
            expect(res.body.length).toBeGreaterThan(0)
        })
        it('returns objects that have id, title, host, description, funders', async () => {
            const res = await request(server).get('/user/1')
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
    describe('[POST] /', () => {
        it('creates a new project in the project table', async () => {
            await request(server).post('/').send({title:'abc', host:1, description:'hello'})
            const data = await db('projects')
            const last = data.length - 1
            expect(data[last]).toHaveProperty('title', 'abc')
        })
        it('returns an object that has id, title, host, description, funders', async () => {
            const res = await request(server).post('/').send({title:'abc', host:1, description:'hello'})
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('host')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('funders')
        })
    })
    describe('[PUT] /:id', () => {
        it('returns updated project', async () => {
            const [id] = await db('projects').insert({title:'abc', host:1, description:'hello'}, 'id')
            const res = await request(server).put(`/${id}`).send({title:'5322', description:'yellow'})
            expect(res.body).toHaveProperty('title', '5322')
            expect(res.body).toHaveProperty('description', "yellow")
        })
    })
    describe('[DELETE] /:id', () => {
        it('returns 1 if project is deleted', async () => {
            const res = await request(server).delete('/1')
            expect(res.body).toBe(1)
        })
        it('returns 0 if project is not deleted', async () => {
            const res = await request(server).delete('/999')
            expect(res.body).toBe(0)
        })
    })
    describe('[POST] /:id/fund/:userid', () => {
        it('returns project with funder on success', async () => {
            const res = await request(server).post('/2/fund/2')
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('host')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('funders')
            expect(res.body.funders.length).toBeGreaterThan(0)
        })
        it('returns a message if user is already funding project', async () => {
            await request(server).post('/2/fund/2')
            const res = await request(server).post('/2/fund/2')
            expect(res.body).toHaveProperty('message')
        })
    })
    describe('[DELETE] /:id/fund/:userid', () => {
        it('returns message if project has not been funded', async () => {
            const res = await request(server).delete('/2/fund/2')
            expect(res.body).toHaveProperty('message')
        })
        it('returns project with deleted funder if successful', async () => {
            let res = await request(server).post('/2/fund/2')
            expect(res.body.funders[0]).toHaveProperty('username')
            res = await request(server).delete('/2/fund/2')
            expect(res.body.funders[0]).toBeUndefined()
        })
    })
})