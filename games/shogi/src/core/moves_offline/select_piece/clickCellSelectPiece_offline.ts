import { INVALID_MOVE } from 'boardgame.io/core'
import Board, { height,width } from '../../models/board'
import PieceManipulation from '../../models/position';
import type { Position } from '../../models/position'
import type { Move } from '../../types'



// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';


const clickCellOffline: Move<[Position]> = ({ G, playerID, events }, pos) => {
  // console.log(pos);

  // 持ち駒を選ぶ場合
  if(pos[1]===PieceManipulation.captured_piece_first_pos){
    if(playerID!==first_player){
      return INVALID_MOVE;
    }
    else{
      const movable_place = Board.get_empty_place(G.board);
      const selected_piece_position = pos;
      const stage_name = 'SelectMove';
      events.setStage('SelectMove');
      return { ...G, selected_piece_position, movable_place, stage_name }
    }
  }
  if(pos[1]===PieceManipulation.captured_piece_second_pos){
    if(playerID!==second_player){
      return INVALID_MOVE;
    }
    else{
      const movable_place = Board.get_empty_place(G.board);
      const selected_piece_position = pos;
      const stage_name = 'SelectMove';
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


  // console.log(selected_piece[0],selected_piece[1],selected_piece[2]);

  const movable_place = Board.get_movable_place(G.board, playerID, pos);

  if(movable_place === null){
    return INVALID_MOVE;
  }
  const selected_piece_position = pos;
  const stage_name = 'SelectMove';

  // G.selected_piece_position = pos;
  // G.movable_place = next_movable_place;
  // G.stage_name = 'SelectMove';
  events.setStage('SelectMove');
  return { ...G, selected_piece_position, movable_place, stage_name }
  
}

export default clickCellOffline
