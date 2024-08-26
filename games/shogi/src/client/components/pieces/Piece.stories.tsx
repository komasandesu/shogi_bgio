import { Piece } from './Piece'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof Piece> = { component: Piece }
export default meta

export const Pawn: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '歩',
  },
}

export const Lance: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '香',
  },
}

export const Knight: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '桂',
  },
}

export const Silver_general: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '銀',
  },
}

export const Gold_general: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '金',
  },
}

export const Bishop: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '角',
  },
}

export const Rook: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '飛',
  },
}

export const King: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '王',
  },
}

export const Promoted_Pawn: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: 'と',
  },
}

export const Promoted_Lance: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '成香',
  },
}

export const Promoted_Knight: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '成桂',
  },
}

export const Promoted_Silver_general: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '成銀',
  },
}

export const Promoted_Gold_general: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '成金',
  },
}

export const Promoted_Bishop: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '馬',
  },
}

export const Promoted_Rook: ComponentStoryObj<typeof Piece> = {
  args: {
    koma: '竜',
  },
}