import React from 'react'
import { Button } from '@mui/joy'
import { Piece } from '../../../../pieces/Piece'
import type { CellType } from 'core/models/cell'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { Position } from 'core/models/position'


const first_player = '0';
const second_player = '1';


export interface CellProps {
  cell: CellType
  onClick:(pos: Position ) => void
  position: Position
  selected_piece_position: SelectedPiecePositionType
}

export const PieceSettingCell: React.FC<CellProps> = ({
  cell,
  position: [x, y],
  onClick,
  selected_piece_position
}) => {
  if(selected_piece_position==null){
    return(
      <Button
          size="lg"
          variant="outlined"
          onClick={() => {
              onClick( [x,100] )
          }}
          data-testid={`cell-${x}-${y}`}
          sx={{
              aspectRatio: '1 / 1',
              width: '100%',
              borderRadius: '0',
              flex: '1',
              bgcolor: '#659AD2',
              minWidth: '80px',
              maxWidth: '80px',
          }}
      >
          {cell === null ? '' : <Piece koma={cell[0]} player={first_player} isPromoted={cell[2]} {...cell} isOnBoard={false} />}
      </Button>
    )
  }
  else{
    if(selected_piece_position[0]===x){
      return(
        <Button
            size="lg"
            variant="outlined"
            onClick={() => {
                onClick( [x,y+100] )
            }}
            data-testid={`cell-${x}-${y}`}
            sx={{
                aspectRatio: '1 / 1',
                width: '100%',
                borderRadius: '0',
                flex: '1',
                bgcolor: '#FF9999',
                minWidth: '80px',
                maxWidth: '80px',
            }}
        >
            {cell === null ? '' : <Piece koma={cell[0]} player={first_player} isPromoted={cell[2]} {...cell} isOnBoard={false} />}
        </Button>
      )
    }
    else{
      return(
        <Button
            size="lg"
            variant="outlined"
            onClick={() => {
                onClick( [x,100] )
            }}
            data-testid={`cell-${x}-${y}`}
            sx={{
                aspectRatio: '1 / 1',
                width: '100%',
                borderRadius: '0',
                flex: '1',
                bgcolor: '#659AD2',
                minWidth: '80px',
                maxWidth: '80px',
            }}
        >
            {cell === null ? '' : <Piece koma={cell[0]} player={first_player} isPromoted={cell[2]} {...cell} isOnBoard={false} />}
        </Button>
      )
    }
  }
}
