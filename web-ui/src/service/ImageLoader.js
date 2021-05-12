import BKnight from "../images/Bknight.png";
import Sudoku from "../images/sudoku.png";

export const loadBKnight = () => {
    const image = new Image();
    image.src = BKnight;
    return image;
}

export const loadSudoku = () => {
    return Sudoku;
}