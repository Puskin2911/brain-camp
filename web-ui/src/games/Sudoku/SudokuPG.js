import React, {useCallback, useEffect, useRef} from "react";
import {DEFAULT_BOARD_SIZE, DEFAULT_SUDOKU_BOARD_CELL, resolveCellSize} from "../../constants/BoardConstants";
import boardFactory from "../../service/BoardFactory";
import sudokuService from "../../service/SudokuService";
import Item from "../../utils/Item";
import Position from "../../utils/Position";
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

        const cellSize = resolveCellSize(boardSize, rowNumber)
        canvasService.fillCell(ctx, pickingPosition, cellSize, 'lightGrey');

        if (boardStatus != null) {
            sudokuService.displayBoard(ctx, boardStatus, boardSize, rowNumber);
        }
        sudokuService.drawConflict(ctx, conflictPositions);
    }, [boardSize, boardStatus, rowNumber, conflictPositions, pickingPosition])

    const handleMouseOver = () => {
        canvasRef.current.style.cursor = "pointer";
    }

    const handlePressKey = (event) => {
        const key = Number(event.key);
        if (!isNaN(key) && event.key != null && event.key !== ' ') {
            if (pickingPosition != null) {
                const [row, col] = [pickingPosition.row, pickingPosition.col];
                const item = boardStatus[row][col];
                if (item.editable) {
                    const newBoardStatus = [...boardStatus];
                    newBoardStatus[row][col] = new Item(key, true);

                    dispatch({
                        type: SudokuAction.updateBoardStatus,
                        payload: newBoardStatus
                    })

                    processCheck(newBoardStatus, pickingPosition);
                }
            }
        }
    }

    const processCheck = (boardStatus, position) => {
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

        // TODO : Square check

        if (conflictPositions.length === 1) {
            conflictPositions.splice(0, 1);
        }
        setConflictPositions(conflictPositions)
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
                            onKeyPress={handlePressKey}
                    />
                </Col>
            </Row>
        </Container>
    )
}