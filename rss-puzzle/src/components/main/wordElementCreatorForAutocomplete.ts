import { calculateWordWidth } from './calculateWordWidth';

export function createWordElementAutocomplete(word: string, originalSentence: string, resultBlock: HTMLElement) {
 const wordDiv = document.createElement('div');
 wordDiv.textContent = word;
 wordDiv.classList.add('word');
 wordDiv.style.width = calculateWordWidth(word, originalSentence);
 resultBlock.appendChild(wordDiv);

 const wordsInOriginal = originalSentence.split(' ');
 if (word === wordsInOriginal[0]) {
   wordDiv.classList.add('first-word');
 }
 if (word === wordsInOriginal[wordsInOriginal.length - 1]) {
   wordDiv.classList.add('last-word');
 }
}