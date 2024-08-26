import React from 'react'
import { Button } from '@mui/joy'
import { Piece } from '../../pieces/Piece'
import { AccessibleCellOffline } from './Cells/Accessible_cell_offline'
import type { CellType } from 'core/models/cell'
import { InaccessibleCellOffline } from './Cells/Inaccessible_cell_offline'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { Position } from 'core/models/position'



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
  position: Position
  movable_place: MovablePlaceType
  onClick: () => void
}

export const CellOffline: React.FC<CellProps> = ({
  cell,
  position: [x, y],
  onClick,
  movable_place
}) => {
  if(movable_place === null){
    return (
      <InaccessibleCellOffline
        cell={cell}
        position={[x, y]}
        onClick={() => {
          onClick()
        }}
      />
    )
  }
  else if(is_accessible([x,y],movable_place)){
    return (
      <AccessibleCellOffline
        cell={cell}
        position={[x, y]}
        onClick={() => {
          onClick()
        }}
      />
    )
  }
  else{
    return (
      <InaccessibleCellOffline
        cell={cell}
        position={[x, y]}
        onClick={() => {
          onClick()
        }}
      />
    )
  }
}
