// loleolleoloelolol(sett opp banen)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'bane2.png';
img.onload = () => {
  ctx.drawImage(img, 0, 0);
}

// hva er en ball egentlig?
let x = 200;
let y = 100;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let speed = 2;
// definering av rekkert og hindring
const paddleHeight = 10;
const paddleWidth = 100;
let paddle1Y = 500;
let paddle1X = (canvas.width/2 - paddleWidth/2 );
let cubeX = 150;
let cubeY = 125;
let cubeHeight = 100;
let cubeWidth = 100;
// poæng
let score1 = 0;
// noe noe gamestate
let paused = false;
let gameOver = false;
// klikke knapper
const keysDown = {};
window.addEventListener('keydown', (e) => {
  keysDown[e.keyCode] = true;
  if (e.keyCode === 32) { //mellomrom
    paused = !paused;
  }
  if (e.keyCode === 82) { // R
    resetGame();
  }
});
window.addEventListener('keyup', (e) => {
  delete keysDown[e.keyCode];
});
// reset
function resetGame() {
  score1 = 0;
  score2 = 0;
  gameOver = false;
  speed = 2;
  resetBall();
}
// hoved-loop
function main() {
  if (!paused && !gameOver) {
    // sprette ball
    x += dx * speed;
    y += dy * speed;
    dy = dy +0.07 //gravitasjonen
    // sprett av taket+veggene!
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
      dy = -dy;
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
      dx = -dx;
    }
    // sjekk kollisjon på rekkert
    if (y + ballRadius >= (paddle1Y+ paddleHeight)){
      if (x+ballRadius > paddle1X & x-ballRadius < paddle1X + paddleWidth)  {
        dy = -dy;
        score1++;
        console.log ("spretter av rekkerten")
      } 
      // hvordan tape
    if (y > 550) {
        gameOver = true;
        alert("Du tapte!");
      }
  }
  //Valgfri hindring (den røde kuben)
  if (y - ballRadius-5 <= cubeY+ cubeHeight && y + ballRadius + 5 >= cubeY) {
      if (x + ballRadius >= cubeX & x- ballRadius <= cubeX + cubeWidth) {
        dy = -dy;
      }}
      if (x - ballRadius-5 <= cubeX+ cubeWidth && x + ballRadius + 5 >= cubeX){
          if (y + ballRadius >= cubeY & y- ballRadius <= cubeY + cubeHeight) {
              dx = -dx;
      } }
    // flytte racket
    if (87 in keysDown && paddle1X > 0) { // W
      paddle1X -= 5;
    }
    if (83 in keysDown && paddle1X < canvas.width - paddleWidth) { // S
      paddle1X += 5;
    }
    draw();
  }
  // oppdatereeeeeee
  requestAnimationFrame(main);
}
// tegnetid
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // bakgrunn
  ctx.drawImage(img, 0, 0);
  // balle
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#Ffff00';
  ctx.fill();
  ctx.closePath();
  // eksisterende racket
  ctx.fillStyle = '#000000';        
  ctx.fillRect(paddle1X, paddle1Y, paddleWidth, paddleHeight);
  //hindring
  ctx.fillStyle = 'red';        
  ctx.fillRect(cubeX, cubeY, cubeWidth, cubeHeight);
  // poeng
  ctx.font = '20px Arial';
  ctx.fillText(score1, canvas.width/2, 20);
}
// reset ball
function resetBall() {
  x = 200
  y = 100
  dx = -dx;
}
main();