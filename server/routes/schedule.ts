import express from 'express'

import { validateDay } from './helpers.ts'
import { getEventsByDay } from '../db/eventDb.ts'

const router = express.Router()

// Show events for a day
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await getEventsByDay(day)
    const viewData = { day: day, events: events }

    res.render('showDay', viewData)
  } catch (e) {
    next(e)
  }
})

export default router
