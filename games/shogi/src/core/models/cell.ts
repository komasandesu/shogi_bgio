import type { PlayerID } from 'boardgame.io'

// export type CellType = PlayerID | null
type pieceName = string
type isPromoted = boolean

export type CellType = [pieceName,PlayerID,isPromoted] | null
