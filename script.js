const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== null || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkForWin(currentPlayer)) {
    announceWinner(currentPlayer);
    gameActive = false;
} else if (checkForTie()) {
    announceTie();
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkForWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === player;
    });
  });
}

function checkForTie() {
  return !gameState.includes(null);
}

function announceWinner(player) {
  alert(`Player ${player} wins!`);
}

function announceTie() {
  alert('It\'s a tie!');
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = Array(9).fill(null);

  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);