import './login.css';
import StartScreen from '../start/start';

function checkInputValidity(input: HTMLInputElement) {
  const regex = /^[A-Za-z-]+$/;

  if (input.value.trim() === '') {
    return;
  }

  if (!regex.test(input.value)) {
    input.style.borderColor = 'red';
    return false;
  }

  if (input.id === 'firstName') {
    if (
      input.value.length < 3 ||
      input.value[0] !== input.value[0].toUpperCase()
    ) {
      input.style.borderColor = 'red';
      return false;
    }
  }

  if (input.id === 'surname' && input.value.length < 4) {
    input.style.borderColor = 'red';
    return false;
  } else {
    input.style.borderColor = 'green';
    return true;
  }
}

class LoginForm {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const form = `
            <form id="login-form">
                <p class="login__header">Welcome!</p>
                <input class="login__input" type="text" id="firstName" name="firstName" placeholder="First name" required>
                <span id="firstNameError" class="error-message"></span>
                <input class="login__input" type="text" id="surname" name="surname" placeholder="Last name" required>
                <span id="surnameError" class="error-message"></span>
                <button class="button__main submit-button" type="submit">Login</button>
            </form>
        `;
    document.getElementById('app').innerHTML = form;
  }

  addEventListeners() {
    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#login-form input');
    const submitButton: HTMLButtonElement | null =
      document.querySelector('.submit-button');
    const firstNameError = document.getElementById('firstNameError');
    const surnameError = document.getElementById('surnameError');

    const form = document.getElementById('login-form');

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstNameInput = document.getElementById(
          'firstName',
        ) as HTMLInputElement;
        const surnameInput = document.getElementById(
          'surname',
        ) as HTMLInputElement;

        const firstNameValid = checkInputValidity(firstNameInput);
        const surnameValid = checkInputValidity(surnameInput);

        if (firstNameValid && surnameValid) {
          const userData = {
            firstName: firstNameInput.value,
            surname: surnameInput.value,
          };

          localStorage.setItem('userData', JSON.stringify(userData));

          console.log(`User Data: ${localStorage.getItem('userData')}`);

          const startScreen = new StartScreen();
        } else {
          console.log('Validation failed. Data not saved.');
        }
      });
    }

    const checkInputs = () => {
      let allFilled = true;
      let firstNameValid = true;
      let surnameValid = true;
      let formValid = true;

      const inputs: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('#login-form input');

      inputs.forEach((input) => {
        const isValid = checkInputValidity(input);
        console.log(`Input value: ${input.value}, Validity: ${isValid}`);
        if (!isValid) {
          allFilled = false;
        }
      });

      const hasInput = Array.from(inputs as NodeListOf<HTMLInputElement>).some(
        (input: HTMLInputElement) => input.value.trim() !== '',
      );

      const regex = /^[A-Za-z-]+$/;
      if (
        !regex.test(
          (document.getElementById('firstName') as HTMLInputElement).value,
        )
      ) {
        firstNameValid = false;
        firstNameError.textContent =
          'Only English alphabet letters and hyphen are allowed.';
        formValid = false;
      } else {
        firstNameError.textContent = '';
      }

      if (
        !regex.test(
          (document.getElementById('surname') as HTMLInputElement).value,
        )
      ) {
        surnameValid = false;
        surnameError.textContent =
          'Only English alphabet letters and hyphen are allowed.';
        formValid = false;
      } else {
        surnameError.textContent = '';
      }

      let firstNameValue = (
        document.getElementById('firstName') as HTMLInputElement
      ).value;
      if (
        firstNameValue &&
        firstNameValue[0] !== firstNameValue[0].toUpperCase()
      ) {
        firstNameValid = false;
        firstNameError.textContent = 'The first letter must be uppercase.';
        formValid = false;
      }

      let surnameValue = (
        document.getElementById('surname') as HTMLInputElement
      ).value;
      if (surnameValue && surnameValue[0] !== surnameValue[0].toUpperCase()) {
        surnameValid = false;
        surnameError.textContent = 'The first letter must be uppercase.';
        formValid = false;
      }

      if (
        (document.getElementById('firstName') as HTMLInputElement).value
          .length < 3
      ) {
        firstNameValid = false;
        firstNameError.textContent =
          'First name must be at least 3 characters long.';
        formValid = false;
      }

      if (
        (document.getElementById('surname') as HTMLInputElement).value.length <
        4
      ) {
        surnameValid = false;
        surnameError.textContent =
          'Surname must be at least 4 characters long.';
        formValid = false;
      }

      const forms = document.querySelectorAll(
        '.login__input',
      ) as NodeListOf<HTMLFormElement>;

      inputs.forEach((input) => {
        input.addEventListener('input', () => {
          checkInputValidity(input);
        });
      });

      if (allFilled && firstNameValid && surnameValid && submitButton) {
        submitButton.style.backgroundColor = '6b3f34;';
        submitButton.style.color = '6b3f34';
        submitButton.style.cursor = 'pointer';
        submitButton.disabled = false;
      } else if (submitButton) {
        submitButton.style.backgroundColor = 'e1caab';
        submitButton.style.color = 'black';
        submitButton.disabled = true;
      }
    };

    inputs.forEach((input) => {
      input.addEventListener('input', checkInputs);
    });

    checkInputs();
  }
}

export default LoginForm;
