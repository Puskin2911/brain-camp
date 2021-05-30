import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export default function KnightRTourInfo() {
    return (
        <Container>
            <Row>
                <Col>
                    <h5 className="entry-title">How to play</h5>
                    <p> The goal of Knight Tour is to travel all cell in a board. One each cell must be left with a
                        number. One travel is legal if:</p>
                    <ul className={"bg-light pl-5 p-3 rounded"}>
                        <li>Only one move for each cell</li>
                        <li>Sum of all numbers in rows and columns must have the same value and equal pre-define value
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="entry-title">About Knight Tour</h5>
                    <p> knight's tour is a sequence of moves of a knight on a chessboard such that the knight visits
                        every square exactly once. If the knight ends on a square that is one knight's move from the
                        beginning square (so that it could tour the board again immediately, following the same path),
                        the tour is closed; otherwise, it is open.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="entry-title">Knight tour tips</h5>
                    <p> This game really is hard game</p>
                    <ul className={"bg-light pl-5 p-3 rounded"}>
                        <li>Tip 1: // TODO
                        </li>
                        <li>Tip 2: // TODO
                        </li>
                        <p>// TODO</p>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}