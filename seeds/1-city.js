
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('city').del()
    .then(function () {
      // Inserts seed entries
      return knex('city').insert([
        {id: 0, name: 'Auckland'},
        {id: 1, name: 'Wellington'},
        {id: 2, name: 'Queenstown'}, 
        {id: 3, name: 'Christchurch'}

      ]);
    });
};
