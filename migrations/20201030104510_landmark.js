
exports.up = (knex) => {
  //id, image, description, cost, city_id
  return knex.schema.createTable('landmark', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.string('ticket_link')
    table.string('image')
    table.integer('city_id').references('city.id')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('landmark')
  
}
