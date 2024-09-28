import React from 'react'
import { Sheet } from '@mui/joy'
import type { BoardType } from 'core/models/board'
import { CapturedLine } from './CapturedPiece/CapturedLine'
import type { CapturedPieceType } from 'core/models/piece_operation_models/CapturedPiece'
import { Line } from './Line'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import { CancelSelect } from './piece_manipulation/CancelSelectButton'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'
import { SelectPromotion } from './piece_manipulation/SelectPromotionButton'
import { UnSelectPromotion } from './piece_manipulation/UnSelectPromotionButton'
import type { Position } from 'core/models/position'

const height = 9;
const width = 9;

const SelectPromotionPos:[number,number] = [-1,-1]
const UnSelectPromotionPos:[number,number] = [-2,-2]

const CancelSelectPos:[number,number] = [-3,-3]



export interface BoardProps {
  board: BoardType
  now_player:string
  onClick: (pos: Position, ) => void
  movable_place: MovablePlaceType
  nowStage: StageNameType
  CapturedPieceOfFirst: CapturedPieceType
  CapturedPieceOfSecond: CapturedPieceType
  selected_piece_position: SelectedPiecePositionType
}

export const GameBoard: React.FC<BoardProps> = ({ 
  board, 
  now_player,
  onClick, 
  movable_place, 
  nowStage, 
  CapturedPieceOfFirst, 
  CapturedPieceOfSecond, 
  selected_piece_position 
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
      <CapturedLine line={CapturedPieceOfFirst}
          lineNumber={100}
          onClick={(x) => {
            onClick([x, 100])
      }}/> 
      <p></p>
      {board.map((_, y, line) => (
        <Line
          key={y}
          line={line[line.length - 1 - y]}
          lineNumber={line.length - 1 - y}
          onClick={(x) => {
            onClick([width - 1 - x, height - 1 - y])
          }}
          movable_place={movable_place}
          selected_piece_position={selected_piece_position}
        />
      ))}
      <p></p>
      <CapturedLine line={CapturedPieceOfSecond}
          lineNumber={200}
          onClick={(x) => {
            onClick([x, 200])
      }}/> 
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
