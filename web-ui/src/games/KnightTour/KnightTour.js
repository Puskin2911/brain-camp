import React, {useState} from "react";
import KnightTourCache from "./KnightTourCache";
import {Col, Container, Row} from "react-bootstrap";
import KnightTourPG from "./KnightTourPG";
import {useSelector} from "react-redux";
import Header from "../../component/Header";
import KnightTourBox from "./KnightTourBox";
import KnightRTourInfo from "./KnightTourInfo";

export default function KnightTour() {
    // Stored state
    const boardStatus = useSelector(state => {
        return state.games.KnightTour.boardStatus;
    })

    // Local state
    const [boardVisible, setBoardVisible] = useState(true);

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
                <Col sm={2} className={"text-center mx-0"}>
                    <KnightTourBox boardVisible={boardVisible} handleShowBoard={handleShowBoard}/>
                </Col>
                <Col sm={5}>
                    <KnightTourCache visible={boardVisible} boardStatus={boardStatus}/>
                </Col>
            </Row>
            <Row>
                <KnightRTourInfo/>
            </Row>
        </Container>
    )
}