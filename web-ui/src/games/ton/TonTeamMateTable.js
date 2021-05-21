import {useSelector} from "react-redux";
import tonService from "../../service/TonService";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export default function TonTeamMateTable() {

    const players = useSelector(state => {
        return state.games.Ton.players
    })

    const me = useSelector(state => {
        return state.games.Ton.me
    })
    const player = tonService.resolveTeamMate(players, me)

    console.log(player)

    if (player == null) {
        return (
            <Container className="border">
                <Row>
                    <Col>
                        <h3>Empty</h3>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container className="border">
            <Row>
                <Col>
                    <h3>{player.username}</h3>
                </Col>
            </Row>
        </Container>
    )
}