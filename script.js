const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

console.log(food);

const blocks = [];
const snake = [
  {
    x: 9,
    y: 5,
  },
  {
    x: 9,
    y: 5,
  },
  {
    x: 9,
    y: 5,
  },
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
    alert("game Over");
    clearInterval(intervalId);
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  if (food.x === head.x && food.y === head.y) {
    snake.unshift(head);
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    blocks[`${food.x}-${food.y}`].classList.add("food");
  });
}

intervalId = setInterval(() => {
  render();
}, 400);

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
