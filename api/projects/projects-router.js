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

module.exports = router