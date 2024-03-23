import './mainpage.css';
import { imageNames1 } from './imageNames';
import { waitForElements} from './dragAndDrop';
import { createInterfaceElements } from './interfaceElements';
import { setupEventHandlers } from './eventHandlers';
import { fetchWordData } from './fetchData';
import { IWordData } from './interfaces';
import { displayTranslation } from './translationModule';
import { handleWordClick } from './handleWordClick';
import { shuffleArray } from './shuffleArray';
import { calculateWordWidth } from './calculateWordWidth';

export let currentSentenceIndex = 0;
export let currentSentence: string = '';
export let originalSentence = '';
let wordData: IWordData;
export let currentRound = 0;
let alphaHeight = 90;
let dataUrl =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';

export let correctSentencesManual: string[] = [];
let correctSentencesAutoComplete: string[] = [];


class MainPage {
  sentences: string[] = [];
  constructor() {
    this.render();
  }
  render() {
    const mainPage = createInterfaceElements();
    document.getElementById('app').innerHTML = mainPage.outerHTML;
    const bodyElement = document.body;
    bodyElement.classList.add('no-bg');

    fetchWordData(dataUrl)
      .then((data) => {
        wordData = data;
      })
      .then((fetchedSentences) => {
        displaySentence(wordData);
      })
      .then((translations) => {
        displayTranslation(wordData);
      });

    document
      .getElementById('next-sentence-button')
      .addEventListener('click', () => {
        nextSentence(wordData);
      });

    setupEventHandlers();

    const autoCompleteButton = document.getElementById(
      'auto-complete-button',
    ) as HTMLButtonElement;
    autoCompleteButton.addEventListener('click', autoComplete);

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
        fetchWordData(dataUrl)
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

      const nextButton = document.getElementById(
        'next-sentence-button',
      ) as HTMLButtonElement;
      const checkButton = document.getElementById(
        'check-sentence-button',
      ) as HTMLButtonElement;

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


function displaySentence(wordData: IWordData) {
  const sentenceContainer = document.getElementById('sentence-container');

  if (sentenceContainer) {
    currentSentence =
      wordData.rounds[currentRound - 1]?.words[currentSentenceIndex]
        ?.textExample || '';

    originalSentence = currentSentence;
    let words = currentSentence.split(' ');

    let shuffledWords = shuffleArray([...words]);
    sentenceContainer.innerHTML = '';

    shuffledWords.forEach((word: string) => {
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

    const button = document.getElementById(
      'toggle-translation-button',
    ) as HTMLButtonElement;
    button.textContent = 'Показать перевод';
  }
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

function nextSentence(wordData: IWordData) {
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

waitForElements();

export default MainPage;