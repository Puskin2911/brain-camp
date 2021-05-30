import {Container, Button, Col, Row} from "react-bootstrap";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import KnightTourAction from "../../store/action/KnightTourAction";
import knightTourService from "../../service/KnightTourService";
import {cloneArray} from "../../utils/ArrayUtils";
import Position from "../../utils/Position";

export default function KnightTourBox(props) {
    // Stored state
    const boardStatus = useSelector(state => {
        return state.games.KnightTour.boardStatus;
    })
    const pickingPosition = useSelector(state => {
        return state.games.KnightTour.pickingPosition;
    })
    const typingValue = useSelector(state => {
        return state.games.KnightTour.typingValue;
    })

    const rowNumber = useSelector(state => {
        return state.games.KnightTour.rowNumber
    })

    const dispatch = useDispatch();

    const handleCommit = () => {
        dispatch({
            type: KnightTourAction.updateKnightPosition,
            payload: pickingPosition
        })
        dispatch({
            type: KnightTourAction.updateMovablePositions,
            payload: knightTourService.findMovablePositions(pickingPosition, rowNumber)
        })
        dispatch({
            type: KnightTourAction.updateKnightValue,
            payload: typingValue
        })
        dispatch({
            type: KnightTourAction.updateTypingValue,
            payload: null
        })
        const newBoardStatus = cloneArray(boardStatus);
        newBoardStatus.forEach((row, i) => {
            row.forEach((item, j) => {
                if (pickingPosition.compareTo(new Position(i, j))) {
                    newBoardStatus[i][j] = typingValue;
                }
            })
        })
        dispatch({
            type: KnightTourAction.updateBoardStatus,
            payload: newBoardStatus
        })
    }

    return (
        <Container fluid>
            <Row className="mb-5">
                <Col className="text-center">
                    <Button variant="info" className="m-2">New Game</Button>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center">
                    <Button onClick={handleCommit} disabled={typingValue === null || typingValue === ''}>Commit</Button>
                </Col>
            </Row>
            <Row className="my-4">
                <Col className="text-center">
                    <Button variant={"info"} onClick={props.handleShowBoard}>
                        {props.boardVisible ? 'Close Board' : 'Open Board'}
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}