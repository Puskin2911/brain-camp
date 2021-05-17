import Position from "../utils/Position";
import canvasService from "./CanvasService";
import {resolveCellSize} from "../constants/BoardConstants";
import NPuzzleGame from "../games/NPuzzle/NPuzzleGame";
import {cloneArray, swapPosition} from "../utils/ArrayUtils";
import NPuzzleSolver from "../games/NPuzzle/NPuzzleSolver";

const drawBoardStatus = (ctx, boardStatus, boardSize, cellNumber) => {
    const cellSize = resolveCellSize(boardSize, cellNumber)

    if (boardStatus !== null && boardStatus !== undefined)
        boardStatus.forEach((row, i) => {
            row.forEach((item, j) => {
                if (!isNaN(item) && item !== null && item > 0) {
                    canvasService.drawCellValue(ctx, new Position(i, j), cellSize, item);
                } else if (item === 0) {
                    canvasService.fillCell(ctx, new Position(i, j), cellSize, "Aqua")
                }
            })
        })
}

const getBoardGoal = (size) => {
    const arr = []
    let value = 1;
    for (let i = 0; i < size; i++) {
        const col = []
        for (let j = 0; j < size; j++) {
            col[j] = value;
            value++;
        }
        arr[i] = col
    }
    arr[size - 1][size - 1] = 0
    return arr
}

/**
 * Shuffle board x times while x = 2 * number of cell on board
 * @param boardStatus
 */
const shuffleBoard = (boardStatus) => {
    let emptyPosition = NPuzzleGame.getEmptyPosition(boardStatus)

    const boardLength = boardStatus.length

    for (let i = 0; i < boardLength * boardLength * 3; i++) {
        const random = Math.floor(Math.random() * 4)
        if (random === 0 && emptyPosition.row > 0) {
            const toPosition = emptyPosition.getUp()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition
        } else if (random === 1 && emptyPosition.row < boardLength - 1) {
            const toPosition = emptyPosition.getDown()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition
        } else if (random === 2 && emptyPosition.col > 0) {
            const toPosition = emptyPosition.getLeft()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition
        } else if (random === 3 && emptyPosition.col < boardLength - 1) {
            const toPosition = emptyPosition.getRight()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition
        }
    }
}

const getGame = (level) => {
    const rowNumber = NPuzzleGame.resolveRowNumber(level)
    const boardGoal = getBoardGoal(rowNumber)
    let boardInit = cloneArray(boardGoal)

    shuffleBoard(boardInit)

    let nPuzzleSolver = new NPuzzleSolver(boardInit, boardGoal)
    let solution = nPuzzleSolver.solve()

    while (solution == null || solution.directions.length === 0) {
        boardInit = cloneArray(boardGoal)
        shuffleBoard(boardInit)
        nPuzzleSolver = new NPuzzleSolver(boardInit, boardGoal)
        solution = nPuzzleSolver.solve()
    }

    return new NPuzzleGame(level, boardInit, boardGoal, solution.directions)
}

const nPuzzleService = {
    drawBoardStatus,
    getGame
}

export default nPuzzleService;