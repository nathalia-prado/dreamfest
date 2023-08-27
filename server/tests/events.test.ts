import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from '../server.js'
import * as db from '../db/eventDb.ts'
import { getAllLocationsForDropdown } from '../db/locationDb.ts'

vi.mock('../db/eventDb.js')
vi.mock('../db/locationDb.js')

describe('the edit event route', () => {
  it('edit specific event', async () => {
    vi.mocked(db.getEventById).mockImplementation(async () => {
      return {
        id: 3,
        day: 'saturday',
        time: '2pm - 3pm',
        name: 'Sandwich Eating Contest',
        description: 'This event will be taking place at the TangleStage. Make sure you eat lunch before watching this amazing display!',
        locationId: 1
      }
    })

    vi.mocked(getAllLocationsForDropdown).mockImplementation(async () => {
      return [
        { id: 1, name: 'TangleStage a' },
        { id: 2, name: 'Yella Yurt' }
      ]
    })

    const res = await request(server).get('/events/3/edit')
    expect(res.statusCode).toBe(200)
    expect(db.getEventById).toHaveBeenCalledWith(3)
    expect(getAllLocationsForDropdown).toHaveBeenCalled()

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('h2')).toMatchInlineSnapshot(`
      HTMLCollection [
        <h2>
          edit event: 
          <span
            class="data"
          >
            Sandwich Eating Contest
          </span>
        </h2>,
      ]
    `)
  })
})