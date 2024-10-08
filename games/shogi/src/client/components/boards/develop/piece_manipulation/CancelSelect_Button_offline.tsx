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

export const CancelSelectOffline: React.FC<SelectPromotionProps> = ({
    nowStage,
    onClick
}) => {
    if( nowStage==='SelectMove' || nowStage==='SelectPromotion' ){
    return (
        <Button
            data-testid={`cell-cancel`}
            size='sm'
            variant='outlined'
            onClick={() => {
                onClick( [-3,-3] )
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
                bgcolor: '#659AD2',
                position: 'fixed',
                bottom: 0,
                right: '50%'
            }}
        >
            戻る
        </Button>
    )
    }
    else{
        return (<></>);
    }
}
