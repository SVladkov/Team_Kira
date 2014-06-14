function Player(x, y, size, imageSource) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.weaponAngle = 4.71;
    this.shootX = Math.cos(this.weaponAngle);
    this.shootY = Math.sin(this.weaponAngle);
    this.projectiles = [];
    this.shoot = function () {
        var projectile = new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5, player.shootY * 5);
        this.projectiles.push(projectile);
        shootSound.play();
    };
    this.shiftWeaponLeft = function () {
        if (this.weaponAngle > 3.925) {
            this.weaponAngle -= 0.1;
        }
        this.calculateShootDirection();
    };
    this.shiftWeaponRight = function () {
        if (this.weaponAngle < 5.495) {
            this.weaponAngle += 0.1;
        }
        this.calculateShootDirection();
    };
    this.calculateShootDirection = function () {
        this.shootX = Math.cos(this.weaponAngle);
        this.shootY = Math.sin(this.weaponAngle);
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