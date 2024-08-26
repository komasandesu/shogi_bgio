import { describe, it, expect } from 'vitest'
import Board from './board'


describe('Board.empty', () => {
  it('should return empty cells', () => {
    expect(Board.empty).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  })
})

describe('Board.putPiece', () => {
  it('should place the correct value in the cell', () => {
    expect(Board.putPiece(Board.empty, ['歩','1',false], [1, 2])).toEqual([
      [null, null, null],
      [null, null, null],
      [null, ['歩','1'], null],
    ])
  })

  it('place only empty cell', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [null, null, null],
      [['歩','1',false], null, null],
      [null, null, null],
    ]
    const piece:[string,string,boolean] = ['歩','1',false]

    expect(Board.putPiece(board, piece, [0, 1])).toEqual(undefined)
  })
})
describe('Board.lines', () => {
  it('should return all lines', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], ['歩','3',false]],
      [['歩','4',false], ['歩','5',false], ['歩','6',false]],
      [['歩','6',false], ['歩','7',false], ['歩','8',false]],
    ]
    expect(Board.lines(board)).toEqual([
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
      ['1', '5', '9'],
      ['3', '5', '7'],
    ])
  })
})
describe('Board.isVictory', () => {
  it('return false if lines are not completed', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], null],
      [null, ['歩','1',false], null],
      [['歩','1',false], ['歩','2',false], null],
    ]
    expect(Board.isVictory(board)).toEqual(false)
  })

  it('return true if a horizontal line is completed', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [null, ['歩','2',false], null],
      [['歩','1',false], ['歩','1',false], ['歩','1',false]],
      [['歩','2',false], null, null],
    ]
    expect(Board.isVictory(board)).toEqual(true)
  })

  it('return true if a vertical line is completed', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], null],
      [['歩','1',false], null, null],
      [['歩','1',false], ['歩','2',false], null],
    ]
    expect(Board.isVictory(board)).toEqual(true)
  })

  it('return true if a diagonal line is completed', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], null],
      [null, ['歩','1',false], null],
      [null, ['歩','2',false], ['歩','1',false]],
    ]
    expect(Board.isVictory(board)).toEqual(true)
  })
})

describe('Board.checkFoul', () => {
  it('should return false when a null cell exists', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], null],
      [null, ['歩','1',false], null],
      [['歩','1',false], ['歩','2',false], ['歩','1',false]],
    ]
    expect(Board.checkFoul(board)).toEqual(true)
  })

  it('should return true when no null cells exists', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [null, ['歩','2',false], null],
      [null, null, null],
      [['歩','1',false], ['歩','1',false], null],
    ]
    expect(Board.checkFoul(board)).toEqual(false)
  })
})

describe('Board.result', () => {
  it('should return undefined when game not completed', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], null],
      [['歩','2',false], ['歩','1',false], ['歩','2',false]],
      [['歩','1',false], ['歩','2',false], ['歩','2',false]],
    ]
    expect(Board.result(board, '1')).toBeUndefined()
  })

  it('should return winner when one player complete a line', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], ['歩','2',false]],
      [['歩','2',false], ['歩','1',false], ['歩','2',false]],
      [['歩','1',false], ['歩','2',false], ['歩','1',false]],
    ]
    expect(Board.result(board, '1')).toEqual({ winner: '1' })
  })

  it('should return draw when board is full and no line completed', () => {
    const board:Array<Array<[string,string,boolean] | null>> = [
      [['歩','1',false], ['歩','2',false], ['歩','2',false]],
      [['歩','2',false], ['歩','1',false], ['歩','1',false]],
      [['歩','1',false], ['歩','2',false], ['歩','2',false]],
    ]
    expect(Board.result(board, '1')).toEqual({ draw: true })
  })
})
