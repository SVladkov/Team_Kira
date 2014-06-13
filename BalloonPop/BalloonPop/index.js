var oldWindowLoad = window.onload;

window.onload = function f() {
    oldWindowLoad();
    var ball = {
        x: 100,
        y: 60,
        radius: 20,
        draw: drawPoint,
        angle: 0,
        updateX: function () { this.angle += 0.02; return 200 + 10 * Math.cos(this.angle); },
        updateY: function () { this.angle += 0.02; return 150 + 100 * Math.sin(this.angle); },
        update: updatePosition
    }
    objects.push(ball);
};
