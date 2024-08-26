import { Sheet } from '@mui/joy'
import { Cell2 } from './Cell2'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof Cell2> = { component: Cell2 }
export default meta

export const Empty: ComponentStoryObj<typeof Cell2> = {
  args: {
    cell: null,
    position: [0, 0],
    movable_place: [[0,1]]
  },
  render: (args) => (
    <Sheet sx={{ maxWidth: '100px' }}>
      <Cell2 {...args} />
    </Sheet>
  ),
}

export const Player0: ComponentStoryObj<typeof Cell2> = {
  ...Empty,
  args: {
    cell: ["歩",'0',false],
    position: [1, 0],
    movable_place: [[0,1]]
  },
}

export const Player1: ComponentStoryObj<typeof Cell2> = {
  ...Empty,
  args: {
    cell: ["歩",'1',false],
    position: [1, 1],
    movable_place: [[0,1]]
  },
}
