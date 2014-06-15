function StaticImagePlayer(x, y, size, imageSource) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.weaponAngle = 4.71;
    this.shootX = Math.cos(this.weaponAngle);
    this.shootY = Math.sin(this.weaponAngle);
    this.projectiles = [];
    this.attacks = ['normal-shot', 'triple-shot'];
    this.currentAttack = 0;
    this.currentAttackTimeLeft = 0;
    this.currentAttackInterval = null;
    this.shoot = function (player) {
        switch (this.attacks[this.currentAttack]) {
            case 'normal-shot':
                var projectile = new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5, player.shootY * 5);
                this.projectiles.push(projectile);
                shootSound.play();
                break;

            case 'triple-shot':
                var projectilez = [];
                projectilez.push(new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5 - 5, player.shootY * 5));
                projectilez.push(new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5, player.shootY * 5));
                projectilez.push(new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5 + 5, player.shootY * 5));

                for (var i = 0; i < projectilez.length; i += 1) {
                    this.projectiles.push(projectilez[i]);
                    shootSound.play();
                }

                break;
        }
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

function SpriteImagePlayer(x, y, size, imageSource, spriteParameters) {
    this.frameIndex = 0;
	this.up = spriteParameters.upRow;
	this.down = spriteParameters.downRow;
	this.left = spriteParameters.leftRow;
	this.right = spriteParameters.rightRow;
    this.direction = this.up;
    this.tickCount = spriteParameters.tickCount;
    this.ticksPerFrame = spriteParameters.ticksPerFrame;
    this.numberOfFrames = spriteParameters.numberOfFrames;
    this.spriteRows = spriteParameters.rows;
    this.x = x + 25;
    this.y = y + 25;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.weaponAngle = 4.71;
    this.shootX = Math.cos(this.weaponAngle);
    this.shootY = Math.sin(this.weaponAngle);
    this.projectiles = [];
    this.attacks = ['normal-shot', 'triple-shot'];
    this.currentAttack = 0;
    this.currentAttackTimeLeft = 0;
    this.currentAttackInterval = null;
    this.shoot = function (player) {
        switch (this.attacks[this.currentAttack]) {
            case 'normal-shot':
                var projectile = new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5, player.shootY * 5);
                this.projectiles.push(projectile);
                shootSound.play();
                break;

            case 'triple-shot':
                var projectilez = [];
                projectilez.push(new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5 - 5, player.shootY * 5));
                projectilez.push(new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5, player.shootY * 5));
                projectilez.push(new Projectile(player.x, player.y, 3, 'images/projectile.png', player.shootX * 5 + 5, player.shootY * 5));

                for (var i = 0; i < projectilez.length; i += 1) {
                    this.projectiles.push(projectilez[i]);
                    shootSound.play();
                }

                break;
        }
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
    };   

    this.move = function () {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    };
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

function PowerUp(x, y, size, imageSource, ID) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSource;
    this.ID = ID;
    this.powerTime = 5;
    this.speedY = 1;
    this.move = function () {
        this.y += this.speedY;
    };
}