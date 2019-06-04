const styles = {
    background: { fillColor: "#000000" },
    grid: { color: "#bbbbbb", width: 1 },
    axis: { color: "#bbbbbb", width: 4 },
    line: { color: "#00ff00", width: 4 },
}

class Plotter {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    drawLine(points) {
        if (points.length < 2) {
            return
        }
        this.setStyle('line')
        this.ctx.beginPath();
        const [x0, y0] = points[0];
        this.ctx.moveTo(x0, y0);
        for (let [x, y] of points.slice(1)) {
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    }

    setStyle(item) {
        const { color, width, fillColor } = styles[item];
        if (color)
            this.ctx.strokeStyle = color;
        if (width)
            this.ctx.lineWidth = width;
        if (fillColor)
            this.ctx.fillStyle = fillColor;
    }

    drawGrid() {
        this.setStyle('background')
        this.ctx.fillRect(0, 0, this.width, this.height);

        const yCenter = this.height / 2;
        const xCenter = this.width / 2;

        this.setStyle('axis')
        this.ctx.beginPath();
        this.ctx.moveTo(xCenter, 0);
        this.ctx.lineTo(xCenter, this.height);
        this.ctx.moveTo(0, yCenter);
        this.ctx.lineTo(this.width, yCenter);
        this.ctx.stroke();

        const squareSize = 30;
        const horizontalSquares = this.width / squareSize;
        const verticalSquares = Math.ceil(this.height / squareSize)

        this.setStyle('grid');
        this.ctx.beginPath();
        for (let i = 1; i < horizontalSquares / 2; i++) {
            const offset = i * squareSize;
            this.ctx.moveTo(xCenter + offset, 0);
            this.ctx.lineTo(xCenter + offset, this.height);
            this.ctx.moveTo(xCenter - offset, 0);
            this.ctx.lineTo(xCenter - offset, this.height);
            this.ctx.stroke();
        }

        for (let i = 1; i < verticalSquares / 2; i++) {
            const offset = i * squareSize;
            this.ctx.moveTo(0, yCenter + offset);
            this.ctx.lineTo(this.width, yCenter + offset);
            this.ctx.moveTo(0, yCenter - offset);
            this.ctx.lineTo(this.width, yCenter - offset);
            this.ctx.stroke();
        }
    }
}

