import {Container, Col, Row} from "react-bootstrap";
import React from "react";

export default function NPuzzleInfo() {
    return (
        <Container>
            <Row>
                <Col>
                    <h5 className="entry-title">How to play</h5>
                    <p>The goal of N-Puzzle is move the pieces in the box to reach the target box</p>
                    <ul>
                        <li>Use <code>A</code>, <code>S</code>, <code>D</code>, <code>W</code> to move</li>
                        <li><b>Note</b>: Turn off Unikey or VietKey to avoid unexpected error</li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="entry-title">About NPuzzle</h5>
                    <p> TODO: Some description about nPuzzle game!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="entry-title">NPuzzle tips</h5>
                    <p> TODO: Some tips about nPuzzle game!</p>
                </Col>
            </Row>
        </Container>
    )
}