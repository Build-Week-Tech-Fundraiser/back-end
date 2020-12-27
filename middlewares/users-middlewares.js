const bcryptjs = require('bcryptjs')
const Users = require('../api/users/users-model')
const makeToken = require('../utils/makeToken')

const hasValues = (req, res, next) => {
    if(!req.body) {
        res.status(400).json({message:`missing body`})
    } else if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname) {
        res.status(400).json(`username, password, firstname, and lastname requried`)
    } else {
        const rounds = process.env.BCRYPT_ROUNDS || 10
        const hash = bcryptjs.hashSync(req.body.password, rounds)
        req.body.password = hash
        next()
    }
}

const hasUserPass = (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(400).json(`username and password required`)
    } else {
        next()
    }
}

const userIsValid = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const credentials = await Users.findBy({username: username})
        if(credentials && bcryptjs.compareSync(password, credentials.password)) {
            req.body.token = makeToken(credentials);
            next()
        } else {
            res.status(401).json(`invalid credentials`)
        }
    } catch(err) {
        res.status(500).json({message:err.message})
    }
}

module.exports = {
    hasValues,
    userIsValid,
    hasUserPass
}