document.addEventListener('DOMContentLoaded', function() {
	const body = document.body;

	// <main class="container">
	const mainContainer = document.createElement('main');
	mainContainer.className = 'container';
	body.appendChild(mainContainer);

	const WinsContainer = document.createElement('div');
    WinsContainer.id = 'WinsContainer';
    mainContainer.appendChild(WinsContainer);

	const topWinsContainer = document.createElement('div');
    topWinsContainer.id = 'topWinsContainer';
    WinsContainer.appendChild(topWinsContainer);

	const topWinstext = document.createElement('span');
	topWinstext.className = 'topwintext';
	topWinstext.innerHTML = 'Top-5 Wins';
	WinsContainer.appendChild(topWinstext);

    updateTopWins();

	// <div class="game__container">
	const gameContainer = document.createElement('div');
	gameContainer.className = 'game__container';
	mainContainer.appendChild(gameContainer);

	// переключатель темы
	const label = document.createElement('label');
	label.className = 'switch';
	const input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'themeSwitcher';
	const span = document.createElement('span');
	span.className = 'slider round';
	span.textContent = ' Switch theme';
	label.appendChild(input);
	label.appendChild(span);
	gameContainer.appendChild(label);

	const themeSwitcher = document.getElementById('themeSwitcher');
	themeSwitcher.addEventListener('change', function() {
		playButtonClickSound();
		updateCellColors();
	});

	themeSwitcher.addEventListener('change', function() {
		setTimeout(updateCellColors, 0);
	 if (this.checked) {
		document.body.classList.add('dark-theme');
	 } else {
		document.body.classList.remove('dark-theme');
	 }
	});
	

	// отображение времени
	const timeDisplay = document.createElement('div');
	timeDisplay.id = 'timeDisplay';
	timeDisplay.innerHTML = 'Time: <span id="elapsedTimeDisplay"> </span>';
	gameContainer.appendChild(timeDisplay);

	// контейнеры для игрового поля и подсказок
	const gameboardContainer = document.createElement('div');
	gameboardContainer.className = 'gameboard__container';
	gameContainer.appendChild(gameboardContainer);

	const verthintscont = document.createElement('div');
	verthintscont.className = 'verthintscont';
	const verticalHintsDom = document.createElement('table');
	verticalHintsDom.id = 'verticalHints';
	verthintscont.appendChild(verticalHintsDom);
	gameboardContainer.appendChild(verthintscont);

		// вертикальные
	let verticalHints = document.getElementById('verticalHints');
	let hintColumn = document.createElement('tr');
	let hintColumn2 = document.createElement('tr');

	// Create and append hint cells
	for (let i = 0; i < 5; i++) {
		let hintCell = document.createElement('td');
		hintColumn2.appendChild(hintCell);
	}

	verticalHints.appendChild(hintColumn2);

	// Create and append hint cells
	for (let i = 0; i < 5; i++) {
		let hintCell = document.createElement('td');
		hintColumn.appendChild(hintCell);
	}

	verticalHints.appendChild(hintColumn);

	// Function to fill in hint cells
	function updateVerticalHints() {
		let hintCells = document.querySelectorAll('#verticalHints tr:first-child td');
		for (let i = 0; i < hintCells.length; i++) {
			hintCells[i].textContent = numberVerticalHints[i].toString();  // Convert to string

			if (numberVerticalHints[i] === 0) {
				hintCells[i].style.color = 'transparent';
			} else {
				hintCells[i].style.color = '';
			}
		}

		let hintCells2 = document.querySelectorAll('#verticalHints tr:nth-child(2) td');
		for (let i = 0; i < hintCells2.length; i++) {
			hintCells2[i].textContent = numberVerticalHints2[i].toString();  // Convert to string

			if (numberVerticalHints2[i] === 0) {
				hintCells2[i].style.color = 'transparent';
			} else {
				hintCells2[i].style.color = '';
			}
		}
	}

// Call the function to fill in hint cells
updateVerticalHints();


	const tableContainer = document.createElement('div');
	tableContainer.className = 'table__container';
	gameboardContainer.appendChild(tableContainer);

	const horizontalHintsDom = document.createElement('table');
	horizontalHintsDom.id = 'horizontalHints';
	tableContainer.appendChild(horizontalHintsDom);

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



	const gameField = document.createElement('table');
	gameField.id = 'gameField';
	tableContainer.appendChild(gameField);

	let table = document.getElementById('gameField');

	table.addEventListener('contextmenu', function(event) {
		event.preventDefault(); 
	});
	
	table.addEventListener('mousedown', function(event) {
		if (event.button === 2) {
			handleRightClick(event);
		}
	});

	table.addEventListener('click', handleClick);


	// модальные окна и их содержимое
	createModal(gameContainer, 'myModal', 'modal', 'Select the picture:', 'chooseRandomImage()', 'Random');
	const modal = document.getElementById('myModal');
	modal.style.display = 'block';

	originalGameFields.forEach((gameField, index) => {
        let button = document.createElement('button');
        button.textContent = gameField.name;
        button.setAttribute('class', 'modal-button__level');
        button.onclick = function() {
            chooseImage(index);
        };
        document.querySelector('.modal-content').appendChild(button);
    });

	const closeModalButton = modal.querySelector('.close');
	closeModalButton.addEventListener('click', function() {
		modal.style.display = 'none'; // Скрываем модальное окно
	});
	createModal(gameContainer, 'winModal', 'modal', ' ', 'restartGame()', 'Play more!', true);

	// Добавляем контейнер кнопок
	const buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'buttons__container';
	mainContainer.appendChild(buttonsContainer);

	// кнопки	
	addButton(buttonsContainer, 'resetButton', 'Start again');
	document.getElementById('resetButton').addEventListener('click', resetGame);

	addButton(buttonsContainer, 'selectLevelButton', 'Choose level');
	document.getElementById('selectLevelButton').addEventListener('click', openLevelSelectionModal);

	addButton(buttonsContainer, 'solveButton', 'Solution', 'solveGame()');

	addButton(buttonsContainer, 'saveButton', 'Save game');
	document.getElementById('saveButton').addEventListener('click', saveGameState);

	addButton(buttonsContainer, 'continueButton', 'Continue last game');
	document.getElementById('continueButton').addEventListener('click', continueLastGame);

	function openLevelSelectionModal() {
		playButtonClickSound();
		document.getElementById("myModal").style.display = "block";
	}

	
	document.querySelector('.close').addEventListener('click', closeModal);


	addAudio(mainContainer, 'buttonClickSound', './sounds/buttonclick.mp3');
	addAudio(mainContainer, 'flagBlackCellSound', './sounds/click.mp3');
	addAudio(mainContainer, 'winGameSound', './sounds/win.mp3');
	addAudio(mainContainer, 'flagEmptyCellSound', './sounds/flagEmptyCell.mp3');
	addAudio(mainContainer, 'flagXCellSound', './sounds/flagXCell.mp3');

});

