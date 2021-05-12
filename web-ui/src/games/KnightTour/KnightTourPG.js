import React, {useCallback, useEffect, useRef} from "react";
import {DEFAULT_BOARD_SIZE, resolveCellSize} from "../../constants/BoardConstants";
import boardFactory from "../../service/BoardFactory";
import knightTourService from "../../service/KnightTourService";
import canvasService from "../../service/CanvasService";
import {useDispatch, useSelector} from "react-redux";
import KnightTourAction from "../../store/action/KnightTourAction";
import {Col, Container, Row} from "react-bootstrap";

export default function KnightTourPG() {
    const canvasRef = useRef();
    const boardSize = DEFAULT_BOARD_SIZE;

    // Stored state
    const rowNumber = useSelector(state => {
        return state.games.KnightTour.rowNumber
    })

    const knightPosition = useSelector(state => {
        return state.games.KnightTour.knightPosition
    })
    const knightValue = useSelector(state => {
        return state.games.KnightTour.knightValue
    })
    const typingValue = useSelector(state => {
        return state.games.KnightTour.typingValue
    })
    const pickingPosition = useSelector(state => {
        return state.games.KnightTour.pickingPosition
    })
    const movablePositions = useSelector(state => {
        return state.games.KnightTour.movablePositions
    })

    const dispatch = useDispatch();

    const drawBoard = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        boardFactory.clearBoard(canvas);
        boardFactory.getChessBoard(ctx, rowNumber, boardSize);

        const cellSize = resolveCellSize(boardSize, rowNumber)
        canvasService.fillCell(ctx, knightPosition, cellSize, 'Aqua');
        canvasService.fillCell(ctx, pickingPosition, cellSize, 'Aquamarine');
        canvasService.drawCellValue(ctx, knightPosition, cellSize, knightValue);

        if (typingValue != null) {
            canvasService.drawCellValue(ctx, pickingPosition, cellSize, typingValue);
        }
        knightTourService.drawMovablePositions(ctx, boardSize, rowNumber, movablePositions);
    }, [boardSize, rowNumber, knightPosition, knightValue, movablePositions, pickingPosition, typingValue])

    const handleMouseOver = () => {
        canvasRef.current.style.cursor = "pointer";
    }

    const handleMouseClick = (event) => {
        const canvas = canvasRef.current;
        const xy = canvasService.getPosition(canvas, event, boardSize, rowNumber)
        if (xy == null) return;

        movablePositions.forEach(position => {
            if (xy.compareTo(position)) {
                dispatch({
                    type: KnightTourAction.updateMovablePositions,
                    payload: knightTourService.findMovablePositions(knightPosition, rowNumber, [xy])
                })
                dispatch({
                    type: KnightTourAction.updatePickingPosition,
                    payload: xy
                })
            }
        })
    }

    const handleKeyDown = (event) => {
        const key = Number(event.key);
        if (event.key === 'Backspace') {
            dispatch({
                type: KnightTourAction.updateTypingValue,
                payload: (typingValue + '').slice(0, -1)
            })
        }
        if (!isNaN(key) && event.key != null && event.key !== ' ') {
            // Limit only 3 digits
            if (pickingPosition != null && typingValue < 100) {
                dispatch({
                    type: KnightTourAction.updateTypingValue,
                    payload: (typingValue == null ? "" : typingValue) + "" + key
                })
            }
        }

    }

    useEffect(() => {
        drawBoard()
    }, [drawBoard]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <canvas ref={canvasRef}
                            tabIndex="1"
                            width={boardSize}
                            height={boardSize}
                            onClick={handleMouseClick}
                            onMouseOver={handleMouseOver}
                            onKeyDown={handleKeyDown}
                    />
                </Col>
            </Row>
        </Container>
    )
}