import { checkSentenceContainer } from '../checkResult/checkSentence';
import { currentSentence, correctSentencesManual } from '../main';

export function handleWordClick(e: MouseEvent) {
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
let allPlaceholdersEmpty = false;
if (sentenceContainer) {
  allPlaceholdersEmpty = Array.from(
    sentenceContainer.querySelectorAll('.wordPlaceholder'),
  ).every((placeholder) => placeholder.children.length === 0);
}

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
    checkSentenceContainer(currentSentence, correctSentencesManual);
  }
}
