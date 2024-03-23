import './login.css';
import { loginFormRenderer } from './page/loginFormRenderer';
import { setupFormSubmitHandler } from './validation/formSubmitHandler';
import { checkInputs } from './validation/checkInputs';

class LoginForm {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    loginFormRenderer();
  }

  addEventListeners() {
    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#login-form input');

    const form = document.getElementById('login-form');

    if (form) {
      setupFormSubmitHandler();
    }

    inputs.forEach((input) => {
      input.addEventListener('input', checkInputs);
    });

    checkInputs();
  }
}

export default LoginForm;
