import Position from "./Position";

export function cloneArray(array) {
    const newArray = [];

    for (let i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}

export function swapPosition(array, first, second) {
    const [firstRow, firstCol] = first.toRowCol()
    const [secondRow, secondCol] = second.toRowCol()
    const temp = array[firstRow][firstCol]
    array[firstRow][firstCol] = array[secondRow][secondCol]
    array[secondRow][secondCol] = temp;
}

export function findPosition(array, value) {
    let position = null;
    if (array !== null && array !== undefined) {
        array.forEach((row, i) => {
            row.forEach((item, j) => {
                if (item === value) {
                    position = new Position(i, j)
                }
            })
        })
    }
    return position
}

export function manhattan(first, second) {
    let sum = 0;
    first.forEach((row, firstRow) => {
        row.forEach((value, firstCol) => {
            if (value !== 0) {
                const secondPosition = findPosition(second, value)
                const [secondRow, secondCol] = secondPosition.toRowCol()

                sum += Math.abs(firstRow - secondRow) + Math.abs(firstCol - secondCol)
            }
        })
    })
    return sum;
}

export function fill2Dimension(size, value) {
    const arr = []
    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            row.push(value)
        }
        arr.push(row)
    }
    return arr;
}