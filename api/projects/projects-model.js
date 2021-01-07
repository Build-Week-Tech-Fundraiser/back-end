const db = require('../../data/dbConfig')
// left joins all tables and the user table twice once as user and again as funders
const grabProjects = () => {
    return db('projects as p')
        .leftJoin('project_funders as pf', 'p.id', 'pf.project_id')
        .leftJoin('users as u', 'p.host', 'u.id')
        .leftJoin('users as uf', 'pf.user_id', 'uf.id')
        .select([
            'p.id',
            'p.title',
            db.raw('(u.id || "," || u.username || "," || u.firstname || "," || u.lastname) as host'),
            'p.description',
            db.raw('group_concat(uf.id || "," || uf.username || "," || uf.firstname || "," || uf.lastname, " - ") as funders')
        ])
        .groupBy('p.id')
}
// goes into each object and converts the hosts to objects and funders to array of objects
const organizeProjectsArray = (res) => {
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
                funders:[...userArray.sort(function(a, b) {
                    return a.id - b.id
                })]
            }
        })
        return newProjects
}
// checks for duplicates and deletes all except the latest one
const deleteDuplicates = async (res, projectId) => {
    try {
        const table = await db('project_funders')
        const checker = await db('project_funders').where('id', res).first()
        const checkArray = table.map(funder=> {
            if(funder.user_id === checker.user_id && funder.project_id === checker.project_id){
                return funder.id
            } else {
                return 0
            }
        })
        checkArray.forEach(async (entry) => {
            if(entry !== 0 && entry !== checker.id) {
                await db('project_funders').where('id', entry).delete()
            }
        })
        return grabProjects().where('p.id', projectId)
    } catch(err) {
        return err.message
    }

}

module.exports = {
    getAll(){
        return grabProjects()
        .then(res => {
            return organizeProjectsArray(res)
        })
        .catch(err => {
            console.log(err.message)
        })
    },
    getById(id){
        return grabProjects()
        .where('p.id', id)
        .then(res => {
            return organizeProjectsArray(res)
        })
        .then(res => {
            if (!res[0]) {
                return `No Project Found`
            } else {
                return res[0]
            }
        })
        .catch(err => {
            return err.message
        })
    },
    getAllByUserId(userId){
        return grabProjects()
        .where('p.host', userId)
        .then(res => {
            return organizeProjectsArray(res)
        })
        .then(res => {
            if (!res[0]) {
                return `No Project Found`
            } else {
                return res
            }
        })
        .catch(err => {
            return err.message
        })
    },
    async create(project){
        try {
            const [id] = await db('projects').insert(project, 'id')
            const data = await grabProjects().where('p.id', id)
            const newProject = await organizeProjectsArray(data)
            return newProject[0]
        } catch(err) {
            return err.message
        }
    },
    update(id, updates){
        return grabProjects()
        .where('p.id', id)
        .update({title:updates.title, description:updates.description})
        .then(res => {
            return grabProjects().where('p.id', id)
        })
        .then(res => {
            return organizeProjectsArray(res)
        })
        .then(res => {
            return res[0]
        })
        .catch(err => err.message)
    },
    delete(id) {
        return grabProjects().where('p.id', id).delete()
    },
    fundProject(projectId, userId){
        return db('project_funders')
        .insert({user_id:userId, project_id:projectId})
        .then(res => {
            return grabProjects().where('p.id', projectId)
        })
        .then(res => {
            return organizeProjectsArray(res)[0]
        })
        .catch(err => err.message)
    },
    async defundProject(projectId, userId){
        const res = await db('project_funders as pf')
            .where({ user_id: userId, project_id: projectId })
            .delete()
        return res
    }

}

// SQLite code for reference
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