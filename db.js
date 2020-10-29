const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getCities,
  getCityById,
  getLandmarks,
  getLandmarksByID //,
  // newWomble,
  // getCharacteristics,
  // updateWomble
}

function getCities (db = database) {
  return db('city').select()
}

function getCityById (id, db = database) {
//   console.log(id)
  return db('city')
    // .join('characteristics', 'wombles.characteristic_id', 'characteristics.id')
    .where('city.id', id)
    .select('city.id as cityId', 'city.name as cityName')
    .then(result => ({
      id: result[0].cityId,
      name: result[0].cityName,
    }))
}

function getLandmarks (db = database) {
  return db('landmark').select()
}

function getCharacteristics (db = database) {
  return db('characteristics').select()
}

function getLandmarksByID (db = database) {
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
