const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5,
    velocityY: 0,
    jumpForce: 15,
    grounded: false
};

let keys = {
    left: false,
    right: false,
    jump: false
};

const gravity = 0.8;
const groundHeight = 100;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp' || e.key === ' ') keys.jump = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp' || e.key === ' ') keys.jump = false;
});

document.getElementById('leftButton').addEventListener('touchstart', () => keys.left = true);
document.getElementById('leftButton').addEventListener('touchend', () => keys.left = false);
document.getElementById('rightButton').addEventListener('touchstart', () => keys.right = true);
document.getElementById('rightButton').addEventListener('touchend', () => keys.right = false);
document.getElementById('jumpButton').addEventListener('touchstart', () => keys.jump = true);
document.getElementById('jumpButton').addEventListener('touchend', () => keys.jump = false);

document.getElementById('toggleButton').addEventListener('click', () => {
    const controls = document.querySelector('.controls');
    controls.style.display = controls.style.display === 'none' ? 'flex' : 'none';
});

function update() {
    if (keys.left) {
        player.x -= player.speed;
    }
    if (keys.right) {
        player.x += player.speed;
    }
    if (keys.jump && player.grounded) {
        player.velocityY = -player.jumpForce;
        player.grounded = false;
    }

    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y + player.height > canvas.height - groundHeight) {
        player.y = canvas.height - groundHeight - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
