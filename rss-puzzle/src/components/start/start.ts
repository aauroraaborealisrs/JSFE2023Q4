import './start.css';
import MainPage from '../main/main';
import LoginForm from '../login/login';

function getUserGreeting() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const { firstName, surname } = JSON.parse(userData);
    return `${firstName} ${surname}`;
  }
  return null;
}

function isLoggedIn() {
  return localStorage.getItem('userData') !== null;
 }

class StartScreen {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const userGreeting = getUserGreeting();
    let greetingMessage = '';
    if (userGreeting) {
      greetingMessage = `<p class="greeting">Welcome back, ${userGreeting}!</p>`;
    }

    const startScreen = `
      <div id="start-screen">
        <header class="start__header">
          <h1 class="app-name">RSS Puzzle</h1>
          <p class="game-description">
            Unlock English grammar mastery one puzzle piece at a time with our innovative learning app!
          </p>
        </header>
        <button class="logout-button">Logout</button>
        ${greetingMessage}
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

      const logOutButton = document.querySelector('.logout-button');
      if(logOutButton){
        logOutButton.addEventListener('click', () => {
          localStorage.removeItem('userData');
          const loginForm = new LoginForm();
        });
      }
  }
}

export default StartScreen;
