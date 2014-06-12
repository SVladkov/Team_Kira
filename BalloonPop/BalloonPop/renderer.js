// The renderer takes care of drawing the objects in the browser

var oldWindowLoad = window.onload,
    canvas = document.getElementById('field'),
    ctx = canvas.getContext('2d');

function drawPoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}

function changePosition(ball, traectory) {
    ball.x = traectory.x + traectory.radius * Math.cos(traectory.angle);
    ball.y = traectory.y + traectory.radius * Math.sin(traectory.angle);
}

function drawMovingBalloon(balloon, traectory) {
    traectory.angle += 0.05;

    changePosition(balloon, traectory);
    drawPoint(balloon);

    ctx.beginPath();
    ctx.arc(traectory.x, traectory.y, traectory.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawObject(object) {
    ctx.drawImage(object.image, object.x, object.y);
}

function player(player1) {
    drawObject(player1);

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '37') {
            player1.x -= 10;
        }
        else if (e.keyCode == '38') {
            player1.y -= 10;
        }
        else if (e.keyCode == '39') {
            player1.x += 10;
        }
        else if (e.keyCode == '40') {
            player1.y += 10;
        }
    }
}

window.onload = function () {
    //oldWindowLoad();
    //player();

    var traectory = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 150,
        angle: 0
    }
    var balloon = {
        radius: 5,
        x: 0,
        y: 0
    };

    var imageObj = new Image();
    imageObj.src = 'kermit.png';
    var player1 = {
        image: imageObj,
        radius: 30,
        x: 100,
        y: 200,
    };

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawMovingBalloon(balloon, traectory);
        player(player1);

        window.requestAnimationFrame(frame);
    }

    frame();
}

