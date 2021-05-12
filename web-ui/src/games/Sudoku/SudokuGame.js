export default class SudokuGame {
    constructor(level, boardStatus) {
        this.level = level
        this.rowNumber = SudokuGame.resolveRowNumber(this.level)
        this.boardStatus = boardStatus
        this.pickingPosition = null
        this.conflictPositions = []
        this.keyBoard = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
    }

    static resolveRowNumber(level) {
        if (level != null)
            return 9;
    }
}