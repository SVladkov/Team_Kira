// The renderer takes care of drawing the objects in the browser

var oldWindowLoad = window.onload,
    canvas = document.getElementById('field'),
    ctx = canvas.getContext('2d'),
    objects = [],
    player;

function drawPoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}

function drawObject(object) {
    ctx.drawImage(object.image, object.x, object.y);
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        player.x -= 10;
    }
    else if (e.keyCode == '38') {
        player.y -= 10;
    }
    else if (e.keyCode == '39') {
        player.x += 10;
    }
    else if (e.keyCode == '40') {
        player.y += 10;
    }
}

function updatePosition(ball) {
    ball.angle += 0.02;
    ball.x = ball.updateX(ball);
    ball.y = ball.updateY(ball);
}

function createObjects() {
    var ball = {
        x: 40,
        y: 100,
        radius: 10,
        draw: drawPoint,
        angle: 0,
        updateX: function () { return 150 + 100 * Math.cos(this.angle); },
        updateY: function () { return 150 + 100 * Math.sin(this.angle); },
        update: updatePosition
    }

    var imageObj = new Image();
    imageObj.src = 'kermit.png';
    var player1 = {
        image: imageObj,
        radius: 30,
        x: 100,
        y: 200,
        draw: drawObject,
        update: function () {}
    };

    player = player1;

    objects.push(ball);
    objects.push(player);
}

function drawPoints() {
    for (var i = 0, len = objects.length; i < len; i++) {
        objects[i].draw(objects[i]);
    }
}

function updatePositions() {
    for (var i = 0, len = objects.length; i < len; i++) {
        objects[i].update(objects[i]);
    }
}

window.onload = function () {
    createObjects();

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.onkeydown = checkKey;
        updatePositions();
        drawPoints();

        window.requestAnimationFrame(frame);
    }

    frame();
}

