import React from 'react'

import { GameBoard } from './GameBoard/GameBoard'


import type { BoardType } from 'core/models/board'
import type { CapturedPieceType } from 'core/models/piece_operation_models/CapturedPiece'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'
import type { Position } from 'core/models/position'

import type { PrepareBoardType } from 'core/models/prepare_board'
import { PrepareBoard } from './PrepareBoard/PrepareBoard'
import type { PieceSettingBoardType } from 'core/models/piece_setting'



export interface BoardProps {
  board: BoardType
  now_player:string

  prepare_board_first: PrepareBoardType
  piece_setting_board: PieceSettingBoardType
  cost_first: number
  selected_setting_piece_position: SelectedPiecePositionType

  onClick: (pos: Position, ) => void

  movable_place: MovablePlaceType
  nowStage: StageNameType
  CapturedPieceOfFirst: CapturedPieceType
  CapturedPieceOfSecond: CapturedPieceType
  selected_piece_position: SelectedPiecePositionType
}

export const Board: React.FC<BoardProps> = ({ 
  board, 
  now_player,
  prepare_board_first,
  piece_setting_board,
  cost_first,
  selected_setting_piece_position,
  onClick, 
  movable_place, 
  nowStage, 
  CapturedPieceOfFirst, 
  CapturedPieceOfSecond, 
  selected_piece_position 
}) => {
  if( nowStage==='Start' || nowStage==='SetPiece' ){
    return (
      <>
        <PrepareBoard 
          board={prepare_board_first} 
          piece_setting_board={piece_setting_board}
          onClick={onClick} 
          nowStage={nowStage} 
          selected_piece_position={selected_setting_piece_position} 
          cost_first={cost_first}
        /> 
      </> 
    )
  }
  else{
    return (
      <>
        <GameBoard 
          board={board} 
          now_player = {now_player}
          onClick={onClick} 
          movable_place={movable_place} 
          nowStage={nowStage} 
          CapturedPieceOfFirst={CapturedPieceOfFirst} 
          CapturedPieceOfSecond={CapturedPieceOfSecond} 
          selected_piece_position={selected_piece_position} 
        /> 
      </> 
    )
  }
}
