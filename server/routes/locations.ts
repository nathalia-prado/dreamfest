import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
// TODO: Replace this with all of the locations in the database
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()
    const viewData = { locations }  
    res.render('showLocations', viewData)
  } catch (e) {
    next(e)
  }    
})

// GET /locations/4/edit
// TODO: Get the location based on its id and replace this viewData
router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const location = await db.getLocationById(id)
    res.render('editLocation', location)
  } catch (e) {
    next(e)
  } 
})

// POST /locations/edit
// ASSISTANCE: So you know what's being posted ;)
// const { id, name, description } = req.body

// TODO: Update the location in the database based on its id
router.post('/edit', async (req, res, next) => {
  try {
    await db.updateLocation(req.body)
  } catch (e) {
    next(e)
  }
  res.redirect('/locations')
})

export default router
