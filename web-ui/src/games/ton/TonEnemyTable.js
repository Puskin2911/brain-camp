import {Col, Container, Row} from "react-bootstrap";
import React from "react";
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

    const displayCard = () => {
        let displayCards = ""
        player.cards.forEach(card => {
            displayCards = displayCards.concat(card.rank).concat(card.suit).concat("   ")
        })
    }

    return (
        <Container className="border">
            <Row>
                <Col className={"text-center"}>
                    <h3>{player.username}</h3>
                    <div>{player.ready ? "Ready" : "Non-Ready"}</div>
                    {displayCard()}
                </Col>
            </Row>
        </Container>
    )
}