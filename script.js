const boxes = document.querySelectorAll('.box');
const currentStatus = document.getElementById('status');
const btnRestart = document.getElementById('restart');
let x = "X";
let o = "O";

let player = "X";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let running = false;

init();

function init() {
    boxes.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    currentStatus.textContent = `${player}'s Turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] != "" || !running) {
        return;
    }
    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = player;
    player = (player == 'X') ? "O" : "X";
    currentStatus.textContent = `${player}'s Turn`;
}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i]; 
        const box1 = options[condition[0]]; 
        const box2 = options[condition[1]]; 
        const box3 = options[condition[2]]; 
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }

    if (isWon) {
        currentStatus.textContent = `${player == 'X' ? 'O' : 'X'} Won!`;
        running = false;
    } else if (!options.includes("")) {
        currentStatus.textContent = `Game Draw!`;
        running = false;
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    running = true;
    currentStatus.textContent = `${player}'s Turn`;

    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}