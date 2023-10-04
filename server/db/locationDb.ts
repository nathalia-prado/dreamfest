/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Location, LocationMin } from '../../models/Location.js'

import db from './connection.js'

export async function getAllLocations(): Promise<Location[]> {
  try {
    return db('locations').select()
  } catch (err: any) {
    console.log(err.message)
    return err.message
  }
}

export async function getAllLocationsForDropdown(): Promise<LocationMin[]> {
  try {
    return db('locations').select('id', 'name')
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
