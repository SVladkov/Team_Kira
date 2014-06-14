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

            if ((currentProjectile.x - currentProjectile.size <= 0)
                || (currentProjectile.y - currentProjectile.size <= 0)
                || (currentProjectile.x + currentProjectile.size >= ctx.canvas.width)
                || (currentProjectile.y + currentProjectile.size >= ctx.canvas.height)) {
                // Destroy the projectile

                theProjectiles.splice(i, 1);
            }
        }
    }

    CollisionDispatcher.prototype.baloonWallCollision = function () {
        for (var i = 0; i < theBaloons.length; i++) {
            var currentBaloon = theBaloons[i];

            if ((currentBaloon.x - currentBaloon.size <= 0)
                || (currentBaloon.x + currentBaloon.size >= ctx.canvas.width)){
                currentBaloon.speedX *= -1;
            }

            if ((currentBaloon.y - currentBaloon.size <= 0)
                || (currentBaloon.y + currentBaloon.size >= ctx.canvas.height)) {
                currentBaloon.speedY *= -1;
            }
        }
    }

    CollisionDispatcher.prototype.baloonProjectileCollision = function () {
        for (var i = 0, baloonsLen = theBaloons.length; i < baloonsLen; i++) {
            var currentBaloon = theBaloons[i];

            for (var j = 0, projectilesLen = theProjectiles.length; j < projectilesLen; j++) {
                var currentProjectile = theProjectiles[i];

                if (areColliding(currentBaloon, currentProjectile)) {
                    // Pop the baloon


                    // Destroy the projectile
                    theProjectiles.splice(i, 1);
                }
            }
        }
    }

    CollisionDispatcher.prototype.baloonPlayerCollision = function () {
        for (var i = 0; i < theBaloons.length; i++) {
            var currentBaloon = theBaloons[i];
            
            if (areColliding(currentBaloon, thePlayer)) {
                return true;
            }
        }

        return false;
    }

    function areColliding(first, second) {
        var deltaX = first.x - second.x;
        var deltaY = first.y - second.y;

        var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

        if (distance <= first.size + first.size) {
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