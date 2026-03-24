// 获取游戏元素
const gameContainer = document.querySelector('.game-container');
const player = document.querySelector('.player');
const ball = document.querySelector('.ball');
const scoreElement = document.querySelector('.score');

// 游戏参数
const gameWidth = gameContainer.offsetWidth;
const gameHeight = gameContainer.offsetHeight;
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const ballSize = ball.offsetWidth;

// 玩家位置和速度
let playerX = (gameWidth - playerWidth) / 2;
let playerSpeed = 8;

// 球的位置和速度
let ballX = (gameWidth - ballSize) / 2;
let ballY = 50;
let ballSpeedX = 2;
let ballSpeedY = 2;

// 得分
let score = 0;

// 按键状态
const keys = { a: false, d: false };

// 监听键盘事件
document.addEventListener('keydown', (e) => {
    if (e.key === 'a') keys.a = true;
    if (e.key === 'd') keys.d = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'a') keys.a = false;
    if (e.key === 'd') keys.d = false;
});

// 监听触摸事件
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    const touchCurrentX = e.touches[0].clientX;
    const touchDiff = touchCurrentX - touchStartX;
    
    if (touchDiff > 10) {
        // 向右移动
        keys.d = true;
        keys.a = false;
    } else if (touchDiff < -10) {
        // 向左移动
        keys.a = true;
        keys.d = false;
    }
    
    touchStartX = touchCurrentX;
});

document.addEventListener('touchend', () => {
    keys.a = false;
    keys.d = false;
});

// 游戏循环
function gameLoop() {
    // 更新玩家位置
    if (keys.a && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys.d && playerX < gameWidth - playerWidth) {
        playerX += playerSpeed;
    }
    player.style.left = playerX + 'px';

    // 更新球的位置
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 球与左右墙壁碰撞
    if (ballX <= 0 || ballX >= gameWidth - ballSize) {
        ballSpeedX = -ballSpeedX;
    }

    // 球与顶部碰撞
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // 球与玩家碰撞检测
    if (
        ballY + ballSize >= gameHeight - playerHeight - 20 && // 20是玩家距离底部的距离
        ballX >= playerX &&
        ballX <= playerX + playerWidth
    ) {
        ballSpeedY = -ballSpeedY;
        score++;
        scoreElement.textContent = `得分: ${score}`;
    }

    // 球落地游戏结束
    if (ballY >= gameHeight - ballSize) {
        alert(`游戏结束！最终得分: ${score}`);
        resetGame();
    }

    // 更新球的位置
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // 继续游戏循环
    requestAnimationFrame(gameLoop);
}

// 重置游戏
function resetGame() {
    playerX = (gameWidth - playerWidth) / 2;
    ballX = (gameWidth - ballSize) / 2;
    ballY = 50;
    ballSpeedX = 2;
    ballSpeedY = 2;
    score = 0;
    scoreElement.textContent = `得分: ${score}`;
}

// 开始游戏
gameLoop();