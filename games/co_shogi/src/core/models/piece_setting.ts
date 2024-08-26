// import Util from '../util'
import type { CellType } from './cell'
import type { LineType } from './line'
import Line from './line'
import type { Position } from './position'



export type PieceSettingBoardType = LineType[]

export const height = 3
export const width = 9

const empty = Array(height).fill(width).map(Line.empty)

const init:LineType[] = [
  [['歩','0',false],['香','0',false],['桂','0',false],['銀','0',false],['金','0',false],['角','0',false],['飛','0',false],['王','0',false],['決定','0',false]],
  //[['歩','0',false],['香','0',false],['桂','0',false],['銀','0',false],['金','0',false],['角','0',false],['飛','0',false],['王','0',false],['決定','0',false]],
]


const get = (board: PieceSettingBoardType, [x, y]: Position): CellType => board[y][x]

const set = (board: PieceSettingBoardType, [x, y]: Position, v: CellType): PieceSettingBoardType =>
  board.map((line, by) =>
    line.map((column, bx) => (bx === x && by === y ? v : column))
  )


const PieceSettingBoard = {
  height,
  width,
  empty,
  init,
  get,
  set
}
export default PieceSettingBoard
