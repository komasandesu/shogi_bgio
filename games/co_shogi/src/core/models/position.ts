export type Position = [number, number]

const SelectPromotion:[number,number] = [-1,-1]
const UnSelectPromotion:[number,number] = [-1,-2]

const CancelSelect:[number,number] = [-2,0]

const captured_piece_first_pos:number = 100;
const captured_piece_second_pos:number = 200;

const PieceManipulation = {
    SelectPromotion,
    UnSelectPromotion,
    CancelSelect,
    captured_piece_first_pos,
    captured_piece_second_pos
}
export default PieceManipulation
