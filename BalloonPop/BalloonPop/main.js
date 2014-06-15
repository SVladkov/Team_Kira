function startGame(lives){ 
	var canvas = document.getElementById('field'),
		ctx = canvas.getContext('2d'),
		balloons = [],
		powerUps = [],
		player,
		collisionDispatcher,
		renderer,
		playerLives = lives,
		playerScore = 0;


	function checkKey(e) {
		e = e || window.event;

		if (e.keyCode == '37') {
			player.x -= 10;
			if (player.x < 10) {
				player.x = 10;
			}
		}
		else if (e.keyCode == '39') {
			player.x += 10;
			if (player.x > ctx.canvas.width - 10) {
				player.x = ctx.canvas.width - 10;
			}
		}
		else if (e.keyCode == '32') {
			player.shoot(player);
		}
		else if (e.keyCode == '65') {
			player.shiftWeaponLeft();
		}
		else if (e.keyCode == '68') {
			player.shiftWeaponRight();
		}
	}

	function initializeGame() {
		player = new Player(100, 550, 20, 'images/kermit.png');
		
		if(playerLives === 0){
			var playerToAdd = { name: playerName, score: playerScore};
			highscores.push(playerToAdd);
			gameOver();
		}
		
		var balloonX = 150,
			balloonY = 150,
			balloonSize = 100,
			balloon = new Baloon(balloonX, balloonY, balloonSize, 'images/balloon.png', -1, 1);
		balloons.push(balloon);

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
				start();		
			}

			renderer.updatePositions();
			renderer.drawObjects();

			window.requestAnimationFrame(frame);
		}

		frame();
	}
	
	start();
}