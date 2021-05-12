import React, {useEffect, useRef} from "react";
import {DEFAULT_BOARD_SIZE} from "../../constants/BoardConstants";
import {useSelector} from "react-redux";
import boardFactory from "../../service/BoardFactory";
import {Col, Container, Row} from "react-bootstrap";
import sudokuService from "../../service/SudokuService";

export default function SudokuKeyBoard() {
    const canvasRef = useRef();
    const boardSize = DEFAULT_BOARD_SIZE * 0.5;

    const keyBoard = useSelector(state => {
        return state.games.Sudoku.keyBoard
    })

    const drawBoard = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        boardFactory.clearBoard(canvas);
        boardFactory.getChessBoard(ctx, 3, boardSize);

        if (keyBoard != null) {
            sudokuService.displayKeyBoard(ctx, keyBoard, boardSize, 3)
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