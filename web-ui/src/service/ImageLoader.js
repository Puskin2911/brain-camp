import BKnight from "../images/Bknight.png";
import Sudoku from "../images/Sudoku.png";
import KnightTour from "../images/Knight-tour.png";
import NPuzzle from "../images/N-puzzle.png";

export const loadBKnight = () => {
    const image = new Image();
    image.src = BKnight;
    return image;
}

export const loadAvatar = (textId) => {
    switch (textId) {
        case "Sudoku":
            return Sudoku
        case "Knight-tour":
            return KnightTour
        case "N-puzzle":
            return NPuzzle
    }
    return Sudoku;
}