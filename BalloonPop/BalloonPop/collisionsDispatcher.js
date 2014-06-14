var collisions = (function () {
    var ctx = null,
        thePlayer = null,
        theBaloons = null,
        theProjectiles = null;

    function CollisionDispatcher(context, player, baloons) {
        ctx = context;
        thePlayer = player;
        theBaloons = baloons;
        theProjectiles = thePlayer.projectiles;
    }

    CollisionDispatcher.prototype.projectileWallCollision = function () {
        for (var i = 0, len = theProjectiles.length; i < len; i++) {
            var currentProjectile = theProjectiles[i];

            if ((currentProjectile.x <= 0)
                || (currentProjectile.y <= 0)
                || (currentProjectile.x + currentProjectile.size >= ctx.canvas.width)
                || (currentProjectile.y + currentProjectile.size >= ctx.canvas.height)) {
                // Destroy the projectile

                theProjectiles.splice(i, 1);
            }
        }
    }

    CollisionDispatcher.prototype.balloonWallCollision = function () {
        for (var i = 0; i < theBaloons.length; i++) {
            var currentBaloon = theBaloons[i];

            if ((currentBaloon.x - currentBaloon.size / 2 <= 0)
                || (currentBaloon.x + currentBaloon.size / 2 >= ctx.canvas.width)) {
                currentBaloon.speedX *= -1;
            }

            if ((currentBaloon.y - currentBaloon.size / 2 <= 0)
                || (currentBaloon.y + currentBaloon.size / 2 >= ctx.canvas.height)) {
                currentBaloon.speedY *= -1;
            }
        }
    }

    CollisionDispatcher.prototype.balloonProjectileCollision = function () {
        for (var i = 0, baloonsLen = theBaloons.length; i < baloonsLen; i++) {
            var currentBaloon = theBaloons[i];

            for (var j = 0, projectilesLen = theProjectiles.length; j < projectilesLen; j++) {
                var currentProjectile = theProjectiles[i];

                if (areColliding(currentBaloon, currentProjectile)) {
                    // Pop the baloon
                    theBaloons.splice(i, 1);

                    // Destroy the projectile
                    theProjectiles.splice(j, 1);
                }
            }
        }
    }

    CollisionDispatcher.prototype.balloonPlayerCollision = function () {
        for (var i = 0; i < theBaloons.length; i++) {
            var currentBaloon = theBaloons[i];
            
            if (areColliding(currentBaloon, thePlayer)) {
                return true;
            }
        }

        return false;
    }

    function areColliding(first, second) {
        var deltaX = (first.x) - (second.x);
        var deltaY = (first.y) - (second.y);

        var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

        if (distance <= first.size / 2 + second.size / 2) {
            return true;
        }
        else {
            return false;
        }
    }

    return {
        CollisionDispatcher: CollisionDispatcher
    }
}());