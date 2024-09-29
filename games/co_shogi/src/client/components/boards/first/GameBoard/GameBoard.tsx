import React from 'react'
import { Sheet } from '@mui/joy'

import { CapturedLine } from './CapturedPiece/CapturedLine'
import { Line } from './Line'

import type { Position } from 'core/models/position'

import type { CapturedPieceType } from 'core/models/piece_operation_models/CapturedPiece'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { BoardType } from 'core/models/board'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { NextMovePlaceType } from 'core/models/piece_operation_models/NextMovePlace'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'

import { CancelSelect } from './piece_manipulation/CancelSelectButton'
import { SelectPromotion } from './piece_manipulation/SelectPromotionButton'
import { UnSelectPromotion } from './piece_manipulation/UnSelectPromotionButton'



const SelectPromotionPos:[number,number] = [-1,-1]
const UnSelectPromotionPos:[number,number] = [-2,-2]

const CancelSelectPos:[number,number] = [-3,-3]

const first_player = '0';
const second_player = '1';

export interface BoardProps {
  board: BoardType
  now_player:string
  onClick: (pos: Position, ) => void
  movable_place: MovablePlaceType
  CapturedPieceOfFirst: CapturedPieceType
  CapturedPieceOfSecond: CapturedPieceType
  selected_piece_position: SelectedPiecePositionType
  next_move_place: NextMovePlaceType
  nowStage: StageNameType
}

export const GameBoard: React.FC<BoardProps> = ({ 
  board, 
  now_player,
  onClick, 
  movable_place, 
  CapturedPieceOfFirst, 
  CapturedPieceOfSecond, 
  selected_piece_position,
  next_move_place,
  nowStage, 
}) => (
  <>
    <Sheet
      sx={{
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '50%',
        minHeight: '720px',
        maxHeight: '720px',
        right: '-240px',
      }}
    >
      <CapturedLine 
        line={CapturedPieceOfSecond}
        player = {second_player} 
        selected_piece_position = {selected_piece_position}
        lineNumber={200}
        onClick={(x) => {
          onClick([x, 200])
        }}
      /> 
      <p></p>
      {board.map((line, y) => (
        <Line
          key={y}
          line={line}
          lineNumber={y}
          onClick={(x) => {
            onClick([x, y])
          }}
          movable_place={movable_place}
          selected_piece_position={selected_piece_position}
          next_move_place={next_move_place}
          nowStage={nowStage} 
        />
      ))}
      <p></p>
      <CapturedLine 
        line={CapturedPieceOfFirst}
        player = {first_player} 
        selected_piece_position = {selected_piece_position}
        lineNumber={100}
        onClick={(x) => {
          onClick([x, 100])
        }}
      /> 
    </Sheet>

    <CancelSelect 
      onClick={() => {onClick(CancelSelectPos)}} 
      now_player = {now_player} 
      nowStage={nowStage} 
    /> 
    <SelectPromotion 
      onClick={() => {onClick(SelectPromotionPos)}} 
      now_player = {now_player} 
      nowStage={nowStage} 
    /> 
    <UnSelectPromotion 
      onClick={() => {onClick(UnSelectPromotionPos)}} 
      now_player = {now_player} 
      nowStage={nowStage} 
    /> 
  </> 
  
)
