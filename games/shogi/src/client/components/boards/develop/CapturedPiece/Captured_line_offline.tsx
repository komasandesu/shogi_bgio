import React from 'react'
import { Container, Sheet } from '@mui/joy'
import { CapturedCellOffline } from './Captured_cell_offline'
import type { LineType } from 'core/models/line'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'

export interface LineProps {
  line: LineType
  lineNumber: number
  onClick: (i: number) => void
}

export const CapturedLineOffline: React.FC<LineProps> = ({ line, lineNumber, onClick }) => (
  <Sheet
    sx={{
      display: 'flex',
      justifyContent: 'start',
      width: '100%',
      minWidth: '500px',
      maxWidth: '500px',
      borderRadius: '2',
      flexDirection: 'row',
      height: 'auto',
      flexWrap: 'wrap',
    }}
  >
    {line.map((cell, i) => (
      <CapturedCellOffline
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
