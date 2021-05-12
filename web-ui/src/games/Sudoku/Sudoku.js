import {Col, Container, Row} from "react-bootstrap";
import SudokuPG from "./SudokuPG";
import React from "react";
import Header from "../../component/Header";
import SudokuInfo from "./SudokuInfo";
import SudokuBox from "./SudokuBox";

export default function Sudoku() {
    return (
        <Container fluid>
            <Header/>
            <Row className="mt-4">
                <Container>
                    <Row className="justify-content-around">
                        <Col>
                            <SudokuPG/>
                        </Col>
                        <Col>
                            <SudokuBox/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <SudokuInfo/>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}