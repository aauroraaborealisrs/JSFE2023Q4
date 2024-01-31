let gameField = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

let originalGameFields = [

	{
		name: "Точка",
		field: [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		],
		hints: [
			[ 0, 0, 0, 0, 0], // левый
			[ 0, 0, 0, 0, 0], // право
			[ 0, 0, 0, 0, 0], // верх
			[ 0, 0, 0, 0, 0] // низ
		]
	},

	//крест

	{
		name: "Крест",
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
			[ 3, 2, 1, 2, 3] // низ
		]
	},

	//решетка

	{
		name: "Решетка",
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
		name: "Часы",
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
		name: "Коляска",
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
		name: "Кот",
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

let numberVerticalHints = currentGameField.hints[0];
let numberVerticalHints2 = currentGameField.hints[1]; 
let horizontalHintsTop = currentGameField.hints[2];
let horizontalHintsBottom = currentGameField.hints[3];

let originalGameField = null;

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

    let colIndex = Array.prototype.indexOf.call(target.parentNode.children, target);
    let rowIndex = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);

	gameField[rowIndex][colIndex] = gameField[rowIndex][colIndex] === 0 ? 1 : 0;

    target.textContent = '';
    target.style.backgroundColor = gameField[rowIndex][colIndex] === 1 ? 'black' : 'white';

    setTimeout(checkSolution, 100);
};



table.addEventListener('click', handleClick);

function checkSolution() {
    for (let i = 0; i < gameField.length; i++) {
        for (let j = 0; j < gameField[i].length; j++) {
            if (gameField[i][j] !== originalGameField[i][j]) {
                console.log("Несовпадение в позиции:", i, j);
                console.log("gameField:", gameField);
                console.log("originalGameField:", originalGameField);
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


/*          						  модалка выбора 5х5                                */

// Функция для открытия модального окна
function openModal() {
 document.getElementById("myModal").style.display = "block";
}

function closeModal() {
 document.getElementById("myModal").style.display = "none";
}

// Открыть модальное окно при загрузке страницы
window.onload = openModal;

// Создание кнопок для каждой нонограммы
originalGameFields.forEach((gameField, index) => {
	let button = document.createElement('button');
	button.textContent = gameField.name;
	button.onclick = function() {
		chooseImage(index);
	};
	document.querySelector('.modal-content').appendChild(button);
});

// Функция для выбора случайного рисунка
function chooseRandomImage() {
    closeModal();
    let randomIndex = Math.floor(Math.random() * originalGameFields.length);
    let currentGameField = originalGameFields[randomIndex];
    gameField = Array.from({ length: 5 }, () => Array(5).fill(0));
    originalGameField = currentGameField.field.map(row => row.slice());
    numberVerticalHints = currentGameField.hints[0];
    numberVerticalHints2 = currentGameField.hints[1];
    horizontalHintsTop = currentGameField.hints[2];
    horizontalHintsBottom = currentGameField.hints[3];

    updateGameFieldAndHints();
}


function chooseImage(index) {
    closeModal();
    let currentGameField = originalGameFields[index];
    gameField = Array.from({ length: 5 }, () => Array(5).fill(0)); 
    originalGameField = currentGameField.field.map(row => row.slice());
    numberVerticalHints = currentGameField.hints[0];
    numberVerticalHints2 = currentGameField.hints[1];
    horizontalHintsTop = currentGameField.hints[2];
    horizontalHintsBottom = currentGameField.hints[3];

    updateGameFieldAndHints();
}

function updateGameFieldAndHints() {
	let table = document.getElementById('gameField');
	table.innerHTML = '';

	for (let i = 0; i < gameField.length; i++) {
		let row = document.createElement('tr');
		for (let j = 0; j < gameField[i].length; j++) {
			let cell = document.createElement('td');
			cell.textContent = gameField[i][j];
			row.appendChild(cell);
		}
		table.appendChild(row);
	}

	let hintCells = document.querySelectorAll('#verticalHints td');
	for (let i = 0; i < hintCells.length; i++) {
		hintCells[i].textContent = numberVerticalHints[i];
	}

	let hintCells2 = document.querySelectorAll('#verticalHints tr:nth-child(2) td');
	for (let i = 0; i < hintCells2.length; i++) {
		hintCells2[i].textContent = numberVerticalHints2[i];
	}

	let horizontalHintCells = document.querySelectorAll('#horizontalHints td');
	for (let i = 0; i < horizontalHintCells.length; i++) {
		horizontalHintCells[i].textContent = horizontalHintsTop[i];
	}

	let horizontalHintCells2 = document.querySelectorAll('#horizontalHints tr:nth-child(2) td');
	for (let i = 0; i < horizontalHintCells2.length; i++) {
		horizontalHintCells2[i].textContent = horizontalHintsBottom[i];
	}
}
