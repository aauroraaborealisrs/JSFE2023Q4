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
      resultBlock.style.padding = '10px';
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

function displaySentence(sentence: string) {
 const sentenceContainer = document.getElementById('sentence-container');
 if (sentenceContainer) {
      const words = sentence.split(' ');
      // Перемешиваем слова в случайном порядке
      words.sort(() => Math.random() - 0.5);
      sentenceContainer.innerHTML = '';
      words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = word;
        wordDiv.classList.add('word');
        wordDiv.addEventListener('click', handleWordClick);
        sentenceContainer.appendChild(wordDiv);
      });
 } else {
      console.error('Element with ID "sentence-container" not found');
 }
}

function handleWordClick(e: MouseEvent) {
  const wordDiv = e.target as Node;
 const resultBlock = document.getElementById('result-block');
 if (resultBlock && wordDiv) {
    resultBlock.appendChild(wordDiv);
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
