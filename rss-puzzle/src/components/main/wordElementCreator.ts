import { calculateWordWidth } from './calculateWordWidth';
import { handleWordClick } from './handleWordClick';

export function createWordElement(word: string, originalSentence: string, sentenceContainer: HTMLElement) {
 const wordPlaceholder = document.createElement('div');
 wordPlaceholder.classList.add('wordPlaceholder');
 const wordDiv = document.createElement('div');
 wordDiv.textContent = word;
 wordDiv.classList.add('word');
 wordDiv.addEventListener('click', handleWordClick);
 wordDiv.draggable = true;
 wordDiv.style.width = calculateWordWidth(word, originalSentence);

 const words = originalSentence.split(' ');
 if (word === words[0]) {
   wordDiv.classList.add('first-word');
 }
 if (word === words[words.length - 1]) {
   wordDiv.classList.add('last-word');
 }

 sentenceContainer.appendChild(wordPlaceholder);
 wordPlaceholder.appendChild(wordDiv);
}