const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getCities,
  getCityById,
  getLandmarks,
  getLandmarkByID //,
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

function getLandmarkByID (id, db = database) {
     console.log(id)
    return db('landmark')
      .join('city', 'landmark.city_id', 'city.id')
      .where('landmark.id', id)
      .select('landmark.id as landmarkId', 'city.id as cityId', 'city.name as cityName', 'landmark.name as landmarkName','landmark.description as landmarkDescription', 'landmark.image as landmarkImage')
      .then(result => ({
        id: result[0].landmarkId,
        name: result[0].cityName,
        landmarkName: result[0].landmarkName,
        description: result[0].landmarkDescription,
        image: result[0].landmarkImage
      }))
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
