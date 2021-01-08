
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {title:'Rando Project', host:1, description:'ah1'},
        {title:'Another Project', host:1, description:'ah2'},
        {title:'Host 2 Project', host:2, description:'ah3'},
        {title:'Fourth Proj', host:2, description:'ah4'},
        {title:'Filler Proj', host:4, description:'ah5'},
        {title:'Host 3 proj', host:3, description:'ah6'},
        {title:'AAA', host:5, description:'ah7'},
      ]);
    });
};
