import React from 'react'
import Typography from '@mui/joy/Typography'
import type { FilteredMetadata } from 'boardgame.io'
import type { GameResult } from 'core/types'

import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'

export interface SystemMessageProps {
  currentPlayer: string | null
  matchData?: FilteredMetadata
  result: GameResult
  nowStage: StageNameType
}

const nameOf = (
  playerID: string | null,
  matchData?: FilteredMetadata
): string => {
  if (playerID === null) {
    return 'unknown'
  }
  if (matchData === undefined) {
    return `プレイヤー${playerID}`
  }

  const user = matchData.find((u) => u.id === parseInt(playerID))
  return user?.name ?? `プレイヤー${playerID}`
}

const createMessage = ({
  currentPlayer,
  matchData,
  result,
  nowStage
}: SystemMessageProps): string => {
  if( nowStage === 'Start' || nowStage === 'SetPiece' ){
    return '駒を選んでください'
  }
  if (result !== undefined) {
    return 'draw' in result
      ? 'ゲーム終了: 引き分け'
      : `ゲーム終了: ${nameOf(result.winner, matchData)} の勝利`
  }
  return `${nameOf(currentPlayer, matchData)} のターンです`
}

const SystemMessage: React.FC<SystemMessageProps> = (props) => {
  const message = createMessage(props)
  return <Typography>{message}</Typography>
}
export default SystemMessage
