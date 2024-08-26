import React from 'react'
import { Sheet } from '@mui/joy'
import { CellOffline } from './Cell_offline'
import type { LineType } from 'core/models/line'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'

export interface LineProps {
  line: LineType
  lineNumber: number
  movable_place: MovablePlaceType
  onClick: (i: number) => void
}

export const LineOffline: React.FC<LineProps> = ({ line, lineNumber, onClick, movable_place }) => (
  <Sheet
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      minWidth: '350px',
      maxWidth: '400px',
    }}
  >
    {line.map((cell, i) => (
      <CellOffline
        key={i}
        cell={cell}
        position={[i, lineNumber]}
        onClick={() => {
          onClick(i)
        }}
        movable_place={movable_place}
      />
    ))}
  </Sheet>
)
