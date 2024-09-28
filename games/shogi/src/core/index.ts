// import { PlayerView } from 'boardgame.io/core';
import Board from './models/board'
import CapturedPiece from './models/piece_operation_models/CapturedPiece';
import MovablePlace from './models/piece_operation_models/MovablePlace';
import NextMovePlace from './models/piece_operation_models/NextMovePlace';
import SelectedPiecePosition from './models/piece_operation_models/SelectedPiecePosition';
import type { Game } from './types'
import StageName from './models/piece_operation_models/Stage_name'

import select_move from './moves/select_move'
import select_piece from './moves/select_piece'
import select_promotion from './moves/select_promotion'

// const first_player = '0';
// const second_player = '1';

const Shogi: Game = {
  name: 'shogi',
  minPlayers: 2,
  maxPlayers: 2,
  setup: () => ({ 
    // board: Board.empty,
    board: Board.init,
    
    selected_piece_position: SelectedPiecePosition.empty,
    next_move_place: NextMovePlace.empty,
    movable_place: MovablePlace.empty,

    is_needed_promotion: false,

    captured_piece_first: CapturedPiece.empty,
    captured_piece_second: CapturedPiece.empty,
    stage_name: StageName.init,
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  endIf: ({ G, ctx }) => Board.result(G.board, ctx.currentPlayer),

  phases: {
    SelectMove: {
      start: true,
      next: 'SelectMove',
      moves: select_piece,
      onBegin: ({ G, ctx, events }) => {
        // 状態をリセットする
        G.movable_place = null;
        G.selected_piece_position = null;
        G.next_move_place = null;
        // G.stage_name==='SelectPiece';
      },
      turn: {
        stages: {
          SelectPiece :{
            moves: select_piece,
          },
          SelectMove: {
            moves: select_move,
          },
          SelectPromotion: {
            moves: select_promotion,
          },
        },
      },
    },
    
  },

}
export default Shogi
