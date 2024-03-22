export function createInterfaceElements(): HTMLElement {
    const mainPage = document.createElement('div');
    mainPage.id = 'main-page';

    const translationDiv = document.createElement('div');
    translationDiv.id = 'translation';

    const toggleTranslationButton = document.createElement('button');
    toggleTranslationButton.id = 'toggle-translation-button';
    toggleTranslationButton.textContent = 'Показать перевод';

    const numberSelect = document.createElement('select');
    numberSelect.id = 'numberSelect';
    const options = [1, 2, 3, 4, 5, 6];
    options.forEach((optionValue) => {
      const option = document.createElement('option');
      option.textContent = optionValue.toString();
      numberSelect.appendChild(option);
    });

    const completedSentences = document.createElement('div');
    completedSentences.id = 'completed-sentences-container';

    const resultDiv = document.createElement('div');
    resultDiv.id = 'result-block';

    const alphaDiv = document.createElement('div');
    alphaDiv.className = 'alpha';

    const autoCompleteButtonDOM = document.createElement('button');
    autoCompleteButtonDOM.id = 'auto-complete-button';
    autoCompleteButtonDOM.textContent = 'Auto-Complete';

    const sentenceContainer = document.createElement('div');
    sentenceContainer.id = 'sentence-container';
    sentenceContainer.className = 'container';

    const nextSentenceButton = document.createElement('button');
    nextSentenceButton.id = 'next-sentence-button';
    nextSentenceButton.textContent = 'Continue';

    const checkSentenceButton = document.createElement('button');
    checkSentenceButton.id = 'check-sentence-button';
    checkSentenceButton.textContent = 'Check';

    mainPage.appendChild(translationDiv);
    mainPage.appendChild(toggleTranslationButton);
    mainPage.appendChild(numberSelect);
    mainPage.appendChild(completedSentences);
    completedSentences.appendChild(resultDiv);
    completedSentences.appendChild(alphaDiv);
    mainPage.appendChild(autoCompleteButtonDOM);
    mainPage.appendChild(sentenceContainer);
    mainPage.appendChild(nextSentenceButton);
    mainPage.appendChild(checkSentenceButton);

    return mainPage;
}