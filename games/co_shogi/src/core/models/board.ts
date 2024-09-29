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
import { checkNifu } from './piece_manipulation/checkNifu'


const first_player:string = '0';
const second_player:string = '1';


export type BoardType = LineType[]

export const height = 9
export const width = 9

const empty = Array(height).fill(width).map(Line.empty)

const init:LineType[] = [
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
]

// const init:LineType[] = [
//   [['香','1',false],['桂','1',false],['銀','1',false],['金','1',false],['王','1',false],['金','1',false],['銀','1',false],['桂','1',false],['香','1',false]],
//   [null,['飛','1',false],null,null,null,null,null,['角','1',false],null],
//   [['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false],['歩','1',false]],
//   [null,null,null,null,null,null,null,null,null],
//   [null,null,null,null,null,null,null,null,null],
//   [null,null,null,null,null,null,null,null,null],
//   [['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false],['歩','0',false]],
//   [null,['角','0',false],null,null,null,null,null,['飛','0',false],null],
//   [['香','0',false],['桂','0',false],['銀','0',false],['金','0',false],['王','0',false],['金','0',false],['銀','0',false],['桂','0',false],['香','0',false]]
// ]


const get = (board: BoardType, [x, y]: Position): CellType => board[y][x]

const set = (board: BoardType, [x, y]: Position, v: CellType): BoardType =>
  board.map((line, by) =>
    line.map((column, bx) => (bx === x && by === y ? v : column))
  )


// 動かすことができる場所を探索
const get_movable_place = (
  board: BoardType,
  now_player: PlayerID,
  pos: Position
): MovablePlaceType => {
  return MovablePlace(board, now_player, pos );
}


// 動かすことができる場所を探索
const get_empty_place = (
  board: BoardType,
  now_player: PlayerID,
  piece: CellType,
): MovablePlaceType => {
  return EmptyPlace(now_player, board, piece);
}


// 成ることができるか、成る必要があるか
const detectPromotion = (
  board: BoardType,
  now_player: PlayerID,
  pos: Position,
  piece: CellType,
): CanNeedPromotionType => {
  return CanNeedPromotion(board, now_player, pos, piece );
}


// 動かす駒を選択する
const selectPiece = (
  board: BoardType,
  now_player: PlayerID,
  piece: [string,PlayerID,boolean],
  pos: Position
): BoardType | undefined => {
  if (get(board, pos) === null) {
    return undefined
  }
  else if (get(board, pos)![1] === now_player) {
    return undefined
  }

  return set(board, pos, piece );
}

const putPiece = (
  board: BoardType,
  piece: CellType,
  pos: Position
): BoardType | undefined => {
  return set(board, pos, piece );
}

// 駒を動かす
const movePiece = (
  board: BoardType,
  selectedPiece: CellType,
  previousPosition: Position,
  nextPosition: Position
): BoardType | undefined => {
  return putPiece(putPiece(board, null, previousPosition)!, selectedPiece, nextPosition);
}




const lines = (board: BoardType): LineType[] => {
  const horizontalLines: LineType[] = board
  const vertialLines: LineType[] = Util.range(width).map((i) =>
    board.map((row) => row[i])
  )
  const diagonalLines: LineType[] = [
    Util.range(height).map((i) => board[i][i]),
    Util.range(height).map((i) => board[i][width - 1 - i]),
  ]
  return [...horizontalLines, ...vertialLines, ...diagonalLines]
}

const isVictory = (board: BoardType): boolean => {
  let Kings:number = 0;

  for (let y:number = 0; y < height ; y++) {
    for (let x:number = 0; x < width ; x++) {
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
const checkFoul = (board: BoardType): boolean => {
  return checkNifu(board);
}

const result = (board: BoardType, currentPlayer: PlayerID): GameResult => {
  if (isVictory(board)) {
    return { winner: currentPlayer }
  }
  if (checkFoul(board)) {
    return { winner: currentPlayer === first_player ? second_player : first_player  }
  }
}

const Board = {
  height,
  width,
  empty,
  init,
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
  checkFoul,
}
export default Board
