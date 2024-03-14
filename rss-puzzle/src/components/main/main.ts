import './mainpage.css';

class MainPage {
  constructor() {
    this.render();
  }
  render() {
    const mainPage = `
        <div id="main-page">
        <div id="sentence-container"></div>
        </div>
    `;
    document.getElementById('app').innerHTML = mainPage;

    fetchWordData()
      .then(extractSentences)
      .then((sentences) => {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        const randomSentence = sentences[randomIndex];
        displaySentence(randomSentence);
      });

    const resultBlock = document.createElement('div');
    resultBlock.id = 'result-block';
    resultBlock.style.border = '1px solid black';
    // resultBlock.style.padding = '10px';
    resultBlock.style.marginTop = '20px';
    document.getElementById('main-page').appendChild(resultBlock);
  }
}

interface Word {
  textExample: string;
}

interface Round {
  words: Word[];
}

interface WordData {
  rounds: Round[];
}

// Функция для загрузки данных из JSON-файла
async function fetchWordData() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching word data:', error);
  }
}

// function displaySentence(sentence: string) {
//   const sentenceContainer = document.getElementById('sentence-container');
//   if (sentenceContainer) {
//     const words = sentence.split(' ');
//     words.sort(() => Math.random() - 0.5);
//     sentenceContainer.innerHTML = '';
//     words.forEach((word) => {
//       const wordDiv = document.createElement('div');
//       wordDiv.textContent = word;
//       wordDiv.classList.add('word');
//       wordDiv.addEventListener('click', handleWordClick);
//       sentenceContainer.appendChild(wordDiv);
//     });
//   } else {
//     console.error('Element with ID "sentence-container" not found');
//   }
// }

//сука почему не применяется//

// function adjustWordBlockWidths() {
//   console.log('adjustWordBlockWidths called');

//  // Получаем блок результатов
//  const resultBlock = document.getElementById('sentence-container');
//  console.log('All elements inside resultBlock:', resultBlock.innerHTML);

//  if (!resultBlock) return;

//  // Получаем ширину блока результатов
//  const resultBlockWidth = resultBlock.offsetWidth;
//  console.log(resultBlockWidth);

//  // Подсчитываем количество слов в предложении
//  const words = resultBlock.querySelectorAll('.word');
//  console.log('Found words:', words);
//  const wordCount = words.length;

//  // Если слов нет, ничего не делаем
//  if (wordCount === 0) return;

//  // Вычисляем ширину для каждого слова
//  const wordWidth = resultBlockWidth / wordCount;

//  // Применяем вычисленную ширину к каждому блоку слова
// words.forEach(word => {
//     console.log('Applying style to word:', word);
//    (word as HTMLElement).style.width = `${wordWidth}px`;
//    (word as HTMLElement).style.backgroundColor = 'red'; // Временный стиль для проверки
// });
// }

function displaySentence(sentence: string) {
  const sentenceContainer = document.getElementById('sentence-container');
  if (sentenceContainer) {
    const words = sentence.split(' ');
    words.sort(() => Math.random() - 0.5);
    sentenceContainer.innerHTML = '';
    words.forEach((word) => {
      const wordDiv = document.createElement('div');
      wordDiv.textContent = word;
      wordDiv.classList.add('word');
      wordDiv.setAttribute('data-original-parent', sentenceContainer.id);
      wordDiv.addEventListener('click', handleWordClick);
      sentenceContainer.appendChild(wordDiv);
      // adjustWordBlockWidths();
    });
  } else {
    console.error('Element with ID "sentence-container" not found');
  }
}

// function handleWordClick(e: MouseEvent) {
//   const wordDiv = e.target as Node;
//   const resultBlock = document.getElementById('result-block');
//   if (resultBlock && wordDiv) {
//     resultBlock.appendChild(wordDiv);
//   }
// }

//норм без размера

// function handleWordClick(e: MouseEvent) {
//  const wordDiv = e.target as HTMLElement;
//  const resultBlock = document.getElementById('result-block');
//  if (resultBlock && wordDiv) {
//     if (resultBlock.contains(wordDiv)) {
//       const originalParent = wordDiv.getAttribute('data-original-parent');
//       if (originalParent) {
//         const originalParentElement = document.getElementById(originalParent);
//         if (originalParentElement) {
//           originalParentElement.appendChild(wordDiv);
//         }
//       }
//     } else {
//       wordDiv.setAttribute('data-original-parent', wordDiv.parentElement?.id || '');
//       resultBlock.appendChild(wordDiv);
//     }
//  }
// }
// document.addEventListener('DOMContentLoaded', () => {
//   const resultBlock = document.getElementById('sentence-container');
//   if (resultBlock) {
//     const wordDivs = resultBlock.querySelectorAll<HTMLElement>('.word'); // Предполагается, что класс слова - 'word'
//     wordDivs.forEach(wordDiv => {
//       // Проверяем, сохранен ли уже размер слова
//       if (!wordDiv.hasAttribute('data-original-size')) {
//         // Сохраняем исходный размер блока слова перед его перемещением
//         const originalSize = wordDiv.offsetWidth;
//         wordDiv.setAttribute('data-original-size', originalSize.toString());
//       }

//       // После перемещения слова в другой контейнер, применяем сохраненный размер
//       const savedSize = wordDiv.getAttribute('data-original-size');
//       if (savedSize) {
//         wordDiv.style.width = savedSize + 'px';
//       }
//     });
//   }

//   // Удаляем обработчик событий после его выполнения
//   document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
// });

// function handleDOMContentLoaded() {
//   console.log('DOMContentLoaded event handler executed.');
// }

//с размером но не работает
function handleWordClick(e: MouseEvent) {
  const wordDiv = e.target as HTMLElement;
  const resultBlock = document.getElementById('result-block');
  if (resultBlock && wordDiv) {
    // Проверяем, сохранен ли уже размер слова
    if (!wordDiv.hasAttribute('data-original-size')) {
      // Сохраняем исходный размер блока слова перед его перемещением
      const originalSize = wordDiv.offsetWidth;
      wordDiv.setAttribute('data-original-size', originalSize.toString());
    }

    if (resultBlock.contains(wordDiv)) {
      const originalParent = wordDiv.getAttribute('data-original-parent');
      if (originalParent) {
        const originalParentElement = document.getElementById(originalParent);
        if (originalParentElement) {
          originalParentElement.appendChild(wordDiv);
        }
      }
    } else {
      wordDiv.setAttribute(
        'data-original-parent',
        wordDiv.parentElement?.id || '',
      );
      resultBlock.appendChild(wordDiv);
    }

    // После перемещения слова в другой контейнер, применяем сохраненный размер
    const savedSize = wordDiv.getAttribute('data-original-size');
    if (savedSize) {
      wordDiv.style.width = savedSize + 'px';
      console.log(`ставлю размер для ${wordDiv} отакой ${savedSize}`);
    }
  }
}

function extractSentences(wordData: WordData): string[] {
  const sentences: string[] = [];

  wordData.rounds.forEach((round) => {
    round.words.forEach((word) => {
      sentences.push(word.textExample);
    });
  });
  console.log(sentences);
  return sentences;
}

export default MainPage;
