import React from 'react'
import { Sheet } from '@mui/joy'
import { Button } from '@mui/joy'
import { Box } from '@mui/material';

import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'

export interface SystemMessageProps {
  onClick : () => void
  cost_second: number
  nowStage: StageNameType
}

const total_cost = 61;

export const SystemMessage: React.FC<SystemMessageProps> = ({ 
  onClick,
  nowStage, 
  cost_second,
}) => {
  if(nowStage==='Start'){
    return (
      <>
        <Box
          my={4}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
          gap={4}
          p={2}
          fontSize={'Large'}
          fontFamily={'monospace'}
          sx={{ 
            border: '2px solid grey',
            height: '75%',
            width: '75%'
          }}
        >
          あなたは後手です
        </Box>
      </> 
    );
  }
  else{
    return (
      <>
        <Box fontWeight="fontWeightRegular" m={1}>
          <>残りコスト: <a style={{color: total_cost-cost_second>=0 ? "blue" : "red"  }}>{total_cost-cost_second}</a> </>
        </Box>
      </> 
    );
  }
  
}