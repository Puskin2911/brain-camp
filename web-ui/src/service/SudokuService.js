import {LINE_WIDTH, resolveCellSize} from "../constants/BoardConstants";
import SudokuGame from "../games/Sudoku/SudokuGame";
import {mockSudokuBoard} from "../mockData";
import canvasService from "./CanvasService";
import Position from "../utils/Position";
import {fill2Dimension} from "../utils/ArrayUtils";
import Item from "../utils/Item";

const displayBoard = (ctx, boardStatus, boardSize, rowNumber) => {
    const cellSize = resolveCellSize(boardSize, rowNumber)

    if (boardStatus !== null && boardStatus !== undefined)
        boardStatus.forEach((row, i) => {
            row.forEach((item, j) => {
                const value = item.value
                if (!isNaN(value) && value !== null && value > 0) {
                    const color = item.editable ? 'red' : 'gray'
                    canvasService.drawCellValue(ctx, new Position(i, j), cellSize, value, color);
                }
            })
        })
}

const displayKeyBoard = (ctx, keyBoard, boardSize, rowNumber) => {
    const cellSize = resolveCellSize(boardSize, rowNumber)

    if (keyBoard !== null && keyBoard !== undefined)
        keyBoard.forEach((row, i) => {
            row.forEach((value, j) => {
                if (!isNaN(value) && value !== null && value > 0) {
                    canvasService.drawCellValue(ctx, new Position(i, j), cellSize, value, 'gray');
                }
            })
        })
}

const drawConflict = (ctx, conflictPositions, boardSize, rowNumber, lineWidth = LINE_WIDTH) => {
    const cellSize = resolveCellSize(boardSize, rowNumber)

    conflictPositions.forEach(position => {
        const xFrom = position.col * (cellSize + 1) + lineWidth;
        const yFrom = position.row * (cellSize + 1) + lineWidth;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(xFrom + lineWidth, yFrom + lineWidth, cellSize - lineWidth, cellSize - lineWidth);
    })
}

const getConflict = (boardStatus, position) => {
    const [row, col] = position.toRowCol();
    const currentItem = boardStatus[row][col];
    const conflictPositions = [];
    // Row check
    boardStatus[row].forEach((item, i) => {
        if (item.value === currentItem.value && currentItem.value !== 0) {
            conflictPositions.push(new Position(row, i));
        }
    })
    // Col check
    for (let i = 0; i < boardStatus.length; i++) {
        if (boardStatus[i][col].value === currentItem.value && currentItem.value !== 0) {
            conflictPositions.push(new Position(i, col));
        }
    }
    // Square check
    const newRow = row - row % 3;
    const newCol = col - col % 3;
    for (let i = newRow; i < newRow + 3; i++) {
        for (let j = newCol; j < newCol + 3; j++) {
            if (boardStatus[i][j].value === currentItem.value && currentItem.value !== 0) {
                conflictPositions.push(new Position(i, j));
            }
        }
    }

    if (conflictPositions.length === 1) {
        return []
    }
    return conflictPositions
}

const randomBoard = () => {
    const size = 9;
    const defaultItem = new Item(0, false)
    const arr = fill2Dimension(size, defaultItem)

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let count = 1
            do {
                count++
                arr[i][j] = new Item(Math.floor(Math.random() * size) + 1, false)
            }
            while (getConflict(arr, new Position(i, j)).length !== 0 && count === 100);
        }
    }
    return arr
}

const getGame = (level) => {
    const boardGoal = randomBoard()
    const boardStatus = mockSudokuBoard(level)

    return new SudokuGame(level, boardStatus, boardGoal)
}

const sudokuService = {
    displayBoard,
    displayKeyBoard,
    drawConflict,
    getConflict,
    getGame
}

export default sudokuService;