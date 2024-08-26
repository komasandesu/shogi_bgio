import { describe, it, expect } from 'vitest'
import Line from './line'

describe('Line.empty', () => {
  it('returns empty line with length n', () => {
    expect(Line.empty(3)).toEqual([null, null, null])
  })
})

describe('Line.isCompleted', () => {
  it('returns false when line empty', () => {
    expect(Line.isCompleted([null, null, null])).toEqual(false)
  })

  it('returns false when line not completed', () => {
    expect(Line.isCompleted([ ["歩",'1',false], ["歩",'1',false], ["歩",'2',false] ])).toEqual(false)
  })

  it('returns true when line completed', () => {
    expect(Line.isCompleted([ ["歩",'1',false], ["歩",'1',false], ["歩",'1',false] ])).toEqual(true)
  })
})

describe('Line.isFull', () => {
  it('returns false when empty cell exists', () => {
    expect(Line.isFull([ ["歩",'1',false], null, ["歩",'2',false] ])).toEqual(false)
  })

  it('returns true when empty cell exists', () => {
    expect(Line.isFull([ ["歩",'1',false], ["歩",'2',false], ["歩",'2',false] ])).toEqual(true)
  })
})
