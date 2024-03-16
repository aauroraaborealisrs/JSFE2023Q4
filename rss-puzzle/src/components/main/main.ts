import './mainpage.css';

let currentSentenceIndex = 0;
let currentSentence: string = '';
let originalSentence = '';
let wordData: WordData;
let currentRound = 0;

class MainPage {
  sentences: string[] = [];
  constructor() {
    this.render();
  }
  render() {
    const mainPage = `
        <div id="main-page">
        <div id="translation"></div>
        <div id="completed-sentences-container"></div>
        <button id="auto-complete-button">Auto-Complete</button>
        <div id="sentence-container"></div>
        <button id="next-sentence-button">Continue</button>
        <button id="check-sentence-button">Check</button>
        </div>
    `;
    document.getElementById('app').innerHTML = mainPage;

    fetchWordData()
      .then((data) => {
        wordData = data;
        return extractSentences(wordData);
      })
      .then((fetchedSentences) => {
        this.sentences = fetchedSentences;
        displaySentence(wordData);
        return extractTranslations();
      })
      .then((translations) => {
        displayTranslation(wordData);
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
        nextSentence(wordData);
      });

    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.disabled = true;
    nextButton.style.visibility = 'hidden';

    nextButton.addEventListener('click', () => {
      if (resultBlock) {
        nextButton.disabled = true;
        nextButton.style.visibility = 'hidden';
        resultBlock.innerHTML = '';
      }
    });

    const checkButton = document.getElementById(
      'check-sentence-button',
    ) as HTMLButtonElement;
    checkButton.disabled = true;
    nextButton.style.visibility = 'hidden';

    const autoCompleteButton = document.getElementById(
      'auto-complete-button',
    ) as HTMLButtonElement;
    autoCompleteButton.addEventListener('click', autoComplete);
  }

  getSentences(): string[] {
    return this.sentences;
  }
}

interface Word {
  textExample: string;
  textExampleTranslate: string;
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
    wordData = await response.json();
    console.log('Fetched data:', wordData);

    return wordData;
  } catch (error) {
    console.error('Error fetching word data:', error);
  }
}

function displaySentence(wordData: WordData) {
  const sentenceContainer = document.getElementById('sentence-container');
  if (sentenceContainer) {
    currentSentence =
      wordData.rounds[currentRound]?.words[currentSentenceIndex]?.textExample ||
      '';
      // wordData.rounds[2]?.words[5]
      // ?.textExample || '';

    originalSentence = currentSentence;
    let words = currentSentence.split(' ');

    let shuffledWords = shuffleArray([...words]);
    sentenceContainer.innerHTML = '';

    const isFewWords = words.length <= 4;
    const isFiveWords = words.length == 5;


    shuffledWords.forEach((word) => {
      const wordDiv = document.createElement('div');
      wordDiv.textContent = word;
      wordDiv.classList.add('word');
      wordDiv.setAttribute('data-original-parent', sentenceContainer.id);
      wordDiv.addEventListener('click', handleWordClick);

      if (word === words[0]) {
        wordDiv.classList.add('first-word'); 
      }
      if (word === words[words.length - 1]) {
        wordDiv.classList.add('last-word'); 
      }
      if (isFewWords) {
        wordDiv.classList.add('few-words'); 
      }
      if (isFiveWords) {
        wordDiv.classList.add('five-words'); 
      }

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

function autoComplete() {
  const resultBlock = document.getElementById('result-block');
  const sentenceContainer = document.getElementById('sentence-container');
  const nextButton = document.getElementById(
    'next-sentence-button',
  ) as HTMLButtonElement;
  nextButton.style.visibility = 'visible';
  nextButton.style.backgroundColor = 'black';

  if (resultBlock) {
    resultBlock.innerHTML = '';
    sentenceContainer.innerHTML = '';

    const wordsInOriginal = originalSentence.split(' ');

    const isFewWords = wordsInOriginal.length <= 4;
    const isFiveWords = wordsInOriginal.length == 5;

    wordsInOriginal.forEach((word) => {
      const wordDiv = document.createElement('div');
      wordDiv.textContent = word;
      wordDiv.classList.add('word');
      resultBlock.appendChild(wordDiv);

      if (word === wordsInOriginal[0]) {
        wordDiv.classList.add('first-word'); 
      }
      if (word === wordsInOriginal[wordsInOriginal.length - 1]) {
        wordDiv.classList.add('last-word'); 
      }
      if (isFewWords) {
        wordDiv.classList.add('few-words'); 
      }
      if (isFiveWords) {
        wordDiv.classList.add('five-words'); 
      }
    });

    const checkButton = document.getElementById('check-sentence-button');

    checkButton.style.visibility = 'hidden';

    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.disabled = false;
  }
}

function nextSentence(wordData: WordData) {
  currentSentenceIndex++;
  if (currentSentenceIndex % 10 == 0) {
    currentRound++;
    currentSentenceIndex = 0;
  }
  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;
  const nextButton = document.getElementById(
    'next-sentence-button',
  ) as HTMLButtonElement;
  nextButton.style.visibility = 'visible';
  checkButton.disabled = true;
  checkButton.textContent = 'Check';
  checkButton.style.backgroundColor = '#ccc';
  checkButton.style.visibility = 'visible';

  if (currentSentenceIndex < wordData.rounds.length) {
    displaySentence(wordData);
    displayTranslation(wordData);
  } else {
    console.log('No more sentences to display');
  }

  const completedSentencesContainer = document.getElementById(
    'completed-sentences-container',
  );
  const resultBlock = document.getElementById('result-block');
  if (completedSentencesContainer && resultBlock) {
    const newLineDiv = document.createElement('div');
    newLineDiv.classList.add('sentence-line');
    while (resultBlock.firstChild) {
      newLineDiv.appendChild(resultBlock.firstChild);
    }

    completedSentencesContainer.appendChild(newLineDiv);

    if (currentSentenceIndex % 10 == 0) {
      while (completedSentencesContainer.firstChild) {
        completedSentencesContainer.removeChild(
          completedSentencesContainer.firstChild,
        );
      }
    }
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
    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.style.visibility = 'hidden';
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

function extractTranslations(): string[] {
  const translations: string[] = [];

  wordData.rounds.forEach((round) => {
    round.words.forEach((word) => {
      translations.push(word.textExampleTranslate);
    });
  });

  console.log(translations);
  return translations;
}

function displayTranslation(wordData: WordData) {
  const translationSpan = document.createElement('span');
  translationSpan.classList.add('translation-hint');
  console.log(currentSentenceIndex, currentRound);
  const translation =
    wordData.rounds[currentRound]?.words[currentSentenceIndex]
      ?.textExampleTranslate || '';
    // wordData.rounds[2]?.words[5]
    // ?.textExampleTranslate || '';
  console.log(translation);

  translationSpan.textContent = translation;

  const translationContainer = document.getElementById('translation');
  if (translationContainer) {
    translationContainer.innerHTML = '';
    translationContainer.appendChild(translationSpan);
  } else {
    console.error('Element with ID "translation" not found');
  }
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
        nextButton.style.visibility = 'visible';
        nextButton.style.backgroundColor = 'green';
      } else {
        checkButton.textContent = 'Incorrect. Try again';
        checkButton.style.backgroundColor = 'red';
        nextButton.style.visibility = 'hidden';
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
