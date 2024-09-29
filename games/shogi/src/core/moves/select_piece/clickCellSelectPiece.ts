import { INVALID_MOVE } from 'boardgame.io/core'
import Board, { height,width } from '../../models/board'
import PieceManipulation from '../../models/position';
import type { Position } from '../../models/position'
import type { Move } from '../../types'

import CapturedPiece from '../../models/piece_operation_models/CapturedPiece'


// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';


const clickCell: Move<[Position]> = ({ G, playerID, events }, pos) => {
  // console.log(pos);

  // 持ち駒を選ぶ場合
  if(pos[1]===PieceManipulation.captured_piece_first_pos){ //先手
    if(playerID!==first_player){
      return INVALID_MOVE;
    }
    else{
      const captured_piece = CapturedPiece.GetCapturedPiece(G.captured_piece_first,pos[0])
      const movable_place = Board.get_empty_place(G.board,playerID,captured_piece);
      const selected_piece_position = pos;
      const stage_name = 'SelectMove';

      if(movable_place == null){
        return INVALID_MOVE;
      }
      
      events.setStage('SelectMove');
      return { ...G, selected_piece_position, movable_place, stage_name }
    }
  }
  if(pos[1]===PieceManipulation.captured_piece_second_pos){ //後手
    if(playerID!==second_player){
      return INVALID_MOVE;
    }
    else{
      const captured_piece = CapturedPiece.GetCapturedPiece(G.captured_piece_second,pos[0])
      const movable_place = Board.get_empty_place(G.board,playerID,captured_piece);
      const selected_piece_position = pos;
      const stage_name = 'SelectMove';

      if(movable_place == null){
        return INVALID_MOVE;
      }
      
      events.setStage('SelectMove');
      return { ...G, selected_piece_position, movable_place, stage_name }
    }
  }
  

  // 盤面から選ぶ場合
  const selected_piece = Board.get(G.board,pos);
  if(selected_piece===null){
    return INVALID_MOVE;
  }
  else if(selected_piece[1] !== playerID){
    return INVALID_MOVE;
  }

  const movable_place = Board.get_movable_place(G.board, playerID, pos);

  if(movable_place === null){
    return INVALID_MOVE;
  }
  const selected_piece_position = pos;
  const stage_name = 'SelectMove';
  events.setStage('SelectMove');
  return { ...G, selected_piece_position, movable_place, stage_name }
  
}

export default clickCell
