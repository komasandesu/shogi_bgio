import { PrepareBoard } from './PrepareBoard'
import type { ComponentStoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof PrepareBoard> = { component: PrepareBoard }
export default meta

export const Empty: ComponentStoryObj<typeof PrepareBoard> = {
  args: {
    board: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    piece_setting_board:[
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    nowStage: 'SelectKoma',
  },
}

export const Filled: ComponentStoryObj<typeof PrepareBoard> = {
  args: {
    board: [
      [['角','1',false], ['歩','0',false], null],
      [['歩','1',false], ['金','1',false], ['歩','0',false]],
      [null, ['王','0',false], ['歩','1',false]],
    ],
    piece_setting_board:[
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    nowStage: 'SelectKoma',
  },
}
