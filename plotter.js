const styles = {
    background: { fillColor: "#000000" },
    grid: { color: "#bbbbbb", width: 1 },
    mainGrid: { color: "#bbbbbb", width: 4 },
    line: { color: "#ffffff", widith: 4 },
}

class Plotter {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    drawLine(points) {
        if (points.lengt < 2) {
            return
        }
        this.setStyle('line')
        this.ctx.beginPath();
        const [x0, y0] = points[0];
        this.ctx.moveTo(x0, y0);
        for (let i = 1; i < points.length; i++) {
            const [x, y] = points[i];
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
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.setStyle('background')
        this.ctx.fillRect(0, 0, this.width, this.height);

        const yCenter = this.height / 2;
        const xCenter = this.width / 2;

        this.setStyle('mainGrid')
        this.ctx.beginPath();
        this.ctx.moveTo(xCenter, 0);
        this.ctx.lineTo(xCenter, this.height);
        this.ctx.moveTo(0, yCenter);
        this.ctx.lineTo(this.width, yCenter);
        this.ctx.stroke();

        const horizontalSquares = 10;
        const squareSize = this.width / horizontalSquares;
        const verticalSquares = Math.ceil(this.height / squareSize)

        this.setStyle('grid');
        this.ctx.beginPath();
        for (let i = 1; i < horizontalSquares; i++) {
            const offset = i * squareSize;
            this.ctx.moveTo(xCenter + offset, 0);
            this.ctx.lineTo(xCenter + offset, this.height);
            this.ctx.moveTo(xCenter - offset, 0);
            this.ctx.lineTo(xCenter - offset, this.height);
            this.ctx.stroke();
        }

        for (let i = 1; i < verticalSquares; i++) {
            const offset = i * squareSize;
            this.ctx.moveTo(0, yCenter + offset);
            this.ctx.lineTo(this.width, yCenter + offset);
            this.ctx.moveTo(0, yCenter - offset);
            this.ctx.lineTo(this.width, yCenter - offset);
            this.ctx.stroke();
        }
    }
}

