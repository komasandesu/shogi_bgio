import { Sheet } from '@mui/joy'
import { CellOffline } from './Cell_offline'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof CellOffline> = { component: CellOffline }
export default meta

export const Empty: ComponentStoryObj<typeof CellOffline> = {
  args: {
    cell: null,
    position: [0, 0],
    movable_place: [[0,1]]
  },
  render: (args) => (
    <Sheet sx={{ maxWidth: '100px' }}>
      <CellOffline {...args} />
    </Sheet>
  ),
}

export const Player0: ComponentStoryObj<typeof CellOffline> = {
  ...Empty,
  args: {
    cell: ["歩",'0',false],
    position: [1, 0],
    movable_place: [[0,1]]
  },
}

export const Player1: ComponentStoryObj<typeof CellOffline> = {
  ...Empty,
  args: {
    cell: ["歩",'1',false],
    position: [1, 1],
    movable_place: [[0,1]]
  },
}
