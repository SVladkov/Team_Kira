// The renderer takes care of drawing the objects in the browser

var oldWindowLoad = window.onload,
    canvas = document.getElementById('field'),
    ctx = canvas.getContext('2d'),
    objects = [],
    bullets = [],
    player;

function drawPoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}

function drawPlayer(object) {
    ctx.drawImage(object.image, object.x - object.image.width / 2, object.y - object.image.height / 2);

    ctx.beginPath();
    ctx.moveTo(object.x, object.y);
    ctx.lineTo(object.x + 40 * object.shootX, object.y + 40 * object.shootY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
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
    else if (e.keyCode == '32') {
        player.shoot(player);
    }
    else if (e.keyCode == '65') {
        x = player.shootX;
        player.shootX = player.shootY;
        player.shootY = -x;
    }
    else if (e.keyCode == '68') {
        y = player.shootY;
        player.shootY = player.shootX;
        player.shootX = -y;
    }
}

function updatePosition(ball) {
    ball.x = ball.updateX(ball);
    ball.y = ball.updateY(ball);
}

function shoot(player) {
    var bullet = {
        x: player.x,
        y: player.y,
        directionX: player.shootX,
        directionY: player.shootY,
        radius: 3,
        draw: drawPoint,
        updateX: function () { return this.x + this.directionX },
        updateY: function () { return this.y + this.directionY },
        update: updatePosition
    }

    bullets.push(bullet);
}

function createObjects() {
    var ball = {
        x: 100,
        y: 100,
        radius: 10,
        draw: drawPoint,
        angle: 0,
        updateX: function () { this.angle += 0.02; return 150 + 100 * Math.cos(this.angle); },
        updateY: function () { this.angle += 0.02; return 150 + 100 * Math.sin(this.angle); },
        update: updatePosition
    }

    var imageObj = new Image();
    imageObj.src = 'kermit.png';
    imageObj.onload = function () { }

    var player1 = {
        image: imageObj,
        radius: 30,
        width: 32,
        height: 32,
        x: 100,
        y: 200,
        draw: drawPlayer,
        update: function () { },
        shootX: 0,
        shootY: -1,
        shoot: shoot
    };

    player = player1;

    objects.push(ball);
}

function drawPoints() {
    player.draw(player);
    for (var i = 0, len = objects.length; i < len; i++) {
        objects[i].draw(objects[i]);
    }
    for (var i = 0, len = bullets.length; i < len; i++) {
        console.log("hola");
        bullets[i].draw(bullets[i]);
    }
}

function updatePositions() {
    for (var i = 0, len = objects.length; i < len; i++) {
        objects[i].update(objects[i]);
    }
    for (var i = 0, len = bullets.length; i < len; i++) {
        bullets[i].update(bullets[i]);
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

