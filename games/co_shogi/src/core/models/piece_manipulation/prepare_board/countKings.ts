
import PrepareBoard, { prepare_height,prepare_width }  from '../../prepare_board'
import type { PrepareBoardType } from '../../prepare_board'
import type { Position } from '../../position'

const first_player:string = '0';
const second_player:string = '1';


function num_kings( board:PrepareBoardType ): number{
    let count_king:number = 0;  

    for (let x:number = 0; x<prepare_width; x++) {
        for (let y:number = 0; y<prepare_height; y++) {
            const place:Position = [x,y];
            const next_place_state = PrepareBoard.get(board,place);
            if ( next_place_state !== null ){
                if ( next_place_state[0] === '王' ){
                    count_king += 1;
                }
            }
        }
    }

    return count_king;
}

export const countKings = ( board:PrepareBoardType ) : number => {
  const kings:number = num_kings( board );
  return kings;
}
