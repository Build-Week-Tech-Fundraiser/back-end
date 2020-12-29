const router = require('express').Router()
const Users = require('./users-model')
const { hasValues, hasUserPass, userIsValid } = require('../../middlewares/users-middlewares')
const restrict = require('../../middlewares/restricted')


router.post('/register', hasValues, async (req, res) => {
    try {
        console.log(req.body.password)
        const newUser = await Users.register(req.body)
        if(typeof newUser.message === 'string') {
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

router.get('/all', async (req, res) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
})
router.get('/:username', async (req, res) => {
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

module.exports = router