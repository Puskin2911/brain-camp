import React, {useCallback, useEffect, useRef} from "react";
import {DEFAULT_BOARD_SIZE, resolveCellSize} from "../../constants/BoardConstants";
import boardFactory from "../../service/BoardFactory";
import {useSelector} from "react-redux";
import knightTourService from "../../service/KnightTourService";
import canvasService from "../../service/CanvasService";
import {Col, Container, Row} from "react-bootstrap";

export default function KnightTourCache(props) {
    const canvasRef = useRef();
    const boardSize = DEFAULT_BOARD_SIZE

    // Stored state
    const knightPosition = useSelector(state => {
        return state.games.KnightTour.knightPosition;
    })

    const rowNumber = useSelector(state => {
        return state.games.KnightTour.rowNumber;
    })

    const boardStatus = props.boardStatus;

    const drawBoard = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        boardFactory.clearBoard(canvas);
        boardFactory.getChessBoard(ctx, rowNumber);

        const cellSize = resolveCellSize(boardSize, rowNumber)
        canvasService.fillCell(ctx, knightPosition, cellSize, 'Aqua');
        knightTourService.drawBoardStatus(ctx, boardStatus, boardSize, rowNumber);
    }, [boardSize, boardStatus, rowNumber, knightPosition])

    const clearBoard = () => {
        const canvas = canvasRef.current;
        boardFactory.clearBoard(canvas);
    }

    const handleMouseOver = () => {
        canvasRef.current.style.cursor = "pointer";
    }
    useEffect(() => {
        if (props.visible) {
            drawBoard()
        } else clearBoard()
    }, [drawBoard, props.visible])

    return (
        <Container>
            <Row>
                <Col>
                    <canvas ref={canvasRef}
                            width={boardSize}
                            height={boardSize}
                            onMouseOver={handleMouseOver}
                            className="border border-danger"
                    />
                </Col>
            </Row>
        </Container>
    )
}