function createModal(parent, id, className, text, onclick, buttonText, isWinModal = false) {
	const modal = document.createElement('div');
	modal.id = id;
	modal.className = className;
	const modalContent = document.createElement('div');
	modalContent.className = isWinModal ? 'modal-content__win' : 'modal-content';
	const spanClose = document.createElement('span');
	spanClose.className = 'close';
	spanClose.textContent = '×';
	spanClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
	const pModal = document.createElement('p');
	pModal.textContent = text;
	if (isWinModal) {
		pModal.id = 'winModalText';
	}
	const button = document.createElement('button');
	button.className = 'modal-button__level';
	button.textContent = buttonText;
	if (onclick) button.setAttribute('onclick', onclick);
	modalContent.appendChild(spanClose);
	modalContent.appendChild(pModal);

	// Добавляем элемент elapsedTime для winModal
	if (isWinModal) {
		const elapsedTimeParagraph = document.createElement('p');
		const elapsedTimeSpan = document.createElement('span');
		elapsedTimeSpan.id = 'elapsedTime';
		elapsedTimeSpan.textContent = '';
		elapsedTimeParagraph.appendChild(elapsedTimeSpan);
		modalContent.appendChild(elapsedTimeParagraph);
	}

	modalContent.appendChild(button);
	modal.appendChild(modalContent);
	parent.appendChild(modal);
}

function addButton(parent, id, text, onclick = '') {
	const button = document.createElement('button');
	button.id = id;
	button.className = 'game__button';
	button.textContent = text;
	if (onclick) button.setAttribute('onclick', onclick);
	parent.appendChild(button);
}

function addAudio(parent, id, src) {
	const audio = document.createElement('audio');
	audio.id = id;
	audio.src = src;
	parent.appendChild(audio);
}



document.addEventListener('DOMContentLoaded', function() {
    continueLastGame();
});

let gameField = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

let originalGameFields = [

	{
		name: "Dot (for debug)",
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
		name: "Cross",
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
		name: "Sharp",
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
		name: "Hourglass",
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
		name: "Stroller",
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
		name: "Cat",
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

		if (gameField[rowIndex][colIndex] === 0) {
			playFlagEmptyCellSound(); 
		}

		if (gameField[rowIndex][colIndex] === 1) {
			playFlagBlackCellSound();
		}


    } else if (event.button === 2) {
        handleRightClick(event);
    }

};

let handleRightClick = function(event) {
    event.preventDefault(); 

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
	target.style.color = gameField[rowIndex][colIndex] === 0 ? 'transparent' : '';

    updateCellColors();

    setTimeout(checkSolution, 100);

    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            updateElapsedTimeDisplay();
        }, 1000);
    }

	playFlagXCellSound();
};



let elapsedSeconds = 0;
updateElapsedTimeDisplay();

