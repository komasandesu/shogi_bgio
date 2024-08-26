import React from 'react'
import { Sheet , Box } from '@mui/joy'

const first_player:string = '0'
const second_player:string = '1'

export interface PieceProps {
  koma:string
  player:string
  isPromoted:boolean
  isOnBoard:boolean
}

const style_first: React.CSSProperties = {
  color: 'black',
  background: '#FEECD2',
  padding: '0.5em',
  fontWeight: 'bolder',
  borderRadius: '0.5em',
  width : '35px',
  height : '35px',
  display : 'flex',
  alignItems : 'center',
  justifyContent : 'center',
  fontSize : '28px',
  whiteSpace: 'nowrap',
  writingMode : 'vertical-lr'
};

const style_second: React.CSSProperties = {
  color: 'black',
  background: '#FEECD2',
  padding: '0.5em',
  fontWeight: 'bolder',
  borderRadius: '0.5em',
  width : '35px',
  height : '35px',
  display : 'flex',
  alignItems : 'center',
  justifyContent : 'center',
  fontSize : '28px',
  whiteSpace: 'nowrap',
  writingMode : 'vertical-lr',
  transform: 'scale(-1, -1)'
};

function PieceName( piece:string, isPromoted:boolean ) : string {
  if(isPromoted){
    if(piece=='歩'){
      return 'と';
    }
    if(piece=='香'){
      return '成香';
    }
    if(piece=='桂'){
      return '成銀';
    }
    if(piece=='角'){
      return '馬';
    }
    if(piece=='飛'){
      return '龍';
    }
  }
  return piece;
}

export const Piece: React.FC<PieceProps> = ( {koma,player,isPromoted,isOnBoard} ) => {
  if(player==first_player){
    return (
      <div style={style_first}>
        {PieceName(koma,isPromoted)}
      </div>
    )
  }
  else{
    return (
      <div style={style_second}>
        {PieceName(koma,isPromoted)}
      </div>
    )
  }
}
