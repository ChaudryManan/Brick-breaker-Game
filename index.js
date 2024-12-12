let grid = document.querySelector(".grid");
let startposition = [230, 10];
let currentpositon = startposition;
ballposition = [270, 40];
currentballposition = ballposition;
x_direction = -2;
y_direction = 2;
let boardheight = 300;
balldiameter = 20;
let boardwidth = 560;
const block_width = 100;
let display = 0;
const block_height = 20;
let displays = document.querySelector("#display");
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + block_width, yAxis];
    this.topRight = [(xAxis = block_width), yAxis + block_height];
    this.topLeft = [xAxis, yAxis + block_height];
  }
}
const block = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
function addblock() {
  for (let i = 0; i < block.length; i++) {
    let newdiv = document.createElement("div");
    newdiv.classList.add("block");
    newdiv.style.left = block[i].bottomLeft[0] + "px";
    newdiv.style.bottom = block[i].bottomLeft[1] + "px";
    grid.appendChild(newdiv);
  }
}

addblock();
let user = document.createElement("div");
user.classList.add("userblock");
usermove();
grid.appendChild(user);
function usermove() {
  user.style.left = currentpositon[0] + "px";
  user.style.bottom = currentpositon[1] + "px";
}

function moveuser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentpositon[0] > 0) {
        currentpositon[0] -= 10;
        usermove();
      }
      break;
    case "ArrowRight":
      if (currentpositon[0] < boardwidth - block_width) {
        currentpositon[0] += 10;
        usermove();
      }
      break;
  }
}
function balldraw() {
  newboll.style.left = currentballposition[0] + "px";
  newboll.style.bottom = currentballposition[1] + "px";
}
let newboll = document.createElement("div");
newboll.classList.add("boll");

balldraw();
grid.appendChild(newboll);


document.addEventListener("keydown", moveuser);
function moveball() {
  currentballposition[0] += x_direction;
  currentballposition[1] += y_direction;
  checkcollision();

  for (let i = block.length - 1; i >= 0; i--) {
    if (
      currentballposition[0] > block[i].bottomLeft[0] &&
      currentballposition[0] < block[i].bottomRight[0] &&
      currentballposition[1] + balldiameter > block[i].bottomLeft[1] &&
      currentballposition[1] < block[i].topLeft[1]
    ) {
      const allblocks = Array.from(document.querySelectorAll(".block"));
      allblocks[i].remove();
      block.splice(i, 1);
      if (block.length == 0) {

      alert("you win")
      clearInterval(timerid)

      }
      changedirection();
      console.log(block.length)
      display++;
      displays.innerHTML = `Score: ${display}`; // Update the score
    }
  }

  if (
    currentballposition[0] + balldiameter > currentpositon[0] &&
    currentballposition[0] < currentpositon[0] + block_width &&
    currentballposition[1] + balldiameter > currentpositon[1] &&
    currentballposition[1] < currentpositon[1] + block_height
  ) {
    changedirection();
  }

 

  balldraw();
}

function checkcollision() {
  if (
    currentballposition[0] >= boardwidth - balldiameter ||
    currentballposition[1] >= boardheight - balldiameter ||
    currentballposition[0] < 0
  ) {
    changedirection();
  }
  if (currentballposition[1] <= 0) {
    clearInterval(timerid);
    displays.innerHTML = "you lose";
    document.removeEventListener("keydown", moveuser);
  }
}
function changedirection() {
  if (x_direction === 2 && y_direction === 2) {
    y_direction = -2;
    return;
  }
  if (x_direction === 2 && y_direction === -2) {
    x_direction = -2;
    return;
  }
  if (x_direction === -2 && y_direction === -2) {
    y_direction = 2;
    return;
  }
  if (x_direction === -2 && y_direction === 2) {
    x_direction = 2;
    return;
  }
}

let timerid = setInterval(moveball, 20);
console.log(block.length);