function updateElapsedTimeDisplay() {
	let minutes = Math.floor(elapsedSeconds / 60);
	let seconds = elapsedSeconds % 60;
	document.getElementById('elapsedTimeDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


function checkSolution() {
    for (let i = 0; i < originalGameFields.length; i++) {
        let isMatch = true;
        for (let j = 0; j < gameField.length; j++) {
            for (let k = 0; k < gameField[j].length; k++) {
                if (gameField[j][k] !== originalGameFields[i].field[j][k]) {
                    isMatch = false;
                    break;
                }
            }
            if (!isMatch) {
                break;
            }
        }
        if (isMatch) {
            let elapsedTime = Date.now() - startTime;
            let seconds = Math.floor(elapsedTime / 1000);

            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            document.getElementById('elapsedTime').textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;

            clearInterval(timerInterval);
            startTime = null;
            timerInterval = null;

            console.log("Saving win for level:", originalGameFields[i].name);
            saveWin(elapsedTime, originalGameFields[i].name);

            showWinModal();
            playWinGameSound();
            table.removeEventListener('click', handleClick);
            updateElapsedTimeDisplay();
            return true;
        }
    }
}


function showWinModal(isSolved) {
	const winModal = document.getElementById("winModal");
	const winModalText = document.getElementById("winModalText");
	const elapsedTimeParagraph = document.getElementById("elapsedTime").parentNode; 

	if (isSolved) {
		winModalText.textContent = "Поздравляем, вы списали!";
		elapsedTimeParagraph.style.display = "none"; 
	} else {
		winModalText.textContent = "Great! You have solved the nonogram in";
		elapsedTimeParagraph.style.display = "block"; 
	}
	winModal.style.display = "block";
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
                cell.style.backgroundColor = gameField[i][j] === 1 ? 'black' : 'white';  // Добавьте эту строку
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



function resetGame() {
	playButtonClickSound();
	gameField = Array.from({ length: 5 }, () => Array(5).fill(0));
	updateGameFieldAndHints();
	addClickListenerToTable();
}

function openLevelSelectionModal() {
	playButtonClickSound();
    document.getElementById("myModal").style.display = "block";
}


function solveGame() {
    playButtonClickSound();
    gameField = originalGameField.map(row => row.slice());
    updateGameFieldAndHints();

    const gameFieldCells = document.querySelectorAll('#gameField td');
    const isDarkTheme = document.body.classList.contains('dark-theme');

    gameFieldCells.forEach((cell, index) => {
        const rowIndex = Math.floor(index / 5);
        const colIndex = index % 5;

        if (originalGameField[rowIndex][colIndex] === 1) {
            cell.style.backgroundColor = isDarkTheme ? 'white' : 'black';
        } else {
            cell.style.backgroundColor = isDarkTheme ? 'black' : 'white';
        }
    });

    clearInterval(timerInterval);
	showWinModal(true);
    table.removeEventListener('click', handleClick);
}


function playButtonClickSound() {
    document.getElementById('buttonClickSound').play();
}

function playFlagBlackCellSound() {
    document.getElementById('flagBlackCellSound').play();
}

function playWinGameSound() {
    document.getElementById('winGameSound').play();
}

function playFlagEmptyCellSound() {
    document.getElementById('flagEmptyCellSound').play();
}

function playFlagXCellSound() {
    document.getElementById('flagXCellSound').play();
}


// Функция сохранения состояния игры в localStorage
function saveGameState() {
    localStorage.setItem('savedGame', JSON.stringify({
        gameField: gameField,
        originalGameField: originalGameField,
        numberVerticalHints: numberVerticalHints,
        numberVerticalHints2: numberVerticalHints2,
        horizontalHintsTop: horizontalHintsTop,
        horizontalHintsBottom: horizontalHintsBottom,
        elapsedSeconds: elapsedSeconds,
    }));
}

function continueLastGame() {
    const savedState = localStorage.getItem('savedGame');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        gameField = parsedState.gameField;
        originalGameField = parsedState.originalGameField;
        numberVerticalHints = parsedState.numberVerticalHints;
        numberVerticalHints2 = parsedState.numberVerticalHints2;
        horizontalHintsTop = parsedState.horizontalHintsTop;
        horizontalHintsBottom = parsedState.horizontalHintsBottom;
        elapsedSeconds = parsedState.elapsedSeconds;
        updateGameFieldAndHints();
        updateElapsedTimeDisplay();
        addClickListenerToTable();
		updateTopWins();
    }
}



function saveWin(time, levelName) {
    console.log("Saving win:", { time: time, levelName: levelName });
    let wins = JSON.parse(localStorage.getItem('wins')) || [];
    wins.push({ time: time, levelName: levelName });
    localStorage.setItem('wins', JSON.stringify(wins));
    updateTopWins();
}

document.addEventListener('DOMContentLoaded', function() {
    updateTopWins();
});

function updateTopWins() {
    let wins = JSON.parse(localStorage.getItem('wins')) || [];
    wins = wins.slice(-5); 
    wins.sort((a, b) => a.time - b.time); 

    let topWinsContainer = document.getElementById('topWinsContainer');

    topWinsContainer.innerHTML = '';

    wins.forEach((win, index) => {
        let winElement = document.createElement('div');
        let formattedTime = formatTime(win.time);
        winElement.textContent = `${index + 1}. ${win.levelName} - 5x5 - ${formattedTime}`;
        topWinsContainer.appendChild(winElement);
		console.log(wins, win);
    });
}


function formatTime(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	res = `${minutes}:${seconds}`;
	return res;
}
