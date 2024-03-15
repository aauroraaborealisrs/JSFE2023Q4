import './mainpage.css';

let currentSentenceIndex = 0;
let currentSentence: string = '';
class MainPage {
  sentences: string[] = [];
  constructor() {
    this.render();
  }
  render() {
    const mainPage = `
        <div id="main-page">
        <div id="sentence-container"></div>
        <button id="next-sentence-button">Continue</button>
        <button id="check-sentence-button">Check</button>
        </div>
    `;
    document.getElementById('app').innerHTML = mainPage;

    fetchWordData()
      .then(extractSentences)
      .then((fetchedSentences) => {
        this.sentences = fetchedSentences;
        displaySentence(this.sentences);
      });

    const resultBlock = document.createElement('div');
    resultBlock.id = 'result-block';
    resultBlock.style.border = '1px solid black';
    resultBlock.style.padding = '10px';
    resultBlock.style.marginTop = '20px';
    document.getElementById('main-page').appendChild(resultBlock);

    document
      .getElementById('next-sentence-button')
      .addEventListener('click', () => {
        nextSentence(this.sentences);
      });

    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.disabled = true;

    nextButton.addEventListener('click', () => {
      if (resultBlock) {
        nextButton.disabled = true;
        resultBlock.innerHTML = '';
      }
    });

    const checkButton = document.getElementById(
      'check-sentence-button',
    ) as HTMLButtonElement;
    checkButton.disabled = true;
  }
  getSentences(): string[] {
    return this.sentences;
  }
}

interface Word {
  textExample: string;
}

interface Round {
  words: Word[];
}

interface WordData {
  rounds: Round[];
}

// Функция для загрузки данных из JSON-файла
async function fetchWordData() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching word data:', error);
  }
}

//отображает предложение
function displaySentence(sentences: string[]) {
  const sentenceContainer = document.getElementById('sentence-container');
  if (sentenceContainer) {
    currentSentence = sentences[currentSentenceIndex];
    let words = sentences[currentSentenceIndex].split(' ');
    let shuffledWords = shuffleArray([...words]);
    sentenceContainer.innerHTML = '';
    shuffledWords.forEach((word) => {
      const wordDiv = document.createElement('div');
      wordDiv.textContent = word;
      wordDiv.classList.add('word');
      wordDiv.setAttribute('data-original-parent', sentenceContainer.id);
      wordDiv.addEventListener('click', handleWordClick);
      sentenceContainer.appendChild(wordDiv);
    });
  } else {
    console.error('Element with ID "sentence-container" not found');
  }
}

// Функция для перемешивания массива
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  let arrayCopy = array.slice();
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }
  return arrayCopy;
}

function nextSentence(sentences: string[]) {
  currentSentenceIndex++;
  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;
  checkButton.disabled = true;
  checkButton.textContent = 'Check';
  checkButton.style.backgroundColor = '#ccc';

  if (currentSentenceIndex < sentences.length) {
    displaySentence(sentences);
  } else {
    console.log('No more sentences to display');
  }
}

//обработка клика на слово
function handleWordClick(e: MouseEvent) {
  const wordDiv = e.target as HTMLElement;
  const resultBlock = document.getElementById('result-block');
  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;

  if (resultBlock && wordDiv) {
    const originalSize = wordDiv.offsetWidth;
    wordDiv.setAttribute('data-original-size', originalSize.toString());
    checkButton.textContent = 'Check';

    if (resultBlock.contains(wordDiv)) {
      const originalParent = wordDiv.getAttribute('data-original-parent');
      if (originalParent) {
        const originalParentElement = document.getElementById(originalParent);
        if (originalParentElement) {
          originalParentElement.appendChild(wordDiv);
        }
      }
    } else {
      wordDiv.setAttribute(
        'data-original-parent',
        wordDiv.parentElement?.id || '',
      );
      resultBlock.appendChild(wordDiv);
      checkSentenceContainer();
    }

    const savedSize = wordDiv.getAttribute('data-original-size');
    if (savedSize) {
      wordDiv.style.width = savedSize + 'px';
    }
  }

  const sentenceContainer = document.getElementById('sentence-container');
  if (sentenceContainer.children.length !== 0) {
    checkButton.disabled = true;
    checkButton.style.backgroundColor = '#ccc';
  } else {
    checkButton.style.backgroundColor = 'black';
  }
}

//берет предложения
function extractSentences(wordData: WordData): string[] {
  const sentences: string[] = [];

  wordData.rounds.forEach((round) => {
    round.words.forEach((word) => {
      sentences.push(word.textExample);
    });
  });
  console.log(sentences);
  return sentences;
}

//ПРОВЕРКА ПРАВИЛЬНО ЛИ СОБРАЛ ПРЕДЛОЖЕНИЕ

function checkSentenceContainer() {
  const check = checkResultOrder(currentSentence);
  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;
  const sentenceContainer = document.getElementById('sentence-container');
  if (sentenceContainer && sentenceContainer.children.length === 0) {
    console.log('sentence-container пустой');
    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    checkButton.disabled = false;

    checkButton.addEventListener('click', () => {
      if (check) {
        checkButton.textContent = 'Correct';
        nextButton.disabled = false;
        checkButton.style.backgroundColor = 'green';
      } else {
        checkButton.textContent = 'Incorrect. Try again';
        checkButton.style.backgroundColor = 'red';
      }
    });
  }
}

function checkResultOrder(originalSentence: string) {
  const resultBlock = document.getElementById('result-block');
  if (!resultBlock) {
    console.error('Element with ID "result-block" not found');
    return false;
  }

  const wordsInResult = Array.from(resultBlock.children).map(
    (child) => child.textContent,
  );
  const wordsInOriginal = originalSentence.split(' ');

  if (wordsInResult.length !== wordsInOriginal.length) {
    console.log('Количество слов не совпадает');
    return false;
  }

  for (let i = 0; i < wordsInResult.length; i++) {
    if (wordsInResult[i] !== wordsInOriginal[i]) {
      console.log('Порядок слов не совпадает');
      return false;
    }
  }

  console.log('Порядок слов совпадает');
  return true;
}

export default MainPage;
