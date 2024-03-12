import './mainpage.css';

class MainPage {
  constructor() {
    this.render();
  }
  render() {
    const mainPage = `
        <div id="main-page">
        <h1>Welcome to the Main Page</h1>
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
    sentenceContainer.textContent = sentence;
  } else {
    console.error('Element with ID "sentence-container" not found');
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
