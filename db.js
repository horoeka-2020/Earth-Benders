const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getWombles,
  getWombleById,
  getRubbish,
  getTasks,
  newWomble,
  getCharacteristics,
  deleteWomble,
  updateWomble
}

function getWombles (db = database) {
  return db('wombles').select()
}

function getWombleById (id, db = database) {
//   console.log(id)
  return db('wombles')
    .join('characteristics', 'wombles.characteristic_id', 'characteristics.id')
    .where('wombles.id', id)
    .select('wombles.id as wombleId', 'characteristics.id as characteristicsId', 'name', 'description')
    .then(result => ({
      id: result[0].wombleId,
      name: result[0].name,
      description: result[0].description,
      characteristics: result.filter(characteristic => ({
        description: characteristic.description
      }))
    }))
}

function getRubbish (db = database) {
  return db('rubbish').select()
}

function getCharacteristics (db = database) {
  return db('characteristics').select()
}

function getTasks (db = database) {
  //   console.log(id)
  return db('wombles')
    .join('rubbish', 'wombles.rubbish_id', 'rubbish.id')
    // .where('wombles.rubbish_id', 'rubbish.id')
    .select('wombles.id as wombleId', 'rubbish.id as rubbishId', 'wombles.name as wombleName', 'rubbish.name as rubbishName')
    .then(result => {
      return {
        wombles: result
      }
    })
}

// Create function to add new Womble
function newWomble (newWomble, db = database) {
  return db('wombles')
    .insert(newWomble)
}

function deleteWomble (id, db = database) {
  // console.log(id)
  return db('wombles')
    .where('wombles.id', id)
    .delete()
}

function updateWomble (id, db = database) {
  // console.log(id)
  return db('wombles')
    .where('wombles.id', id)
    .delete()
}
