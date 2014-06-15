function startGame(lives){ 
	var canvas = document.getElementById('field'),
		ctx = canvas.getContext('2d'),
		balloons = [],
		powerUps = [],
		player,
		collisionDispatcher,
		renderer,
		playerLives = lives;
		level = 1;

	function checkKey(e) {
		e = e || window.event;

		if (e.keyCode == '37') {
			player.x -= 10;
			if (player.x < 10) {
				player.x = 10;
			}
			player.direction = player.left;
		}
		else if (e.keyCode == '39') {
			player.x += 10;
			if (player.x > ctx.canvas.width - 10) {
				player.x = ctx.canvas.width - 10;
			}
			player.direction = player.right;
		}
		else if (e.keyCode == '32') {
			player.shoot(player);
			player.direction = player.up;
		}
		else if (e.keyCode == '65') {
			player.shiftWeaponLeft();
		}
		else if (e.keyCode == '68') {
			player.shiftWeaponRight();
		}
	}

	function initializeGame() {
		//player = new StaticImagePlayer(100, 550, 20, 'images/kermit.png');
		
					
		if(playerLives === 0){
			gameOver();
		}
		
		spriteParameters = {
			upRow: 3,
			downRow: 0,
			leftRow: 1,
			rightRow: 2,
			rows: 4,
			numberOfFrames: 4,
			ticksPerFrame: 10,
			tickCount: 0,
		};
		player = new SpriteImagePlayer(100, 500, 20, 'images/ninja.png', spriteParameters);
		
		for(var i = 0; i < level; i+=1){
			var balloonX = 150,
				balloonY = 150,
				balloonSize = 100,
				speedX = (i%2 === 0)? -1 : 1;
				speedY = (i%2 === 0)? 1 : -1;
				balloon = new Baloon(balloonX, balloonY, balloonSize, 'images/balloon.png', speedX, speedY);
			balloons.push(balloon);
		}
		
		collisionDispatcher = new collisions.CollisionDispatcher(ctx, player, balloons, powerUps);

		renderer = new renderers.CanvasRenderer(player, balloons, ctx, powerUps);
	}

	function start() {
		initializeGame();

		function frame() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			document.onkeydown = checkKey;

			collisionDispatcher.balloonWallCollision();
			collisionDispatcher.balloonProjectileCollision();
			collisionDispatcher.projectileWallCollision();
			collisionDispatcher.powerUpPlayerCollision();
			var playerIsHitByBalloon = collisionDispatcher.balloonPlayerCollision();

			if (playerIsHitByBalloon) {
				playerLives -=1;
				balloons = [];
				powerUps = []
				start();		
			}

			renderer.updatePositions();
			renderer.drawObjects();

			window.requestAnimationFrame(frame);
		
			if(balloons.length === 0){
				level += 1;
				start();
			}
		}
				
		frame();
	}
	
	start();
}