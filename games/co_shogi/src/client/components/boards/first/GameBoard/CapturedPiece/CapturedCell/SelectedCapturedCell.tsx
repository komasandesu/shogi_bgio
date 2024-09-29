import React from 'react'
import { Button } from '@mui/joy'
import { Piece } from '../../../../../pieces/Piece'
import type { CellType } from 'core/models/cell'
import type { Position } from 'core/models/position'



export interface CellProps {
  cell: CellType
  position: Position
  onClick: () => void
}

export const SelectedCapturedCell: React.FC<CellProps> = ({
  cell,
  position: [x, y],
  onClick,
}) => {
  return (
    <Button
        size="lg"
        variant="outlined"
        onClick={() => {
            onClick()
        }}
        data-testid={`cell-${x}-${y}`}
        sx={{
          aspectRatio: '1 / 1',
          width: '100%',
          minWidth: '80px',
          maxWidth: '80px',
          borderRadius: '0',
          flex: '1',
          bgcolor: '#FF9999',
          float: 'left',
        }}
    >
        {cell === null ? '' : <Piece koma={cell[0]} player={cell[1]} isPromoted={cell[2]} {...cell} isOnBoard={false} />}
    </Button>
)
}
