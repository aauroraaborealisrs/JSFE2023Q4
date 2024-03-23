function checkInputValidity(input: HTMLInputElement): boolean {
  const regex = /^[A-Za-z-]+$/;

  if (input.value.trim() === '') {
    return false;
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

export { checkInputValidity };
