import React from 'react'
// import { Button } from '@mui/joy'
// import { Piece } from '../../pieces/Piece'
import { AccessibleCell } from './Cells/AccessibleCell'
import { InaccessibleCell } from './Cells/InaccessibleCell'
import { SelectedCell } from './Cells/SelectedCell'

import type { CellType } from 'core/models/cell'
import type { MovablePlaceType } from 'core/models/piece_operation_models/MovablePlace'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'
import type { NextMovePlaceType } from 'core/models/piece_operation_models/NextMovePlace'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'
import type { Position } from 'core/models/position'


const height = 9;
const width = 9;


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
  movable_place: MovablePlaceType
  selected_piece_position: SelectedPiecePositionType
  next_move_place: NextMovePlaceType
  nowStage: StageNameType
}

export const Cell2: React.FC<CellProps> = ({
  cell,
  position: [x, y],
  onClick,
  movable_place,
  selected_piece_position,
  next_move_place,
  nowStage, 
}) => {
  if(nowStage === 'SelectMove'){
    if(selected_piece_position !== null){
      if(x === selected_piece_position![0] && y === selected_piece_position![1]){
        return (
          <SelectedCell
            cell={cell}
            position={[x, y]}
            onClick={() => {
              onClick()
            }}
          />
        )
      }
    }
    if(movable_place === null){
      return (
        <InaccessibleCell
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
        <AccessibleCell
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
        <InaccessibleCell
          cell={cell}
          position={[x, y]}
          onClick={() => {
            onClick()
          }}
        />
      )
    }
  }
  else if(nowStage === 'SelectPromotion'){
    if(selected_piece_position !== null){
      if(x === selected_piece_position![0] && y === selected_piece_position![1]){
        return (
          <SelectedCell
            cell={cell}
            position={[x, y]}
            onClick={() => {
              onClick()
            }}
          />
        )
      }
    }
    if(next_move_place === null){
      return (
        <InaccessibleCell
          cell={cell}
          position={[x, y]}
          onClick={() => {
            onClick()
          }}
        />
      )
    }
    else{
      if(x === next_move_place![0] && y === next_move_place![1]){
        return (
          <AccessibleCell
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
          <InaccessibleCell
            cell={cell}
            position={[x, y]}
            onClick={() => {
              onClick()
            }}
          />
        )
      }
    }
  }
  else{
    return (
      <InaccessibleCell
        cell={cell}
        position={[x, y]}
        onClick={() => {
          onClick()
        }}
      />
    )
  }
}
