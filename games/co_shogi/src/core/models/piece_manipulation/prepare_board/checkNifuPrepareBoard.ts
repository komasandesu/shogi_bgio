
import PrepareBoard, { prepare_height,prepare_width }  from '../../prepare_board'
import type { PrepareBoardType } from '../../prepare_board'
import type { Position } from '../../position'

const first_player:string = '0';
const second_player:string = '1';


function nifu( board:PrepareBoardType ): boolean{
  var cost:number = 0;

  for (let x:number = 0; x<prepare_width; x++) {
    let count_pawn:number = 0;
    for (let y:number = 0; y<prepare_height; y++) {
      const place:Position = [x,y];
      const next_place_state = PrepareBoard.get(board,place);
      if ( next_place_state !== null ){
        if ( next_place_state[0] === '歩' ){
          count_pawn += 1;
        }
      }
    }

    if(count_pawn>=2){
      return true;
    }
  }

  return false;
}

export const checkNifuPrepareBoard = ( board:PrepareBoardType ) : boolean => {
  const is_nifu:boolean = nifu( board );
  return is_nifu;
}
