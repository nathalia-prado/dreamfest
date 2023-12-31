import { within } from '@testing-library/dom'
import { JSDOM } from 'jsdom'

export function render(response) {
  const { document } = new JSDOM(response.text).window
  return within(document)
}