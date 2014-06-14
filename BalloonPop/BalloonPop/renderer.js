// The renderer takes care of drawing the objects in the browser

var oldWindowLoad = window.onload,
    canvas = document.getElementById('field'),
    ctx = canvas.getContext('2d'),
    objects = [],
    balloons = [],
    bullets = [],
    player,
    collisionDispatcher;


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

function createObjects() {
    player = new Player(100, 200, 20, 'images/kermit.png', 0, -1);

    var balloonX = 150;
    var balloonY = 150;
    var balloonSize = 100;
    var balloon = new Baloon(balloonX, balloonY, balloonSize, 'images/balloon.png', -1, 1);
    balloons.push(balloon);

    collisionDispatcher = new collisions.CollisionDispatcher(ctx, player, balloons);
}

function drawGameObject(object) {
    var currentImage = object.image;
    var xPosition = object.x - currentImage.width / 2;
    var yPosition = object.y - currentImage.height / 2;

    ctx.drawImage(currentImage, xPosition, yPosition, currentImage.width, currentImage.height);

    ctx.beginPath();
    ctx.moveTo(object.x, object.y);
    ctx.lineTo(object.x + 40 * object.shootX, object.y + 40 * object.shootY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
}

function drawObjects() {
    drawGameObject(player);

    for (var i = 0, len = objects.length; i < len; i++) {
        drawGameObject(objects[i]);
    }
    for (var j = 0, len = player.projectiles.length; j < len; j++) {
        drawGameObject(player.projectiles[j]);
    }

    for (var k = 0, balloonsLength = balloons.length; k < balloonsLength; k++) {
        drawGameObject(balloons[k]);
    }
}

function updatePositions() {
    for (var i = 0, len = objects.length; i < len; i++) {
        if (objects[i].move) {
            objects[i].move();
        }
    }

    for (var j = 0, len = player.projectiles.length; j < len; j++) {
        player.projectiles[j].move();
    }

    for (var k = 0, balloonsLength = balloons.length; k < balloonsLength; k++) {
        balloons[k].move();
    }
}

window.onload = function () {
    createObjects();

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.onkeydown = checkKey;

        collisionDispatcher.baloonWallCollision();
        collisionDispatcher.baloonProjectileCollision();

        updatePositions();
        drawObjects();

        window.requestAnimationFrame(frame);
    }

    frame();
}