import React from 'react'
import type { CellType } from 'core/models/cell'
import type { Position } from 'core/models/position'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'

import { SelectedCapturedCell } from './CapturedCell/SelectedCapturedCell'
import { UnSelectedCapturedCell } from './CapturedCell/UnSelectedCapturedCell'

import type { PlayerID } from 'boardgame.io'

const first_player = '0';
const second_player = '1';

const captured_piece_first_pos:number = 100;
const captured_piece_second_pos:number = 200;

const is_selected = (pos:number, player:PlayerID, selected_piece_position:SelectedPiecePositionType) : boolean => {
  if(selected_piece_position !== null){
    if(player === first_player){
      if(selected_piece_position[1] === captured_piece_first_pos){
        if( pos === selected_piece_position[0] ){
          return true;
        }
      }
    }
    else if(player === second_player){
      if(selected_piece_position[1] === captured_piece_second_pos){
        if( pos === selected_piece_position[0] ){
          return true;
        }
      }
    }
  }
  return false;
}

export interface CellProps {
  cell: CellType
  position: Position
  onClick: () => void
  player:PlayerID
  selected_piece_position: SelectedPiecePositionType
}

export const CapturedCell: React.FC<CellProps> = ({
  cell,
  position: [pos, player_id],
  onClick,
  player,
  selected_piece_position,
}) => {
  if(is_selected(pos,player,selected_piece_position)){
    return (
      <SelectedCapturedCell
        cell={cell}
        position={[pos, player_id]}
        onClick={() => {
          onClick()
        }}
      />
    )
  }
  else{
    return (
      <UnSelectedCapturedCell
        cell={cell}
        position={[pos, player_id]}
        onClick={() => {
          onClick()
        }}
      />
    )
  }
}
