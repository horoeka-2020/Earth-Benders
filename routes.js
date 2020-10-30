const express = require('express')
// const { getCities, getCityById,  getLandmarks, getLandmarksByID } = require('./db.js')

const db = require('./db.js')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  Promise.all([db.getCities(), db.getLandmarks()])
    .then(tables => {
      const viewData = {
        cityList: tables[0],
        landmarkList: tables[1]
      }
      res.render('home', viewData)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/view/:id', (req, res) => {
  const id = req.params.id
  Promise.all([db.getCityById(id), db.getLandmarks()])
    .then(tables => {
      console.log(tables)
      const viewData = {
        city: tables[0],
        landmark: tables[1]
      }
      // console.log(JSON.stringify(womble))
      res.render('view', viewData)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

// router.get('/assignments', (req, res) => {
//   // console.log(JSON.stringify(db.getTasks()))
//   db.getTasks()
//     .then(wombles => {
//       const viewData = {
//         womblesList: wombles.wombles
//       }
//       // console.log(JSON.stringify(wombles))
//       res.render('assignments', viewData)
//     })
//     .catch(err => {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })

// router.post('/new', (req, res) => {
//   const { name, rubbish_id, characteristic_id, date_of_birth, age } = req.body
//   const newWomble = { name, rubbish_id, characteristic_id, date_of_birth, age }
//   return db.newWomble(newWomble)
//     .then(() => {
//       res.redirect('/')
//       return null
//     })
//     .catch(err => {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })

// router.post('/view/:id', (req, res) => {
//   const deleteId = req.params.id // 88813

//   db.deleteWomble(deleteId)
//     .then(() => {
//       res.redirect('/')
//       return null
//     })
//     .catch(err => {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })

module.exports = router
