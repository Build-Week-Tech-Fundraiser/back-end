
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // resets ids
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], // don't empty migration tables
  });
};


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