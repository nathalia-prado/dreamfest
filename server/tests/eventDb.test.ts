import * as db from '../db/eventDb.js'
import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest'
import connection from '../db/connection.js'

beforeAll(() => {
    return connection.migrate.latest()
})

beforeEach(() => {
    return connection.seed.run()
})

describe('deleteEvent', () => {
    it('test deleting a single event', async () => {
        let existingEvent = await db.getEventById(1)
        // Check if the event exist
        expect(existingEvent.id).toBe(1)
        // Delete the event
        await db.deleteEvent(1)
        // Check if the event was removed i.e. the returned value should be undefined
        existingEvent = await db.getEventById(1)
        expect(existingEvent).toBeUndefined()
    })
})

describe('getEventById', () => {
    it('test get a single event by id', async () => {
        const existingEvent = await db.getEventById(1)
        expect(existingEvent.name).toBe("Slushie Apocalypse I")
    })
})

describe('addNewEvent', () => {
    it('test adding a new event', async () => {
        const newEvent = {
            locationId: 1,
            day: 'friday',
            time: '6pm - 7pm',
            name: 'Add Event Test',
            description: 'This event is a test',
        }

        await db.addNewEvent(newEvent)
        // check if the test was added
        const fridayEvents = await db.getEventsByDay('friday')
        const eventFound = fridayEvents.find(event => event.description === 'This event is a test')
        // Check if the event exist
        expect(eventFound?.eventName).toBe('Add Event Test')
    })
})

afterAll(() => {
  connection.destroy()
})