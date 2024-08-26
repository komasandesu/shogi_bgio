import { INVALID_MOVE } from 'boardgame.io/core'
import Board from '../../models/board'
import CapturedPiece from '../../models/piece_operation_models/CapturedPiece';
import PieceManipulation from '../../models/position';
import type { CellType } from '../../models/cell';
import type { Position } from '../../models/position'
import type { Move } from '../../types'


// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';

const clickCell: Move<[Position]> = ({ G, playerID, events }, pos) => {
  
  const stage_name = 'SetPiece';
  events.setActivePlayers({all: 'SetPiece'});
  return { ...G, stage_name };
  
}

export default clickCell
