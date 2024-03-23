function createStartScreen(userGreeting: string | null): HTMLElement | null {
 let greetingMessage: HTMLParagraphElement | null = null;
 if (userGreeting) {
    greetingMessage = document.createElement('p');
    greetingMessage.classList.add('greeting');
    greetingMessage.textContent = `Welcome back, ${userGreeting}!`;
 }

 const startScreen = document.createElement('div');
 startScreen.id = 'start-screen';

 const header = document.createElement('header');
 header.classList.add('start__header');

 const appName = document.createElement('h1');
 appName.classList.add('app-name');
 appName.textContent = 'RSS Puzzle';

 const gameDescription = document.createElement('p');
 gameDescription.classList.add('game-description');
 gameDescription.textContent = 'Unlock English grammar mastery one puzzle piece at a time with our innovative learning app!';

 const logoutButton = document.createElement('button');
 logoutButton.classList.add('logout-button');
 logoutButton.textContent = 'Logout';

 const startButton = document.createElement('button');
 startButton.classList.add('start-button');
 startButton.textContent = 'Start Learning';

 header.appendChild(appName);
 header.appendChild(gameDescription);
 startScreen.appendChild(header);
 startScreen.appendChild(logoutButton);
 if (greetingMessage) {
    startScreen.appendChild(greetingMessage);
 }
 startScreen.appendChild(startButton);

 return startScreen;
}

export { createStartScreen };