import {Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ApiConstants from "../../constants/ApiConstants";
import {useDispatch} from "react-redux";
import TonAction from "../../store/action/TonAction";

export default function TonLobby() {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("")
    const [team, setTeam] = useState("Red")
    const [slot, setSlot] = useState(1)

    console.log("Slot", slot)

    const handJoinRoom = () => {
        const user = {
            username: username,
            team: team,
            slot: slot
        }
        axios.post(ApiConstants.JOIN_ROOM_URL, user)
            .then(res => {
                console.log(res)
                dispatch({
                    type: TonAction.initRoom,
                    payload: {
                        room: res.data,
                        me: user
                    }
                })
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Control type="text" onChange={event => setUsername(event.target.value)}
                                      placeholder="username" value={username}/>
                        <Form.Control as="select" onChange={event => {
                            setTeam(event.target.value)
                            setSlot(2)
                        }} value={team}>
                            <option>Red</option>
                            <option>Black</option>
                        </Form.Control>
                        <Form.Control as="select" onChange={event => setSlot(Number(event.target.value))} value={slot}>
                            <option>{team === 'Red' ? 1 : 2}</option>
                            <option>{team === 'Red' ? 3 : 4}</option>
                        </Form.Control>
                    </Form>
                    <Button type="button" className="d-block" onClick={handJoinRoom} disabled={username === ''}>
                        Join Room
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}