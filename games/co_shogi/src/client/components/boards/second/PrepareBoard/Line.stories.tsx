import { Line } from './Line'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof Line> = { component: Line }
export default meta

export const Empty: ComponentStoryObj<typeof Line> = {
  args: {
    line: [null, null, null],
    lineNumber: 0,
  },
}

export const Filled: ComponentStoryObj<typeof Line> = {
  args: {
    line: [["歩",'0',false], ["歩",'1',false], null],
    lineNumber: 0,
  },
}
