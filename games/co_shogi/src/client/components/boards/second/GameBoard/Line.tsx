import React from 'react'
import { Sheet } from '@mui/joy'
import { Cell } from './Cell'

import type { LineType } from 'core/models/line'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { NextMovePlaceType } from 'core/models/piece_operation_models/NextMovePlace'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'

export interface LineProps {
  line: LineType
  onClick: (i: number) => void
  lineNumber: number
  movable_place: MovablePlaceType
  selected_piece_position: SelectedPiecePositionType
  next_move_place: NextMovePlaceType
  nowStage: StageNameType
}

export const Line: React.FC<LineProps> = ({ 
  line, 
  onClick, 
  lineNumber, 
  movable_place,
  selected_piece_position,
  next_move_place,
  nowStage, 
}) => (
  <Sheet
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      minWidth: '720px',
      maxWidth: '720px',
    }}
  >
    {line.map((_, i, cell) => (
      <Cell
        key={i}
        cell={cell[cell.length - 1 - i]}
        position={[cell.length - 1 - i, lineNumber]}
        onClick={() => {
          onClick(i)
        }}
        movable_place={movable_place}
        selected_piece_position={selected_piece_position}
        next_move_place={next_move_place}

        nowStage={nowStage} 
      />
    ))}
  </Sheet>
)
