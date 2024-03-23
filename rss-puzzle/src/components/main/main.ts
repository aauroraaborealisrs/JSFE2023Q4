import './mainpage.css';
import { imageNames1 } from './imageNames';
import { waitForElements } from './dragAndDrop';
import { createInterfaceElements } from './interfaceElements';
import { setupEventHandlers } from './eventHandlers';
import { fetchWordData } from './fetchData';
import { IWordData } from './interfaces';
import { displayTranslation } from './translationModule';
import { shuffleArray } from './shuffleArray';
import { createAndShowModal } from './modal';
import { handleSelectElementChange } from './selectElementHandler';
import { createWordElement } from './wordElementCreator';
import { createWordElementAutocomplete } from './wordElementCreatorForAutocomplete';
import { updateButtonStates } from './buttonHandler';

export let currentSentenceIndex = 0;
export let currentSentence: string = '';
export let originalSentence = '';
export let currentRound = 0;
export let alphaHeight = 90;
export let wordData: IWordData;

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

          handleSelectElementChange(completedSentencesContainer);

        alphaHeight = 100;
        const alphaElement = document.querySelector('.alpha') as HTMLElement;
        if (alphaElement) {
          alphaElement.style.height = `${100}%`;
        }
        currentRound = 1;
        currentSentenceIndex = 0;
      }

    });
  }

  getSentences(): string[] {
    return this.sentences;
  }
}

export function getImageUrl(imageName: string): string {
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

export function displaySentence(wordData: IWordData) {
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
      createWordElement(word, originalSentence, sentenceContainer);
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
      createWordElementAutocomplete(word, originalSentence, resultBlock);
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

  updateButtonStates(checkButton, nextButton)

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
      const sentenceLines =
        completedSentencesContainer.querySelectorAll('.sentence-line');
      sentenceLines.forEach((line) => {
        completedSentencesContainer.removeChild(line);
      });

      alphaHeight = 90;
    
    createAndShowModal(
     'Congrats!',
     'Continue',
     () => {
        console.log('Modal closed');
     },
     correctSentencesManual,
     correctSentencesAutoComplete
    );
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