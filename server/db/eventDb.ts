/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Event, EventData, EventWithLocation } from '../../models/Event.js'

import db from './connection.js'
  
export async function getEventsByDay(day:string): Promise<EventWithLocation[]>  {
  try {
    return db('events')
      .join('locations', 'locations.id', 'events.location_id')
      .select(
        'events.id as id',
        'day',
        'time',
        'events.name as eventName',
        'events.description',
        'locations.name as locationName'
      )
      .where('events.day', day)
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function addNewEvent(eventData:EventData): Promise<number>  {
  try {
    return db('events')
      .insert({
        location_id: eventData.locationId,
        day: eventData.day,
        time: eventData.time,
        name: eventData.name,
        description: eventData.description
      })
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function deleteEvent(id: number): Promise<number> {
  try {
    return db('events').where('id', id).del()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function getEventById(id:number): Promise<Event>  {
  try {
    return db('events')
      .select(
        'id',
        'day',
        'time',
        'name',
        'description',
        'location_id as locationId'
      )
      .where('id', id)
      .first()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}