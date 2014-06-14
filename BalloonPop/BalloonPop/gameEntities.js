function Player(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.projectiles = [];
}

function Baloon(x, y, size, image, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.speedX = speedX;
    this.speedY = speedY;
    this.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}

function Projectile(x, y, size, image, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.speedX = speedX;
    this.speedY = speedY;
    this.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}