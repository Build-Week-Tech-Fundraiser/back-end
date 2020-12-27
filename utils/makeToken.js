const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secret')

function makeToken(user) {
    const payload ={
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '24h',
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = makeToken;