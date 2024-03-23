import { checkResultOrder } from './checkResultOrder';

export function checkSentenceContainer(
  currentSentence: string,
  correctSentencesManual: string[],
) {
  const check = checkResultOrder(currentSentence);

  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;
const sentenceContainer = document.getElementById('sentence-container');
let allPlaceholdersEmpty = false;
if (sentenceContainer) {
  allPlaceholdersEmpty = Array.from(
    sentenceContainer.querySelectorAll('.wordPlaceholder'),
  ).every((placeholder) => placeholder.children.length === 0);
}

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
