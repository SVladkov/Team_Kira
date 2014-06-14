function Player(x, y, size, imageSource, shootX, shootY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.shootX = shootX;
    this.shootY = shootY;
    this.projectiles = [];
}

function Baloon(x, y, size, imageSource, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.width = this.size / 2;
    this.image.height = this.size / 2;

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