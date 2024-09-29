import React from 'react'
import { Board } from '../boards/first/Board'
import { Board2 } from '../boards/second/Board2'
import SystemMessage from './SystemMessage'
import type { BoardProps } from 'boardgame.io/react'
import type { GameState } from 'core/types'



export type MainViewProps = BoardProps<GameState>



// 先手と後手で盤面を逆にする
const first_player = '0';
const second_player = '1';


const CoShogiMainView: React.FC<MainViewProps> = ({ G, moves, ctx, matchData, playerID }) => {
  if(playerID === first_player){
    return (
      <>
        <SystemMessage
          currentPlayer={ctx.currentPlayer}
          matchData={matchData}
          result={ctx.gameover}
          nowStage={G.stage_name} 
        />
        <Board 
          board={G.board} 
          
          onClick={moves.clickCell} 

          now_player = {ctx.currentPlayer}
          
          prepare_board_first={G.prepare_board_first}
          piece_setting_board={G.piece_setting_board}
          selected_setting_piece_position={G.selected_setting_piece_position_first}
          cost_first={G.cost_first}

          movable_place={G.movable_place} 
          CapturedPieceOfFirst={G.captured_piece_first} 
          CapturedPieceOfSecond={G.captured_piece_second} 
          selected_piece_position={G.selected_piece_position} 
          next_move_place={G.next_move_place}
          
          nowStage={G.stage_name} 
        />  
      </>
    )
  }
  else if(playerID === second_player){
    return (
      <>
        <SystemMessage
          currentPlayer={ctx.currentPlayer}
          matchData={matchData}
          result={ctx.gameover}
          nowStage={G.stage_name} 
        />
        <Board2 
          board={G.board} 
          
          onClick={moves.clickCell} 
        
          now_player = {ctx.currentPlayer}

          prepare_board_second={G.prepare_board_second}
          piece_setting_board={G.piece_setting_board}
          selected_setting_piece_position={G.selected_setting_piece_position_second}
          cost_second={G.cost_second}

          movable_place={G.movable_place} 
          CapturedPieceOfFirst={G.captured_piece_first} 
          CapturedPieceOfSecond={G.captured_piece_second} 
          selected_piece_position={G.selected_piece_position} 
          
          next_move_place={G.next_move_place}
          
          nowStage={G.stage_name} 
        />
      </>
    )
  }
  else{
    return (<></>)
  }
}
export default CoShogiMainView
