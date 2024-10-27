import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor(elements) {
    this.validateElements(elements);
    this.elements = elements;
    this.initializeAppShell();
  }

  // Ensure all required DOM elements exist
  validateElements({ button, drawer, content }) {
    if (!button || !drawer || !content) {
      throw new Error('Missing required DOM elements for App initialization');
    }
  }

  // Set up initial application shell components
  initializeAppShell() {
    DrawerInitiator.init(this.elements);
  }

  // Initialize skip link functionality for accessibility
  setupSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.elements.content.focus();
    });
  }

  // Get the page component for the current URL
  getCurrentPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (!page) {
      throw new Error(`No route found for URL: ${url}`);
    }

    return page;
  }

  // Handle the rendering of page content
  async renderPageContent(page) {
    try {
      const content = await page.render();
      this.elements.content.innerHTML = content;
      await page.afterRender();
    } catch (error) {
      console.error('Error rendering page:', error);
      this.elements.content.innerHTML = '<p>Error loading page content</p>';
    }
  }

  // Main method to render the current page and setup its functionality
  async renderPage() {
    try {
      const page = this.getCurrentPage();
      await this.renderPageContent(page);
      this.setupSkipLink();
    } catch (error) {
      console.error('Error in page rendering:', error);
    }
  }
}

export default App;
