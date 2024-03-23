import { checkInputValidity } from './inputValidation';

function validateInput(inputId: string, errorId: string, regex: RegExp, minLength: number, isFirstLetterUppercaseRequired: boolean): boolean {
 const inputElement = document.getElementById(inputId) as HTMLInputElement;
 const errorElement = document.getElementById(errorId) as HTMLSpanElement;
 let isValid = true;

 if (!regex.test(inputElement.value)) {
    isValid = false;
    errorElement.textContent = 'Only English alphabet letters and hyphen are allowed.';
 } else if (isFirstLetterUppercaseRequired && inputElement.value[0] !== inputElement.value[0].toUpperCase()) {
    isValid = false;
    errorElement.textContent = 'The first letter must be uppercase.';
 } else if (inputElement.value.length < minLength) {
    isValid = false;
    errorElement.textContent = `Input must be at least ${minLength} characters long.`;
 } else {
    errorElement.textContent = '';
 }

 return isValid;
}

function checkInputs() {
 let allFilled = true;
 let formValid = true;

 const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#login-form input');
 inputs.forEach((input) => {
    const isValid = checkInputValidity(input);
    if (!isValid) {
      allFilled = false;
    }
 });

 const regex = /^[A-Za-z-]+$/;
 const submitButton = document.querySelector('.submit-button') as HTMLButtonElement;

 const firstNameValid = validateInput('firstName', 'firstNameError', regex, 3, true);
 const surnameValid = validateInput('surname', 'surnameError', regex, 4, true);

 formValid = firstNameValid && surnameValid;

 inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
    });
 });

 if (allFilled && formValid && submitButton) {
    submitButton.style.backgroundColor = '6b3f34';
    submitButton.style.color = '6b3f34';
    submitButton.style.cursor = 'pointer';
    submitButton.disabled = false;
 } else if (submitButton) {
    submitButton.style.backgroundColor = 'e1caab';
    submitButton.style.color = 'black';
    submitButton.disabled = true;
 }
}

export { checkInputs };