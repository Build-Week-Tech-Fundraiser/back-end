const router = require('express').Router()
const Projects = require('./projects-model')

router.get('/', async (req, res) => {
    console.log('Looking for projects')
    try {
        const projects = await Projects.getAll()
        res.status(200).json(projects)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.get('/:id', async (req, res) => {
    console.log('looking for projects with project id')
    try {
        const project = await Projects.getById(req.params.id)
        if (typeof project === 'string') {
            res.status(400).json(project)
        } else {
            res.status(200).json(project)
        }
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.get('/user/:id', async (req, res) => {
    console.log('looking for projects with host id')
    try {
        const projects = await Projects.getAllByUserId(req.params.id)
        res.status(200).json(projects)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.post('/', async (req, res) => {
    console.log('creating new project')
    try {
        const newProject = await Projects.create(req.body)
        res.status(200).json(newProject)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})

module.exports = router