import { INVALID_MOVE } from 'boardgame.io/core'
import Board from '../../models/board'
import CapturedPiece from '../../models/piece_operation_models/CapturedPiece';
import PieceManipulation from '../../models/position';
import type { CellType } from '../../models/cell';
import type { Position } from '../../models/position'
import type { Move } from '../../types'


// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';

const clickCellOffline: Move<[Position]> = ({ G, playerID, events }, pos) => {
  /*************************************************************************/
  if(pos == null){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  else if( !((pos[0]===PieceManipulation.SelectPromotion[0])&&pos[1]===PieceManipulation.SelectPromotion[1]) && !((pos[0]===PieceManipulation.UnSelectPromotion[0])&&pos[1]===PieceManipulation.UnSelectPromotion[1]) ){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  /*************************************************************************/
  

  const previous_position = G.selected_piece_position;
  const next_position = G.next_move_place;

  if(previous_position == null || next_position == null){
    // 状態をリセットする
    G.movable_place = null;
    G.selected_piece_position = null;
    G.next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, stage_name };
  }


  const selected_piece:CellType = Board.get(G.board,previous_position);

  /*************************************************************************/
  if(selected_piece == null){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  /*************************************************************************/

  const set_piece:CellType = ['','',false];
  set_piece[0] = selected_piece[0];
  set_piece[1] = selected_piece[1];
  set_piece[2] = selected_piece[2];
  if( ((pos[0]===PieceManipulation.SelectPromotion[0])&&pos[1]===PieceManipulation.SelectPromotion[1]) ){
    // 成る
    set_piece[2] = true;
  }

  /*************************************************************************/
  const board = Board.movePiece(G.board, set_piece, previous_position, next_position);
  // 状態をリセットする
  const movable_place = null;
  const selected_piece_position = null;
  const next_move_place = null;

  if(board == undefined || G.next_move_place==null){
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G ,movable_place, selected_piece_position, next_move_place, stage_name }
  }
  
  const taken_piece = Board.get(G.board,G.next_move_place);

  if(taken_piece==null){
    const stage_name = 'TurnEnd';
    events.endPhase();
    return { ...G, board, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  if(playerID===first_player){
    const captured_piece_first = CapturedPiece.AddCapturedPiece(G.captured_piece_first,[taken_piece[0],first_player,false]);
    const stage_name = 'TurnEnd';
    events.endPhase();
    return { ...G, board, movable_place, selected_piece_position, next_move_place, stage_name, captured_piece_first };
  }
  if(playerID===second_player){
    const captured_piece_second = CapturedPiece.AddCapturedPiece(G.captured_piece_second,[taken_piece[0],second_player,false]);
    const stage_name = 'TurnEnd';
    events.endPhase();
    return { ...G, board, movable_place, selected_piece_position, next_move_place, stage_name, captured_piece_second };
  }
  
}

export default clickCellOffline
