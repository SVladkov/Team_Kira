// The renderer takes care of drawing the objects in the browser

var renderers = (function () {
    var thePlayer,
        theBalloons,
        thePowerUps,
        ctx;

    function CanvasRenderer(player, balloons, context, powerUps) {
        thePlayer = player;
        theBalloons = balloons;
        thePowerUps = powerUps;
        ctx = context;
    }

    function drawSprite(object) {
        image = new Image();
        image.src = "images/ninja.png",
        ctx.drawImage(
            object.image,
            object.frameIndex * object.image.width / object.numberOfFrames,
            object.direction,
            object.image.width / object.numberOfFrames,
            object.image.height / object.spriteRows,
            object.x,//(2 * object.x + object.image.width) / 2,
            object.y,//(2 * object.y + object.image.height) / 2,
            object.image.width / object.numberOfFrames,
            object.image.height / object.spriteRows);
        drawWeapon(object);
    };

    function drawGameObject(object) {
        var currentImage = object.image;
        var xPosition = object.x - currentImage.width / 2;
        var yPosition = object.y - currentImage.height / 2;

        ctx.drawImage(currentImage, xPosition, yPosition, currentImage.width, currentImage.height);

        drawWeapon(object);
    }

    function drawWeapon(object) {
        ctx.beginPath();
        ctx.moveTo(object.x, object.y);
        ctx.lineTo(object.x + 40 * object.shootX, object.y + 40 * object.shootY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }

    CanvasRenderer.prototype.drawObjects = function () {
        drawSprite(thePlayer);

        for (var j = 0, len = thePlayer.projectiles.length; j < len; j++) {
            drawGameObject(thePlayer.projectiles[j]);
        }

        for (var k = 0, balloonsLength = theBalloons.length; k < balloonsLength; k++) {
            drawGameObject(theBalloons[k]);
        }

        for (var p = 0, powerUpsLength = thePowerUps.length; p < powerUpsLength; p += 1) {
            drawGameObject(thePowerUps[p]);
        }
    }

    CanvasRenderer.prototype.updatePositions = function () {
		thePlayer.move();
	
        for (var j = 0, projectilesLen = thePlayer.projectiles.length; j < projectilesLen; j++) {
            thePlayer.projectiles[j].move();
        }

        for (var k = 0, balloonsLength = theBalloons.length; k < balloonsLength; k++) {
            theBalloons[k].move();
        }

        for (var p = 0, powerUpsLength = thePowerUps.length; p < powerUpsLength; p += 1) {
            thePowerUps[p].move();
        }
    }

    return {
        CanvasRenderer: CanvasRenderer
    }
}());