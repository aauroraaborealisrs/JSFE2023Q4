import './mainpage.css';

let currentSentenceIndex = 0;
let currentSentence: string = '';
let originalSentence = '';
let wordData: WordData;
let currentRound = 0;
let alphaHeight = 90;
let dataUrl =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';

let correctSentencesManual: string[] = [];
let correctSentencesAutoComplete: string[] = [];

const imageNames1 = [
  '9th_wave',
  'abbati2',
  'arabs',
  'campo',
  'citywall',
  'coastal',
  'deerhunt',
  'deerlake',
  'distress',
  'edgewood',
  'extensiv',
  'extensiv_1',
  'firework',
  'fishing',
  'giuseppe',
  'ice_land',
  'italiana',
  'italianb',
  'kilarney',
  'landmose',
  'landsca3',
  'landscap',
  'landscap_1',
  'landscap_2',
  'railway',
  'rateship',
  'river_la',
  'riverla2',
  'rome',
  'rome1',
  'scene',
  'shipcalm',
  'shipping',
  'shipping_1',
  'skating',
  'tivoli',
  'vessels1',
  'view_stp',
  'viewvien',
  'viewvlaa',
  'waterfal',
  'winter_l',
  'winterla',
  'winterla_1',
  'woodedla',
];

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
        <select id="numberSelect">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        </select>
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
    const bodyElement = document.body;

    bodyElement.classList.add('no-bg');

    fetchWordData()
      .then((data) => {
        wordData = data;
      })
      .then((fetchedSentences) => {
        displaySentence(wordData);
        // return extractTranslations();
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
      changeBackgroundImage();
      completedSentencesContainer.style.backgroundRepeat = 'no-repeat';
      completedSentencesContainer.style.backgroundSize = 'cover';
      completedSentencesContainer.style.backgroundPosition = 'center';
    }
    const selectElement = document.getElementById('numberSelect');

    selectElement.addEventListener('change', () => {
      const selectedNumber = (selectElement as HTMLSelectElement).value;
      if (selectedNumber) {
        dataUrl = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${selectedNumber}.json`;
        console.log('Selected data URL:', dataUrl);
        fetchWordData()
          .then((data) => {
            wordData = data;
          })
          .then((fetchedSentences) => {
            displaySentence(wordData);
          })
          .then((translations) => {
            displayTranslation(wordData);
          });

        const sentenceLines =
          completedSentencesContainer.querySelectorAll('.sentence-line');
        sentenceLines.forEach((line) => {
          completedSentencesContainer.removeChild(line);
        });

        const resultBlock = document.getElementById('result-block');
        if (resultBlock) {
          while (resultBlock.firstChild) {
            resultBlock.removeChild(resultBlock.firstChild);
          }
        }

        alphaHeight = 100;
        const alphaElement = document.querySelector('.alpha') as HTMLElement;
        if (alphaElement) {
          alphaElement.style.height = `${100}%`;
        }
        currentRound = 1;
        currentSentenceIndex = 0;
      }

      checkButton.disabled = true;
      checkButton.textContent = 'Check';
      checkButton.style.backgroundColor = '#ccc';
      nextButton.style.visibility = 'hidden';
    });
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

async function fetchWordData() {
  try {
    const response = await fetch(dataUrl);
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

function getImageUrl(imageName: string): string {
  return `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/level1/${imageName}.jpg`;
}

function changeBackgroundImage() {
  const completedSentencesContainer = document.getElementById(
    'completed-sentences-container',
  ) as HTMLElement;
  if (completedSentencesContainer) {
    const imageUrl = getImageUrl(imageNames1[currentRound]);
    completedSentencesContainer.style.backgroundImage = `url('${imageUrl}')`;
    currentRound = (currentRound + 1) % imageNames1.length; 
  }
}


function displaySentence(wordData: WordData) {
  const sentenceContainer = document.getElementById('sentence-container');
  const resultBlock = document.getElementById('result-block');
  const autoCompleteButton = document.getElementById(
    'auto-complete-button',
  ) as HTMLButtonElement;

  if (sentenceContainer) {
    currentSentence =
      wordData.rounds[currentRound - 1]?.words[currentSentenceIndex]
        ?.textExample || '';
    // ?.textExample || '';

    originalSentence = currentSentence;
    let words = currentSentence.split(' ');

    let shuffledWords = shuffleArray([...words]);
    sentenceContainer.innerHTML = '';

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

  const totalLength = originalSentence.length;
  const wordLength = word.length;

  const container = document.querySelector(
    '#completed-sentences-container',
  ) as HTMLElement;
  const totalWidthInPixels = container.offsetWidth;

  const percentage = wordLength / totalLength;
  const roundedPercentage = Math.round(percentage * 10) / 10;

  const roundedPixels = parseFloat(
    (totalWidthInPixels * roundedPercentage).toFixed(1),
  );

  const final = roundedPixels + 15;
  return `${final}px`;
};

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
    correctSentencesAutoComplete.push(originalSentence);

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
    });

    const checkButton = document.getElementById('check-sentence-button');

    checkButton.style.visibility = 'hidden';
    nextButton.disabled = false;

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

function nextSentence(wordData: WordData) {
  currentSentenceIndex++;
  if (currentSentenceIndex % 10 == 0) {
    currentRound++;
    currentSentenceIndex = 0;
    changeBackgroundImage();
  }

  alphaHeight -= 10;

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

      const modal = document.createElement('div');
      modal.classList.add('modal');
      document.body.insertBefore(modal, document.body.firstChild);

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      const closeButton = document.createElement('span');
      closeButton.classList.add('close');
      closeButton.textContent = 'Continue';
      closeButton.onclick = function () {
        modal.style.display = 'none';
        correctSentencesManual.length = 0;
        correctSentencesAutoComplete.length = 0;
      };

      const header = document.createElement('h2');
      header.textContent = 'Congrats!';

      const known = document.createElement('h4');
      known.classList.add('known');
      known.textContent = 'Known:';

      const manualSentencesContainer = document.createElement('div');
      manualSentencesContainer.id = 'manualSentencesContainer';

      const unknown = document.createElement('h4');
      unknown.classList.add('unknown');
      unknown.textContent = 'Unknown:';

      const autoCompleteSentencesContainer = document.createElement('div');
      autoCompleteSentencesContainer.id = 'autoCompleteSentencesContainer';

      correctSentencesManual.forEach((sentence) => {
        const p = document.createElement('p');
        p.textContent = sentence;
        manualSentencesContainer.appendChild(p);
      });

      correctSentencesAutoComplete.forEach((sentence) => {
        const p = document.createElement('p');
        p.textContent = sentence;
        autoCompleteSentencesContainer.appendChild(p);
      });

      modalContent.appendChild(header);
      modalContent.appendChild(known);
      modalContent.appendChild(manualSentencesContainer);
      modalContent.appendChild(unknown);
      modalContent.appendChild(autoCompleteSentencesContainer);
      modalContent.appendChild(closeButton);
      modal.appendChild(modalContent);

      if (modal) {
        modal.style.display = 'block';

        console.log(correctSentencesManual, correctSentencesAutoComplete);
      }

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


  const translation =
    wordData.rounds[currentRound - 1]?.words[currentSentenceIndex]
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


function checkSentenceContainer() {
  console.log('checkSentenceContainer() called');
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

    checkButton.style.backgroundColor = 'black';

    checkButton.addEventListener('click', () => {
      if (check) {
        checkButton.textContent = 'Correct';

        correctSentencesManual.push(currentSentence);

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

  console.log(wordsInResult);
  console.log(wordsInResult.length);
  console.log(wordsInOriginal);
  console.log(wordsInOriginal.length);

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


function waitForElements() {
  const words = document.querySelectorAll('.word');
  const containers = document.querySelectorAll('.container');
  const resultBlock = document.getElementById('result-block');
  const placeholders = document.querySelectorAll('.wordPlaceholder');

  if (words.length > 0 && containers.length > 0) {
    if (resultBlock) {
      resultBlock.ondragover = allowDrop;

      placeholders.forEach((placeholder) => {
        (placeholder as HTMLElement).ondragover = allowDrop;
      });
    } 

    words.forEach((word, index) => {
      word.id = `word-${word.textContent}-${index}`;
      (word as HTMLElement).ondragstart = drag;
    });

    resultBlock.ondrop = drop;

    placeholders.forEach((placeholder) => {
      (placeholder as HTMLElement).ondrop = drop;
    });

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

  checkSentenceContainer();
}

waitForElements();

export default MainPage;
