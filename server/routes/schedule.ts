import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET /schedule/friday

// TODO: Replace the hard-coded `events` array in the viewData with a set of events from the
// database. Do this by selecting events that have a "day" field matching the `day` route parameter.
// Continue to supply the `day` as a property of the viewData, alongside the array of events.

router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await db.getEventsByDay(day)
    const viewData = { day: day, events: events }

    res.render('showDay', viewData)
  } catch (e) {
    next(e)
  }
})

export default router
