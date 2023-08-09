import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res, next) => {
  // TODO: Replace this with all of the locations in the database
  try {
    const locations = await db.getAllLocations()
    const viewData = { locations }  
    res.render('showLocations', viewData)
  } catch (e) {
    next(e)
  }    
})

// GET /locations/4/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData
  const viewData = {
    id: id,
    name: 'TangleStage',
    description:
      'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  }

  res.render('editLocation', viewData)
})

// POST /locations/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body

  // TODO: Update the location in the database based on its id

  res.redirect('/locations')
})

export default router
