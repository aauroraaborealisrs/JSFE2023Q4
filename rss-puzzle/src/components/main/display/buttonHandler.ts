export function updateButtonStates(
  checkButton: HTMLButtonElement,
  nextButton: HTMLButtonElement,
) {
  nextButton.style.visibility = 'visible';
  checkButton.disabled = true;
  checkButton.textContent = 'Check';
  checkButton.style.backgroundColor = '#ccc';
  checkButton.style.visibility = 'visible';
}
