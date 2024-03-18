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
        <div id="completed-sentences-container">
        <div id="result-block"></div>
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

//разбивает предложение на слова и показывает их

function displaySentence(wordData: WordData) {
  const sentenceContainer = document.getElementById('sentence-container');
  const resultBlock = document.getElementById('result-block');

  if (sentenceContainer) {
    currentSentence =
      wordData.rounds[currentRound]?.words[currentSentenceIndex]?.textExample ||
      '';
    // wordData.rounds[2]?.words[5]
    // ?.textExample || '';

    originalSentence = currentSentence;
    let words = currentSentence.split(' ');
    console.log(`ghtlkj;tybt ${originalSentence}`)




    let shuffledWords = shuffleArray([...words]);
    sentenceContainer.innerHTML = '';

    const isFewWords = words.length <= 4;
    const isFiveWords = words.length == 5;

    shuffledWords.forEach((word) => {
      const wordPlaceholder = document.createElement('div');
      wordPlaceholder.classList.add('wordPlaceholder');
      // const resultPlaceholder = document.createElement('div');
      // resultPlaceholder.classList.add('resultPlaceholder');
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
      // resultBlock.appendChild(resultPlaceholder);
      wordPlaceholder.appendChild(wordDiv);

    });

    // createResultPlaceholders();
  } else {
    console.error('Element with ID "sentence-container" not found');
  }
}


const calculateWordWidth = (word: string, originalSentence: string) => {

  console.log(`слово ${word}`)

  const totalLength = originalSentence.length;

  console.log(`длина предложения ${totalLength}`)

  const wordLength = word.length;

  console.log(`длина слова ${wordLength}`)

  const totalWidthInPixels = 743;

  const percentage = wordLength / totalLength;

  //const roundedPercentage = parseFloat(percentage.toFixed(1));

  const roundedPercentage = Math.round(percentage * 10) / 10;


  console.log(`проценты ${percentage}`)

  const widthInPixels = totalWidthInPixels * roundedPercentage;

  const roundedPixels = parseFloat((totalWidthInPixels * roundedPercentage).toFixed(1));

  console.log(`финал до +15 ${roundedPixels}`)

  const final = roundedPixels + 15;

  console.log(`финал ${final}`)



  return `${final}px`;
};


// function createResultPlaceholders() {
//   const resultBlock = document.getElementById('result-block');
//   currentSentence =
//     wordData.rounds[currentRound]?.words[currentSentenceIndex]?.textExample ||
//     '';
//   let words = currentSentence.split(' ');

//   if (resultBlock) {

//     words.forEach((word) => {
//       const resultPlaceholder = document.createElement('div');
//       console.log(resultPlaceholder);
//       resultPlaceholder.classList.add('resultPlaceholder');
//       resultBlock.appendChild(resultPlaceholder);

//       const resultPlaceholders = resultBlock.querySelectorAll('.resultPlaceholder');
//       const count = resultPlaceholders.length;

//       console.log(
//         `Количество элементов с классом 'resultPlaceholder': ${count}`,
//       );
//       console.log('я в форыче твоем');
//     });

//     console.log('вызвана твоя тупая функция');
//     console.log(resultBlock);
//     console.log(currentSentence);
//   }
// }

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

    const nextButton = document.getElementById(
      'next-sentence-button',
    ) as HTMLButtonElement;
    nextButton.disabled = false;
  }
}

//показывает следующее предложение

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
  
  // const resultPlaceholders = resultBlock.querySelectorAll('.resultPlaceholder');

  if (completedSentencesContainer && resultBlock) {
    const newLineDiv = document.createElement('div');
    newLineDiv.classList.add('sentence-line');
    while (resultBlock.firstChild) {
      newLineDiv.appendChild(resultBlock.firstChild);
    }

    // resultPlaceholders.forEach((placeholder) => {
    //   placeholder.remove();
    // });

    completedSentencesContainer.appendChild(newLineDiv);

    // if (currentSentenceIndex % 10 == 0) {
    //   console.log("все жетско удалено")
    //   while (completedSentencesContainer.firstChild) {
    //     completedSentencesContainer.removeChild(
    //       completedSentencesContainer.firstChild,
    //     );
    //   }
    // }

    if (currentSentenceIndex % 10 == 0) {
      console.log('все жетско удалено');
      const sentenceLines =
        completedSentencesContainer.querySelectorAll('.sentence-line');
      sentenceLines.forEach((line) => {
        completedSentencesContainer.removeChild(line);
      });
    }
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
      // const resultPlaceholder = document.createElement('div');
      // resultPlaceholder.classList.add('resultPlaceholder');
      // resultBlock.appendChild(resultPlaceholder);
      // console.log('я добавил');

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

      const resultPlaceholders =
        resultBlock.querySelectorAll('.resultPlaceholder');
      // if (resultPlaceholders.length > 0) {
      //   resultBlock.removeChild(
      //     resultPlaceholders[resultPlaceholders.length - 1],
      //   );
      //   console.log('я удалил');
      // }
      checkSentenceContainer();
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
  const translationSpan = document.createElement('span');
  translationSpan.classList.add('translation-hint');
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
  const resultsPlaceholders = document.querySelectorAll('.resultPlaceholder');

  if (words.length > 0 && containers.length > 0) {
    // console.log(words);
    // console.log(containers);
    // console.log(resultBlock);
    // console.log(SentenceBlock);

    if (resultBlock) {
      resultBlock.ondragover = allowDrop;

      resultsPlaceholders.forEach((resultsPlaceholder) => {
        (resultsPlaceholder as HTMLElement).ondragover = allowDrop;
      });

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

    resultsPlaceholders.forEach((resultsPlaceholder) => {
      (resultsPlaceholder as HTMLElement).ondrop = drop;
    });

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
  console.log('я в драге');
  event.dataTransfer.setData('id', (event.target as HTMLElement).id);
  console.log(`я в drag вот id ${(event.target as HTMLElement).id}`);
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

  console.log(`БРОСАЮ ${item} с ${itemId}`);

  if (!target.contains(item)) {
    target.append(item);
    console.log(target);

  } else {
    console.error('Куда сам на себя тянешь');
  }
}

waitForElements();

export default MainPage;
