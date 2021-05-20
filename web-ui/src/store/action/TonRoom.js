import {Button, Col, Container, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import SockJs from "sockjs-client";
import ApiConstants from "../../constants/ApiConstants";
import Stomp from "stompjs";
import {useDispatch, useSelector} from "react-redux";
import TonAction from "./TonAction";
import TonEnemyTable from "../../games/ton/TonEnemyTable";

export default function TonRoom() {

    const ws = new SockJs(ApiConstants.SOCKET_CONNECT_URL);
    ws.withCredentials = false;
    const stompClient = Stomp.over(ws);

    const dispatch = useDispatch();

    const players = useSelector(state => {
        return state.games.Ton.players
    })

    useEffect(() => {
        stompClient.connect({}, () => {
            stompClient.subscribe("/room/join", (payload) => {
                const player = JSON.parse(payload.body);
                console.log(player)
                const newPlayers = [...players]
                newPlayers.push(player)
                dispatch({
                    type: TonAction.updatePlayer,
                    payload: newPlayers
                })
            });

            stompClient.subscribe("/room/leave", (payload) => {
                const player = JSON.parse(payload.body);
            });

            stompClient.subscribe("/room/game/start", (payload) => {
                console.log("From Room receive signal start game!");
                const gameStart = JSON.parse(payload.body);
            });
        })
    }, [])

    return (
        <Container>
            <Row className={"justify-content-center vh-20"}>
                <Col sm={4} className={"border"}>
                    <div>Teammate</div>
                </Col>
            </Row>
            <Row className={"justify-content-between vh-40 mt-5"}>
                <Col sm={3} className={"border"}>
                    <TonEnemyTable isAfterGuy={false}/>
                </Col>
                <Col sm={5} className={"border"}>
                    <div>Playing ground</div>
                </Col>
                <Col sm={3} className={"border"}>
                    <TonEnemyTable isAfterGuy={true}/>
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