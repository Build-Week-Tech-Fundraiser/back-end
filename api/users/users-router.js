const router = require('express').Router()
const Users = require('./users-model')

router.get('/:username', async (req, res) => {
    try {
        
    } catch(err) {
        res.status(500).json({message:`Error with something along /username path`})
    }
})
router.post('/register', async (req, res) => {
    try {

    } catch(err) {
        res.status(500).json({message:`Error with something along /register path`})
    }
})
router.post('/login', async (req, res) => {
    try {

    } catch(err) {
        res.status(500).json({message:`Error with something along /login path`})
    }
})

module.exports = router