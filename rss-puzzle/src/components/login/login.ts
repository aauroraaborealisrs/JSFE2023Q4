import './login.css';

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
                <input class="login__input" type="text" id="surname" name="surname" placeholder="Last name" required>
                <button class="button__main submit-button" type="submit">Login</button>
            </form>
        `;
        document.getElementById('app').innerHTML = form;
    }

    addEventListeners() {
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#login-form input');
        const submitButton: HTMLButtonElement | null = document.querySelector('.submit-button');

        const checkInputs = () => {
            let allFilled = true;
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    allFilled = false;
                }
            });

            if (allFilled && submitButton) {
                submitButton.style.backgroundColor = 'black';
                submitButton.style.color = 'white';
            } else if (submitButton) {
                submitButton.style.backgroundColor = 'darkgrey';
                submitButton.style.color = 'black';
            }
        };

        inputs.forEach(input => {
            input.addEventListener('input', checkInputs);
        });

        checkInputs();
    }
}

export default LoginForm;