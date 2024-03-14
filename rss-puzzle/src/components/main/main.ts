import './mainpage.css';

class MainPage {
  sentences: string[] = [];
  currentSentenceIndex: number = 0;
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

    // fetchWordData()
    //   .then(extractSentences)
    //   .then((sentences) => {
    //     const randomIndex = Math.floor(Math.random() * sentences.length);
    //     const randomSentence = sentences[randomIndex];
    //     displaySentence(randomSentence);
    //   });

    fetchWordData()
     .then(data => {
        this.sentences = extractSentences(data);
        this.displayNextSentence(); // Отобразите первое предложение сразу после загрузки
     });

    const resultBlock = document.createElement('div');
    resultBlock.id = 'result-block';
    resultBlock.style.border = '1px solid black';
    resultBlock.style.padding = '10px';
    resultBlock.style.marginTop = '20px';
    document.getElementById('main-page').appendChild(resultBlock);

     // Ваш текущий код для рендеринга
    
     const continueButton = document.createElement('button');
     continueButton.textContent = 'Continue';
     continueButton.disabled = true; // Заблокируйте кнопку по умолчанию
     continueButton.addEventListener('click', () => this.displayNextSentence());
     document.getElementById('main-page').appendChild(continueButton);
  }

  displayNextSentence() {
    if (this.currentSentenceIndex < this.sentences.length) {
       const sentence = this.sentences[this.currentSentenceIndex];
       displaySentence(sentence);
       this.currentSentenceIndex++;
    } else {
       console.log('No more sentences');
    }
   }

   checkSentenceCompletion() {
    const sentenceContainer = document.getElementById('sentence-container');
    const currentSentence = Array.from(sentenceContainer.children)
       .map(wordDiv => wordDiv.textContent)
       .join(' ');
   
    if (currentSentence === this.sentences[this.currentSentenceIndex]) {
       this.enableContinueButton();
    }
   }

   enableContinueButton() {
    const continueButton = document.getElementById('continue-button') as HTMLButtonElement;
    if (continueButton) {
       continueButton.disabled = false;
    }
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
    });
  } else {
    console.error('Element with ID "sentence-container" not found');
  }
}


function handleWordClick(e: MouseEvent) {
  const wordDiv = e.target as HTMLElement;
  const resultBlock = document.getElementById('result-block');
  if (resultBlock && wordDiv) {
    // Сохраняем исходный размер блока слова перед его перемещением
    const originalSize = wordDiv.offsetWidth;
    wordDiv.setAttribute('data-original-size', originalSize.toString());

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
