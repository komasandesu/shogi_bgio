import { Board } from './Board'
import type { ComponentStoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Board> = { component: Board }
export default meta

export const Empty: ComponentStoryObj<typeof Board> = {
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
    CapturedPieceOfSecond: []
  },
}

export const Filled: ComponentStoryObj<typeof Board> = {
  args: {
    board: [
      [['角','1',false], ['歩','0',false], null],
      [['歩','1',false], ['金','1',false], ['歩','0',false]],
      [null, ['王','0',false], ['歩','1',false]],
    ],
    movable_place: [[0,1]],
    nowStage: 'SelectKoma',
    CapturedPieceOfFirst: [],
    CapturedPieceOfSecond: []
  },
}
