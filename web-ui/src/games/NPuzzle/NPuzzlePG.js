import React, {useCallback, useEffect, useRef} from "react";
import boardFactory from "../../service/BoardFactory";
import {DEFAULT_BOARD_SIZE} from "../../constants/BoardConstants";
import nPuzzleService from "../../service/NPuzzleService";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import NPuzzleAction from "../../store/action/NPuzzleAction";
import NPuzzleGame from "./NPuzzleGame";

export default function NPuzzlePG() {
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const boardSize = DEFAULT_BOARD_SIZE;

    const rowNumber = useSelector(state => {
        return state.games.NPuzzle.rowNumber
    })
    const boardStatus = useSelector(state => {
        return state.games.NPuzzle.boardStatus
    })

    const moveLeft = useSelector(state => {
        return state.games.NPuzzle.moveLeft
    })

    const setBoardStatus = useCallback((boardStatus) => {
        const action = {
            type: NPuzzleAction.updateBoardStatus,
            payload: boardStatus
        }
        dispatch(action)
    }, [dispatch])
    const currentHole = NPuzzleGame.getEmptyPosition(boardStatus)

    const drawBoard = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        boardFactory.clearBoard(canvas);
        boardFactory.getChessBoard(ctx, rowNumber, boardSize);
        if (boardStatus != null) {
            nPuzzleService.drawBoardStatus(ctx, boardStatus, boardSize, rowNumber)
        }
    }, [boardSize, boardStatus, rowNumber])

    const handleMouseOver = () => {
        canvasRef.current.style.cursor = "pointer";
    }

    const updateState = (currentRow, currentCol, newRow, newCol) => {
        const newBoardStatus = [...boardStatus]
        newBoardStatus[currentRow][currentCol] = boardStatus[newRow][newCol]
        boardStatus[newRow][newCol] = 0;
        setBoardStatus(newBoardStatus)

        dispatch({
            type: NPuzzleAction.updateMoveLeft,
            payload: moveLeft - 1
        })
    }

    const handleOnKeyDown = (event) => {
        if (moveLeft === 0) return;
        const key = event.key;
        // Left
        if (key === 'd') {
            const currentRow = currentHole.row
            const currentCol = currentHole.col
            if (currentCol > 0) {
                updateState(currentRow, currentCol, currentRow, currentCol - 1)
            }
        }
        // Right
        if (key === 'a') {
            const currentRow = currentHole.row
            const currentCol = currentHole.col
            if (currentCol < rowNumber - 1) {
                updateState(currentRow, currentCol, currentRow, currentCol + 1)
            }
        }
        // Up
        if (key === 's') {
            const currentRow = currentHole.row
            const currentCol = currentHole.col
            if (currentRow > 0) {
                updateState(currentRow, currentCol, currentRow - 1, currentCol)
            }
        }
        // Down
        if (key === 'w') {
            const currentRow = currentHole.row
            const currentCol = currentHole.col
            if (currentRow < rowNumber - 1) {
                updateState(currentRow, currentCol, currentRow + 1, currentCol)
            }
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
                            onMouseOver={handleMouseOver}
                            onKeyDown={handleOnKeyDown}
                    />
                </Col>
            </Row>
        </Container>
    )
}