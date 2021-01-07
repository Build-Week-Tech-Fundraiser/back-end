const bcryptjs = require('bcryptjs')

function genHash(string) {
  const rounds = process.env.BCRYPT_ROUNDS || 10
  const hash = bcryptjs.hashSync(string, rounds)
  return hash
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'Jxiong', password:genHash('bar'), firstname:'Johnny', lastname:'Xiong'},
        {username:'Koko', password:genHash('bar'), firstname:'Coco', lastname:'Kir'},
        {username:'Aki', password:genHash('bar'), firstname:'Aki', lastname:'Rose'},
        {username:'ZeeroDegree', password:genHash('bar'), firstname:'Peng', lastname:'Chang'},
        {username:'Doro', password:genHash('bar'), firstname:'Donny', lastname:'Don'}
      ]);
    });
};
