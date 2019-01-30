/**
 * This program is a boilerplate code for the standard tic tac toe game
 * Here the “box” represents one placeholder for either a “X” or a “0”
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed:
 * Imagine you are playing with the computer so every alternate move should be done by the computer
 * X -> player
 * O -> Computer
 *
 * Winner needs to be decided and has to be flashed
 *
 * Extra points will be given for approaching the problem more creatively
 *
 */

let grid = [];
const GRID_LENGTH = 3;
let turn = "X";

function initializeGrid(restart = 0) {
  if (restart) {
    grid.length = 0;
  }
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }

    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = "";

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = "darkBackground";
    let content = "";
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = "lightBackground";
    }
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
      content = '<span class="cross">X</span>';
    } else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs =
      rowDivs +
      '<div colIdx="' +
      colIdx +
      '" rowIdx="' +
      rowIdx +
      '" class="box ' +
      additionalClass +
      '">' +
      content +
      "</div>";
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = "";
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + "</div>";
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function onBoxClick() {
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");
  let newValue = 1;

  if (grid[colIdx][rowIdx] == 0) {
    grid[colIdx][rowIdx] = newValue;

    var wins = winCheck(newValue);

    if (wins) {
      renderMainGrid();
      renderSuccessBanner("You win");
      return;
    } else {
      var result = computerTurn();
      if (result) {
        renderMainGrid();
        renderSuccessBanner("Computer win's");
        return;
      }
      renderMainGrid();
      addClickHandlers();
    }
  }
}

function renderSuccessBanner(msg) {
  const parent = document.getElementById("banner");
  parent.innerHTML = '<div class="bannerMsg">' + msg + "</div>";
}

document.getElementById("restartGame").addEventListener("click", function() {
  initializeGrid(1);
  renderMainGrid();
  addClickHandlers();
  const parent = document.getElementById("banner");
  parent.innerHTML = "";
});

function computerTurn() {
  isWinning = false;
  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] == 0) {
        grid[i][j] = 2;
        var wins = winCheck(2);
        if (wins) {
          console.log("player 2 will win");
          isWinning = true;
        } else {
          grid[i][j] = 0;
        }
      }
    }
  }

  if (isWinning) {
    return true;
  }

  isOpponentWinning = false;
  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] == 0) {
        grid[i][j] = 1;
        var wins = winCheck(1);
        if (wins) {
          if (!isOpponentWinning) {
            console.log("opponent is winning");
            isOpponentWinning = true;
            grid[i][j] = 2;
          } else {
            grid[i][j] = 0;
          }
        } else {
          grid[i][j] = 0;
        }
      }
    }
  }

  if (!isOpponentWinning) {
    playRandom(2);
  }

  return false;
}

function checkIfZeroPresent() {
  isZero = false;
  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] == 0) {
        isZero = true;
        break;
      }
    }
  }
  return isZero;
}

function playRandom(value) {
  var x = getRowRandomValue([0, 1, 2]);
  var y = getcolumnRandomValue([0, 1, 2]);

  let newValue = value;
  if (checkIfZeroPresent()) {
    if (grid[x][y] == 0) {
      grid[x][y] = newValue;
    } else {
      playRandom(value);
    }
  } else {
    renderSuccessBanner("Game over! Nobody win's");
  }
}

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

function getRowRandomValue(rowArr) {
  return rowArr.random();
}

function getcolumnRandomValue(colArr) {
  return colArr.random();
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener("click", onBoxClick, false);
  }
}

function canWin(grid, whoIsPlaying) {}

function winCheck(playerValue) {
  // check logic for right or left diagonal
  let isLeftDiaglonal = true;
  let isRightDiaglonal = true;
  for (let i = 0; i < GRID_LENGTH; i++) {
    if (grid[i][i] != playerValue) {
      isLeftDiaglonal = false;
    }
    if (grid[i][grid.length - 1 - i] != playerValue) {
      isRightDiaglonal = false;
    }
  }

  if (isLeftDiaglonal || isRightDiaglonal) {
    return true;
  }

  // check row or column are same

  for (let i = 0; i < GRID_LENGTH; i++) {
    let isRow = true;
    let isColumn = true;
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] != playerValue) {
        isRow = false;
      }
      if (grid[j][i] != playerValue) {
        isColumn = false;
      }
    }
    if (isRow || isColumn) {
      return true;
    }
  }

  return false;
}

initializeGrid();
renderMainGrid();
addClickHandlers();
