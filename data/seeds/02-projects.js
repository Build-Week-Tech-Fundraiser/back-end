
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {title:'AAA', host:1, description:'ah1'},
        {title:'AAA', host:1, description:'ah2'},
        {title:'AAA', host:2, description:'ah3'},
        {title:'AAA', host:2, description:'ah4'},
        {title:'AAA', host:4, description:'ah5'},
        {title:'AAA', host:3, description:'ah6'},
        {title:'AAA', host:5, description:'ah7'},
        {title:'AAA', host:2, description:'ah8'},
        {title:'AAA', host:3, description:'ah9'},
        {title:'AAA', host:4, description:'ah10'},
        {title:'AAA', host:5, description:'ah11'},
        {title:'AAA', host:5, description:'ah12'},
        {title:'AAA', host:4, description:'ah13'},
        {title:'AAA', host:3, description:'ah14'},
        {title:'AAA', host:2, description:'ah15'}
      ]);
    });
};
