import {combineReducers} from "redux";
import knightTourReducer from "./KnightTourReducer";
import nPuzzleReducer from "./NPuzzleReducer";
import sudokuReducer from "./SudokuReducer";
import tonReducer from "./TonReducer";

const gameReducer = combineReducers({
    KnightTour: knightTourReducer,
    NPuzzle: nPuzzleReducer,
    Sudoku: sudokuReducer,
    Ton: tonReducer
});

export default gameReducer;