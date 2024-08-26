import React from 'react'
import { BoardOffline } from '../../boards/develop/Board_offline'
import SystemMessage from '../SystemMessage'
import type { BoardProps } from 'boardgame.io/react'
import type { GameState } from 'core/types'


export type MainViewProps = BoardProps<GameState>



const MainViewOffline: React.FC<MainViewProps> = ({ G, moves, ctx, matchData, playerID }) => {
  return (
    <>
      <SystemMessage
        currentPlayer={ctx.currentPlayer}
        matchData={matchData}
        result={ctx.gameover}
      />
      <BoardOffline board={G.board} onClick={moves.clickCellOffline} movable_place={G.movable_place} nowStage={G.stage_name} 
      CapturedPieceOfFirst={G.captured_piece_first} CapturedPieceOfSecond={G.captured_piece_second} />  
    </>
  )
}
export default MainViewOffline
