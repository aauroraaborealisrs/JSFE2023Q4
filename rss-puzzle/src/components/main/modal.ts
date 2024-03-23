
export function createAndShowModal(
 headerText: string,
 closeButtonText: string,
 onClose: () => void,
 correctSentencesManual: string[],
 correctSentencesAutoComplete: string[]
) {
 const modal = document.createElement('div');
 modal.classList.add('modal');
 document.body.insertBefore(modal, document.body.firstChild);

 const modalContent = document.createElement('div');
 modalContent.classList.add('modal-content');

 const closeButton = document.createElement('span');
 closeButton.classList.add('close');
 closeButton.textContent = closeButtonText;
 closeButton.onclick = function () {
    modal.style.display = 'none';
    correctSentencesManual.length = 0;
    correctSentencesAutoComplete.length = 0;
    onClose();
 };

 const header = document.createElement('h2');
 header.textContent = headerText;

 const known = document.createElement('h4');
 known.classList.add('known');
 known.textContent = 'Known:';

 const manualSentencesContainer = document.createElement('div');
 manualSentencesContainer.id = 'manualSentencesContainer';

 const unknown = document.createElement('h4');
 unknown.classList.add('unknown');
 unknown.textContent = 'Unknown:';

 const autoCompleteSentencesContainer = document.createElement('div');
 autoCompleteSentencesContainer.id = 'autoCompleteSentencesContainer';

 correctSentencesManual.forEach((sentence) => {
    const p = document.createElement('p');
    p.textContent = sentence;
    manualSentencesContainer.appendChild(p);
 });

 correctSentencesAutoComplete.forEach((sentence) => {
    const p = document.createElement('p');
    p.textContent = sentence;
    autoCompleteSentencesContainer.appendChild(p);
 });

 modalContent.appendChild(header);
 modalContent.appendChild(known);
 modalContent.appendChild(manualSentencesContainer);
 modalContent.appendChild(unknown);
 modalContent.appendChild(autoCompleteSentencesContainer);
 modalContent.appendChild(closeButton);
 modal.appendChild(modalContent);

 modal.style.display = 'block';
}