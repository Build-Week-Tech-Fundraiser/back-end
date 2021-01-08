
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project_funders').del()
    .then(function () {
      // Inserts seed entries
      return knex('project_funders').insert([
        {user_id:2, project_id:1},
        {user_id:1, project_id:3},
        {user_id:5, project_id:2},
        {user_id:4, project_id:3},
        {user_id:3, project_id:1}
      ]);
    });
};
