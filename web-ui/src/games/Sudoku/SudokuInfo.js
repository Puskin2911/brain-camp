import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export default function SudokuInfo() {
    return (
        <Container>
            <Row>
                <Col>
                    <h5 className="entry-title">How to play</h5>
                    <p> The goal of Sudoku is to fill in a 9×9 grid with digits so that each column, row, and 3×3
                        section contain the numbers between 1 to 9. At the beginning of the game, the 9×9 grid will have
                        some of the squares filled in. Your job is to use logic to fill in the missing digits and
                        complete the grid. Don’t forget, a move is incorrect if:</p>
                    <ul className={"bg-light pl-5 p-3 rounded"}>
                        <li>Any row contains more than one of the same number from 1 to 9</li>
                        <li>Any column contains more than one of the same number from 1 to 9</li>
                        <li>Any 3×3 grid contains more than one of the same number from 1 to 9</li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="entry-title">About Sudoku</h5>
                    <p> The popular Japanese puzzle game Sudoku is based on the logical placement of numbers. An online
                        game of logic, Sudoku doesn’t require any calculation nor special math skills; all that is
                        needed are brains and concentration.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="entry-title">Sudoku tips</h5>
                    <p> Sudoku is a fun puzzle game once you get the hang of it. At the same time, learning to play
                        Sudoku can be a bit intimidating for beginners. So, if you are a complete beginner, here are a
                        few Sudoku tips that you can use to improve your Sudoku skills.</p>
                    <ul className={"bg-light pl-5 p-3 rounded"}>
                        <li>Tip 1: Look for rows, columns of 3×3 sections that contain 5 or more numbers. Work through
                            the remaining empty cells, trying the numbers that have not been used. In many cases, you
                            will find numbers that can only be placed in one position considering the other numbers that
                            are already in its row, column, and 3×3 grid.
                        </li>
                        <li>Tip 2: Break the grid up visually into 3 columns and 3 rows. Each large column will have 3,
                            3×3 grids and each row will have 3, 3×3 grids. Now, look for columns or grids that have 2 of
                            the same number. Logically, there must be a 3rd copy of the same number in the only
                            remaining 9-cell section. Look at each of the remaining 9 positions and see if you can find
                            the location of the missing number.
                        </li>
                        <p>Now that you know a little more about Sudoku, play and enjoy this free online game.</p>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}