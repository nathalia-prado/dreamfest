import express from 'express'

import { getAllLocations, getLocationById, updateLocation } from '../db/locationDb.ts'

const router = express.Router()

// Show all locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await getAllLocations()
    const viewData = { locations }  
    res.render('showLocations', viewData)
  } catch (e) {
    next(e)
  }    
})

// Render edit location page
router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const location = await getLocationById(id)
    res.render('editLocation', location)
  } catch (e) {
    next(e)
  } 
})

// Submit the edited location
router.post('/edit', async (req, res, next) => {
  try {
    await updateLocation(req.body)
  } catch (e) {
    next(e)
  }
  res.redirect('/locations')
})

export default router
