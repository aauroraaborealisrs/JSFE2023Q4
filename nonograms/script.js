let gameField = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

let originalGameFields = [
	
	//крест

	{
		field: [
			[0, 1, 1, 1, 0],
			[1, 1, 0, 1, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 0, 1, 1],
			[0, 1, 1, 1, 0]
		],
		hints: [
			[ 0, 2, 1, 2, 0], // левый
			[ 3, 2, 1, 2, 3], // право
			[ 0, 2, 1, 2, 0], // верх
			[ 1, 2, 1, 2, 3] // низ
		]
	},

	//решетка

	{
		field: [
			[0, 1, 0, 1, 0],
			[1, 1, 1, 1, 1],
			[0, 1, 0, 1, 0],
			[1, 1, 1, 1, 1],
			[0, 1, 0, 1, 0]
		],
		hints: [
			[ 1, 0, 1, 0, 1], 
			[ 1, 5, 1, 5, 1], 
			[ 1, 0, 1, 0, 1], 
			[ 1, 5, 1, 5, 1], 
		]
	},

	//часы

	{
		field: [
			[1, 1, 1, 1, 1],
			[0, 1, 1, 1, 0],
			[0, 0, 1, 0, 0],
			[0, 1, 0, 1, 0],
			[1, 1, 1, 1, 1]
		],
		hints: [
			[ 0, 0, 0, 1, 0], // левый
			[ 5, 3, 1, 1, 5], // право
			[ 1, 2, 3, 2, 1], // верх
			[ 1, 2, 1, 2, 1] // низ
		]
	},

	//коляска

	{
		field: [
			[0, 1, 1, 0, 0],
			[1, 1, 0, 0, 1],
			[1, 1, 1, 1, 0],
			[0, 1, 1, 0, 0],
			[1, 0, 0, 1, 0]
		],
		hints: [
			[ 0, 2, 0, 0, 1], // левый
			[ 2, 1, 4, 2, 1], // право
			[ 2, 0, 1, 2, 0], // верх
			[ 1, 4, 2, 1, 1] // низ
		]
	},

	//кiт

	{
		field: [
			[0, 0, 1, 0, 1],
			[0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1],
			[1, 1, 1, 1, 0],
			[1, 1, 1, 1, 1]
		],
		hints: [
			[ 1, 0, 0, 0, 0], // левый
			[ 1, 3, 5, 4, 5], // право
			[ 0, 0, 0, 0, 3], // верх
			[ 3, 3, 5, 4, 1] // низ
		]
	},

];


let randomIndex = Math.floor(Math.random() * originalGameFields.length);
let currentGameField = originalGameFields[randomIndex];

let originalGameField = currentGameField.field;
let numberVerticalHints = currentGameField.hints[0]; // Используйте первый массив подсказок
let numberVerticalHints2 = currentGameField.hints[1]; // Используйте второй массив подсказок

let horizontalHintsTop = currentGameField.hints[2];
let horizontalHintsBottom = currentGameField.hints[3];

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
    table.removeEventListener('click', handleClick);
    return hasWon;
}


//горизонтальные

let horizontalHints = document.getElementById('horizontalHints');
let hintRow1 = document.createElement('tr');
let hintRow2 = document.createElement('tr');


for (let i = 0; i < 5; i++) {
	let hintCell1 = document.createElement('td');
	let hintCell2 = document.createElement('td');
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
	hintColumn.appendChild(hintCell);
}

verticalHints.appendChild(hintColumn);

//вертикальные заполнение

let hintCells = document.querySelectorAll('#verticalHints td');
for (let i = 0; i < hintCells.length; i++) {
	hintCells[i].textContent = numberVerticalHints[i];
}

let hintCells2 = document.querySelectorAll('#verticalHints tr:nth-child(2) td');
for (let i = 0; i < hintCells2.length; i++) {
    hintCells2[i].textContent = numberVerticalHints2[i];
}
//горизонтальные заполнение

let hintRows = document.querySelectorAll('#horizontalHints tr');
hintRows[0].innerHTML = horizontalHintsTop.map(hint => '<td>' + hint + '</td>').join('');
hintRows[1].innerHTML = horizontalHintsBottom.map(hint => '<td>' + hint + '</td>').join('');


