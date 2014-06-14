var collisions = (function() {
    var ctx = null,
        thePlayer = null,
        theBaloons = null,
        theProjectiles = null,
        thePowerUps = null;

    function CollisionDispatcher(context, player, baloons, powerUps) {
        ctx = context;
        thePlayer = player;
        theBaloons = baloons;
        theProjectiles = thePlayer.projectiles;
        thePowerUps = powerUps;
    }

    CollisionDispatcher.prototype.projectileWallCollision = function() {
        for (var i = 0, len = theProjectiles.length; i < len; i++) {
            var currentProjectile = theProjectiles[i];

            if ((currentProjectile.x <= 0) || (currentProjectile.y <= 0) || (currentProjectile.x + currentProjectile.size >= ctx.canvas.width) || (currentProjectile.y + currentProjectile.size >= ctx.canvas.height)) {
                // Destroy the projectile

                theProjectiles.splice(i, 1);
                break;
            }
        }
    }

    CollisionDispatcher.prototype.balloonWallCollision = function() {
        for (var i = 0; i < theBaloons.length; i++) {
            var currentBaloon = theBaloons[i];

            if ((currentBaloon.x - currentBaloon.size / 2 <= 0) || (currentBaloon.x + currentBaloon.size / 2 >= ctx.canvas.width)) {
                currentBaloon.speedX *= -1;
            }

            if ((currentBaloon.y - currentBaloon.size / 2 <= 0) || (currentBaloon.y + currentBaloon.size / 2 >= ctx.canvas.height)) {
                currentBaloon.speedY *= -1;
            }
        }
    }

    CollisionDispatcher.prototype.balloonProjectileCollision = function() {
        for (var i = 0, baloonsLen = theBaloons.length; i < baloonsLen; i++) {
            var currentBaloon = theBaloons[i];

            for (var j = 0, projectilesLen = theProjectiles.length; j < projectilesLen; j++) {
                var currentProjectile = theProjectiles[i];

                if (areColliding(currentBaloon, currentProjectile)) {
                    // Baloon multiplication
                    if (currentBaloon.size > 50) {
                        newBaloonsX = currentBaloon.x,
                        newBaloonsY = currentBaloon.y,
                        newBaloonsSize = Math.floor(currentBaloon.size / 1.5),
                        newBaloonsSrc = currentBaloon.image.src,
                        oldBaloonDirX = currentBaloon.speedX,
                        oldBaloonDirY = currentBaloon.speedY;
                        theBaloons.push(new Baloon(newBaloonsX, newBaloonsY, newBaloonsSize, newBaloonsSrc, oldBaloonDirX, (oldBaloonDirY > 0) ? -Math.abs(oldBaloonDirY) : Math.abs(oldBaloonDirY)));
                        theBaloons.push(new Baloon(newBaloonsX, newBaloonsY, newBaloonsSize, newBaloonsSrc, (oldBaloonDirX > 0) ? -Math.abs(oldBaloonDirX) : Math.abs(oldBaloonDirX), oldBaloonDirY));
                    }

                    // Pop the baloon                    
                    popSound.play();
                    theBaloons.splice(i, 1);

                    var powerUp = Math.floor(Math.random() * 2);
                    if (powerUp > 0) {
                        var powerUp = new PowerUp(currentBaloon.x, currentBaloon.y, 25, 'images/powerup-' + powerUp + '.png', powerUp);
                        thePowerUps.push(powerUp);
                    }

                    // Destroy the projectile
                    theProjectiles.splice(j, 1);
                }
            }
        }
    }

    CollisionDispatcher.prototype.balloonPlayerCollision = function() {
        for (var i = 0; i < theBaloons.length; i++) {
            var currentBaloon = theBaloons[i];

            if (areColliding(currentBaloon, thePlayer)) {
                return true;
            }
        }

        return false;
    }

    CollisionDispatcher.prototype.powerUpPlayerCollision = function () {
        for (var i = 0; i < thePowerUps.length; i++) {
            var currentPowerUp = thePowerUps[i];

            if (areColliding(currentPowerUp, thePlayer)) {
                thePowerUps.splice(i, 1);
                thePlayer.currentAttack = currentPowerUp.ID;
                var reduceTime = setInterval(function () {
                    currentPowerUp.powerTime -= 1;
                    if (currentPowerUp.powerTime <= 0) {
                        thePlayer.currentAttack = 0;
                        clearInterval(reduceTime);
                    }
                }, 1000);
            }

            if (currentPowerUp.y + currentPowerUp.size / 2 >= ctx.canvas.height) {
                thePowerUps.splice(i, 1);
            }
        }
    };

    function areColliding(first, second) {
        if (first === undefined || second === undefined) {
            return;
        }
        var deltaX = (first.x) - (second.x);
        var deltaY = (first.y) - (second.y);

        var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

        if (distance <= first.size / 2 + second.size / 2) {
            return true;
        } else {
            return false;
        }
    }

    return {
        CollisionDispatcher: CollisionDispatcher
    }
}());