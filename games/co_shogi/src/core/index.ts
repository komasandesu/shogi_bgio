// import { PlayerView } from 'boardgame.io/core';
import Board from './models/board'
import PrepareBoard from './models/prepare_board'
import PieceSettingBoard from './models/piece_setting'

import CapturedPiece from './models/piece_operation_models/CapturedPiece';
import MovablePlace from './models/piece_operation_models/MovablePlace';
import NextMovePlace from './models/piece_operation_models/NextMovePlace';
import SelectedPiecePosition from './models/piece_operation_models/SelectedPiecePosition';
import type { Game } from './types'
import StageName from './models/piece_operation_models/Stage_name'

import select_move from './moves/select_move'
import select_piece from './moves/select_piece'
import select_promotion from './moves/select_promotion'
import set_start from './moves/set_start';
import set_piece from './moves/set_piece';

const first_player = '0';
const second_player = '1';

const CoShogi: Game = {
  name: 'co-shogi',
  minPlayers: 2,
  maxPlayers: 2,
  setup: () => ({ 
    // board: Board.empty,
    board: Board.empty,

    prepare_board_first: PrepareBoard.empty,
    prepare_board_second: PrepareBoard.empty,
    cost_first: 0,
    cost_second: 0,
    piece_setting_board: PieceSettingBoard.init,
    selected_setting_piece_position_first: SelectedPiecePosition.empty,
    selected_setting_piece_position_second: SelectedPiecePosition.empty,
    is_ready_first: false,
    is_ready_second: false,

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
    SetPiece: {
      start: true,
      next: 'Blank',
      moves: set_start,
      endIf({G}) {
        if(G.is_ready_first && G.is_ready_second){
          return true;
        }
      },
      onBegin: ({ G, ctx, events }) => {
        // 状態をリセットする
      },
      turn: {
        stages: {
          SetPiece :{
            moves: set_piece,
          },
        },
      },
    },

    Blank: {
      next: 'SelectMove',
      onBegin: ({ G, ctx, events }) => {
        events.endPhase();
      },
    },

    SelectMove: {
      //start: true,
      next: 'SelectMove',
      moves: select_piece,
      onBegin: ({ G, ctx, events }) => {
        // console.log(ctx.currentPlayer);
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
export default CoShogi
