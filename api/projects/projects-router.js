const router = require('express').Router()
const Projects = require('./projects-model')
const { checkFunderDupes, checkFunderExists } = require('../../middlewares/projects-middlewares')

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
        res.status(201).json(newProject)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.put('/:id', async (req, res) => {
    console.log('updating a project')
    try {
        const updatedProject = await Projects.update(req.params.id, req.body)
        res.status(201).json(updatedProject)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.delete('/:id', async (req, res) => {
    console.log('deleting a project')
    try{
        const deletedProject = await Projects.delete(req.params.id)
        res.json(deletedProject)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.post('/:id/fund/:userid', checkFunderDupes, async (req, res) => {
    console.log('funding a project')
    try {
        const { id, userid } = req.params
        const fund = await Projects.fundProject(id, userid)
        res.status(201).json(fund)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.delete('/:id/fund/:userid', checkFunderExists, async (req, res) => {
    console.log('defunding a project')
    try {
        const { id, userid } = req.params
        const defund = await Projects.defundProject(id, userid)
        res.json(defund)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})

module.exports = router