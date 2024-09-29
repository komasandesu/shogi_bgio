
import Board, { height,width }  from '../board'
import type { BoardType } from '../board'
import type { CellType } from '../cell'
import type { CanNeedPromotionType } from '../piece_operation_models/CanNeedPromotion'
// import type { MovablePlaceType } from '../piece_operation_models/MovablePlace'
import type { Position } from '../position'

const first_player:string = '0';
const second_player:string = '1';

function detectPromotion( board:BoardType, playerID:string, position:Position, piece:CellType ): CanNeedPromotionType{
  const can_need_promotion : CanNeedPromotionType = [ false,false ];
  const x:number = position[0];
  const y:number = position[1];

  const selected_piece = piece![0];

  if(piece![2]){// すでに成っている場合
    return can_need_promotion;
  }

  if( selected_piece === "歩" || selected_piece === "香" || selected_piece === "桂"|| selected_piece === "銀" || selected_piece === "角" || selected_piece === "飛" ){
    if( playerID === first_player ){
      if ( y <= 2 ){
        can_need_promotion[0] = true;
      }
    }
    if( playerID === second_player ){
      if ( y >= height-3 ){
        can_need_promotion[0] = true;
      }
    }
  }


  if( selected_piece === "歩" || selected_piece === "香" ){
    // 先手
    if( playerID === first_player ){
      if ( y == 0 ){
        can_need_promotion[1] = true;
      }
    }
    // 後手
    else if( playerID === second_player ){
      if ( y == height-1 ){
        can_need_promotion[1] = true;
      }
    }
  }

  if( selected_piece === "桂" ){
    // 先手
    if( playerID === first_player ){
      if ( y <= 1 ){
        can_need_promotion[1] = true;
      }
    }
    // 後手
    else if( playerID === second_player ){
      if ( y >= height-2 ){
        can_need_promotion[1] = true;
      }
    }
  }

  return can_need_promotion;
}

export const CanNeedPromotion = ( board:BoardType, playerID:string, position:Position, piece:CellType ) : CanNeedPromotionType => {
  const MovablePlaces:CanNeedPromotionType = detectPromotion( board, playerID, position, piece );
  return MovablePlaces;
}
