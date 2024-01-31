const board = document.getElementById('gameBoard');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoardState[index] === '' && gameActive) {
        gameBoardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            statusElement.textContent = `Igrač ${currentPlayer} je pobjednik!`;
            gameActive = false;
            resetButton.disabled=false;
        } else if (gameBoardState.every(cell => cell !== '')) {
            statusElement.textContent = 'Igra je završila neriješeno!';
            gameActive = false;
            resetButton.disabled=false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Na redu je igrač ${currentPlayer}`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoardState[a] !== '' && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c];
    });
}
        resetButton.addEventListener('click', () => {
        currentPlayer = 'X';
        gameBoardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });

        statusElement.textContent = 'Igra je u tijeku...';
        resetButton.disabled = true;
    });