export function setupEventHandlers() {
  const resultBlock = document.getElementById('result-block');

  resultBlock.id = 'result-block';
  resultBlock.classList.add('container');

  const nextButton = document.getElementById(
    'next-sentence-button',
  ) as HTMLButtonElement;
  nextButton.disabled = true;
  nextButton.style.visibility = 'hidden';

  nextButton.addEventListener('click', () => {
    if (resultBlock) {
      nextButton.disabled = true;
      nextButton.style.visibility = 'hidden';
    }
  });

  const checkButton = document.getElementById(
    'check-sentence-button',
  ) as HTMLButtonElement;
  checkButton.disabled = true;
  nextButton.style.visibility = 'hidden';

  document
    .getElementById('toggle-translation-button')
    .addEventListener('click', () => {
      const translationSpan = document.querySelector(
        '.translation-hint',
      ) as HTMLElement;
      const button = document.getElementById(
        'toggle-translation-button',
      ) as HTMLButtonElement;
      if (translationSpan) {
        const isVisible = translationSpan.style.display !== 'none';
        translationSpan.style.display = isVisible ? 'none' : 'block';
        button.textContent = isVisible ? 'Показать перевод' : 'Скрыть перевод';
      }
    });
}
