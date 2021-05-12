import {Container, Row, Col} from "react-bootstrap";
import ShowRoom from "./ShowRoom";
import PageInfo from "./PageInfo";
import React from "react";
import Header from "./Header";

export default function Home() {
    return (
        <Container fluid>
            <Header/>
            <Row className={"justify-content-around"}>
                <Col md={5} lg={4} xl={3}>
                    <PageInfo/>
                </Col>
                <Col md={7} lg={8}>
                    <ShowRoom/>
                </Col>
            </Row>
        </Container>
    );
}