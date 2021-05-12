import React, {useState} from "react";
import KnightTourBox from "./KnightTourBox";
import {Button, Col, Container, Row} from "react-bootstrap";
import KnightTourPG from "./KnightTourPG";
import {useDispatch, useSelector} from "react-redux";
import KnightTourAction from "../../store/action/KnightTourAction";
import knightTourService from "../../service/KnightTourService";
import Position from "../../utils/Position";
import {cloneArray} from "../../utils/ArrayUtils";
import Header from "../../component/Header";

export default function KnightTour() {
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

    const cellNumber = useSelector(state => {
        return state.games.KnightTour.cellNumber
    })

    // Local state
    const [boardVisible, setBoardVisible] = useState(true);

    const dispatch = useDispatch();

    const handleCommit = () => {
        dispatch({
            type: KnightTourAction.updateKnightPosition,
            payload: pickingPosition
        })
        dispatch({
            type: KnightTourAction.updateMovablePositions,
            payload: knightTourService.findMovablePositions(pickingPosition, cellNumber)
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

    const handleShowBoard = () => {
        setBoardVisible(!boardVisible);
    }

    return (
        <Container fluid>
            <Header/>
            <Row className={"justify-content-center mt-4"}>
                <Col sm={5}>
                    <KnightTourPG/>
                </Col>
                <Col sm={1} className={"text-center"}>
                    <Button onClick={handleCommit} disabled={typingValue === null || typingValue === ''}>Commit</Button>
                    <br/><br/><br/><br/><br/>
                    <Button variant={"info"}
                            onClick={handleShowBoard}>{boardVisible ? 'Close Board' : 'Open Board'}</Button>
                </Col>
                <Col sm={5}>
                    <KnightTourBox visible={boardVisible} boardStatus={boardStatus}/>
                </Col>
            </Row>
        </Container>
    )
}