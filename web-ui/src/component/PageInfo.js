import {Col, Container, Row} from "react-bootstrap";
import HonorTable from "./HonorTable";
import React from "react";

export default function PageInfo() {
    return (
        <Container fluid className={"border border-danger"}>
            <Row className={"border border-primary"}>
                <Col className="text-center">
                    <div>User info</div>
                </Col>
            </Row>
            <Row className={"mt-4"}>
                <Col>
                    <HonorTable/>
                </Col>
            </Row>
        </Container>
    )
}