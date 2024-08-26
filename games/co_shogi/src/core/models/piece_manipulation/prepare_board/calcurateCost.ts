
import PrepareBoard, { prepare_height,prepare_width }  from '../../prepare_board'
import type { PrepareBoardType } from '../../prepare_board'
import type { Position } from '../../position'

const first_player:string = '0';
const second_player:string = '1';


function piece_cost( PieceName:string ): number{
  if(PieceName === '歩'){
    return 1;
  }
  else if(PieceName === '香'){
    return 3;
  }
  else if(PieceName === '桂'){
    return 3;
  }
  else if(PieceName === '銀'){
    return 5;
  }
  else if(PieceName === '金'){
    return 5;
  }
  else if(PieceName === '角'){
    return 10;
  }
  else if(PieceName === '飛'){
    return 10;
  }

  return 0;
}

function sum_cost( board:PrepareBoardType ): number{
  var cost:number = 0;

  for (let x:number = 0; x<prepare_width; x++) {
    for (let y:number = 0; y<prepare_height; y++) {
      const place:Position = [x,y];
      const next_place_state = PrepareBoard.get(board,place);
      if ( next_place_state !== null ){
        cost += piece_cost( next_place_state[0] );
      }
    }
  }

  return cost;
}

export const calcurateCost = ( board:PrepareBoardType ) : number => {
  const cost:number = sum_cost( board );
  return cost;
}
