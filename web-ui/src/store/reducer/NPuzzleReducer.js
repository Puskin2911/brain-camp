import GameLevel from "../../constants/GameLevel";
import NPuzzleAction from "../action/NPuzzleAction";
import {mockNPuzzleBoard} from "../../mockData";
import {cloneArray} from "../../utils/ArrayUtils";

const initState = {
    level: GameLevel.EASY,
    cellNumber: 3,
    boardStatusInit: mockNPuzzleBoard(3),
    boardStatus: mockNPuzzleBoard(3),
    moveAllowed: 10,
    moveLeft: 10
}

export default function nPuzzleReducer(state = initState, action) {
    switch (action.type) {
        case NPuzzleAction.changeLevel:
            return {
                ...state,
                level: action.payload.level,
                cellNumber: action.payload.cellNumber,
                boardStatus: action.payload.boardStatus,
                boardStatusInit: cloneArray(action.payload.boardStatus)
            }
        case NPuzzleAction.newGame:
            return {
                ...action.payload
            }
        case NPuzzleAction.updateBoardStatus:
            return {
                ...state,
                boardStatus: action.payload
            }
        case NPuzzleAction.resetGame:
            return {
                ...state,
                boardStatus: cloneArray(state.boardStatusInit),
                moveLeft: state.moveAllowed
            }
        case NPuzzleAction.updateMoveLeft:
            return {
                ...state,
                moveLeft: action.payload
            }
        default:
            return state;
    }
}