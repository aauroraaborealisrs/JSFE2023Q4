import './mainpage.css';

let currentSentenceIndex = 0;
let currentSentence: string = '';
let originalSentence = '';
let wordData: WordData;
let currentRound = 0;
let alphaHeight = 90;

class MainPage {
  sentences: string[] = [];
  constructor() {
    this.render();
  }
  render() {
    const mainPage = `
        <div id="main-page">
        <div id="translation"></div>
        <button id="toggle-translation-button">Показать перевод</button>
        <div id="completed-sentences-container">
        <div id="result-block"></div>
        <div class="alpha"></div>
        </div>
        <button id="auto-complete-button">Auto-Complete</button>
        <div id="sentence-container" class="container"></div>
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

    const resultBlock = document.getElementById('result-block');

    resultBlock.id = 'result-block';
    resultBlock.classList.add('container');

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

    document
      .getElementById('toggle-translation-button')
      .addEventListener('click', () => {
        const translationSpan = document.querySelector(
          '.translation-hint',
        ) as HTMLElement;
        const button = document.getElementById(
          'toggle-translation-button',
        ) as HTMLButtonElement;
        if (translationSpan) {
          const isVisible = translationSpan.style.display !== 'none';
          translationSpan.style.display = isVisible ? 'none' : 'block';
          button.textContent = isVisible
            ? 'Показать перевод'
            : 'Скрыть перевод';
        }
      });

    const completedSentencesContainer = document.getElementById(
      'completed-sentences-container',
    ) as HTMLElement;
    if (completedSentencesContainer) {
      console.log('КАРТИНКА');
      completedSentencesContainer.style.backgroundImage =
        "url('https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/level1/deerhunt.jpg')";
      completedSentencesContainer.style.backgroundRepeat = 'no-repeat';
      completedSentencesContainer.style.backgroundSize = 'cover';
      completedSentencesContainer.style.backgroundPosition = 'center';
    }
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

//разбивает предложение на слова и показывает их

function displaySentence(wordData: WordData) {
  const sentenceContainer = document.getElementById('sentence-container');
  const resultBlock = document.getElementById('result-block');
  const autoCompleteButton = document.getElementById(
    'auto-complete-button',
  ) as HTMLButtonElement;

  // autoCompleteButton.style.visibility = 'visible';

  if (sentenceContainer) {
    currentSentence =
      wordData.rounds[currentRound]?.words[currentSentenceIndex]?.textExample ||
      '';
    // wordData.rounds[2]?.words[5]
    // ?.textExample || '';

    originalSentence = currentSentence;
    let words = currentSentence.split(' ');
    // console.log(`ghtlkj;tybt ${originalSentence}`);

    let shuffledWords = shuffleArray([...words]);
    sentenceContainer.innerHTML = '';

    const isFewWords = words.length <= 4;
    const isFiveWords = words.length == 5;

    shuffledWords.forEach((word) => {
      const wordPlaceholder = document.createElement('div');
      wordPlaceholder.classList.add('wordPlaceholder');
      const wordDiv = document.createElement('div');
      wordDiv.textContent = word;
      wordDiv.classList.add('word');
      wordDiv.setAttribute('data-original-parent', sentenceContainer.id);
      wordDiv.addEventListener('click', handleWordClick);
      wordDiv.draggable = true;

      wordDiv.style.width = calculateWordWidth(word, originalSentence);

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

      sentenceContainer.appendChild(wordPlaceholder);
      wordPlaceholder.appendChild(wordDiv);
    });

    const translationSpan = document.querySelector(
      '.translation-hint',
    ) as HTMLElement;
    const button = document.getElementById(
      'toggle-translation-button',
    ) as HTMLButtonElement;
    button.textContent = 'Показать перевод';
  } else {
    console.error('Element with ID "sentence-container" not found');
  }
}

const calculateWordWidth = (word: string, originalSentence: string) => {
  // console.log(`слово ${word}`);

  const totalLength = originalSentence.length;
  // console.log(`длина предложения ${totalLength}`);

  const wordLength = word.length;
  // console.log(`длина слова ${wordLength}`);

  // const totalWidthInPixels = 743;

  const container = document.querySelector(
    '#completed-sentences-container',
  ) as HTMLElement;
  const totalWidthInPixels = container.offsetWidth;
  // console.log(`РАЗМЕР КОНТЕЙНЕРА ${totalWidthInPixels}`);

  const percentage = wordLength / totalLength;
  //const roundedPercentage = parseFloat(percentage.toFixed(1));
  const roundedPercentage = Math.round(percentage * 10) / 10;
  // console.log(`проценты ${percentage}`);

  const widthInPixels = totalWidthInPixels * roundedPercentage;

  const roundedPixels = parseFloat(
    (totalWidthInPixels * roundedPercentage).toFixed(1),
  );

  // console.log(`финал до +15 ${roundedPixels}`);
  const final = roundedPixels + 15;

  // console.log(`финал ${final}`);
  return `${final}px`;
};

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

//для кнопки автокомплита которая решает пример за тебя

function autoComplete() {
  const resultBlock = document.getElementById('result-block');
  const sentenceContainer = document.getElementById('sentence-container');
  const nextButton = document.getElementById(
    'next-sentence-button',
  ) as HTMLButtonElement;
  const autoCompleteButton = document.getElementById(
    'auto-complete-button',
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
      wordDiv.style.width = calculateWordWidth(word, originalSentence);

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
    // autoCompleteButton.style.visibility = 'hidden';
    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.disabled = false;

    //ДЛЯ АВТОКОМПЛИТА

    const button = document.getElementById(
      'toggle-translation-button',
    ) as HTMLButtonElement;
    button.textContent = 'Скрыть перевод';
    const translationSpan = document.querySelector(
      '.translation-hint',
    ) as HTMLElement;
    translationSpan.style.display = 'block';
  }
}

//показывает следующее предложение

function nextSentence(wordData: WordData) {
  currentSentenceIndex++;
  if (currentSentenceIndex % 10 == 0) {
    currentRound++;
    currentSentenceIndex = 0;
  }

  alphaHeight -= 10;
  // const alphaElement = document.querySelector('.alpha') as HTMLElement;
  // if (alphaElement) {
  //   alphaElement.style.height = `${alphaHeight}%`;
  // }

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
      console.log(`${alphaHeight}`);

      console.log('все жестко удалено');
      const sentenceLines =
        completedSentencesContainer.querySelectorAll('.sentence-line');
      sentenceLines.forEach((line) => {
        completedSentencesContainer.removeChild(line);
      });

      alphaHeight = 90;
      console.log(`${alphaHeight}`);
    }
  }

  const alphaElement = document.querySelector('.alpha') as HTMLElement;
  if (alphaElement) {
    alphaElement.style.height = `${alphaHeight}%`;
  }

  waitForElements();
}

function handleWordClick(e: MouseEvent) {
  const wordDiv = e.target as HTMLElement;
  const resultBlock = document.getElementById('result-block');
  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;

  if (resultBlock && wordDiv) {
    checkButton.textContent = 'Check';

    if (resultBlock.contains(wordDiv)) {
      const wordPlaceholders = Array.from(
        document.querySelectorAll('#sentence-container .wordPlaceholder'),
      );
      const targetPlaceholder = wordPlaceholders.find(
        (placeholder) => placeholder.children.length === 0,
      );
      if (targetPlaceholder) {
        targetPlaceholder.appendChild(wordDiv);
      }
    } else {
      wordDiv.setAttribute(
        'data-original-parent',
        wordDiv.parentElement?.id || '',
      );
      resultBlock.appendChild(wordDiv);
    }
  }

  const sentenceContainer = document.getElementById('sentence-container');
  const allPlaceholdersEmpty = Array.from(
    sentenceContainer.querySelectorAll('.wordPlaceholder'),
  ).every((placeholder) => placeholder.children.length === 0);

  if (!allPlaceholdersEmpty) {
    checkButton.disabled = true;
    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.style.visibility = 'hidden';
    checkButton.style.backgroundColor = '#ccc';
  } else {
    checkButton.style.backgroundColor = 'black';
    checkButton.disabled = false;
    checkSentenceContainer();
  }
}

//я если честно не уверена что следующие 2 еще нужны но мне страшно их убирать

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

//берет переводы

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
  const button = document.getElementById(
    'toggle-translation-button',
  ) as HTMLButtonElement;

  const translationSpan = document.createElement('span');
  translationSpan.classList.add('translation-hint');
  translationSpan.style.display = 'none';

  if (translationSpan) {
    if (button.textContent === 'Скрыть перевод') {
      translationSpan.style.display = 'block';
    } else {
      translationSpan.style.display = 'none';
    }

    button.textContent =
      button.textContent === 'Показать перевод'
        ? 'Показать перевод'
        : 'Скрыть перевод';
  }

  console.log(currentSentenceIndex, currentRound);
  const translation =
    wordData.rounds[currentRound]?.words[currentSentenceIndex]
      ?.textExampleTranslate || '';
  // wordData.rounds[2]?.words[5] это просто для дебага на словах с которыми может быть проблема
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

//РЕАКЦИЯ НА ПРАВИЛЬНО ЛИ СОБРАЛ ПРЕДЛОЖЕНИЕ

function checkSentenceContainer() {
  const check = checkResultOrder(currentSentence);
  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;
  const autoCompleteButton = document.getElementById(
    'auto-complete-button',
  ) as HTMLButtonElement;
  const sentenceContainer = document.getElementById('sentence-container');
  const allPlaceholdersEmpty = Array.from(
    sentenceContainer.querySelectorAll('.wordPlaceholder'),
  ).every((placeholder) => placeholder.children.length === 0);

  if (allPlaceholdersEmpty) {
    console.log('sentence-container пустой');
    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    checkButton.disabled = false;

    checkButton.addEventListener('click', () => {
      if (check) {
        checkButton.textContent = 'Correct';
        const translationSpan = document.querySelector(
          '.translation-hint',
        ) as HTMLElement;
        if (translationSpan) {
          translationSpan.style.display = 'block';
        }
        nextButton.disabled = false;
        checkButton.style.backgroundColor = 'green';
        nextButton.style.visibility = 'visible';
        nextButton.style.backgroundColor = 'green';
        // autoCompleteButton.style.visibility = 'hidden';
      } else {
        checkButton.textContent = 'Incorrect. Try again';
        checkButton.style.backgroundColor = 'red';
        nextButton.style.visibility = 'hidden';
      }
    });
  }
}

//проверяет правильно ли собрано предложение

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

//DRAG AND DROP

//функция с задержкой потому что вызывалась еще на стартовой странице и
//все элементы были null и я ничего лучше не придумала

function waitForElements() {
  const words = document.querySelectorAll('.word');
  const containers = document.querySelectorAll('.container');
  const resultBlock = document.getElementById('result-block');

  // const SentenceBlock = document.getElementById('sentence-container');

  const placeholders = document.querySelectorAll('.wordPlaceholder');

  if (words.length > 0 && containers.length > 0) {
    if (resultBlock) {
      resultBlock.ondragover = allowDrop;

      placeholders.forEach((placeholder) => {
        (placeholder as HTMLElement).ondragover = allowDrop;
      });

      // SentenceBlock.ondragover = allowDrop;
    } else {
      console.log('Элемент resultBlock не найден');
    }

    resultBlock.ondragenter = (event: DragEvent) => {
      console.log('ondragenter вызван');
    };

    words.forEach((word) => {
      word.id = `word-${word.textContent}`;
      (word as HTMLElement).ondragstart = drag;
    });

    resultBlock.ondrop = drop;

    placeholders.forEach((placeholder) => {
      (placeholder as HTMLElement).ondrop = drop;
    });

    // SentenceBlock.ondrop = drop;
  } else {
    setTimeout(waitForElements, 100);
  }
}

let allowDrop = (event: DragEvent) => {
  event.preventDefault();
};

function drag(event: DragEvent) {
  event.dataTransfer.setData('id', (event.target as HTMLElement).id);
}

function drop(event: DragEvent) {
  let itemId = event.dataTransfer.getData('id');

  const item = document.getElementById(itemId);
  const target = event.target as HTMLElement;

  console.log(target);

  if (target.classList.contains('word')) {
    console.error('Элемент с классом "word" не может быть целевым элементом');
    item.classList.add('not-droppable');
    setTimeout(() => {
      item.classList.remove('not-droppable');
    }, 1000);
    return;
  }

  if (!target.contains(item)) {
    target.append(item);
    console.log(target);
  } else {
    console.error('Куда сам на себя тянешь');
  }
}

waitForElements();

export default MainPage;
