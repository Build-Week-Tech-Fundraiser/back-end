const router = require('express').Router()
const Users = require('./users-model')
const { hasValues, hasUserPass, userIsValid } = require('../../middlewares/users-middlewares')
const restrict = require('../../middlewares/restricted')

router.get('/:username', restrict, async (req, res) => {
    try {
        const user = await Users.userByUsername(req.params.username)
        if(!user) {
            res.status(400).json({message:`User doesn't exist`})
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({message:`Error with something along /username path`})
    }
})
router.post('/register', hasValues, async (req, res) => {
    try {
        const newUser = await Users.register(req.body)
        if(typeof newUser === 'string') {
            res.status(400).json(newUser)
          } else {
            res.status(201).json(newUser)
          }
    } catch(err) {
        res.status(500).json({message:`Error with something along /register path`})
    }
})
router.post('/login',hasUserPass, userIsValid, async (req, res) => {
    try {
        const { username, token } = req.body
        res.status(200).json({message:`Welcome ${username}`, token})
    } catch(err) {
        res.status(500).json({message:`Error with something along /login path`})
    }
})

module.exports = router