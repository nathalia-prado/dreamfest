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
  
export async function getEventsByDay(day:string): Promise<Event[]>  {
  try {
    return db('events')
      .join('locations', 'events.location_id', 'locations.id')
      .where('events.day', day)
      .select()
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



  // TODO: use knex to get the real location data from the database


// TODO: write some more database functions
