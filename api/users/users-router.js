const router = require('express').Router()
const Users = require('./users-model')
const { hasValues, hasUserPass, userIsValid } = require('../../middlewares/users-middlewares')

router.get('/:username', hasValues, async (req, res) => {
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