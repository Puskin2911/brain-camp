import React, {useCallback, useEffect, useRef} from "react";
import {DEFAULT_BOARD_SIZE, DEFAULT_SUDOKU_BOARD_CELL, resolveCellSize} from "../../constants/BoardConstants";
import boardFactory from "../../service/BoardFactory";
import sudokuService from "../../service/SudokuService";
import Item from "../../utils/Item";
import canvasService from "../../service/CanvasService";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import SudokuAction from "../../store/action/SudokuAction";

export default function SudokuPG() {
    const canvasRef = useRef();
    const boardSize = DEFAULT_BOARD_SIZE

    const dispatch = useDispatch()

    const rowNumber = useSelector(state => {
        return state.games.Sudoku.rowNumber
    })

    const boardStatus = useSelector(state => {
        return state.games.Sudoku.boardStatus
    })

    const pickingPosition = useSelector(state => {
        return state.games.Sudoku.pickingPosition
    })

    const setPickingPosition = (position) => {
        dispatch({
            type: SudokuAction.updatePickingPosition,
            payload: position
        })
    }

    const conflictPositions = useSelector(state => {
        return state.games.Sudoku.conflictPositions;
    })

    const setConflictPositions = (positions) => {
        dispatch({
            type: SudokuAction.updateConflictPositions,
            payload: positions
        })
    }

    const drawBoard = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        boardFactory.clearBoard(canvas);
        boardFactory.getSudokuBoard(ctx, DEFAULT_SUDOKU_BOARD_CELL);

        sudokuService.drawConflict(ctx, conflictPositions, boardSize, rowNumber);

        const cellSize = resolveCellSize(boardSize, rowNumber)
        canvasService.fillCell(ctx, pickingPosition, cellSize, 'lightGrey');

        sudokuService.displayBoard(ctx, boardStatus, boardSize, rowNumber);
    }, [boardSize, boardStatus, rowNumber, conflictPositions, pickingPosition])

    const handleMouseOver = () => {
        canvasRef.current.style.cursor = "pointer";
    }

    const handlePressKey = (event) => {
        const key = event.key
        const keyNumber = Number(key)
        if (pickingPosition != null) {
            if (!isNaN(keyNumber) && key != null && key !== ' ') {
                const [row, col] = [pickingPosition.row, pickingPosition.col];
                const item = boardStatus[row][col];
                if (item.editable) {
                    const newBoardStatus = [...boardStatus];
                    newBoardStatus[row][col] = new Item(keyNumber, true);

                    dispatch({
                        type: SudokuAction.updateBoardStatus,
                        payload: newBoardStatus
                    })

                    setConflictPositions(sudokuService.getConflict(newBoardStatus, pickingPosition))
                }
            } else if (key === 'Backspace' || key === 'Delete') {
                const [row, col] = [pickingPosition.row, pickingPosition.col];
                const item = boardStatus[row][col];
                if (item.editable) {
                    const newBoardStatus = [...boardStatus];
                    newBoardStatus[row][col] = new Item(0, true);

                    dispatch({
                        type: SudokuAction.updateBoardStatus,
                        payload: newBoardStatus
                    })

                    setConflictPositions(sudokuService.getConflict(newBoardStatus, pickingPosition))
                }
            }
        }
    }

    const handleMove = (event) => {
        const canvas = canvasRef.current;
        const xy = canvasService.getPosition(canvas, event, boardSize, rowNumber);
        if (xy == null) return;

        if (pickingPosition != null) {
            if (xy.compareTo(pickingPosition)) {
                setPickingPosition(null)
            } else {
                setPickingPosition(xy)
            }
        } else {
            setPickingPosition(xy)
        }
    }

    useEffect(() => {
        drawBoard()

    }, [drawBoard])

    return (
        <Container>
            <Row>
                <Col>
                    <canvas ref={canvasRef}
                            tabIndex="1"
                            width={boardSize}
                            height={boardSize}
                            onClick={handleMove}
                            onMouseOver={handleMouseOver}
                            onKeyUp={handlePressKey}
                    />
                </Col>
            </Row>
        </Container>
    )
}