import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const db = knex.default(config)

export async function getAllLocations(): Promise<Location[]> {
  try {
    return db('locations').select()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}
  
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

export async function getLocationById(id:number): Promise<Location>  {
  try {
    return db('locations')
      .where('locations.id', id)
      .first()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function updateLocation(updatedLocation:Location): Promise<number>  {
  try {
    return db('locations')
      .returning(['id', 'name', 'description'])
      .update({...updatedLocation})
      .where('id', updatedLocation.id)
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}
