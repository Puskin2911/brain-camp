import React, {useState} from "react";
import {Button, Col, Form, InputGroup} from "react-bootstrap";
import GameLevel from "../constants/GameLevel";
import {useDispatch, useSelector} from "react-redux";
import KnightTourAction from "../store/action/KnightTourAction";

export default function LevelBox() {
    const [localLevel, setLocalLevel] = useState(GameLevel.EASY)

    const dispatch = useDispatch();
    const globalLevel = useSelector(state => {
        return state.games.KnightTour.level
    })

    const handleLevelChange = (event) => {
        setLocalLevel(event.target.value)
    }

    const handleUpdateLevel = () => {
        const action = {
            type: KnightTourAction.changeLevel,
            payload: localLevel
        }
        dispatch(action)
    }

    return (
        <Col>
            <Form>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Level</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" value={localLevel} onChange={handleLevelChange}>
                            <option value={GameLevel.EASY}>{GameLevel.EASY}</option>
                            <option value={GameLevel.NORMAL}>{GameLevel.NORMAL}</option>
                            <option value={GameLevel.HARD}>{GameLevel.HARD}</option>
                            <option value={GameLevel.EXPERT}>{GameLevel.EXPERT}</option>
                        </Form.Control>
                        <InputGroup.Append>
                            <Button onClick={handleUpdateLevel} disabled={localLevel === globalLevel}>Go</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Col>
    )
}