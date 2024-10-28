const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');
const xScoreDisplay = document.getElementById('x-score');
const oScoreDisplay = document.getElementById('o-score');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let xScore = 0;
let oScore = 0;
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayMessage(`${currentPlayer} venceu!`);
        updateScore(currentPlayer);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        displayMessage('Empate! Deu velha!');
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreDisplay.textContent = xScore;
    } else {
        oScore++;
        oScoreDisplay.textContent = oScore;
    }
}

function displayMessage(message) {
    messageDisplay.textContent = message;
}

function restartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);