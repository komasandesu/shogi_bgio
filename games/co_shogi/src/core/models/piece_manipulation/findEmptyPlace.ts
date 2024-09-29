import Board, { height,width }  from '../board'
import type { BoardType } from '../board'
import type { CellType } from '../cell'
import type { MovablePlaceType } from '../piece_operation_models/MovablePlace'
import type { Position } from '../position'

import type { PlayerID } from 'boardgame.io'

function check_nifu( x:number,player:PlayerID,board:BoardType ): boolean{

  let count_pawn:number = 0;
  for (let y:number = 0; y<height; y++) {
    const place:Position = [x,y];
    const place_state = Board.get(board,place);
    if ( place_state !== null ){
      if ( place_state[0] === '歩' && (!place_state[2]) ){
        if(place_state[1]===player)count_pawn += 1;
      }
    }
  }

  if(count_pawn>=1){
    return true;
  }
  return false;
}


function FindEmptyPlace( player:PlayerID, board:BoardType, piece:CellType ): MovablePlaceType{
  const empty_places : MovablePlaceType = Array(0);

  if(piece == null){
    return null;
  }

  for (let x:number = 0; x<width; x++) {
    //二歩にならないようにする
    if(piece[0] === '歩'){
      if(check_nifu( x, player, board )){
        continue;
      }
    }
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

export const EmptyPlace = ( now_player:PlayerID, board:BoardType, piece:CellType ) : MovablePlaceType => {
  const MovablePlaces:MovablePlaceType = FindEmptyPlace( now_player, board, piece );
  if(MovablePlaces!.length>0){ 
    return MovablePlaces;
  }
  else{
    return null;
  }
}
