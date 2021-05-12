import {Button, Col, Container, Dropdown, Row} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import GameLevel from "../../constants/GameLevel";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import SudokuKeyBoard from "./SudokuKeyBoard";
import SudokuAction from "../../store/action/SudokuAction";
import sudokuService from "../../service/SudokuService";

export default function SudokuBox() {

    const level = useSelector(state => {
        return state.games.Sudoku.level
    })

    const dispatch = useDispatch();

    const handleLevelChange = (event) => {
        const newLevel = event.target.innerText
        if (newLevel !== level) {
            const action = {
                type: SudokuAction.changeLevel,
                payload: sudokuService.getGame(newLevel)
            }
            dispatch(action)
        }
    }

    const handleNewGame = () => {
        const action = {
            type: SudokuAction.newGame,
            payload: sudokuService.getGame(level)
        }
        dispatch(action)
    }

    const handleResetGame = () => {
        const action = {
            type: SudokuAction.resetGame
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
            <Row className="mt-4 justify-content-center">
                <Col className="text-center">
                    <SudokuKeyBoard/>
                </Col>
            </Row>
        </Container>
    )
}