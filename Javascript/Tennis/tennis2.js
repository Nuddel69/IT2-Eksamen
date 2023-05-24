// loleolleoloelolol(sett opp banen)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'bane.png';
img.onload = () => {
  ctx.drawImage(img, 0, 0);
}

// hva er testikkelkreft
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
const ballRadius = 10;
let speed = 2;

// svarte faen
const paddleHeight = 100;
const paddleWidth = 10;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

// poæng
let score1 = 0;
let score2 = 0;

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

// skitten som faktisk funker
function main() {
  if (!paused && !gameOver) {
    // sprette ball
    x += dx * speed;
    y += dy * speed;
    
    // sprett av taket!
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
      dy = -dy;
    }
    
    // sjekk kollisjon
    if (x - ballRadius < paddleWidth) {
      if (y > paddle1Y && y < paddle1Y + paddleHeight) {
        dx = -dx;
        speed += 0.1
        speed += 0.1;
      } else if (x < 0) {
        score2++;
        if (score2 === 10) {
          gameOver = true;
          alert('Seier til spiller 2!');
        } else {
          speed = 2;
          resetBall();
        }
      }
    }
    if (x + ballRadius > canvas.width - paddleWidth) {
      if (y > paddle2Y && y < paddle2Y + paddleHeight) {
        dx = -dx;
        speed += 0.3;
      } else if (x > canvas.width) {
        score1++;
        if (score1 === 10) {
          gameOver = true;
          alert('Seier til spiller 1!');
        } else {
          speed = 2;
          resetBall();
        }
      }
    }
    
    // flytte racket
    if (87 in keysDown && paddle1Y > 0) { // W
      paddle1Y -= 5;
    }
    if (83 in keysDown && paddle1Y < canvas.height - paddleHeight) { // S
      paddle1Y += 5;
    }
    if (79 in keysDown && paddle2Y > 0) { // O
      paddle2Y -= 5;
    }
    if (76 in keysDown && paddle2Y < canvas.height - paddleHeight) { //L
      paddle2Y += 5;
    }
    
    // MATTE
    let paddleMidpoint1 = paddle1Y + paddleHeight / 2;
    let paddleMidpoint2 = paddle2Y + paddleHeight / 2;
    let bounceAngle1 = (y - paddleMidpoint1) / (paddleHeight / 2);
    let bounceAngle2 = (y - paddleMidpoint2) / (paddleHeight / 2);
    
    // VinkelSPrett!!!
    if (x - ballRadius < paddleWidth && y > paddle1Y && y < paddle1Y + paddleHeight) {
      dy = bounceAngle1 * 2;
    }
    if (x + ballRadius > canvas.width - paddleWidth && y > paddle2Y && y < paddle2Y + paddleHeight) {
      dy = bounceAngle2 * 2;
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
  
  // balle ;)
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#Ffff00';
  ctx.fill();
  ctx.closePath();
  
  // eksisterende racket
  ctx.fillStyle = '#000000';        ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
  
  // poeng
  ctx.font = '20px Arial';
  ctx.fillText(score1, canvas.width / 4, 20);
  ctx.fillText(score2, (3 * canvas.width) / 4, 20);
}

// tilbakestående ball
function resetBall() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  dx = -dx;
}
main();