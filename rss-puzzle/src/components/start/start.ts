import './start.css';
import MainPage from '../main/main';
import LoginForm from '../login/login';
import { createStartScreen } from './page/startScreen';

function getUserGreeting() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const { firstName, surname } = JSON.parse(userData);
    return `${firstName} ${surname}`;
  }
  return null;
}

class StartScreen {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const userGreeting = getUserGreeting();
    const startScreen = createStartScreen(userGreeting);

    if (startScreen) {
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.innerHTML = '';
        appElement.appendChild(startScreen);
      }
    }
  }

  addEventListeners() {
    const startButton = document.querySelector('.start-button');
    if (startButton) {
      startButton.addEventListener('click', () => {
        const mainPage = new MainPage();
      });
    }

    const logOutButton = document.querySelector('.logout-button');
    if (logOutButton) {
      logOutButton.addEventListener('click', () => {
        localStorage.removeItem('userData');
        const loginForm = new LoginForm();
      });
    }
  }
}

export default StartScreen;
