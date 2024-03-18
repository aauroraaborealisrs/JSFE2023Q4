import LoginForm from './components/login/login';
import StartScreen from './components/start/start';

function isLoggedIn() {
  return localStorage.getItem('userData') !== null;
}

document.body.innerHTML = '<div id="app"></div>';

if (isLoggedIn()) {
  const startScreen = new StartScreen();
} else {
  const loginForm = new LoginForm();
}
