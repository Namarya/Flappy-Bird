
var flappyBird;
var pipes = [];
var score;

var birdImg = new Image();
birdImg.src = "./assets/bird.png";
var bottomPipeImg = new Image();
bottomPipeImg.src = "./assets/bottom-pipe.png";
var topPipeImg = new Image();
topPipeImg.src = "./assets/top-pipe.png";

function startGame() {
    myGameArea.start();
    flappyBird = new component(34, 24, birdImg, 30, 270);
    flappyBird.gravity = 0.1;
    pipes.push(new component(52, 320, topPipeImg, 500, -280))
    pipes.push(new component(52, 320, bottomPipeImg, 500, 280))
    for (var u = 1; u < 5; u++){
        generatePipe();
    }
    score = 0;
}

function generatePipe() {
    var lastPipeX = pipes[pipes.length - 1].x;
    var newPipeX = lastPipeX + Math.floor(Math.random() * (500)) + 100;

    pipes.push(new component(52, 320, topPipeImg, newPipeX, Math.floor(Math.random() * (0 - 240 + 1)) - 10));
    pipes.push(new component (52, 320, bottomPipeImg, newPipeX, Math.floor(Math.random() * (580 - 300 + 1)) + 300));
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, img, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = img;
    this.gravity = 0;
    this.velocity = 0;
    this.jumpStrength = -3 ;

    this.update = function () {
        ctx = myGameArea.context;
        this.velocity += this.gravity;
        this.y += this.velocity;
        ctx.drawImage(this.img, this.x, this.y);
    }
}

function drawScore(score, x, y){
    ctx = myGameArea.context;
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, x, y);
}
function updateGameArea() {
    myGameArea.clear();
    flappyBird.update();
    score++;
    

    for(var i = pipes.length - 1; i >= 0; i--){
        pipes[i].update();
        pipes[i].x -= 4;

        if (checkCollision(flappyBird, pipes[i])) {
            endGame();
            return;
        }

        if(pipes[i].x + pipes[i].width < 0){
            pipes.splice(i, 1);
            generatePipe();
        }
    }

    if(flappyBird.y + flappyBird.height >= 600){
        endGame();
        return;
    }

    drawScore(score, 10, 50);
    document.addEventListener("keydown", jump);
}

function jump(e) {
    if (e.code == "Space" && flappyBird.y > 0) {
        flappyBird.velocity = flappyBird.jumpStrength;
    }

}

function endGame(){
    clearInterval(myGameArea.interval);
    ctx = myGameArea.context;
    myGameArea.clear();
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", 300, 265)
    drawScore(score,300, 300);  
}


function checkCollision(bird, pipe){
    return (
        bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < pipe.y + pipe.height &&
        bird.y + bird.height > pipe.y
    );
}
console.log("Thank you https://github.com/sourabhv for the assets!!")