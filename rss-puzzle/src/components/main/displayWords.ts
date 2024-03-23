import { calculateWordWidth } from './calculateWordWidth';

export function displayWords(wordsInOriginal: string[], originalSentence: string, resultBlock: HTMLElement) {
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
}