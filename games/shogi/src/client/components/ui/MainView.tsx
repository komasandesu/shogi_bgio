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


const MainView: React.FC<MainViewProps> = ({ G, moves, ctx, matchData, playerID }) => {
  if(playerID === first_player){
    return (
      <>
        <SystemMessage
          currentPlayer={ctx.currentPlayer}
          matchData={matchData}
          result={ctx.gameover}
        />
        <Board 
          board={G.board} 
          onClick={moves.clickCell} 
          movable_place={G.movable_place} 
          nowStage={G.stage_name} 
          CapturedPieceOfFirst={G.captured_piece_first} 
          CapturedPieceOfSecond={G.captured_piece_second} 
          selected_piece_position={G.selected_piece_position} 
        />  
      </>
    )
  }
  else{
    return (
      <>
        <SystemMessage
          currentPlayer={ctx.currentPlayer}
          matchData={matchData}
          result={ctx.gameover}
        />
        <Board2 board={G.board} 
          onClick={moves.clickCell} 
          movable_place={G.movable_place} 
          nowStage={G.stage_name} 
          CapturedPieceOfFirst={G.captured_piece_first} 
          CapturedPieceOfSecond={G.captured_piece_second} 
          selected_piece_position={G.selected_piece_position} 
        />
      </>
    )
  }
}
export default MainView
