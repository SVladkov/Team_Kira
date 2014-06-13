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

function drawPlayer(object) {
    console.log(object.width);
    ctx.drawImage(object.image, object.x - object.image.width/2, object.y - object.image.height/2);
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
        x: 100,
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
    imageObj.onload = function () {
        console.log('img:', imageObj.width + ' ' + imageObj.height);
    }

    var player1 = {
        image: imageObj,
        radius: 30,
        width: 32,
        height: 32,
        x: 10,
        y: 10,
        draw: drawPlayer,
        update: function () { }
    };

    player = player1;

    objects.push(ball);
}

function drawPoints() {
    player.draw(player);
    for (var i = 0, len = objects.length; i < len; i++) {
        objects[i].draw(objects[i]);
    }
}

function updatePositions() {
    for (var i = 0, len = objects.length; i < len; i++) {
        objects[i].update(objects[i]);
    }
}

function reactToCollision() {
    for (var i = 0, len = objects.length; i < len; i++) {
        var cx = objects[i].x,
            cy = objects[i].y,
            px = player.x,
            py = player.y,
            r = objects[i].radius,
            inCircle = Math.sqrt((cx - px) * (cx - px) + (cy - py) * (cy - py)) < r;
        if (inCircle) {
            alert("end");
        }
    }
}

window.onload = function () {
    createObjects();

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.onkeydown = checkKey;
        reactToCollision();
        updatePositions();
        drawPoints();

        window.requestAnimationFrame(frame);
    }

    frame();
}

