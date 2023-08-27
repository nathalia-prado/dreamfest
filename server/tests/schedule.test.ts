import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from '../server.js'
import * as db from '../db/eventDb.js'

vi.mock('../db/eventDb.js')

describe('the schedule route', () => {
  it('lists all the schedules', async () => {
    vi.mocked(db.getEventsByDay).mockImplementation(async () => {
      return [
        {
          id: 1,
          day: 'saturday',
          time: '2pm - 3pm',
          eventName: 'Sandwich Eating Contest',
          description: 'This event will be taking place at the TangleStage. Make sure you eat lunch before watching this amazing display!',
          locationName: 'TangleStage a'
        }
      ]
    })

    const res = await request(server).get('/schedule/saturday')
    expect(res.statusCode).toBe(200)
    expect(db.getEventsByDay).toHaveBeenCalledWith('saturday')

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('li')).toMatchInlineSnapshot(`
      HTMLCollection [
        <li
          class="card"
        >
          
          
          <div
            class="event"
          >
            
            
            <span
              class="title"
            >
              Sandwich Eating Contest
            </span>
            
            
            <div
              class="time-location"
            >
              
              
              <p>
                Location: 
                <span
                  class="data"
                >
                  TangleStage a
                </span>
              </p>
              
              
              <p>
                Time: 
                <span
                  class="data"
                >
                  2pm - 3pm
                </span>
              </p>
              
            
            </div>
            
          
          </div>
          
          
          <p
            class="event-description data"
          >
            This event will be taking place at the TangleStage. Make sure you eat lunch before watching this amazing display!
          </p>
          
          
          <a
            href="/events/1/edit"
          >
            edit event
          </a>
          
        
        </li>,
      ]
    `)
  })
})