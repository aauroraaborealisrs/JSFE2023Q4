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
			[ 0, 0, 1, 0, 0], // право
			[ 0, 0, 0, 0, 0], // верх
			[ 0, 0, 1, 0, 0] // низ
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

let startTime;
let timerInterval;

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


function invertColor(color) {
    return color === 'black' ? 'white' : 'black';
}

function updateCellColors() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const gameFieldCells = document.querySelectorAll('#gameField td');

    gameFieldCells.forEach(cell => {
        const cellColIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);
        const cellRowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);

        if (gameField[cellRowIndex][cellColIndex] === 1) {
            cell.style.backgroundColor = isDarkTheme ? invertColor('black') : invertColor('white');
        } else {
            cell.style.backgroundColor = isDarkTheme ? invertColor('white') : invertColor('black');
        }
    });
}



const themeSwitcher = document.getElementById('themeSwitcher');
themeSwitcher.addEventListener('change', function() {
    updateCellColors();
});

// Обработка клика на ячейку
let handleClick = function(event) {
    if (event.button === 0) {
        // Левый клик
        let target = event.target;
        while (target != null && target.tagName != 'TD') {
            target = target.parentNode;
        }
        if (target == null) return;

        let colIndex = Array.prototype.indexOf.call(target.parentNode.children, target);
        let rowIndex = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);

        gameField[rowIndex][colIndex] = gameField[rowIndex][colIndex] === 0 ? 1 : 0;

        target.textContent = '';
        updateCellColors();

        setTimeout(checkSolution, 100);

        if (!startTime) {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                elapsedSeconds++;
                updateElapsedTimeDisplay();
            }, 1000);
        }
    } else if (event.button === 2) {
        // Правый клик
        handleRightClick(event);
    }
};

let handleRightClick = function(event) {
    event.preventDefault(); // Отменяем стандартное контекстное меню

    let target = event.target;
    while (target != null && target.tagName != 'TD') {
        target = target.parentNode;
    }
    if (target == null) return;

    let colIndex = Array.prototype.indexOf.call(target.parentNode.children, target);
    let rowIndex = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);

    if (gameField[rowIndex][colIndex] === 0) {
        gameField[rowIndex][colIndex] = 'X';
    } else if (gameField[rowIndex][colIndex] === 'X') {
        gameField[rowIndex][colIndex] = '';
    } else {
        gameField[rowIndex][colIndex] = 0;
    }

    target.textContent = gameField[rowIndex][colIndex];
    updateCellColors();

    setTimeout(checkSolution, 100);

    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            updateElapsedTimeDisplay();
        }, 1000);
    }
};


table.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Отменяем стандартное контекстное меню при правом клике
});

table.addEventListener('mousedown', function(event) {
    if (event.button === 2) {
        handleRightClick(event);
    }
});




let elapsedSeconds = 0;
updateElapsedTimeDisplay();

