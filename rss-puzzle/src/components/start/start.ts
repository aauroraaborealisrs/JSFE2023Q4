import './start.css';

class StartScreen {
 constructor() {
    this.render();
 }

 render() {
    const startScreen = `
        <div id="start-screen">
        <header class="start__header">
        <h1 class="app-name">RSS Puzzle</h1>
        <p class="game-description">
        Unlock English grammar mastery one puzzle piece at a time with our innovative learning app!
        </p>
        </header>
    </div>
    `;
    document.getElementById('app').innerHTML = startScreen;
 }
}

export default StartScreen;