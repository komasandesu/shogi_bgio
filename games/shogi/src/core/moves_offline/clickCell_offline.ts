import React from 'react';
import { INVALID_MOVE } from 'boardgame.io/core'
import Board from '../models/board'
import type { Position } from '../models/position'
import type { Move2 } from '../types'


const clickCellOffline: Move2<[Position]> = ({ G, playerID }, pos) => {
  
  if(G.stage_name==='SelectKoma'){
    console.log(1);
    const board = Board.putPiece(G.board, ["歩",playerID,false], pos);
    if (board === undefined) {
      return INVALID_MOVE
    }
    const stage_name = 'SelectMove';
    return { ...G, board, stage_name }
  }
  else if(G.stage_name==='SelectMove'){
    console.log(2);
    const board = Board.putPiece(G.board, ["歩",playerID,false], pos);
    if (board === undefined) {
      return INVALID_MOVE
    }
    const stage_name = 'SelectPromotion';
    return { ...G, board, stage_name }
  }
  else if(G.stage_name==='SelectPromotion'){
    console.log(3);
    const board = Board.putPiece(G.board, ["歩",playerID,false], pos);
    if (board === undefined) {
      return INVALID_MOVE
    }
    const stage_name = 'TurnEnd';
    return { ...G, board, stage_name }
  }
  console.log(4);
  
  const board = G.board;
  const stage_name = G.stage_name;
  return { ...G, board, stage_name }

  
}

export default clickCellOffline
