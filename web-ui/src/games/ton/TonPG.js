import {Button, Col, Container, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

export default function TonPG(props) {

    const stompClient = props.stompClient

    const me = useSelector(state => {
        return state.games.Ton.me
    })

    const handleReady = () => {
        stompClient.send("/app/room/ready", {}, JSON.stringify({
            username: me.username,
            ready: !me.ready
        }))
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div>Playing ground</div>
                    <Button variant={"light"} type={"button"} onClick={handleReady}>
                        {me.ready ? "Cancel" : "Ready"}
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}