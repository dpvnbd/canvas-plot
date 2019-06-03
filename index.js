$(() => {
    const canvas = document.getElementById("plot");
    const ctx = canvas.getContext("2d");

    let plotter = new Plotter(ctx);

    plotter.drawGrid();

    const data = [
        [0, 0], [30, 30], [250, 100]
    ]

    plotter.drawLine(data)
});