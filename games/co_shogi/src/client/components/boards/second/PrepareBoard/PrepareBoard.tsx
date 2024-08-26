import React from 'react'
import { Sheet } from '@mui/joy'
import { Box } from '@mui/material';

import { Line } from './Line'
import { PieceSettingLine } from './PieceSetting/PieceSettingLine'

import type { PrepareBoardType } from 'core/models/prepare_board'
import type { PieceSettingBoardType } from 'core/models/piece_setting'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'
import type { Position } from 'core/models/position'
import type { SelectedPiecePositionType } from 'core/models/piece_operation_models/SelectedPiecePosition'

import { SystemMessage } from './SystemMessage';


export interface BoardProps {
  board: PrepareBoardType
  piece_setting_board: PieceSettingBoardType
  onClick: (pos: Position, ) => void
  nowStage: StageNameType
  selected_piece_position: SelectedPiecePositionType
  cost_second: number
}

export const PrepareBoard: React.FC<BoardProps> = ({ 
  board, 
  onClick, 
  piece_setting_board,
  selected_piece_position,
  nowStage, 
  cost_second,
}) => (
  <>
    <SystemMessage
      onClick={() => {
        onClick([1000, 1000])
      }}
      cost_second={cost_second}
      nowStage={nowStage}
    />
    <Sheet
      sx={{
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '50%',
        minHeight: '320px',
        maxHeight: '320px',
        right: '-240px',
      }}
    >
      {board.map((line, y) => (
        <Line
          key={y}
          line={line}
          lineNumber={y}
          onClick={(x) => {
            onClick([x, y])
          }}
        />
      ))}
      <p></p>
      {piece_setting_board.map((line, y) => (
        <PieceSettingLine
          key={y}
          line={line}
          lineNumber={y}
          onClick={(x) => {
            onClick([x, 100])
          }}
          selected_piece_position={selected_piece_position}
        />
      ))}
    </Sheet>

  </> 
  
)
