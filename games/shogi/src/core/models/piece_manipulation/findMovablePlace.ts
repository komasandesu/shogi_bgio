import Board, { height,width }  from '../../models/board'
import type { BoardType } from '../board'
import type { MovablePlaceType } from '../piece_operation_models/MovablePlace'
import type { Position } from '../position'


const first_player:string = '0';
const second_player:string = '1';

function FindMovablePlace( board:BoardType, playerID:string, position:Position ): MovablePlaceType{
  const movable_places : MovablePlaceType = Array(0);
  const x:number = position[0];
  const y:number = position[1];

  const selected_piece = board[y][x]![0];
  const is_promoted = board[y][x]![2];


  if( selected_piece === "歩" && !is_promoted ){
    // 先手
    if( playerID === first_player ){
      const next_y = y-1;
      if ( next_y >= 0 ){
        const next_place:Position = [x,next_y];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state === null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] !== playerID ){
          movable_places.push( next_place );
        }
      }
    }
    // 後手
    else if( playerID === second_player ){
      const next_y = y+1;
      if( next_y < height ){
        const next_place:Position = [x,next_y];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state === null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] !== playerID ){
          movable_places.push( next_place );
        }
      }
    }
  }

  if( selected_piece === "香" && !is_promoted ){
    // 先手
    if( playerID === first_player ){
      for (let k:number = 1; y-k>=0; k++) {
        const next_y = y-k;
        const next_place:Position = [x,next_y];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state === null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] === second_player ){
          movable_places.push( next_place );
          break;
        }
        else{
          break;
        }
      }
    }
    // 後手
    else if( playerID === second_player ){
      for (let k:number = 1; y+k<width ; k++) {
        const next_y = y+k;
        const next_place:Position = [x,next_y];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state === null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] === first_player ){
          movable_places.push( next_place );
          break;
        }
        else{
          break;
        }
      }
    }
  }

  if( selected_piece === "桂" && !is_promoted ){
    // 先手
    if( playerID === first_player ){
      const next_y = y-2;
      const next_x_1 = x+1;
      const next_x_2 = x-1;
      if ( next_y>=0 ){
        if ( next_x_1<width ){
          const next_place:Position = [next_x_1,next_y];
          const next_place_state = Board.get(board,next_place);
          if ( next_place_state == null ){
            movable_places.push( next_place );
          }
          else if ( next_place_state[1] !== playerID ){
            movable_places.push( next_place );
          }
        }
        
        if ( next_x_2>=0 ){
          const next_place:Position = [next_x_2,next_y];
          const next_place_state = Board.get(board,next_place);
          if ( next_place_state == null ){
            movable_places.push( next_place );
          }
          else if ( next_place_state[1] !== playerID ){
            movable_places.push( next_place );
          }
        }
      }
    }
    // 後手
    else if( playerID === second_player ){
      const next_y = y+2;
      const next_x_1 = x+1;
      const next_x_2 = x-1;
      if ( next_y<height ){
        if ( next_x_1<width ){
          const next_place:Position = [next_x_1,next_y];
          const next_place_state = Board.get(board,next_place);
          if ( next_place_state == null ){
            movable_places.push( next_place );
          }
          else if ( next_place_state[1] !== playerID ){
            movable_places.push( next_place );
          }
        }
        
        if ( next_x_2>=0 ){
          const next_place:Position = [next_x_2,next_y];
          const next_place_state = Board.get(board,next_place);
          if ( next_place_state == null ){
            movable_places.push( next_place );
          }
          else if ( next_place_state[1] !== playerID ){
            movable_places.push( next_place );
          }
        }
      }
    }
  }

  if( selected_piece === "銀" && !is_promoted ){
    // 先手
    if( playerID === first_player ){
      const next_y_1 = y-1;
      const next_y_2 = y+1;
      const next_x_1 = x-1;
      const next_x_2 = x+1;
      if ( next_y_1>=0 ){
        // 多分前
        const next_place_1:Position = [x,next_y_1];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }

        if ( next_x_1>=0 ){
          const next_place_2:Position = [next_x_1,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          const next_place_2:Position = [next_x_2,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
      if ( next_y_2<height ){
        if ( next_x_1>=0 ){
          const next_place_2:Position = [next_x_1,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          const next_place_2:Position = [next_x_2,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
    }
    // 後手
    else if( playerID === second_player ){
      const next_y_1 = y-1;
      const next_y_2 = y+1;
      const next_x_1 = x-1;
      const next_x_2 = x+1;
      if ( next_y_1>=0 ){
        if ( next_x_1>=0 ){
          const next_place_2:Position = [next_x_1,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          const next_place_2:Position = [next_x_2,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
      if ( next_y_2<height ){
        // 多分前
        const next_place_1:Position = [x,next_y_2];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }

        if ( next_x_1>=0 ){
          const next_place_2:Position = [next_x_1,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          const next_place_2:Position = [next_x_2,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
    }

  }

  if( selected_piece === "金" || ((selected_piece === "歩"||selected_piece === "香"||selected_piece === "桂"||selected_piece === "銀") && is_promoted) ){
    // 先手
    if( playerID === first_player ){
      const next_y_1 = y-1;
      const next_y_2 = y+1;
      const next_x_1 = x-1;
      const next_x_2 = x+1;
      if ( next_y_1>=0 ){
        // 上に移動
        const next_place_1:Position = [x,next_y_1];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }

        if ( next_x_1>=0 ){
          // 左上に移動
          const next_place_2:Position = [next_x_1,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          // 右上に移動
          const next_place_2:Position = [next_x_2,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
      if ( next_y_2<height ){
        // 下に移動
        const next_place_1:Position = [x,next_y_2];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }
      }
      if ( next_x_1>=0 ){
        // 左に移動
        const next_place_1:Position = [next_x_1,y];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }
      }
      if ( next_x_2<width ){
        // 右に移動
        const next_place_1:Position = [next_x_2,y];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }
      }
    }
    // 後手
    else if( playerID === second_player ){
      const next_y_1 = y-1;
      const next_y_2 = y+1;
      const next_x_1 = x-1;
      const next_x_2 = x+1;
      if ( next_y_1>=0 ){
        // 下に移動
        const next_place_1:Position = [x,next_y_1];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }
      }
      if ( next_y_2<height ){
        // 上に移動
        const next_place_1:Position = [x,next_y_2];
        const next_place_state_1 = Board.get(board,next_place_1);
        if ( next_place_state_1 == null ){
          movable_places.push( next_place_1 );
        }
        else if ( next_place_state_1[1] !== playerID ){
          movable_places.push( next_place_1 );
        }

        if ( next_x_1>=0 ){
          // 右上に移動
          const next_place_2:Position = [next_x_1,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          // 左上に移動
          const next_place_2:Position = [next_x_2,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
      if ( next_x_1>=0 ){
        // 左に移動
        const next_place_2:Position = [next_x_1,y];
        const next_place_state_2 = Board.get(board,next_place_2);
        if ( next_place_state_2 == null ){
          movable_places.push( next_place_2 );
        }
        else if ( next_place_state_2[1] !== playerID ){
          movable_places.push( next_place_2 );
        }
      }
      if ( next_x_2<width ){
        // 右に移動
        const next_place_2:Position = [next_x_2,y];
        const next_place_state_2 = Board.get(board,next_place_2);
        if ( next_place_state_2 == null ){
          movable_places.push( next_place_2 );
        }
        else if ( next_place_state_2[1] !== playerID ){
          movable_places.push( next_place_2 );
        }
      }
    }
  }

  if( selected_piece === "角" ){
    for (let k:number = 1; (y+k<height)&&(x+k<width); k++) {
      const next_x = x+k;
      const next_y = y+k;
      const next_place:Position = [next_x,next_y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }
    for (let k:number = 1; (y-k>=0)&&(x-k>=0); k++) {
      const next_x = x-k;
      const next_y = y-k;
      const next_place:Position = [next_x,next_y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }
    for (let k:number = 1; (y+k<height)&&(x-k>=0); k++) {
      const next_x = x-k;
      const next_y = y+k;
      const next_place:Position = [next_x,next_y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }
    for (let k:number = 1; (y-k>=0)&&(x+k<width); k++) {
      const next_x = x+k;
      const next_y = y-k;
      const next_place:Position = [next_x,next_y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }

    // 成っている場合
    if(is_promoted){
      const next_y_1 = y-1;
      const next_y_2 = y+1;
      const next_x_1 = x-1;
      const next_x_2 = x+1;
      if ( next_y_1>=0 ){
        const next_place:Position = [x,next_y_1];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state == null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] !== playerID ){
          movable_places.push( next_place );
        }
      }
      if ( next_y_2<height ){
        const next_place:Position = [x,next_y_2];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state == null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] !== playerID ){
          movable_places.push( next_place );
        }
      }
      if ( next_x_1>=0 ){
        const next_place:Position = [next_x_1,y];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state == null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] !== playerID ){
          movable_places.push( next_place );
        }
      }
      if ( next_x_2<width ){
        const next_place:Position = [next_x_2,y];
        const next_place_state = Board.get(board,next_place);
        if ( next_place_state == null ){
          movable_places.push( next_place );
        }
        else if ( next_place_state[1] !== playerID ){
          movable_places.push( next_place );
        }
      }
    }
  }

  if( selected_piece === "飛" ){
    for (let k:number = 1; y+k<height; k++) {
      const next_y = y+k;
      const next_place:Position = [x,next_y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }
    for (let k:number = 1; y-k>=0; k++) {
      const next_y = y-k;
      const next_place:Position = [x,next_y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }
    for (let k:number = 1; x+k<width; k++) {
      const next_x = x+k;
      const next_place:Position = [next_x,y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }
    for (let k:number = 1; x-k>=0; k++) {
      const next_x = x-k;
      const next_place:Position = [next_x,y];
      // const next_place:Position = [y,next_x];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        movable_places.push( next_place );
      }
      else if ( next_place_state[1] !== playerID ){
        movable_places.push( next_place );
        break;
      }
      else if ( next_place_state[1] === playerID ){
        break;
      }
    }

    // 成っている場合
    if(is_promoted){
      const next_y_1 = y-1;
      const next_y_2 = y+1;
      const next_x_1 = x-1;
      const next_x_2 = x+1;
      if ( next_y_1>=0 ){
        if ( next_x_1>=0 ){
          const next_place_2:Position = [next_x_1,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          const next_place_2:Position = [next_x_2,next_y_1];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
      if ( next_y_2<height ){
        if ( next_x_1>=0 ){
          const next_place_2:Position = [next_x_1,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
        if ( next_x_2<width ){
          const next_place_2:Position = [next_x_2,next_y_2];
          const next_place_state_2 = Board.get(board,next_place_2);
          if ( next_place_state_2 == null ){
            movable_places.push( next_place_2 );
          }
          else if ( next_place_state_2[1] !== playerID ){
            movable_places.push( next_place_2 );
          }
        }
      }
    }
  }

  if( selected_piece === "王" ){
    const next_y_1 = y-1;
    const next_y_2 = y+1;
    const next_x_1 = x-1;
    const next_x_2 = x+1;
    if(next_y_1 >= 0){
      const next_place_1:Position = [x,next_y_1];
      const next_place_state_1 = Board.get(board,next_place_1);
      if ( next_place_state_1 == null ){
        movable_places.push( next_place_1 );
      }
      else if ( next_place_state_1[1] !== playerID ){
        movable_places.push( next_place_1 );
      }

      if(next_x_1 >= 0){
        const next_place_2:Position = [next_x_1,next_y_1];
        const next_place_state_2 = Board.get(board,next_place_2);
        if ( next_place_state_2 == null ){
          movable_places.push( next_place_2 );
        }
        else if ( next_place_state_2[1] !== playerID ){
          movable_places.push( next_place_2 );
        }
      }
      if(next_x_2 < width){
        const next_place_2:Position = [next_x_2,next_y_1];
        const next_place_state_2 = Board.get(board,next_place_2);
        if ( next_place_state_2 == null ){
          movable_places.push( next_place_2 );
        }
        else if ( next_place_state_2[1] !== playerID ){
          movable_places.push( next_place_2 );
        }
      }
    }
    if(next_y_2 < height){
      const next_place_1:Position = [x,next_y_2];
      const next_place_state_1 = Board.get(board,next_place_1);
      if ( next_place_state_1 == null ){
        movable_places.push( next_place_1 );
      }
      else if ( next_place_state_1[1] !== playerID ){
        movable_places.push( next_place_1 );
      }

      if(next_x_1 >= 0){
        const next_place_2:Position = [next_x_1,next_y_2];
        const next_place_state_2 = Board.get(board,next_place_2);
        if ( next_place_state_2 == null ){
          movable_places.push( next_place_2 );
        }
        else if ( next_place_state_2[1] !== playerID ){
          movable_places.push( next_place_2 );
        }
      }
      if(next_x_2 < width){
        const next_place_2:Position = [next_x_2,next_y_2];
        const next_place_state_2 = Board.get(board,next_place_2);
        if ( next_place_state_2 == null ){
          movable_places.push( next_place_2 );
        }
        else if ( next_place_state_2[1] !== playerID ){
          movable_places.push( next_place_2 );
        }
      }
    }
    if(next_x_1 >= 0){
      const next_place_1:Position = [next_x_1,y];
      const next_place_state_1 = Board.get(board,next_place_1);
      if ( next_place_state_1 == null ){
        movable_places.push( next_place_1 );
      }
      else if ( next_place_state_1[1] !== playerID ){
        movable_places.push( next_place_1 );
      }
    }
    if(next_x_2 < width){
      const next_place_1:Position = [next_x_2,y];
      const next_place_state_1 = Board.get(board,next_place_1);
      if ( next_place_state_1 == null ){
        movable_places.push( next_place_1 );
      }
      else if ( next_place_state_1[1] !== playerID ){
        movable_places.push( next_place_1 );
      }
    }
  }

  return movable_places;
}

export const MovablePlace = ( board:BoardType, playerID:string, position:Position ) : MovablePlaceType => {
  const MovablePlaces:MovablePlaceType = FindMovablePlace( board, playerID, position );
  if(MovablePlaces!.length>0){ 
    return MovablePlaces;
  }
  else{
    return null;
  }
}
