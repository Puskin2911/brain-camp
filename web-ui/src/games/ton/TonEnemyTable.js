import {Col, Container, Row} from "react-bootstrap";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import tonService from "../../service/TonService";

export default function TonEnemyTable(props) {

    const players = useSelector(state => {
        return state.games.Ton.players
    })

    const me = useSelector(state => {
        return state.games.Ton.me
    })

    const isAfterGuy = props.isAfterGuy

    const player = tonService.resolveEnemy(players, me, isAfterGuy)

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