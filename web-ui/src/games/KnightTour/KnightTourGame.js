import {mockKnightBoardStatus} from "../../mockData";
import knightTourService from "../../service/KnightTourService";
import GameLevel from "../../constants/GameLevel";

export default class KnightTourGame {
    constructor(level, knightPosition, knightValue) {
        this.level = level
        this.rowNumber = KnightTourGame.resolveRowNumber(level)
        this.knightPosition = knightPosition
        this.pickingPosition = null
        this.knightValue = knightValue
        this.typingValue = null
        this.boardStatus = mockKnightBoardStatus()
        this.movablePositions = knightTourService.findMovablePositions(knightPosition, this.rowNumber)
    }

    static resolveRowNumber(level) {
        switch (level) {
            case GameLevel.EASY:
                return 4
            case GameLevel.NORMAL:
                return 6
            case GameLevel.HARD:
                return 8
            case GameLevel.EXPERT:
                return 10
            default:
                return 20
        }
    }
}