var oldWindowLoad = window.onload,
    canvas = document.getElementById('field'),
    ctx = canvas.getContext('2d'),
    balloons = [],
    powerUps = [],
    player,
    collisionDispatcher,
    renderer;


function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        player.x -= 10;
        if (player.x < 10) {
            player.x = 10;
        }
    }
    else if (e.keyCode == '39') {
        player.x += 10;
        if (player.x > ctx.canvas.width - 10) {
            player.x = ctx.canvas.width - 10;
        }
    }
    else if (e.keyCode == '32') {
        player.shoot(player);
    }
    else if (e.keyCode == '65') {
        player.shiftWeaponLeft();
    }
    else if (e.keyCode == '68') {
        player.shiftWeaponRight();
    }
}

function initializeGame() {
    player = new Player(100, 550, 20, 'images/kermit.png', 0, -1);

    var balloonX = 150,
        balloonY = 150,
        balloonSize = 100,
        balloon = new Baloon(balloonX, balloonY, balloonSize, 'images/balloon.png', -1, 1);
    balloons.push(balloon);

    collisionDispatcher = new collisions.CollisionDispatcher(ctx, player, balloons, powerUps);

    renderer = new renderers.CanvasRenderer(player, balloons, ctx, powerUps);
}

window.onload = function () {
    initializeGame();

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.onkeydown = checkKey;

        collisionDispatcher.balloonWallCollision();
        collisionDispatcher.balloonProjectileCollision();
        collisionDispatcher.projectileWallCollision();
        collisionDispatcher.powerUpPlayerCollision();
        var playerIsHitByBalloon = collisionDispatcher.balloonPlayerCollision();

        if (playerIsHitByBalloon) {
            // Implement logic...

            
        }

        renderer.updatePositions();
        renderer.drawObjects();

        window.requestAnimationFrame(frame);
    }

    frame();
}