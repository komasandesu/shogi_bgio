import React from 'react'
import { Sheet , Box } from '@mui/joy'


export interface StoneProps {
  color: 'black' | 'white'
}


export const Stone: React.FC<StoneProps> = ({ color }) => {
  return (
    <Sheet
      sx={{
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        backgroundColor: color,
        border: '2px solid black',
        width: '90%',
        minWidth: '50px',
        maxWidth: '100px',
      }}
    />
  )
}
