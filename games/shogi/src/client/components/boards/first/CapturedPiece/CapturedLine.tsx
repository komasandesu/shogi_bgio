import React from 'react'
import { Sheet } from '@mui/joy'
import { CapturedCell } from './CapturedCell'

import type { LineType } from 'core/models/line'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'

import type { PlayerID } from 'boardgame.io'
// import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'

export interface LineProps {
  line: LineType
  lineNumber: number
  onClick: (i: number) => void
  player:PlayerID
  selected_piece_position: SelectedPiecePositionType
}

export const CapturedLine: React.FC<LineProps> = ({ 
  line, 
  lineNumber,
  onClick,
  player,
  selected_piece_position,
}) => (
  <Sheet
    sx={{
      display: 'flex',
      justifyContent: 'start',
      width: '100%',
      minWidth: '560px',
      maxWidth: '560px',
      borderRadius: '2',
      flexDirection: 'row',
      height: 'auto',
      flexWrap: 'wrap',
      right: '-80px',
    }}
  >
    {line.map((cell, i) => (
      <CapturedCell
        key={i}
        cell={cell}
        position={[i, lineNumber]}
        onClick={() => {
          onClick(i)
        }}
        player = {player} 
        selected_piece_position = {selected_piece_position}
      />
    ))}
  </Sheet>
)
