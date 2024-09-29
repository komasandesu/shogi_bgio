
import Board, { height,width }  from '../board'
import type { BoardType } from '../board'
import type { Position } from '../position'

const first_player:string = '0';
const second_player:string = '1';


function nifu( board:BoardType ): boolean{
  // var cost:number = 0;

  for (let x:number = 0; x<width; x++) {
    let count_pawn_first:number = 0;
    let count_pawn_second:number = 0;
    for (let y:number = 0; y<height; y++) {
      const place:Position = [x,y];
      const place_state = Board.get(board,place);
      if ( place_state !== null ){
        if ( place_state[0] === '歩' && (!place_state[2]) ){
          if(place_state[1]===first_player)count_pawn_first += 1;
          if(place_state[1]===first_player)count_pawn_second += 1;
        }
      }
    }

    if(count_pawn_first>=2){
      return true;
    }
    if(count_pawn_second>=2){
      return true;
    }
  }

  return false;
}

export const checkNifu = ( board:BoardType ) : boolean => {
  const is_nifu:boolean = nifu( board );
  return is_nifu;
}
