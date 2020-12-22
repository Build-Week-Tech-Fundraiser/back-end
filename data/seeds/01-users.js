
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'Jxiong', password:'bar', firstname:'Johnny', lastname:'Xiong'},
        {username:'Koko', password:'bar', firstname:'Coco', lastname:'Kir'},
        {username:'Aki', password:'bar', firstname:'Aki', lastname:'Rose'},
        {username:'ZeeroDegree', password:'bar', firstname:'Peng', lastname:'Chang'},
        {username:'Doro', password:'bar', firstname:'Donny', lastname:'Don'}
      ]);
    });
};
