import GameLevel from "../../constants/GameLevel";
import {cloneArray} from "../../utils/ArrayUtils";
import Position from "../../utils/Position";

export default class NPuzzleGame {
    constructor(level, boardInit, boardGoal, moveAllowed) {
        this.level = level
        this.rowNumber = NPuzzleGame.resolveRowNumber(level)
        this.boardStatusInit = cloneArray(boardInit)
        this.boardStatus = cloneArray(boardInit)
        this.boardGoal = cloneArray(boardGoal)
        this.moveAllowed = moveAllowed
        this.moveLeft = moveAllowed
    }

    static resolveRowNumber(level) {
        switch (level) {
            case GameLevel.NEWBIE:
                return 2;
            case GameLevel.EASY:
                return 3
            case GameLevel.NORMAL:
                return 4
            case GameLevel.HARD:
                return 5
            case GameLevel.EXPERT:
                return 6
            case GameLevel.GOD:
                return 8
            default:
                return 10
        }
    }

    static getEmptyPosition(boardStatus) {
        let result = null;
        boardStatus.forEach((row, i) => {
            if (result != null) return;
            row.forEach((item, j) => {
                if (item === 0) {
                    result = new Position(i, j);
                }
            })
        })
        return result;
    }
}