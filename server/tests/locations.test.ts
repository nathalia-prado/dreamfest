import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from '../server.js'
import * as db from '../db/locationDb.ts'

vi.mock('../db/locationDb.js')

describe('the locations route', () => {
  it('lists all the locations', async () => {
    vi.mocked(db.getAllLocations).mockImplementation(async () => {
      return [
        {
          id: 1,
          name: 'Yella Yurt',
          description: "It's a freakin' yurt! Get in here!"
        }
      ]
    })

    const res = await request(server).get('/locations')
    expect(res.statusCode).toBe(200)
    expect(db.getAllLocations).toHaveBeenCalled()

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('li')).toMatchInlineSnapshot(`
      HTMLCollection [
        <li
          class="card"
        >
          
          
          <div
            class="location"
          >
            
            
            <span
              class="title"
            >
              Yella Yurt
            </span>
            
            
            <p
              class="data"
            >
              It's a freakin' yurt! Get in here!
            </p>
            
            
            <a
              href="/locations/1/edit"
            >
              edit location
            </a>
            
          
          </div>
          
        
        </li>,
      ]
    `)
  })
})

describe('the edit location route', () => {
  it('edit specific location', async () => {
    vi.mocked(db.getLocationById).mockImplementation(async () => {
      return { id: 1, name: 'TangleStage a', description: 'Teting now 3' }
    })

    const res = await request(server).get('/locations/1/edit')
    expect(res.statusCode).toBe(200)
    expect(db.getLocationById).toHaveBeenCalledWith(1)

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('h2')).toMatchInlineSnapshot(`
      HTMLCollection [
        <h2>
          edit location: 
          <span
            class="data"
          >
            TangleStage a
          </span>
        </h2>,
      ]
    `)
  })
})