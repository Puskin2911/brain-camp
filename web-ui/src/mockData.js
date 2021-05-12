import Item from "./utils/Item";
import GameLevel from "./constants/GameLevel";
import {loadSudoku} from "./service/ImageLoader";

export function mockGameInfo(textId) {
    return {
        textId: textId.toLowerCase(),
        name: textId,
        skills: "Brain, Eyes",
        avatar: loadSudoku()
    }
}

export function mockGames() {
    return [mockGameInfo("Sudoku"), mockGameInfo("Knight-tour"), mockGameInfo("N-puzzle"),
        mockGameInfo("Ton"), mockGameInfo("secret-game")]
}

export function mockTrainers() {
    return [
        {
            id: 1,
            username: "Hulk",
            "elo": 2000
        },
        {
            id: 2,
            username: "Puskin",
            "elo": 1900
        },
        {
            id: 3,
            username: "Hehe",
            "elo": 1800
        },
        {
            id: 4,
            username: "Test user",
            "elo": 1700
        }
    ]
}

export function mockSudokuBoard(level) {
    let array;
    if (level === GameLevel.EASY)
        array = [
            [0, 0, 0, 9, 0, 2, 7, 3, 8],
            [0, 6, 0, 0, 0, 5, 0, 0, 9],
            [8, 2, 9, 3, 0, 0, 6, 0, 1],
            [0, 0, 1, 0, 0, 6, 0, 8, 2],
            [0, 9, 3, 0, 1, 0, 4, 0, 5],
            [0, 8, 0, 7, 0, 0, 9, 1, 0],
            [9, 0, 0, 0, 0, 7, 0, 0, 0],
            [0, 3, 8, 6, 0, 0, 5, 0, 0],
            [0, 0, 0, 5, 0, 1, 8, 9, 4]
        ]

    else array = [
        [0, 0, 0, 9, 0, 2, 7, 3, 0],
        [0, 6, 0, 0, 0, 5, 0, 0, 9],
        [8, 0, 9, 3, 0, 0, 6, 0, 1],
        [0, 0, 1, 0, 0, 6, 0, 8, 2],
        [0, 9, 0, 0, 1, 0, 4, 0, 5],
        [0, 8, 0, 7, 0, 0, 0, 1, 0],
        [9, 0, 0, 0, 0, 7, 0, 0, 0],
        [0, 3, 8, 6, 0, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 1, 8, 9, 0]
    ]

    const result = [];
    array.forEach(row => {
        const rowRes = []
        row.forEach(value => {
            rowRes.push(new Item(value, value === 0));
        })
        result.push(rowRes);
    })
    return result;
}

export function mockKnightBoardStatus() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 13, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}