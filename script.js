const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;

const modal = document.querySelector(".modal");

const startButton = document.querySelector(".btnStart");
const restartButton = document.querySelector(".btnRestart");

const startGameModal = document.querySelector(".startGame");
const gameOverModal = document.querySelector(".gameOver");

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

console.log(food);

const blocks = [];
let snake = [
  {
    x: 9,
    y: 5,
  },
  // {
  //   x: 9,
  //   y: 5,
  // },
  // {
  //   x: 9,
  //   y: 5,
  // },
];

let direction = "up";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  if (food.x === head.x && food.y === head.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  modal.style.display = "none";

  direction = "down";
  snake = [
    {
      x: 2,
      y: 5,
    },
  ];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  intervalId = setInterval(() => {
    render();
  }, 300);
}

addEventListener("keydown", (e) => {
  const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
  };

  if (e.key === "ArrowUp") {
    direction = "up";
    keys.ArrowUp = true;
  } else if (e.key === "ArrowDown") {
    direction = "down";
    keys.ArrowDown = true;
  } else if (e.key === "ArrowRight") {
    direction = "right";
    keys.ArrowRight = true;
  } else if (e.key === "ArrowLeft") {
    direction = "left";
    keys.ArrowLeft = true;
  }
});
