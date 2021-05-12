import {Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useRef} from "react";
import {DEFAULT_BOARD_SIZE} from "../../constants/BoardConstants";
import {useSelector} from "react-redux";
import boardFactory from "../../service/BoardFactory";
import nPuzzleService from "../../service/NPuzzleService";

export default function NPuzzleGoal() {
    const canvasRef = useRef();
    const boardSize = DEFAULT_BOARD_SIZE * 0.5;

    const boardGoal = useSelector(state => {
        return state.games.NPuzzle.boardGoal
    })

    const cellNumber = useSelector(state => {
        return state.games.NPuzzle.cellNumber
    })

    const drawBoard = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        boardFactory.clearBoard(canvas);
        boardFactory.getChessBoard(ctx, cellNumber, boardSize);

        if (boardGoal != null) {
            nPuzzleService.drawBoardStatus(ctx, boardGoal, boardSize, cellNumber)
        }
    }

    useEffect(drawBoard, [drawBoard])

    return (
        <Container>
            <Row>
                <Col>
                    <canvas ref={canvasRef}
                            tabIndex="1"
                            width={boardSize}
                            height={boardSize}
                    />
                </Col>
            </Row>
        </Container>
    )
}