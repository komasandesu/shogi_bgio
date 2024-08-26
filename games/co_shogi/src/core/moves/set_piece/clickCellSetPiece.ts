import { INVALID_MOVE } from 'boardgame.io/core'
import Board from '../../models/board'
import PrepareBoard from '../../models/prepare_board'
import type { Position } from '../../models/position'
import type { Move } from '../../types'

import { calcurateCost } from '../../models/piece_manipulation/prepare_board/calcurateCost'
import { checkNifuPrepareBoard } from '../../models/piece_manipulation/prepare_board/checkNifuPrepareBoard'
import { countKings } from '../../models/piece_manipulation/prepare_board/countKings'

import { initBoard } from '../../models/piece_manipulation/prepare_board/initBoard'

// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';

const total_cost = 61;

function PieceName( x:number ): null|string{
  if( x===0 ){
    return '歩';
  }
  else if( x===1 ){
    return '香';
  }
  else if( x===2 ){
    return '桂';
  }
  else if( x===3 ){
    return '銀';
  }
  else if( x===4 ){
    return '金';
  }
  else if( x===5 ){
    return '角';
  }
  else if( x===6 ){
    return '飛';
  }
  else if( x===7 ){
    return '王';
  }
  else{
    return null;
  }
}

const clickCell: Move<[Position]> = ({ G, playerID, events }, pos) => {
  // console.log(pos);

  const is_set_piece:boolean = pos[1] >= 100 ? true : false;

  if(pos[0]===8 && pos[1]===100){
    if(playerID === first_player){

      if( total_cost < G.cost_first ){ //コストが足りない場合
        return { ...G };
      }
      const num_kings = countKings(G.prepare_board_first);
      if(num_kings == 0){ //王がないときは始めない
        return { ...G }
      }

      const is_ready_first = true;
      const selected_setting_piece_position_first:[number, number] = [pos[0],pos[1]-100];
      if(G.is_ready_second){
        const stage_name = 'SelectPiece';
        const board = initBoard(G.prepare_board_first,G.prepare_board_second);
        return { ...G, board, stage_name, selected_setting_piece_position_first, is_ready_first };
      }
      return { ...G, selected_setting_piece_position_first, is_ready_first };
    }
    if(playerID === second_player){
      
      if( total_cost < G.cost_second ){ //コストが足りない場合
        return { ...G };
      }
      const num_kings = countKings(G.prepare_board_second);
      if(num_kings == 0){ //王がないときは始めない
        return { ...G }
      }

      const is_ready_second = true;
      const selected_setting_piece_position_second:[number, number] = [pos[0],pos[1]-100];
      if(G.is_ready_first){
        const stage_name = 'SelectPiece';
        const board = initBoard(G.prepare_board_first,G.prepare_board_second);
        return { ...G, board, stage_name, selected_setting_piece_position_second, is_ready_second };
      }
      return { ...G, selected_setting_piece_position_second, is_ready_second };
    }
  }

  if(playerID === first_player){ //先手
    //駒を選択
    if(is_set_piece){
      const is_ready_first = false;
      if(pos == null){
        return INVALID_MOVE;
      }
      const selected_setting_piece_position_first:[number, number] = [pos[0],pos[1]-100];
      events.setActivePlayers({all: 'SetPiece'});
      return { ...G, is_ready_first, selected_setting_piece_position_first };
    }
    //駒を削除
    const piece = PrepareBoard.get(G.prepare_board_first, pos);
    if(piece !== null){
      const prepare_board_first = PrepareBoard.putPiece(G.prepare_board_first, null, pos);

      if(prepare_board_first == undefined){
        return INVALID_MOVE;
      }
      
      //コストを更新
      const cost_first = calcurateCost(prepare_board_first);

      events.setActivePlayers({all: 'SetPiece'});
      return { ...G, prepare_board_first, cost_first };
    }

    //駒を追加
    if(G.selected_setting_piece_position_first == null){
      return INVALID_MOVE;
    }
    const piece_name = PieceName(G.selected_setting_piece_position_first[0]);
    if(piece_name == null){
      return INVALID_MOVE;
    }
    const prepare_board_first = PrepareBoard.putPiece(G.prepare_board_first, [piece_name,first_player,false], pos);

    if(prepare_board_first == undefined){
      return INVALID_MOVE;
    }    

    const is_nifu = checkNifuPrepareBoard(prepare_board_first);
    if(is_nifu){ //二歩なら置かない
      return { ...G }
    }
    const num_kings = countKings(prepare_board_first);
    if(num_kings >= 2){ //王が二つ以上なら置かない
      return { ...G }
    }
    
    //コストを更新
    const cost_first = calcurateCost(prepare_board_first);

    events.setActivePlayers({all: 'SetPiece'});
    return { ...G, prepare_board_first, cost_first };
  }
  else{ //後手
    //駒を選択
    if(is_set_piece){
      const is_ready_second = false;
      if(pos == null){
        return INVALID_MOVE;
      }
      const selected_setting_piece_position_second:[number, number] = [pos[0],pos[1]-100];
      events.setActivePlayers({all: 'SetPiece'});
      return { ...G, is_ready_second, selected_setting_piece_position_second };
    }

    //駒を削除
    const piece = PrepareBoard.get(G.prepare_board_second, pos);
    if(piece !== null){
      const prepare_board_second = PrepareBoard.putPiece(G.prepare_board_second, null, pos);

      if(prepare_board_second == undefined){
        return INVALID_MOVE;
      }
      
      //コストを更新
      const cost_second = calcurateCost(prepare_board_second);

      events.setActivePlayers({all: 'SetPiece'});
      return { ...G, prepare_board_second, cost_second };
    }

    //駒を追加
    if(G.selected_setting_piece_position_second == null){
      return INVALID_MOVE;
    }
    const piece_name = PieceName(G.selected_setting_piece_position_second[0]);
    if(piece_name == null){
      return INVALID_MOVE;
    }
    const prepare_board_second = PrepareBoard.putPiece(G.prepare_board_second, [piece_name,second_player,false], pos);

    if(prepare_board_second == undefined){
      return INVALID_MOVE;
    }

    const is_nifu = checkNifuPrepareBoard(prepare_board_second);
    if(is_nifu){ //二歩なら置かない
      return { ...G }
    }
    const num_kings = countKings(prepare_board_second);
    if(num_kings >= 2){ //王が二つ以上なら置かない
      return { ...G }
    }
    
    //コストを更新
    const cost_second = calcurateCost(prepare_board_second);

    events.setActivePlayers({all: 'SetPiece'});
    return { ...G, prepare_board_second, cost_second };
  }
  
  
}

export default clickCell
