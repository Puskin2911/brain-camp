import {Button, Col, Container, Row} from "react-bootstrap";
import React from "react";

export default function Ton() {
    return (
        <Container>
            <Row className={"justify-content-center vh-20"}>
                <Col sm={4} className={"border"}>
                    <div>Teammate</div>
                </Col>
            </Row>
            <Row className={"justify-content-between vh-40 mt-5"}>
                <Col sm={3} className={"border"}>
                    <Button>First Enemy</Button>
                </Col>
                <Col sm={5} className={"border"}>
                    <div>Playing ground</div>
                </Col>
                <Col sm={3} className={"border"}>
                    <Button>Second Enemy</Button>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col sm={7} className={"border"}>
                    <div>My card</div>
                </Col>
                <Col sm={2} className={"border"}>
                    <Container>
                        <Row>
                            <Col>
                                <Button>Tấn</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button>Đỡ</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button>Dập</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col sm={3} className={"border"}>
                    <div>Chat Area</div>
                </Col>
            </Row>
        </Container>
    )
}