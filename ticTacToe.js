var prompt = require('prompt');

let startGame = function() {
  let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
  let currentPlayer = 'X';
  nextMove(board, currentPlayer);
}

let printBoard = function(board) {
  console.log('|', board[0][0], '|', board[0][1],'|', board[0][2], '|');
  console.log('|', board[1][0], '|', board[1][1],'|', board[1][2], '|');
  console.log('|', board[2][0], '|', board[2][1],'|', board[2][2], '|');
}
let nextMove = function(board, currentPlayer, turns = 0) {
  printBoard(board);
  if (turns === 9) {
    console.log('Draw!');
    newGame();
  }
  console.log(`Player ${currentPlayer}, please select a spot (1-9)`);
  prompt.get(['spot'], (err, result) => {
    if (err) {
      return 'Error occurred';
    }
    if (result.spot < 1 || result.spot > 9) {
      console.log('Please make a valid spot request');
      nextMove(board, currentPlayer, turns);
    } else {
      let row = Math.floor((result.spot - 1) / 3); // gets row of spot
      let col = (result.spot - 1) % 3; // gets col of spot
      if (board[row][col] !== ' ') {
        console.log('Please make another request.  That spot is taken');
        nextMove(board, currentPlayer, turns);
      } else {
        board[row][col] = currentPlayer;
        turns++;
        let isGameOver = checkWinner(board, row, col, currentPlayer);
        if (isGameOver) {
          printBoard(board);
          console.log(`Player ${currentPlayer} wins!`);
          newGame();
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          nextMove(board, currentPlayer, turns);
        }
      }
    }
  })
}

let newGame = function() {
  console.log('Would you like to play again? y/n');
  prompt.get(['answer'], (err, result) => {
    if (err) {
      return 'Error occured';
    }
    if (result.answer === 'y') {
      startGame();
    } else if (result.answer === 'n') {
      console.log('Thanks for playing!');
      return;
    }
  })
}

let checkWinner = function(board, row, col, currentPlayer) {
  // checks horizontal
  if (board[row][(col + 1) & 3] === currentPlayer && board[row][(col + 2) % 3] === currentPlayer) {
    return true;
  }
  // checks vertical
  if (board[(row + 1) % 3][col] === currentPlayer && board[(row + 2) % 3][col] === currentPlayer) {
    return true;
  }
  // checks diagonal top left to bottom right
  if (board[(row + 1) % 3][(col + 1) % 3] === currentPlayer && board[(row + 2) % 3][(col + 2) % 3] === currentPlayer) {
    return true;
  }
  // checks diagonal bottom left to top right
  if (board[(row + 1) % 3][(col + 2) % 3] === currentPlayer && board[(row + 2) % 3][(col + 1) % 3] === currentPlayer) {
    return true;
  }
  return false;
}

startGame();