import { checkInputValidity } from './inputValidation'; 
import StartScreen from '../../start/start';

export function setupFormSubmitHandler() {
 const form = document.getElementById('login-form') as HTMLFormElement;
 if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
      const surnameInput = document.getElementById('surname') as HTMLInputElement;

      const firstNameValid = checkInputValidity(firstNameInput);
      const surnameValid = checkInputValidity(surnameInput);

      if (firstNameValid && surnameValid) {
        const userData = {
          firstName: firstNameInput.value,
          surname: surnameInput.value,
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        const startScreen = new StartScreen();
      } else {
        console.log('Validation failed. Data not saved.');
      }
    });
 }
}