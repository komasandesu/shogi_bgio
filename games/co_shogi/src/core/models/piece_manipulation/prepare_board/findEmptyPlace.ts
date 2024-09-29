import Board, { height,width }  from '../../board'
import type { BoardType } from '../../board'
import type { MovablePlaceType } from '../../piece_operation_models/MovablePlace'
import type { Position } from '../../position'


const first_player:string = '0';
const second_player:string = '1';

function FindEmptyPlace( board:BoardType ): MovablePlaceType{
  const empty_places : MovablePlaceType = Array(0);

  for (let x:number = 0; x<width; x++) {
    for (let y:number = 0; y<height; y++) {
      const next_place:Position = [x,y];
      const next_place_state = Board.get(board,next_place);
      if ( next_place_state == null ){
        empty_places.push( next_place );
      }
    }
  }
    

  return empty_places;
}

export const EmptyPlace = ( board:BoardType ) : MovablePlaceType => {
  const MovablePlaces:MovablePlaceType = FindEmptyPlace( board );
  if(MovablePlaces!.length>0){ 
    return MovablePlaces;
  }
  else{
    return null;
  }
}
