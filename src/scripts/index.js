import 'regenerator-runtime';
import './views/components/hero-bar';
import './views/components/highlight-bar';
import './views/components/feature-dishes';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/skip-link.css';
import '../styles/navbar.css';
import '../styles/restaurant.css';
import '../styles/footer.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import '../styles/spinner.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class ApplicationInitializer {
  constructor() {
    this.app = null;
    this.domElements = {
      hamburgerButton: '#hamburgerButton',
      navigationDrawer: '#navigationDrawer',
      mainContent: '#mainContent',
    };
  }

  initializeApp() {
    const elements = this.getDOMElements();
    this.app = new App(elements);
  }

  getDOMElements() {
    return {
      button: document.querySelector(this.domElements.hamburgerButton),
      drawer: document.querySelector(this.domElements.navigationDrawer),
      content: document.querySelector(this.domElements.mainContent),
    };
  }

  setupEventListeners() {
    window.addEventListener('hashchange', () => this.app.renderPage());
    window.addEventListener('load', () => {
      this.app.renderPage();
      swRegister(); // Using the original swRegister import
    });
  }

  start() {
    this.initializeApp();
    this.setupEventListeners();
  }
}

// Initialize application
const appInitializer = new ApplicationInitializer();
appInitializer.start();
