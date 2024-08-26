import type { CellType } from '../cell'
export type CapturedPieceType = CellType[] // koma

const empty = Array(0);

const init_first:CellType[] = [['飛','0',false],['角','0',false],['飛','0',false],['飛','0',false],['角','0',false],['飛','0',false],['飛','0',false],['角','0',false],['飛','0',false],['飛','0',false],['角','0',false],['飛','0',false]];
const init_second:CellType[] = [['歩','1',false],['銀','1',false]];

const AddCapturedPiece = (captured_pieces: CapturedPieceType, piece:CellType): CapturedPieceType => {
    const next_captured_pieces:CapturedPieceType = captured_pieces.concat([piece]);
    return next_captured_pieces;
}

const RemoveCapturedPiece = (captured_pieces: CapturedPieceType, index:number): CapturedPieceType => {
    const array1:CapturedPieceType = captured_pieces.slice( 0,index );
    const array2:CapturedPieceType = captured_pieces.slice( index+1,captured_pieces.length );
    return array1.concat(array2);
}

const CapturedPiece = {
    empty,
    init_first,
    init_second,
    AddCapturedPiece,
    RemoveCapturedPiece,
}
export default CapturedPiece