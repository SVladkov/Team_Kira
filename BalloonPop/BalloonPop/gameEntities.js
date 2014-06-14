function Player(x, y, size, imageSource, shootX, shootY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.shootX = shootX;
    this.shootY = shootY;
    this.projectiles = [];
    this.shoot = function () {
        var projectile = new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX, player.shootY);
        this.projectiles.push(projectile);
        shootSound.play();
    }
}

function Baloon(x, y, size, imageSource, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.width = this.size;
    this.image.height = this.size;
    this.image.src = imageSource;
    this.speedX = speedX;
    this.speedY = speedY;
    this.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}

function Projectile(x, y, size, imageSource, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.speedX = speedX;
    this.speedY = speedY;
    this.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}