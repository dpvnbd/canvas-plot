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

function drawPlot({ frequency, amplitude, duration }) {
    const { drawingDelay, Tx } = getParameters(duration, frequency, width);
    delayedDraw(plotter, amplitude, drawingDelay, Tx, width, height);
}

function delayedDraw(plotter, A, drawingDelay, Tx, width, height) {
    plotter.drawGrid();

    const fromX = 0;
    const toX = width;
    let x = fromX;

    drawingInterval = setInterval(() => {
        const points = getPoints(A, Tx, fromX, x, height);
        plotter.drawLine(points);
        if (x >= toX) {
            clearInterval(drawingInterval);
        }
        x += 1;
    }, drawingDelay);
}

function clearPlot() {
    clearInterval(drawingInterval);
    plotter.drawGrid();
}

function setUp() {
    clearPlot();
    const onSwitch = $("#on-switch");
    onSwitch.click(() => {
        turnedOn = !turnedOn;
        onSwitch.toggleClass("on");
        onSwitch.toggleClass("off");

        if (turnedOn) {
            const settings = getSettings();
            if (!settingsValid(settings)) {
                alert("Invalid");
                return;
            }
            drawPlot(settings);
        } else {
            clearPlot();
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