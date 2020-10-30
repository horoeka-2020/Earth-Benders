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
  // console.log('req.body:',req.body)
   console.log("/view/id:", id)
  Promise.all([db.getCityById(id), db.getLandmarks()])
    .then(tables => {
      // console.log(tables)
      const viewData = {
        city: tables[0],
        landmarkList: tables[1]
      }
      // console.log(JSON.stringify(womble))
      res.render('view', viewData)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})


router.get('/display/:id', (req, res) => {
  const id = req.params.id
  console.log('/display/id:', id)
  db.getLandmarkByID(id)
    .then(landmark => {
      const viewData = {
        landmark: landmark
      }
      // console.log(JSON.stringify(wombles))
      res.render('display', viewData)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
