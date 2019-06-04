var width = 300;
var height = 240;
var turnedOn = false;
let drawingInterval;

var plotter;
$(() => {
    const canvas = document.getElementById("plot");
    plotter = new Plotter(canvas);
    width = canvas.width;
    height = canvas.height;
    setUp();
});

function setUp() {
    stopDrawing();
    const onSwitch = $("#on-switch");
    onSwitch.click(() => {
        turnedOn = !turnedOn;
        onSwitch.toggleClass("on");
        if (turnedOn) {
            const settings = getSettings();
            if (!settingsValid(settings)) {
                alert("Невірні параметри сигналу");
                return;
            }
            drawPlot(settings);
        } else {
            stopDrawing();
        }
    }
    )
}

function getSettings() {
    const frequencyEl = $("#frequency");
    const ampEl = $("#amplitude");
    const durationEl = $("input[name=duration]:checked");

    return {
        frequency: parseInt(frequencyEl.val()),
        amplitude: parseInt(ampEl.val()),
        duration: parseFloat(durationEl.val()) * 1000,
    }
}

function settingsValid(settings) {
    return !Object.values(settings).some(isNaN);
}

function drawPlot({ frequency, amplitude, duration }) {
    const { drawingDelay, Tx } = getParameters(duration, frequency, width);
    delayedDraw(plotter, amplitude, drawingDelay, Tx, width, height);
}

function delayedDraw(plotter, A, drawingDelay, Tx, width, height) {
    const fromX = 0;
    const toX = width;
    const points = getPoints(A, Tx, fromX, toX, height);
    let currentPoint = 0;
    drawingInterval = setInterval(() => {
        const pointsPair = points.slice(currentPoint, currentPoint + 2)
        plotter.drawLine(pointsPair);
        if (currentPoint + 1 >= points.length - 1) {
            plotter.drawGrid();
            currentPoint = 0;
            return;
        }
        currentPoint += 1;
    }, drawingDelay);
}

function stopDrawing() {
    clearInterval(drawingInterval);
    plotter.drawGrid();
}