class HeroBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupParallax();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  setupParallax() {
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      const heroContent = this.querySelector('.hero_content');
      const parallaxBg = this.querySelector('.parallax-bg');

      if (heroContent && parallaxBg) {
        heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
        parallaxBg.style.transform = `translateY(${scroll * 0.5}px)`;
      }
    });
  }

  render() {
    this.innerHTML = `
      <style>
        .hero {
          position: relative;
          min-height: 85vh;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          background-color: #000;
          overflow: hidden;
        }

        .parallax-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.4)
          ),
          url("./heros/hero-image_1.jpg");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          transform-origin: center;
          will-change: transform;
          transition: transform 0.5s ease-out;
        }

        .hero_content {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 85vh;
          padding: 2rem;
          color: white;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero_title {
          position: relative;
          color: #ffffff;
          font-size: 2.5em;
          font-weight: 800;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease forwards 0.5s;
        }

        .hero_title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: #de9d7e;
          transition: width 0.3s ease;
        }

        .hero_content:hover .hero_title::after {
          width: 120px;
        }

        .hero_tagline {
          max-width: 800px;
          margin: 2rem auto;
          font-size: 1.2em;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease forwards 0.8s;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          margin-top: 2rem;
          font-size: 1.1em;
          color: #ffffff;
          background: linear-gradient(135deg, #de9d7e 0%, #d17f66 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease forwards 1.1s;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(222, 157, 126, 0.3);
          background: linear-gradient(135deg, #d17f66 0%, #de9d7e 100%);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: fadeInUp 1s ease forwards 1.4s;
        }

        .scroll-indicator::before {
          content: '';
          display: block;
          width: 20px;
          height: 20px;
          border-right: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
          transform: rotate(45deg);
          animation: scrollBounce 2s infinite;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 0.7;
            transform: translate(-50%, 0);
          }
        }

        @keyframes scrollBounce {
          0% { transform: rotate(45deg) translate(0, 0); }
          50% { transform: rotate(45deg) translate(10px, 10px); }
          100% { transform: rotate(45deg) translate(0, 0); }
        }

        @media screen and (min-width: 768px) {
          .hero_title { font-size: 3.5em; }
          .hero_tagline { font-size: 1.3em; }
        }

        @media screen and (min-width: 1024px) {
          .hero_title { font-size: 4.2em; }
          .hero_tagline { font-size: 1.4em; }
          .cta-button { font-size: 1.2em; }
        }

        @media (max-width: 767px) {
          .hero_title { font-size: 2em; }
          .hero_tagline { font-size: 1.1em; }
          .cta-button {
            padding: 0.8rem 2rem;
            font-size: 1em;
          }
        }
      </style>

      <div class="hero">
        <div class="parallax-bg"></div>
        <div class="hero_content">
          <h1 class="hero_title">Discover the Art of Fine Dining</h1>
          <p class="hero_tagline">
            Step into Harsena Restaurant, where culinary mastery meets elegant ambiance. 
            Our passionate chefs craft each dish with precision and creativity, offering you 
            an unforgettable journey through flavors that celebrate both tradition and innovation.
          </p>
          <a href="#menu" class="cta-button">Explore Our Menu</a>
        </div>
        <div class="scroll-indicator"></div>
      </div>
    `;
  }
}

customElements.define('hero-bar', HeroBar);
