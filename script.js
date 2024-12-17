const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let foodX, foodY;
let snakeX, snakeY;
let velocityX = 0, velocityY = 0;
let snakeBody = [[snakeX, snakeY]]; // Start with just the head
let score =0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    // Passing a random value between 1 and 30 as the food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const changeSnakePosition = () => {
    //passing a random value between 1 and 30 as the snake position
    snakeX = Math.floor(Math.random() * 30) + 1;
    snakeY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => {
    //key direction or button clicks
    const key = e.key || e.target.dataset.key
    if (key == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (key == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (key == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (key == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};


const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        alert("Game Over! Press Okay to Restart");
        clearInterval(gameInterval);
        location.reload();
        return;
    }

   
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        // Add a new segment at the position of the last segment
        const lastSegment = snakeBody[snakeBody.length - 1] || [snakeX, snakeY];
        snakeBody.push([...lastSegment]);
        score++;
    
        // Update score display
        highScore = Math.max(score, highScore);
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    // Update snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Update the head after moving the body

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            alert("Game Over! Press Okay to Restart");
            clearInterval(gameInterval);
            location.reload();
            return;
        }
    }
    
    // Draw the snake and food
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
};

// Initialize the game
changeFoodPosition();
changeSnakePosition();
const gameInterval = setInterval(initGame, 150); //Game updates every 150ms

//Set up event listener fr the keyboard keys
document.addEventListener("keydown", changeDirection);

// Set up event listener for the arrow keys
document.querySelectorAll(".controls img").forEach(img => {
    img.addEventListener("click", changeDirection);
});