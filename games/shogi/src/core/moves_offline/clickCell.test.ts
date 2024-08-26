import { INVALID_MOVE } from 'boardgame.io/core'
import { describe, it, expect } from 'vitest'
import Board from '../models/board'
import clickCellOffline from './clickCell_offline'
import type { BoardType } from 'core/models/board'

describe('clickCell', () => {
  it('should place the correct value in the cell', () => {
    const G = {
      board: Board.empty,
      selected_piece_position: null,
      next_move_place: null,
      movable_place: null,
      captured_piece_first: Array(0),
      captured_piece_second: Array(0),
      stage_name: 'SelectKoma',
    }

    const koma: [string, string, boolean] = ["歩",'1',false]

    expect(clickCellOffline({ G, playerID: '1' }, [1, 2])).toEqual({
      board: [
        [null, null, null],
        [null, null, null],
        [null, koma, null],
      ]
    })
  })

  const koma: [string, string, boolean] = ["歩",'1',false]
  it('place only empty cell', () => {
    const G = {
      board: [
        [null, null, null],
        [koma, null, null],
        [null, null, null],
      ],
      selected_piece_position: null,
      next_move_place: null,
      movable_place: null,
      captured_piece_first: Array(0),
      captured_piece_second: Array(0),
      stage_name: 'SelectKoma',
    }

    expect(clickCellOffline({ G, playerID: '2' }, [0, 1])).toEqual(INVALID_MOVE)
  })
})
