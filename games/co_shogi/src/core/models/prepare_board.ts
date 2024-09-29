import Util from '../util'
import type { CellType } from './cell'
import type { LineType } from './line'
import Line from './line'
import type { MovablePlaceType } from './piece_operation_models/MovablePlace'
import type { Position } from './position'
import { EmptyPlace } from './piece_manipulation/prepare_board/findEmptyPlace'
import type { GameResult } from '../types'
import type { PlayerID } from 'boardgame.io'



export type PrepareBoardType = LineType[]

export const prepare_height = 3
export const prepare_width = 9

const empty = Array(prepare_height).fill(prepare_width).map(Line.empty)

const init_first:LineType[] = [
  [['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false]],
  [null,['角','0',false],null,null,null,null,null,['飛','0',false],null],
  [['香','0',false],['桂','0',false],['銀','0',false],['金','0',false],['王','0',false],['金','0',false],['銀','0',false],['桂','0',false],['香','0',false]]
]

const init_second:LineType[] = [
  [['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false]],
  [null,['角','1',false],null,null,null,null,null,['飛','1',false],null],
  [['香','1',false],['桂','1',false],['銀','1',false],['金','1',false],['王','1',false],['金','1',false],['銀','1',false],['桂','1',false],['香','1',false]]
]



const get = (board: PrepareBoardType, [x, y]: Position): CellType => board[y][x]

const set = (board: PrepareBoardType, [x, y]: Position, v: CellType): PrepareBoardType =>
  board.map((line, by) =>
    line.map((column, bx) => (bx === x && by === y ? v : column))
  )


// 動かすことができる場所を探索
const get_empty_place = (
  board: PrepareBoardType
): MovablePlaceType => {
  return EmptyPlace(board);
}


// 動かす駒を選択する
const selectPiece = (
  board: PrepareBoardType,
  now_player: PlayerID,
  piece: [string,PlayerID,boolean],
  pos: Position
): PrepareBoardType | undefined => {
  if (get(board, pos) === null) {
    return undefined
  }
  else if (get(board, pos)![1] === now_player) {
    return undefined
  }

  return set(board, pos, piece );
}

const putPiece = (
  board: PrepareBoardType,
  piece: CellType,
  pos: Position
): PrepareBoardType | undefined => {
  return set(board, pos, piece );
}

// 駒を動かす
const movePiece = (
  board: PrepareBoardType,
  selectedPiece: CellType,
  previousPosition: Position,
  nextPosition: Position
): PrepareBoardType | undefined => {
  return putPiece(putPiece(board, null, previousPosition)!, selectedPiece, nextPosition);
}




const lines = (board: PrepareBoardType): LineType[] => {
  const horizontalLines: LineType[] = board
  const vertialLines: LineType[] = Util.range(prepare_width).map((i) =>
    board.map((row) => row[i])
  )
  const diagonalLines: LineType[] = [
    Util.range(prepare_height).map((i) => board[i][i]),
    Util.range(prepare_height).map((i) => board[i][prepare_width - 1 - i]),
  ]
  return [...horizontalLines, ...vertialLines, ...diagonalLines]
}


const PrepareBoard = {
  prepare_height,
  prepare_width,
  empty,
  init_first,
  init_second,
  get,
  get_empty_place,
  selectPiece,
  movePiece,
  putPiece,
  lines,
}
export default PrepareBoard
