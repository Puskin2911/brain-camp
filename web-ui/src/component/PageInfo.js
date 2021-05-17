import {Col, Container, Row} from "react-bootstrap";
import HonorTable from "./HonorTable";
import React from "react";
import {mockUserInfo} from "../mockData";

export default function PageInfo() {
    const user = mockUserInfo()
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <div className="w-50 border m-auto rounded">
                        <img src={user.avatar} alt="avatar" width="100%" className="rounded-circle"/>
                    </div>
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