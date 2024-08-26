import React from 'react'
import { Sheet } from '@mui/joy'
import type { BoardType } from 'core/models/board'
import { CapturedLineOffline } from './CapturedPiece/Captured_line_offline'
import { LineOffline } from './Line_offline'
import type { CapturedPieceType } from 'core/models/piece_operation_models/CapturedPiece'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import { CancelSelectOffline } from './piece_manipulation/CancelSelect_Button_offline'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'
import { SelectPromotionOffline } from './piece_manipulation/SelectPromotion_Button_offline'
import type { Position } from 'core/models/position'
import { UnSelectPromotionOffline } from './piece_manipulation/UnSelectPromotion_Button_offline'


const SelectPromotionPos:[number,number] = [-1,-1]
const UnSelectPromotionPos:[number,number] = [-1,-2]

const CancelSelectPos:[number,number] = [-2,0]


export interface BoardProps {
  board: BoardType
  onClick: (pos: Position, ) => void
  movable_place: MovablePlaceType
  nowStage: StageNameType
  CapturedPieceOfFirst: CapturedPieceType
  CapturedPieceOfSecond: CapturedPieceType
}

export const BoardOffline: React.FC<BoardProps> = ({ board, onClick, movable_place, nowStage, CapturedPieceOfFirst, CapturedPieceOfSecond }) => (
  
  <div>
    <Sheet
      sx={{
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '50%',
        minHeight: '5px',
        maxHeight: '10px',
      }}
    >
      <CapturedLineOffline line={CapturedPieceOfSecond}
          lineNumber={200}
          onClick={(x) => {
            onClick([x, 200])
      }}/> 
      {board.map((line, y) => (
        <LineOffline
          key={y}
          line={line}
          lineNumber={y}
          onClick={(x) => {
            onClick([x, y])
          }}
          movable_place={movable_place}
        />
      ))}
      <CapturedLineOffline line={CapturedPieceOfFirst}
          lineNumber={100}
          onClick={(x) => {
            onClick([x, 100])
      }}/> 
    </Sheet>

    
  
    <CancelSelectOffline onClick={() => {onClick(CancelSelectPos)}} nowStage={nowStage} /> 
    <SelectPromotionOffline onClick={() => {onClick(SelectPromotionPos)}} nowStage={nowStage} /> 
    <UnSelectPromotionOffline onClick={() => {onClick(UnSelectPromotionPos)}} nowStage={nowStage} /> 
  </div> 
  
)
