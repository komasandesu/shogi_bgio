import Board, { height,width }  from '../../board'
import type { BoardType } from '../../board'

import PrepareBoard, { prepare_height,prepare_width }  from '../../prepare_board'
import type { PrepareBoardType } from '../../prepare_board'
import type { CellType } from '../../cell'

import type { CanNeedPromotionType } from '../../piece_operation_models/CanNeedPromotion'
import type { MovablePlaceType } from '../../piece_operation_models/MovablePlace'
import type { Position } from '../../position'

const first_player:string = '0';
const second_player:string = '1';

function setBoard( prepare_board_first:PrepareBoardType, prepare_board_second:PrepareBoardType ): BoardType{
    let startBoard : BoardType = Board.init;

    for (let x:number = width-prepare_width; x<width; x++) {
        for (let y:number = height-prepare_height; y<height; y++) {
          const place:Position = [x-(width-prepare_width),y-(height-prepare_height)];
          const place_state = PrepareBoard.get(prepare_board_first,place);
          // startBoard[y][x] = place_state;
          const board_place:Position = [x,y];
          
          const nextBoard = Board.putPiece(startBoard,place_state,board_place);
          if(nextBoard != null){
            startBoard = nextBoard;
          }
        }
    }

    for (let x:number = 0; x<prepare_width; x++) {
        for (let y:number = 0; y<prepare_height; y++) {
          const place:Position = [x,y];
          const place_state = PrepareBoard.get(prepare_board_second,place);
          // startBoard[prepare_height-y-1][prepare_width-x-1] = place_state;
          const board_place:Position = [prepare_width-x-1,prepare_height-y-1];
          
          const nextBoard = Board.putPiece(startBoard,place_state,board_place);
          if(nextBoard != null){
            startBoard = nextBoard;
          }
        }
    }

    return startBoard;
}

export const initBoard = ( prepare_board_first:PrepareBoardType, prepare_board_second:PrepareBoardType ) : BoardType => {
  const startBoard:BoardType = setBoard( prepare_board_first, prepare_board_second );
  return startBoard;
}
