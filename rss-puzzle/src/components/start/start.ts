import './start.css';
import MainPage from '../main/main';

class StartScreen {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const startScreen = `
      <div id="start-screen">
        <header class="start__header">
          <h1 class="app-name">RSS Puzzle</h1>
          <p class="game-description">
            Unlock English grammar mastery one puzzle piece at a time with our innovative learning app!
          </p>
        </header>
        <button class="start-button">Start Learning</button>
      </div>
    `;
    document.getElementById('app').innerHTML = startScreen;
  }

  addEventListeners() {
    const startButton = document.querySelector('.start-button');
    if (startButton) {
      startButton.addEventListener('click', () => {
        const mainPage = new MainPage();
      });
    }
  }
}

export default StartScreen;
