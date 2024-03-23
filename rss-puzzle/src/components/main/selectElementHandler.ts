export function handleSelectElementChange(
    completedSentencesContainer: HTMLElement,
   ) {

    const selectElement = document.getElementById('numberSelect');
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

}