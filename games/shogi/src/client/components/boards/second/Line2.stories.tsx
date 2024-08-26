import { Line2 } from './Line2'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof Line2> = { component: Line2 }
export default meta

export const Empty: ComponentStoryObj<typeof Line2> = {
  args: {
    line: [null, null, null],
    lineNumber: 0,
    movable_place: [[0,1]]
  },
}

export const Filled: ComponentStoryObj<typeof Line2> = {
  args: {
    line: [["歩",'0',false], ["歩",'1',false], null],
    lineNumber: 0,
    movable_place: [[0,1]]
  },
}
