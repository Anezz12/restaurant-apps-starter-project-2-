class HeroBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .hero {
          display: flex;
          align-items: center;
          min-height: 600px;
          width: 100%;
          text-align: center;
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("./heros/hero-image_1.jpg");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: 5px;
          position: relative;
        }
        
        .hero_inner {
          margin: 0 auto;
          max-width: 900px;
          padding: 2rem;
          animation: fadeIn 1s ease-out;
        }
        
        .hero_title {
          color: #de9d7e;
          font-weight: 700;
          font-size: 2.9em;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .hero_tagline {
          color: #fff;
          margin-top: 20px;
          font-size: 1.1em;
          font-weight: 400;
          line-height: 1.6;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media screen and (min-width: 768px) {
          .hero_title {
            font-size: 3.2em;
          }
          
          .hero_tagline {
            font-size: 1.3em;
          }
        }
        
        @media screen and (min-width: 1024px) {
          .hero_title {
            font-size: 3.8em;
          }
          
          .hero_tagline {
            font-size: 1.4em;
          }
        }
      </style>

      <div class="hero">
        <div class="hero_inner">
          <h1 class="hero_title">Welcome to Harsena Restaurant</h1>
          <p class="hero_tagline">
            Experience the perfect blend of traditional elegance and modern culinary artistry. 
            At Harsena, we invite you to embark on an extraordinary dining journey where every 
            dish tells a story of passion, heritage, and exceptional taste.
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-bar', HeroBar);
