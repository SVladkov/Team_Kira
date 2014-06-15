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
                return;
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
                var currentProjectile = theProjectiles[j];

                if (areColliding(currentBaloon, currentProjectile)) {
                    // Baloon multiplication
                    if (currentBaloon.size > 50) {
                        spawnBalloons(currentBaloon);
                    }
                    
                    var powerUp = Math.floor(Math.random() * 2);
                    if (powerUp > 0) {
                        var powerUp = new PowerUp(currentBaloon.x, currentBaloon.y, 25, 'images/powerup-' + powerUp + '.png', powerUp);
                        thePowerUps.push(powerUp);
                    }

                    // Pop the baloon                    
                    popSound.play();
                    theBaloons.splice(i, 1);

                    // Destroy the projectile
                    theProjectiles.splice(j, 1);
                    return;
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

                if (thePlayer.currentAttack === currentPowerUp.ID) {
                    thePlayer.currentAttackTimeLeft += currentPowerUp.powerTime;
                }
                else {
                    clearInterval(thePlayer.currentAttackInterval);

                    thePlayer.currentAttack = currentPowerUp.ID;
                    thePlayer.currentAttackTimeLeft = currentPowerUp.powerTime;
                    thePlayer.currentAttackInterval = setInterval(function () {
                        thePlayer.currentAttackTimeLeft -= 1;
                        if (thePlayer.currentAttackTimeLeft <= 0) {
                            thePlayer.currentAttack = 0;
                            clearInterval(thePlayer.currentAttackInterval);
                        }
                    }, 1000);
                }
            }

            if (currentPowerUp.y + currentPowerUp.size / 2 >= ctx.canvas.height) {
                thePowerUps.splice(i, 1);
            }
        }
    };

    function spawnBalloons(parentBalloon) {
        var newSize = Math.floor(parentBalloon.size / 1.5);
        var firstSpeedX = parentBalloon.speedX;
        var secondSpeedX = parentBalloon.speedX * -1;

        var firstChildBalloon = new Baloon(parentBalloon.x, parentBalloon.y, newSize, parentBalloon.image.src, firstSpeedX, parentBalloon.speedY);
        var secondChildBalloon = new Baloon(parentBalloon.x, parentBalloon.y, newSize, parentBalloon.image.src, secondSpeedX, parentBalloon.speedY);
        
        theBaloons.push(firstChildBalloon);
        theBaloons.push(secondChildBalloon);
    }

    function areColliding(first, second) {
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