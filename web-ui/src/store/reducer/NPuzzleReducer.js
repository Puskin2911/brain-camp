import GameLevel from "../../constants/GameLevel";
import NPuzzleAction from "../action/NPuzzleAction";
import {cloneArray} from "../../utils/ArrayUtils";
import nPuzzleService from "../../service/NPuzzleService";

const initState = nPuzzleService.getGame(GameLevel.NEWBIE)

export default function nPuzzleReducer(state = initState, action) {
    switch (action.type) {
        case NPuzzleAction.changeLevel:
            return {
                ...action.payload
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