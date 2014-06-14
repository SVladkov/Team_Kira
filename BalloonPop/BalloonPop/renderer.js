// The renderer takes care of drawing the objects in the browser

var renderers = (function () {
    var thePlayer,
        theBalloons,
        ctx;

    function CanvasRenderer(player, balloons, context) {
        thePlayer = player;
        theBalloons = balloons;
        ctx = context;
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

    CanvasRenderer.prototype.drawObjects = function () {
        drawGameObject(thePlayer);


        for (var j = 0, len = thePlayer.projectiles.length; j < len; j++) {
            drawGameObject(thePlayer.projectiles[j]);
        }

        for (var k = 0, balloonsLength = theBalloons.length; k < balloonsLength; k++) {
            drawGameObject(theBalloons[k]);
        }
    }

    CanvasRenderer.prototype.updatePositions = function () {
        for (var j = 0, projectilesLen = thePlayer.projectiles.length; j < projectilesLen; j++) {
            thePlayer.projectiles[j].move();
        }

        for (var k = 0, balloonsLength = theBalloons.length; k < balloonsLength; k++) {
            theBalloons[k].move();
        }
    }

    return {
        CanvasRenderer: CanvasRenderer
    }
}());