import { PieceSettingLine } from './PieceSettingLine'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof PieceSettingLine> = { component: PieceSettingLine }
export default meta

export const Empty: ComponentStoryObj<typeof PieceSettingLine> = {
  args: {
    line: [null, null, null],
    lineNumber: 0,
  },
}

export const Filled: ComponentStoryObj<typeof PieceSettingLine> = {
  args: {
    line: [["歩",'0',false], ["歩",'1',false], null],
    lineNumber: 0,
  },
}
