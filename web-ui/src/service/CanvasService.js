import Point from "../utils/Point";
import {LINE_WIDTH} from "../constants/BoardConstants";

const getPosition = (canvas, event, boardSize, cellNumber, isDebug = false) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const point = new Point(x, y);
    const xy = point.toPosition(boardSize, cellNumber);
    if (isDebug) console.log(xy);

    return xy;
}

const fillCell = (ctx, position, cellSize, color = 'red') => {
    if (position !== undefined && position !== null) {
        const xFrom = position.col * (cellSize + 1) + LINE_WIDTH;
        const yFrom = position.row * (cellSize + 1) + LINE_WIDTH;
        ctx.fillStyle = color;
        ctx.fillRect(xFrom + LINE_WIDTH, yFrom + LINE_WIDTH, cellSize - LINE_WIDTH, cellSize - LINE_WIDTH);
    }
}

// TODO: Improve offSet calculate method
const drawCellValue = (ctx, position, cellSize, value, color = 'red',) => {
    if (position !== undefined && position !== null) {
        const fontSize = cellSize / 2;
        const fontWidth = fontSize * 0.55;
        const fontHeight = fontSize * 0.8;
        const length = (value + '').length
        const horizontalOffSet = (cellSize - fontWidth * length) / 2;
        const verticalOffset = (cellSize - fontHeight) / 2;

        ctx.font = fontSize + 'px Comic Sans MS';
        ctx.fillStyle = color;

        ctx.fillText(value,
            (cellSize + LINE_WIDTH) * position.col + LINE_WIDTH + horizontalOffSet,
            (cellSize + LINE_WIDTH) * (position.row + 1) + LINE_WIDTH - verticalOffset)
    }
}

const canvasService = {
    getPosition,
    fillCell,
    drawCellValue
}

export default canvasService;