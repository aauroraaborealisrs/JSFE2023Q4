import { checkSentenceContainer } from './checkSentence';
import { currentSentence, correctSentencesManual } from './main';

export let allowDrop = (event: DragEvent) => {
  event.preventDefault();
};

export function drag(event: DragEvent) {
  event.dataTransfer.setData('id', (event.target as HTMLElement).id);
}

export function drop(event: DragEvent) {
  let itemId = event.dataTransfer.getData('id');

  const item = document.getElementById(itemId);
  const target = event.target as HTMLElement;

  console.log(target);

  if (target.classList.contains('word')) {
    console.error('Элемент с классом "word" не может быть целевым элементом');
    item.classList.add('not-droppable');
    setTimeout(() => {
      item.classList.remove('not-droppable');
    }, 1000);
    return;
  }

  if (!target.contains(item)) {
    target.append(item);
    console.log(target);
  } else {
    console.error('Куда сам на себя тянешь');
  }

  checkSentenceContainer(currentSentence, correctSentencesManual);
}

export function waitForElements() {
  const words = document.querySelectorAll('.word');
  const containers = document.querySelectorAll('.container');
  const resultBlock = document.getElementById('result-block');
  const placeholders = document.querySelectorAll('.wordPlaceholder');

  if (words.length > 0 && containers.length > 0) {
    if (resultBlock) {
      resultBlock.ondragover = allowDrop;

      placeholders.forEach((placeholder) => {
        (placeholder as HTMLElement).ondragover = allowDrop;
      });
    }

    words.forEach((word, index) => {
      word.id = `word-${word.textContent}-${index}`;
      (word as HTMLElement).ondragstart = drag;
    });

    resultBlock.ondrop = drop;

    placeholders.forEach((placeholder) => {
      (placeholder as HTMLElement).ondrop = drop;
    });
  } else {
    setTimeout(waitForElements, 100);
  }
}
