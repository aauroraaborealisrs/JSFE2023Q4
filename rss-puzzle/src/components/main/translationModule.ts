import { IWordData } from './interfaces';
import { currentRound, currentSentenceIndex } from './main';

export function displayTranslation(wordData: IWordData) {
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

 translationSpan.textContent = translation;

 const translationContainer = document.getElementById('translation');
 if (translationContainer) {
    translationContainer.innerHTML = '';
    translationContainer.appendChild(translationSpan);
 } else {
    console.error('Element with ID "translation" not found');
 }
}