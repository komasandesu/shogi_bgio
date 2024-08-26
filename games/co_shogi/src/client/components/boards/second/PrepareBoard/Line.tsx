import React from 'react'
import { Sheet } from '@mui/joy'
import { Cell } from './Cell'
import type { LineType } from 'core/models/line'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'

export interface LineProps {
  line: LineType
  onClick: (i: number) => void
  lineNumber: number
}

export const Line: React.FC<LineProps> = ({ 
  line, 
  onClick, 
  lineNumber, 
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
    {line.map((cell, i) => (
      <Cell
        key={i}
        cell={cell}
        position={[i, lineNumber]}
        onClick={() => {
          onClick(i)
        }}
      />
    ))}
  </Sheet>
)
