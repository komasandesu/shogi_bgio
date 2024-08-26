import Util from '../util'
import type { CellType } from './cell'
import type { LineType } from './line'
import Line from './line'
import type { CanNeedPromotionType } from './piece_operation_models/CanNeedPromotion'
import type { MovablePlaceType } from './piece_operation_models/MovablePlace'
import { CanNeedPromotion } from './piece_manipulation/detectPromotion'
import type { Position } from './position'
import { EmptyPlace } from './piece_manipulation/findEmptyPlace'
import type { GameResult } from '../types'
import { MovablePlace } from './piece_manipulation/findMovablePlace'
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
const get_movable_place = (
  board: PrepareBoardType,
  now_player: PlayerID,
  pos: Position
): MovablePlaceType => {
  return MovablePlace(board, now_player, pos );
}


// 動かすことができる場所を探索
const get_empty_place = (
  board: PrepareBoardType
): MovablePlaceType => {
  return EmptyPlace(board);
}


// 成ることができるか、成る必要があるか
const detectPromotion = (
  board: PrepareBoardType,
  now_player: PlayerID,
  pos: Position,
  piece: [string,PlayerID,boolean],
): CanNeedPromotionType => {
  return CanNeedPromotion(board, now_player, pos, piece );
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

const isVictory = (board: PrepareBoardType): boolean => {
  let Kings:number = 0;

  for (let y:number = 0; y < prepare_height ; y++) {
    for (let x:number = 0; x < prepare_width ; x++) {
      if (get(board, [x,y]) !== null){
        if (get(board, [x,y])![0]=='王'){
          Kings += 1;
        }
      }
    }
  }

  if(Kings===1){
    return true;
  }
  else{
    return false;
  }
}
const isDraw = (board: PrepareBoardType): boolean => {
  return board.every(Line.isFull)
}

const result = (board: PrepareBoardType, currentPlayer: PlayerID): GameResult => {
  if (isVictory(board)) {
    return { winner: currentPlayer }
  }
  if (isDraw(board)) {
    return { draw: true }
  }
}

const PrepareBoard = {
  prepare_height,
  prepare_width,
  empty,
  init_first,
  init_second,
  get,
  get_movable_place,
  get_empty_place,
  detectPromotion,
  selectPiece,
  movePiece,
  putPiece,
  lines,
  result,
  isVictory,
  isDraw,
}
export default PrepareBoard
