function loginFormRenderer() {
  const form = document.createElement('form');
  form.id = 'login-form';

  const welcomeMessage = document.createElement('p');
  welcomeMessage.className = 'login__header';
  welcomeMessage.textContent = 'Welcome!';
  form.appendChild(welcomeMessage);

  const firstNameInput = document.createElement('input');
  firstNameInput.className = 'login__input';
  firstNameInput.type = 'text';
  firstNameInput.id = 'firstName';
  firstNameInput.name = 'firstName';
  firstNameInput.placeholder = 'First name';
  firstNameInput.required = true;
  form.appendChild(firstNameInput);

  const firstNameError = document.createElement('span');
  firstNameError.id = 'firstNameError';
  firstNameError.className = 'error-message';
  form.appendChild(firstNameError);

  const surnameInput = document.createElement('input');
  surnameInput.className = 'login__input';
  surnameInput.type = 'text';
  surnameInput.id = 'surname';
  surnameInput.name = 'surname';
  surnameInput.placeholder = 'Last name';
  surnameInput.required = true;
  form.appendChild(surnameInput);

  const surnameError = document.createElement('span');
  surnameError.id = 'surnameError';
  surnameError.className = 'error-message';
  form.appendChild(surnameError);

  const submitButton = document.createElement('button');
  submitButton.className = 'button__main submit-button';
  submitButton.type = 'submit';
  submitButton.textContent = 'Login';
  form.appendChild(submitButton);

  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.innerHTML = '';
    appElement.appendChild(form);
  }
}

export { loginFormRenderer };
