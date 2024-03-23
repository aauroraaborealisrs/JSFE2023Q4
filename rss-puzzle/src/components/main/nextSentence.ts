// import { IWordData } from './interfaces';
// import { displayTranslation } from './translationModule';

// export function nextSentence(wordData: IWordData) {
//     currentSentenceIndex++;
//     if (currentSentenceIndex % 10 == 0) {
//       currentRound++;
//       currentSentenceIndex = 0;
//       changeBackgroundImage();
//     }

//     alphaHeight -= 10;

//     const checkButton = document.getElementById(
//       'check-sentence-button',
//     ) as HTMLButtonElement;
//     const nextButton = document.getElementById(
//       'next-sentence-button',
//     ) as HTMLButtonElement;
//     nextButton.style.visibility = 'visible';
//     checkButton.disabled = true;
//     checkButton.textContent = 'Check';
//     checkButton.style.backgroundColor = '#ccc';
//     checkButton.style.visibility = 'visible';

//     if (currentSentenceIndex < wordData.rounds.length) {
//       displaySentence(wordData);
//       displayTranslation(wordData);
//     } else {
//       console.log('No more sentences to display');
//     }

//     const completedSentencesContainer = document.getElementById(
//       'completed-sentences-container',
//     );
//     const resultBlock = document.getElementById('result-block');

//     if (completedSentencesContainer && resultBlock) {
//       const newLineDiv = document.createElement('div');
//       newLineDiv.classList.add('sentence-line');
//       while (resultBlock.firstChild) {
//         newLineDiv.appendChild(resultBlock.firstChild);
//       }

//       completedSentencesContainer.appendChild(newLineDiv);

//       if (currentSentenceIndex % 10 == 0) {
//         const modal = document.createElement('div');
//         modal.classList.add('modal');
//         document.body.insertBefore(modal, document.body.firstChild);

//         const modalContent = document.createElement('div');
//         modalContent.classList.add('modal-content');

//         const closeButton = document.createElement('span');
//         closeButton.classList.add('close');
//         closeButton.textContent = 'Continue';
//         closeButton.onclick = function () {
//           modal.style.display = 'none';
//           correctSentencesManual.length = 0;
//           correctSentencesAutoComplete.length = 0;
//         };

//         const header = document.createElement('h2');
//         header.textContent = 'Congrats!';

//         const known = document.createElement('h4');
//         known.classList.add('known');
//         known.textContent = 'Known:';

//         const manualSentencesContainer = document.createElement('div');
//         manualSentencesContainer.id = 'manualSentencesContainer';

//         const unknown = document.createElement('h4');
//         unknown.classList.add('unknown');
//         unknown.textContent = 'Unknown:';

//         const autoCompleteSentencesContainer = document.createElement('div');
//         autoCompleteSentencesContainer.id = 'autoCompleteSentencesContainer';

//         correctSentencesManual.forEach((sentence) => {
//           const p = document.createElement('p');
//           p.textContent = sentence;
//           manualSentencesContainer.appendChild(p);
//         });

//         correctSentencesAutoComplete.forEach((sentence) => {
//           const p = document.createElement('p');
//           p.textContent = sentence;
//           autoCompleteSentencesContainer.appendChild(p);
//         });

//         modalContent.appendChild(header);
//         modalContent.appendChild(known);
//         modalContent.appendChild(manualSentencesContainer);
//         modalContent.appendChild(unknown);
//         modalContent.appendChild(autoCompleteSentencesContainer);
//         modalContent.appendChild(closeButton);
//         modal.appendChild(modalContent);

//         if (modal) {
//           modal.style.display = 'block';

//           console.log(correctSentencesManual, correctSentencesAutoComplete);
//         }

//         const sentenceLines =
//           completedSentencesContainer.querySelectorAll('.sentence-line');
//         sentenceLines.forEach((line) => {
//           completedSentencesContainer.removeChild(line);
//         });

//         alphaHeight = 90;
//         console.log(`${alphaHeight}`);
//       }
//     }

//     const alphaElement = document.querySelector('.alpha') as HTMLElement;
//     if (alphaElement) {
//       alphaElement.style.height = `${alphaHeight}%`;
//     }

//     waitForElements();
//   }
