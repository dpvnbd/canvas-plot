function func(x, x1, A, Tx, height = 240) {
    const offset = height / 2;
    if (x >= x1 && x <= x1 + Tx / 2) {
        return offset - 2 * A * (x - 1 - x1) / Tx;
    }
    if (x >= x1 + Tx / 2 && x <= x1 + Tx) {
        return offset - 2 * A + 2 * A * (x - 1 - x1) / Tx;
    }
}

function getParameters(duration, frequency, width) {
    const drawingDelay = duration / width;
    const Tx = width / (frequency * drawingDelay);
    return {
        drawingDelay,
        Tx,
    }
}

function getPoints(A, Tx, fromX, toX, height) {
    const points = [];
    let x1 = 0;
    let y;
    while(x1 < toX){
        for (let x = fromX; x <= toX; x++) {
            y = func(x, x1, A, Tx, height);
            if (y) {
                points.push([x, y]);
            }
        }
        x1 += Tx;
    }

    
    return points
}