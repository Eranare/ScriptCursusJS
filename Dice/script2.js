/*  */

const button = document.getElementById('button');
let count = 0;
let numberCounts = [0, 0, 0, 0, 0, 0]; 

function rollDice() {
  resetCounts();
  const randomNumArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 6) + 1);

  randomNumArray.forEach((num) => {
    numberCounts[num - 1]++; 
  });
  
  updateTable();
  count++;
  button.innerHTML = `Rolled: ${count}`;
}

function updateTable() {
  for (let i = 0; i < 6; i++) {
    const cellId = `amount${i + 1}`;
    const cellElement = document.getElementById(cellId);
    if (cellElement) {
      cellElement.innerHTML = numberCounts[i];
    }
  }
}

function resetCounts(){
  numberCounts = [0, 0, 0, 0, 0, 0]; 
}

button.addEventListener('click', rollDice);
