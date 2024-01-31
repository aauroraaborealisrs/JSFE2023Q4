let gameField = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

let originalGameField = [
	[0, 1, 1, 1, 0],
	[1, 1, 0, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 0, 1, 1],
	[0, 1, 1, 1, 0]
];

let table = document.getElementById('gameField');

for (let i = 0; i < gameField.length; i++) {
	let row = document.createElement('tr');
	for (let j = 0; j < gameField[i].length; j++) {
		let cell = document.createElement('td');
		cell.textContent = gameField[i][j];
		row.appendChild(cell);
	}
	table.appendChild(row);
}

let handleClick = function(event) {
    let target = event.target;
    while (target != null && target.tagName != 'TD') {
        target = target.parentNode;
    }
    if (target == null) return;

    let rowIndex = Array.prototype.indexOf.call(target.parentNode.children, target);
    let colIndex = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);

    // Переключить значение ячейки в gameField
    gameField[colIndex][rowIndex] = gameField[colIndex][rowIndex] === 0 ? 1 : 0;
    target.textContent = '';
    target.style.backgroundColor = gameField[colIndex][rowIndex] === 1 ? 'black' : 'white';

    // Проверить решение после короткой задержки
    setTimeout(checkSolution, 100);
};

table.addEventListener('click', handleClick);

function checkSolution() {
    for (let i = 0; i < gameField.length; i++) {
        for (let j = 0; j < gameField[i].length; j++) {
            if (gameField[i][j] !== originalGameField[i][j]) {
                return;
            }
        }
    }
    alert("Поздравляем, вы выиграли!");
    hasWon = true;
    table.removeEventListener('click', handleClick); // Удаление обработчика событий
    return hasWon;
}


//горизонтальные


let horizontalHints = document.getElementById('horizontalHints');
let hintRow1 = document.createElement('tr');
let hintRow2 = document.createElement('tr');


for (let i = 0; i < 5; i++) {
	let hintCell1 = document.createElement('td');
	let hintCell2 = document.createElement('td');
	/*hintCell.textContent = 'Hint for horizontal line ' + (i+1);*/
	hintRow1.appendChild(hintCell1);
	hintRow2.appendChild(hintCell2);
}

horizontalHints.appendChild(hintRow1);
horizontalHints.appendChild(hintRow2);



//вертикальные

let verticalHints = document.getElementById('verticalHints');
let hintColumn = document.createElement('tr');
let hintColumn2 = document.createElement('tr');

for (let i = 0; i < 5; i++) {
    let hintCell = document.createElement('td');
    hintColumn2.appendChild(hintCell);
}

verticalHints.appendChild(hintColumn2);

for (let i = 0; i < 5; i++) {
	let hintCell = document.createElement('td');
	/*hintCell.textContent = 'Hint for vertical line ' + (i+1);*/
	hintColumn.appendChild(hintCell);
}

verticalHints.appendChild(hintColumn);

//вертикальные заполнение

let numberVerticalHints = [ 0, 2, 1, 2, 0];
let numberVerticalHints2 = [3, 2, 1, 2, 3];

let hintCells = document.querySelectorAll('#verticalHints td');
for (let i = 0; i < hintCells.length; i++) {
	hintCells[i].textContent = numberVerticalHints[i];
}

let hintCells2 = document.querySelectorAll('#verticalHints tr:nth-child(2) td');
for (let i = 0; i < hintCells2.length; i++) {
    hintCells2[i].textContent = numberVerticalHints2[i];
}
//горизонтальные заполнение

let horizontalHintsTop = [ 0, 1, 1, 1, 0];
let horizontalHintsBottom = [1, 1, 1, 1, 3];

let hintRows = document.querySelectorAll('#horizontalHints tr');
hintRows[0].innerHTML = horizontalHintsTop.map(hint => '<td>' + hint + '</td>').join('');
hintRows[1].innerHTML = horizontalHintsBottom.map(hint => '<td>' + hint + '</td>').join('');


