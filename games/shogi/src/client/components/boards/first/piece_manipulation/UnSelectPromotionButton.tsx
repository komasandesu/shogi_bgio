import React from 'react'
import { Button } from '@mui/joy'
import { Piece } from '../../../pieces/Piece'
import type { CellType } from 'core/models/cell'
import type { StageNameType } from 'core/models/piece_operation_models/Stage_name'
import type { Position } from 'core/models/position'



export interface SelectPromotionProps {
    nowStage: StageNameType
    onClick: ( pos: Position, ) => void
}

export const UnSelectPromotion: React.FC<SelectPromotionProps> = ({
    nowStage,
    onClick
}) => {
    if( nowStage==='SelectPromotion' ){
    return (
        <Button
            data-testid={`cell-unpromotion`}
            size="lg"
            variant="outlined"
            onClick={() => {
                onClick( [-2,-2] )
            }}
            sx={{
                // aspectRatio: '1 / 1',
                // width: '5%',
                // borderRadius: '0',
                // flex: '2',
                // bgcolor: '#FF9999',
                // position: 'relative',
                // verticalAlign: 'top',
                aspectRatio: '4/3',
                
                display: 'table-cell',
                verticalAlign: 'middle',
                writingMode: 'horizontal-tb',
                textAlign: 'center',

                justifyContent: 'space-between',
                height: '30%',
                minHeight: '30px',
                maxHeight: '80px',
                bgcolor: '#FAB27B',
                position: 'fixed',
                bottom: 0,
                right: '40%',
                whiteSpace: 'nowrap',
            }}
        >
            成らない
        </Button>
    )
    }
    else{
        return (<></>);
    }
}
