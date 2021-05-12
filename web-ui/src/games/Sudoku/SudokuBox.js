import {Button, Col, Container, Dropdown, Row} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import GameLevel from "../../constants/GameLevel";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import NPuzzleAction from "../../store/action/NPuzzleAction";
import nPuzzleService from "../../service/NPuzzleService";

export default function SudokuBox() {

    const level = useSelector(state => {
        return state.games.Sudoku.level
    })

    const dispatch = useDispatch();

    const handleLevelChange = (event) => {
        const newLevel = event.target.innerText
        if (newLevel !== level) {
            const action = {
                type: NPuzzleAction.changeLevel,
                payload: nPuzzleService.getGame(newLevel)
            }
            dispatch(action)
        }
    }

    const handleNewGame = () => {
        const action = {
            type: NPuzzleAction.newGame,
            payload: nPuzzleService.getGame(level)
        }
        dispatch(action)
    }

    const handleResetGame = () => {
        const action = {
            type: NPuzzleAction.resetGame
        }
        dispatch(action)
    }

    return (
        <Container fluid>
            <Row className="justify-content-between">
                <Col sm={8} className="text-left">
                    <Button variant="success" className="m-2" onClick={handleResetGame}>Reset</Button>
                    <Button variant="info" className="m-2" onClick={handleNewGame}>New Game</Button>
                </Col>
                <Col sm={4} className="text-right">
                    <DropdownButton id="level-dropdown" variant="light" title={level} className="m-2">
                        <Dropdown.Item onClick={handleLevelChange}>{GameLevel.EASY}</Dropdown.Item>
                        <Dropdown.Item onClick={handleLevelChange}>{GameLevel.NORMAL}</Dropdown.Item>
                        <Dropdown.Item onClick={handleLevelChange}>{GameLevel.HARD}</Dropdown.Item>
                        <Dropdown.Item onClick={handleLevelChange}>{GameLevel.EXPERT}</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className={"justify-content-center mt-3"}>
                <Col sm={3} className={"text-center"}>
                    <Button variant={"outline-info"} className={"btn-circle"}>
                        <i className="fas fa-undo fa-2x"/>
                    </Button>
                </Col>
                <Col sm={3} className={"text-center"}>
                    <Button variant={"outline-info"} className={"btn-circle"}>
                        <i className="fas fa-eraser fa-2x"/>
                    </Button>
                </Col>
                <Col sm={3} className={"text-center"}>
                    <Button variant={"outline-info"} className={"btn-circle"}>
                        <i className="fas fa-pencil-alt fa-2x"/>
                    </Button>
                </Col>
                <Col sm={3} className={"text-center"}>
                    <Button variant={"outline-info"} className={"btn-circle"}>
                        <i className="fas fa-lightbulb fa-2x"/>
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Container>
                    <Row className={"justify-content-center"}>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                        <Col sm={2} className={"text-center border m-2"}>
                            <code>1</code>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}