import { GameBoard } from './GameBoard'
import type { ComponentStoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof GameBoard> = { component: GameBoard }
export default meta

export const Empty: ComponentStoryObj<typeof GameBoard> = {
  args: {
    board: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    movable_place: [[0,1]],
    nowStage: 'SelectKoma',
    CapturedPieceOfFirst: [],
    CapturedPieceOfSecond: [],
    selected_piece_position: null
  },
}

export const Filled: ComponentStoryObj<typeof GameBoard> = {
  args: {
    board: [
      [['角','1',false], ['歩','0',false], null],
      [['歩','1',false], ['金','1',false], ['歩','0',false]],
      [null, ['王','0',false], ['歩','1',false]],
    ],
    movable_place: [[0,1]],
    nowStage: 'SelectKoma',
    CapturedPieceOfFirst: [],
    CapturedPieceOfSecond: [],
    selected_piece_position: null
  },
}
