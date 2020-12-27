const db = require('../../data/dbConfig')
const knex = require('knex')

const organizeProjectsArray = (res) => {
    {
        const newProjects = res.map(project => {
            const hostArray = project.host.split(',')
            const hostObject = {
                id:parseInt(hostArray[0]),
                username:hostArray[1],
                firstname:hostArray[2],
                lastname:hostArray[3]
            }
            let userArray = []
            if(project.funders) {
                const masterArray = project.funders.split(' - ')
                userArray = masterArray.map(user => {
                    const userArray = user.split(',')
                    return {
                        id:parseInt(userArray[0]),
                        username:userArray[1],
                        firstname:userArray[2],
                        lastname:userArray[3],
                    }
                })
            } else {
                userArray = []
            }
            return {
                ...project,
                host:{...hostObject},
                funders:[...userArray]
            }
        })
        return newProjects
    }
}

module.exports = {
    getAll(){
        return db('projects as p')
        .leftJoin('project_funders as pf', 'p.id', 'pf.project_id')
        .leftJoin('users as u', 'p.host', 'u.id')
        .leftJoin('users as uf', 'pf.user_id', 'uf.id')
        .select([
            'p.id',
            'p.title',
            knex.raw('(u.id || "," || u.username || "," || u.firstname || "," || u.lastname) as host'),
            'p.description',
            knex.raw('group_concat(uf.id || "," || uf.username || "," || uf.firstname || "," || uf.lastname, " - ") as funders')
        ])
        .groupBy('p.id')
        .then(res => {
            return organizeProjectsArray(res)
        })
        .catch(err => {
            console.log(err.message)
        })
    },
    getById(id){

    },
    getByUserId(userId){

    },
    create(project){

    },
    update(id, updates){

    },
    delete(id) {

    },
    
}

// .select('p.id')
// .select('p.title')
// .select('u.firstname as host')
// .select( knex.raw('array_agg(uf.username) as funders'))

/// selects all projects and returns funder's userid

// select
//     p.id,
//     p.title,
//     u.firstname hostname,
//     group_concat(pf.user_id) as funders
// from projects p
// left join project_funders pf
//     on pf.project_id = p.id
// left join users u
//     on p.host = u.id
// group by p.id

// selects a single person
// select
    // p.id,
    // p.title,
    // u.firstname host,
    // group_concat(pf.user_id) as funders
// from projects p
// join project_funders pf
//     on p.id = pf.project_id
// join users u
//     on p.host = u.id
// where p.host = 1


/// selects all projects returns funder names
// select
//     p.id,
//     p.title,
//     u.firstname host,
//     group_concat(fu.username) as funders
// from projects p
// left join project_funders pf
//     on p.id = pf.project_id
// left join users u
//     on p.host = u.id
// left join users fu
//     on pf.user_id = fu.id
// group by p.id