function updateElapsedTimeDisplay() {
	let minutes = Math.floor(elapsedSeconds / 60);
	let seconds = elapsedSeconds % 60;
	document.getElementById('elapsedTimeDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


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

    let elapsedTime = Date.now() - startTime;
    let seconds = Math.floor(elapsedTime / 1000); 

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('elapsedTime').textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;

	clearInterval(timerInterval);
	startTime = null;
	timerInterval = null;

	showWinModal();
    table.removeEventListener('click', handleClick);
	//elapsedSeconds = 0;
	updateElapsedTimeDisplay();
	return true;
}

function showWinModal() {
    document.getElementById("winModal").style.display = "block";
}

function restartGame() {
	elapsedSeconds = 0;
	updateElapsedTimeDisplay();
	document.getElementById("winModal").style.display = "none";
	openModal(); 
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

function openModal() {
 document.getElementById("myModal").style.display = "block";
}

function closeModal() {
 document.getElementById("myModal").style.display = "none";
}

window.onload = openModal;

originalGameFields.forEach((gameField, index) => {
	let button = document.createElement('button');
	button.textContent = gameField.name;
	button.setAttribute('class', 'modal-button__level')
	button.onclick = function() {
		chooseImage(index);
	};
	document.querySelector('.modal-content').appendChild(button);
});


function chooseImage(index) {
	closeModal();
	let currentGameField = originalGameFields[index];
	gameField = Array.from({ length: 5 }, () => Array(5).fill(0)); 
	originalGameField = currentGameField.field.map(row => row.slice());
	numberVerticalHints = currentGameField.hints[0];
	numberVerticalHints2 = currentGameField.hints[1];
	horizontalHintsTop = currentGameField.hints[2];
	horizontalHintsBottom = currentGameField.hints[3];

	elapsedSeconds = 0;
	startTime = null;

    updateElapsedTimeDisplay();
    clearInterval(timerInterval);

	updateGameFieldAndHints();
	addClickListenerToTable(); 
}

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

	elapsedSeconds = 0;
	startTime = null;

    updateElapsedTimeDisplay();
    clearInterval(timerInterval);

	updateGameFieldAndHints();
	addClickListenerToTable();
}

function addClickListenerToTable() {
	let table = document.getElementById('gameField');
	table.addEventListener('click', handleClick);
}

function updateGameFieldAndHints() {
	let table = document.getElementById('gameField');
	table.innerHTML = '';

	for (let i = 0; i < gameField.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < gameField[i].length; j++) {
            let cell = document.createElement('td');
            if (gameField[i][j] === 0) {
                cell.textContent = '';
            } else {
                cell.textContent = gameField[i][j];
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

	let hintCells = document.querySelectorAll('#verticalHints td');
	for (let i = 0; i < hintCells.length; i++) {
		hintCells[i].textContent = numberVerticalHints[i];

        if (numberVerticalHints[i] === 0) {
            hintCells[i].style.color = 'transparent'; 
        } else {
            hintCells[i].style.color = ''; 
        }
	}

	let hintCells2 = document.querySelectorAll('#verticalHints tr:nth-child(2) td');
	for (let i = 0; i < hintCells2.length; i++) {
		hintCells2[i].textContent = numberVerticalHints2[i];
		
		if (numberVerticalHints2[i] === 0) {
            hintCells2[i].style.color = 'transparent'; 
        } else {
            hintCells2[i].style.color = ''; 
        }
	}

	let horizontalHintCells = document.querySelectorAll('#horizontalHints td');
	for (let i = 0; i < horizontalHintCells.length; i++) {
		horizontalHintCells[i].textContent = horizontalHintsTop[i];

		if (horizontalHintsTop[i] === 0) {
            horizontalHintCells[i].style.color = 'transparent'; 
        } else {
            horizontalHintCells[i].style.color = ''; 
        }
	}

	let horizontalHintCells2 = document.querySelectorAll('#horizontalHints tr:nth-child(2) td');
	for (let i = 0; i < horizontalHintCells2.length; i++) {
		horizontalHintCells2[i].textContent = horizontalHintsBottom[i];

		if (horizontalHintsBottom[i] === 0) {
            horizontalHintCells2[i].style.color = 'transparent'; 
        } else {
            horizontalHintCells2[i].style.color = ''; 
        }
	}
}


themeSwitcher.addEventListener('change', function() {
	setTimeout(updateCellColors, 0);
 if (this.checked) {
	document.body.classList.add('dark-theme');
 } else {
	document.body.classList.remove('dark-theme');
 }
});


function resetGame() {
	gameField = Array.from({ length: 5 }, () => Array(5).fill(0));
	updateGameFieldAndHints();
	addClickListenerToTable();
}

document.getElementById('resetButton').addEventListener('click', resetGame);

function openLevelSelectionModal() {
    document.getElementById("myModal").style.display = "block";
}

document.getElementById('selectLevelButton').addEventListener('click', openLevelSelectionModal);

document.querySelector('.close').addEventListener('click', closeModal);
