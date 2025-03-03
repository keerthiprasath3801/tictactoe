const boxes = document.querySelectorAll('.box');
const currentStatus = document.getElementById('status');
const btnRestart = document.getElementById('restart');

let player = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let aiEnabled = true; 

const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

init();

function init() {
    boxes.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    currentStatus.textContent = `${player}'s Turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] !== "" || !running) return;
    
    updateBox(this, index);
    checkWinner();

    if (running && aiEnabled && player === "O") {
        setTimeout(aiMove, 500);
    }
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = player;
    player = (player === 'X') ? "O" : "X";
    currentStatus.textContent = `${player}'s Turn`;
}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            isWon = true;
            boxes[a].classList.add('win');
            boxes[b].classList.add('win');
            boxes[c].classList.add('win');
        }
    }

    if (isWon) {
        currentStatus.textContent = `${player === 'X' ? 'O' : 'X'} Won!`;
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


function aiMove() {
    let emptyBoxes = options.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    
    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        options[randomIndex] = "O";
        boxes[randomIndex].innerHTML = "O";
        player = "X";
        currentStatus.textContent = "X's Turn";
        checkWinner();
    }
}
