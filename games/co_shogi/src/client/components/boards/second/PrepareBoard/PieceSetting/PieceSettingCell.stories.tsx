import { Sheet } from '@mui/joy'
import { PieceSettingCell } from './PieceSettingCell'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof PieceSettingCell> = { component: PieceSettingCell }
export default meta

export const Empty: ComponentStoryObj<typeof PieceSettingCell> = {
  args: {
    cell: null,
    position: [0, 0],
  },
  render: (args) => (
    <Sheet sx={{ maxWidth: '100px' }}>
      <PieceSettingCell {...args} />
    </Sheet>
  ),
}

export const Player0: ComponentStoryObj<typeof PieceSettingCell> = {
  ...Empty,
  args: {
    cell: ["歩",'0',false],
    position: [1, 0],
  },
}

export const Player1: ComponentStoryObj<typeof PieceSettingCell> = {
  ...Empty,
  args: {
    cell: ["歩",'1',false],
    position: [1, 1],
  },
}
