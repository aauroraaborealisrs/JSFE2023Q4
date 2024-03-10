import './mainpage.css';

class MainPage {
  constructor() {
    this.render();
  }

  render() {
    const mainPage = `
        <div id="main-page">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main page of the application.</p>
        </div>
    `;
    document.getElementById('app').innerHTML = mainPage;
  }
}

export default MainPage;
