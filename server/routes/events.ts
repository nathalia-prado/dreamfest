import express from 'express'

import { eventDays, capitalise, validateDay } from './helpers.ts'
import { addNewEvent, deleteEvent, getEventById } from '../db/eventDb.ts'
import { getAllLocationsForDropdown } from '../db/locationDb.ts'
import type { EventData } from '../../models/Event.ts'

const router = express.Router()
export default router

// Render add event page to a specific day
router.get('/add/:day', async (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : '',
  }))
  const locations = await getAllLocationsForDropdown()
  const viewData = { locations, days, day }
  res.render('addEvent', viewData)
})

// Add event route
router.post('/add', async (req, res) => {
  const { name, description, time, locationId } = req.body
  const day = validateDay(req.body.day)

  const newEvent = {
    name,
    locationId,
    day,
    time,
    description
  }

  await addNewEvent(<EventData>(newEvent))

  res.redirect(`/schedule/${day}`)
})

// Remove event route
router.post('/delete', async (req, res) => {
  const id = Number(req.body.id)
  await deleteEvent(id)

  const day = validateDay(req.body.day)

  res.redirect(`/schedule/${day}`)
})

// Render edit event page
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  const event = await getEventById(id)

  const locationsData = await getAllLocationsForDropdown()
  const locations = locationsData.map((location) => ({...location, selected: event && event.locationId == location.id ? 'selected' : ''}))

  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === event.day ? 'selected' : '',
  }))

  const viewData = { event, locations, days }
  res.render('editEvent', viewData)
})

// TODO: STRETCH
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { name, description, time } = req.body
  // const id = Number(req.body.id)
  // const day = validateDay(req.body.day)
  // const locationId = Number(req.body.locationId)

  // TODO: Update the event in the database using the identifiers created above

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})
