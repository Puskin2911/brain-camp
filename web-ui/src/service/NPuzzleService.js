import Position from "../utils/Position";
import canvasService from "./CanvasService";
import {resolveCellSize} from "../constants/BoardConstants";
import NPuzzleGame from "../games/NPuzzle/NPuzzleGame";
import {cloneArray, swapPosition} from "../utils/ArrayUtils";

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

// TODO: Update algorithm to shuffle board
const shuffleBoard = (boardStatus) => {
    const startPosition = NPuzzleGame.getEmptyPosition(boardStatus)
    let emptyPosition = NPuzzleGame.getEmptyPosition(boardStatus)

    const cellNumber = boardStatus.length

    let shuffled = false;
    while (!emptyPosition.compareTo(startPosition) || !shuffled) {
        const random = Math.floor(Math.random() * 4)
        if (random === 0 && emptyPosition.row > 0) {
            const toPosition = emptyPosition.getUp()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition;
            shuffled = true;
        } else if (random === 1 && emptyPosition.row < cellNumber - 1) {
            const toPosition = emptyPosition.getDown()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition;
            shuffled = true;
        } else if (random === 2 && emptyPosition.col > 0) {
            const toPosition = emptyPosition.getLeft()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition;
            shuffled = true;
        } else if (random === 3 && emptyPosition.col < cellNumber - 1) {
            const toPosition = emptyPosition.getRight()
            swapPosition(boardStatus, emptyPosition, toPosition)
            emptyPosition = toPosition;
            shuffled = true;
        }
    }
}

const getGame = (level) => {
    const cellNumber = NPuzzleGame.resolveCellNumber(level)
    const boardGoal = getBoardGoal(cellNumber)
    const boardInit = cloneArray(boardGoal)
    shuffleBoard(boardInit)

    // TODO: Update moveAllowed
    return new NPuzzleGame(level, boardInit, boardGoal, 20)
}

const nPuzzleService = {
    drawBoardStatus,
    getGame
}

export default nPuzzleService;