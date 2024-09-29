import { INVALID_MOVE } from 'boardgame.io/core'
import Board, { height,width } from '../../models/board'
import CapturedPiece from '../../models/piece_operation_models/CapturedPiece';
import PieceManipulation from '../../models/position';
import type { Position } from '../../models/position'
import type { Move } from '../../types'


// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';

const clickCell: Move<[Position]> = ({ G, playerID, events }, pos) => {

  /*************************************************************************/
  if(G.selected_piece_position == null){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  else if(pos == null){
    return INVALID_MOVE;
  }
  else if( ((pos[0]===PieceManipulation.CancelSelect[0])&&pos[1]===PieceManipulation.CancelSelect[1]) ){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  else if( (pos[0]===G.selected_piece_position[0])&&(pos[1]===G.selected_piece_position[1]) ){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  else if(pos[1]===PieceManipulation.captured_piece_first_pos || pos[1]===PieceManipulation.captured_piece_second_pos){
    return INVALID_MOVE;
  }
  /*************************************************************************/

  // 動かすことができるかどうか判定
  let can_move:boolean = false;
  for (const accessible_pos of G.movable_place!) {
    if( accessible_pos[0]===pos[0] && accessible_pos[1]===pos[1] ){
      can_move = true;
    }
  }
  if(!can_move){
    return INVALID_MOVE;
  }

  if(G.selected_piece_position == null){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }
  
  const previous_position = G.selected_piece_position;
  const next_position = pos;

  /*************************************************************************/
  if(previous_position[1]===PieceManipulation.captured_piece_first_pos){// 持ち駒を使う場合
    const selected_piece = G.captured_piece_first[previous_position[0]];
    const board = Board.movePiece(G.board, selected_piece, previous_position, next_position);
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const captured_piece_first = CapturedPiece.RemoveCapturedPiece(G.captured_piece_first,previous_position[0]);// 使った持ち駒を削除
    if(board == undefined){
      const stage_name = 'SelectPiece';
      events.setStage('SelectPiece');
      return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
    }
    const stage_name = 'TurnEnd';
    events.endPhase();
    return { ...G, board, movable_place, selected_piece_position, next_move_place, stage_name, captured_piece_first };
  }
  if(previous_position[1]===PieceManipulation.captured_piece_second_pos){// 持ち駒を使う場合
    const selected_piece = G.captured_piece_second[previous_position[0]];
    const board = Board.movePiece(G.board, selected_piece, previous_position, next_position);
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const captured_piece_second = CapturedPiece.RemoveCapturedPiece(G.captured_piece_second,previous_position[0]);// 使った持ち駒を削除
    if(board == undefined){
      const stage_name = 'SelectPiece';
      events.setStage('SelectPiece');
      return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
    }
    const stage_name = 'TurnEnd';
    events.endPhase();
    return { ...G, board, movable_place, selected_piece_position, next_move_place, stage_name, captured_piece_second };
  }
  /*************************************************************************/

  // 成ることができるかどうか
  const selected_piece = Board.get(G.board,G.selected_piece_position);

  if(selected_piece == null){
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    const stage_name = 'SelectPiece';
    events.setStage('SelectPiece');
    return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
  }

  // console.log(selected_piece[0],selected_piece[1],selected_piece[2]);
  const CanNeedPromotion = Board.detectPromotion(G.board,playerID,pos,selected_piece);
  
  const CanPromotion = CanNeedPromotion[0];
  const is_needed_promotion = CanNeedPromotion[1];

  // 王を取る場合は即終了する
  const taken_piece = Board.get(G.board,pos);
  if(taken_piece!==null){
    if((taken_piece[0])==='王'){
      const board = Board.movePiece(G.board, selected_piece, previous_position, next_position);
      // 状態をリセットする
      const movable_place = null;
      const selected_piece_position = null;
      const next_move_place = null;
      if(board == undefined){
        const stage_name = 'SelectPiece';
        events.setStage('SelectPiece');
        return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
      }

      const stage_name = 'TurnEnd';
      events.endPhase();
      return { ...G, board, movable_place, selected_piece_position, next_move_place, stage_name };
    }
  }

  if(CanPromotion){// 成ることができる場合
    const next_move_place = pos;
    const stage_name = 'SelectPromotion';
    events.setStage('SelectPromotion');
    return { ...G, next_move_place, stage_name, is_needed_promotion }
  }
  else{
    // 成ることができない場合
    const board = Board.movePiece(G.board, selected_piece, previous_position, next_position);
    // 状態をリセットする
    const movable_place = null;
    const selected_piece_position = null;
    const next_move_place = null;
    if(board == undefined){
      const stage_name = 'SelectPiece';
      events.setStage('SelectPiece');
      return { ...G, movable_place, selected_piece_position, next_move_place, stage_name };
    }

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
  
}

export default clickCell
