import React from 'react'
import { Button } from '@mui/joy'
import { Piece } from '../../../pieces/Piece'
import type { CellType } from 'core/models/cell'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { Position } from 'core/models/position'


const first_player = '0';
const second_player = '1';

const is_accessible = (pos:[number,number], movable_place:MovablePlaceType) : boolean => {
  for (const accessible_pos of movable_place!) {
    // console.log(pos[0],pos[1]," ",accessible_pos[0],accessible_pos[1]);
    if( accessible_pos[0]===pos[0] && accessible_pos[1]===pos[1] ){
      return true;
    }
  }
  return false;
}

export interface CellProps {
  cell: CellType
  onClick: () => void
  position: Position
  selected_piece_position: SelectedPiecePositionType
}

export const Cell: React.FC<CellProps> = ({
  cell,
  position: [x, y],
  onClick
}) => {
  return(
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
            borderRadius: '0',
            flex: '1',
            bgcolor: '#DED799',
            minWidth: '80px',
            maxWidth: '80px',
        }}
    >
        {cell === null ? '' : <Piece koma={cell[0]} player={first_player} isPromoted={cell[2]} {...cell} isOnBoard={false} />}
    </Button>
  )
}
