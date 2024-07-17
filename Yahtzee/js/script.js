const throwButton = document.getElementById("throwButton");
throwButton.addEventListener("click", diceThrow);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", reset);

function reset() {
    console.log("reset");
    for (let i = 0; i < 5; i++) {
        const cellId = `cell${i + 1}`;
        const cellElement = document.getElementById(cellId);
        if (cellElement) {
            cellElement.innerHTML = 0;
        }
    }
    // Reset the result table
    const resultIds = ['threeOfAKind', 'fourOfAKind', 'smallStraight', 'largeStraight', 'fullHouse', 'yahtzee', 'chance'];
    resultIds.forEach(id => {
        document.getElementById(id).textContent = 'x';
    });
}

function diceThrow() {
    const diceThrowResult = [];
    const amountOfDice = 5;

    for (let i = 0; i < amountOfDice; i++) {
        let result = Math.floor(Math.random() * 6) + 1;
        diceThrowResult.push(result);
    }
    console.log(diceThrowResult);
    fillTable(diceThrowResult);
    calculateScores(diceThrowResult);
}

function fillTable(diceThrowResult) {
    for (let i = 0; i < 5; i++) {
        const cellId = `cell${i + 1}`;
        const cellElement = document.getElementById(cellId);
        cellElement.innerHTML = diceThrowResult[i];
    }
}

function calculateScores(dice) {
    const counts = {};
    dice.forEach(num => counts[num] = (counts[num] || 0) + 1);

    // Update score table with calculated scores
    document.getElementById('threeOfAKind').textContent = threeOfAKind(counts) ? dice.reduce((a, b) => a + b, 0) : 'x';
    document.getElementById('fourOfAKind').textContent = fourOfAKind(counts) ? dice.reduce((a, b) => a + b, 0) : 'x';
    document.getElementById('smallStraight').textContent = smallStraight(dice) ? 30 : 'x';
    document.getElementById('largeStraight').textContent = largeStraight(dice) ? 40 : 'x';
    document.getElementById('fullHouse').textContent = fullHouse(counts) ? 25 : 'x';
    document.getElementById('yahtzee').textContent = yahtzee(counts) ? 50 : 'x';
    document.getElementById('chance').textContent = dice.reduce((a, b) => a + b, 0);
}

function threeOfAKind(counts) {
    return Object.values(counts).some(count => count >= 3);
}

function fourOfAKind(counts) {
    return Object.values(counts).some(count => count >= 4);
}

function smallStraight(dice) {
    const uniqueSorted = [...new Set(dice)].sort((a, b) => a - b);
    const straights = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
    return straights.some(straight => straight.every(num => uniqueSorted.includes(num)));
}

function largeStraight(dice) {
    const uniqueSorted = [...new Set(dice)].sort((a, b) => a - b);
    return [1, 2, 3, 4, 5].every(num => uniqueSorted.includes(num)) || [2, 3, 4, 5, 6].every(num => uniqueSorted.includes(num));
}

function fullHouse(counts) {
    const values = Object.values(counts);
    return values.includes(3) && values.includes(2);
}

function yahtzee(counts) {
    return Object.values(counts).some(count => count === 5);
}
