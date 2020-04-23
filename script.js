const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && 
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
            return true;
          }
      }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function draw() {
  context.fillStyle = "#001";
  context.fillRect(0,0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) {
        context.fillStyle = 'orange';
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1, 1)
      }
    });
  });
}

function merge(arean, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) {
        arena[y+player.pos.y][x+player.pos.x] = val;
      }
    });
  });
}

function playerDrop() {
    player.pos.y++;
    dropCounter = 0;  
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  
  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

const arena = createMatrix(12 ,20);

const player = {
  pos: {x: 5, y: 0},
  matrix: matrix,
  score: 0,
};

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    player.pos.x--;
  } else if (event.keyCode == 39) {
    player.pos.x++;
  } else if (event.keyCode == 40) {
    playerDrop();
  }
}); 

update(); 