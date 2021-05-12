import {LINE_WIDTH, resolveCellSize} from "../constants/BoardConstants";
import SudokuGame from "../games/Sudoku/SudokuGame";
import {mockSudokuBoard} from "../mockData";
import canvasService from "./CanvasService";
import Position from "../utils/Position";

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

const getGame = (level) => {
    const boardStatus = mockSudokuBoard(level)

    return new SudokuGame(level, boardStatus)
}

const sudokuService = {
    displayBoard,
    displayKeyBoard,
    drawConflict,
    getGame
}

export default sudokuService;