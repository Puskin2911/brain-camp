import {cloneArray, findPosition, manhattan, swapPosition} from "../../utils/ArrayUtils";
import Position from "../../utils/Position";

const isEquals = (boardInit, boardGoal) => {
    let isEquals = true;
    boardInit.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value !== boardGoal[i][j]) {
                isEquals = false;
            }
        })
        if (isEquals) return isEquals;
    })
    return isEquals;
}

const include = (board, history) => {
    for (let i = 0; i < history.length; i++) {
        if (isEquals(board, history[i].board)) {
            return true
        }
    }
    return false
}

const moveDirection = {
    UP: "↑",
    DOWN: "↓",
    LEFT: "←",
    RIGHT: "→"
}

const getNeighbors = (board) => {
    const size = board.length

    const currentPosition = findPosition(board, 0)
    const [currentRow, currentCol] = currentPosition.toRowCol()

    const neighbors = []
    if (currentRow > 0) {
        const upNeighbor = cloneArray(board)
        swapPosition(upNeighbor, currentPosition, new Position(currentRow - 1, currentCol))
        neighbors.push({
            data: upNeighbor,
            direction: moveDirection.UP
        })
    }
    if (currentRow < size - 1) {
        const downNeighbor = cloneArray(board)
        swapPosition(downNeighbor, currentPosition, new Position(currentRow + 1, currentCol))
        neighbors.push({
            data: downNeighbor,
            direction: moveDirection.DOWN
        })
    }
    if (currentCol > 0) {
        const leftNeighbor = cloneArray(board)
        swapPosition(leftNeighbor, currentPosition, new Position(currentRow, currentCol - 1))
        neighbors.push({
            data: leftNeighbor,
            direction: moveDirection.LEFT
        })
    }
    if (currentCol < size - 1) {
        const rightNeighbors = cloneArray(board)
        swapPosition(rightNeighbors, currentPosition, new Position(currentRow, currentCol + 1))
        neighbors.push({
            data: rightNeighbors,
            direction: moveDirection.RIGHT
        })
    }
    return neighbors
}

class SolverState {
    constructor(board, moves, previous, direction) {
        this.board = board
        this.moves = moves
        this.previous = previous
        this.direction = direction
    }
}

export default class NPuzzleSolver {
    constructor(boardInit, boardGoal) {
        this.boardInit = boardInit
        this.boardGoal = boardGoal
    }

    solve() {
        let state = new SolverState(this.boardInit, 0, null, "")
        const history = [state]
        const directions = []
        while (!isEquals(state.board, this.boardGoal)) {
            state = this.getNextMove(state, history)

            if (state == null) return null

            history.push(state)
            directions.push(state.direction)
        }

        return {
            states: history,
            moves: state.moves,
            directions: directions
        }
    }

    getNextMove(state, history) {
        const neighbours = getNeighbors(state.board)
        const unusedNeighbors = neighbours.filter(neighbor => !include(neighbor.data, history))

        const priorities = unusedNeighbors.map(neighbor => ({
            priority: manhattan(neighbor.data, this.boardGoal),
            board: neighbor.data,
            direction: neighbor.direction
        }))
        if (priorities.length < 1) {
            console.log(`Queue length was less than 1.`);
            return null;
        }

        priorities.sort((a, b) => a.priority - b.priority)
        return new SolverState(priorities[0].board, state.moves + 1, state, priorities[0].direction)
    }

}