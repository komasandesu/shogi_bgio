import type { BoardType } from './models/board'
import type { PrepareBoardType } from './models/prepare_board'
import type { PieceSettingBoardType } from './models/piece_setting'

import type { CapturedPieceType } from './models/piece_operation_models/CapturedPiece'
import type { MovablePlaceType } from './models/piece_operation_models/MovablePlace'
import type { NextMovePlaceType } from './models/piece_operation_models/NextMovePlace'
import type { SelectedPiecePositionType } from './models/piece_operation_models/SelectedPiecePosition'
import type { StageNameType } from './models/piece_operation_models/Stage_name'
import type B from 'boardgame.io'



export interface GameState {
  board: BoardType

  prepare_board_first: PrepareBoardType
  prepare_board_second: PrepareBoardType
  cost_first: number
  cost_second: number
  piece_setting_board: PieceSettingBoardType
  selected_setting_piece_position_first: SelectedPiecePositionType,
  selected_setting_piece_position_second: SelectedPiecePositionType,
  is_ready_first: boolean,
  is_ready_second: boolean,

  selected_piece_position: SelectedPiecePositionType
  next_move_place: NextMovePlaceType
  movable_place: MovablePlaceType
  captured_piece_first: CapturedPieceType
  captured_piece_second: CapturedPieceType
  stage_name: StageNameType
}

export type Game = B.Game<GameState>
export type MoveFn = B.MoveFn<GameState>
export type MoveContext = Parameters<MoveFn>[0]
export type MoveResult = ReturnType<MoveFn>
export type Move<
  Args extends any[] = [],
  CtxKeys extends keyof MoveContext = 'G' | 'playerID' | 'events',
> = (ctx: Pick<MoveContext, CtxKeys>, ...args: Args) => MoveResult


export type Move2<
  Args extends any[] = [],
  CtxKeys extends keyof MoveContext = 'G' | 'playerID',
> = (ctx: Pick<MoveContext, CtxKeys>, ...args: Args) => MoveResult

export type GameResult = undefined | { winner: B.PlayerID } | { draw: true }
