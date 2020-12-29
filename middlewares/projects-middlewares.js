const db = require('../data/dbConfig')

const checkFunderDupes = async (req, res, next) => {
    try {
        const { id, userid } = req.params
        const funderTable = await db('project_funders')
        console.log(funderTable)
        const checkArray = funderTable.filter(funder => {
            if(funder.user_id === parseInt(userid) && funder.project_id === parseInt(id)) {
                return funder.id
            }
        })
        console.log(checkArray, 'dupe if any')
        if (checkArray.length > 0){
            res.status(400).json({message:`user is already funding current project`})
        } else {
            next()
        }
    } catch(err) {
        res.status(500).json(err.message)
    }

}

const checkFunderExists = async (req, res, next) => {
    console.log(`checking if funder exists`)
    try {
        const { id, userid } = req.params
        const funder = await db('project_funders as pf')
        .where({user_id:userid, project_id:id})
        if (funder.length === 0){
            res.status(400).json({message:`current user ${userid} is not funding project ${id}`})
        } else {
            next()
        }
    } catch(err) {
        res.status(500).json(err.message)
    }
}

module.exports = {
    checkFunderDupes,
    checkFunderExists
}