class HighlightBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.updateLayout();
    window.addEventListener('resize', () => this.updateLayout());
  }

  render() {
    this.innerHTML = `
      <style>
        .content-highlight {
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 1200px;
          margin: 2rem auto;
        }
        
        .image-highlight {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        
        .image-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }
        
        .image-highlight img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .content-highlight:hover .image-highlight img {
          transform: scale(1.1) rotate(2deg);
        }
        
        .text-highlight {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.5rem;
          background: white;
        }
        
        .text-highlight h1 {
          font-size: 2rem;
          color: #2d3436;
          margin: 0;
          line-height: 1.3;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          position: relative;
          padding-bottom: 1.5rem;
        }
        
        .text-highlight h1::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: #e17055;
          transition: width 0.3s ease;
        }
        
        .content-highlight:hover .text-highlight h1::after {
          width: 100px;
        }
        
        .text-highlight p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #636e72;
          margin: 1.5rem 0 0;
          font-family: 'Open Sans', sans-serif;
        }
        
        .highlight-button {
          display: inline-block;
          margin-top: 2rem;
          padding: 1rem 2rem;
          background: #e17055;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          align-self: flex-start;
        }
        
        .highlight-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(225, 112, 85, 0.3);
        }

        @media screen and (min-width: 768px) {
          .content-highlight {
            flex-direction: row;
            align-items: stretch;
            margin: 3rem auto;
          }
          
          .image-highlight {
            flex: 0 0 50%;
            height: auto;
          }
          
          .text-highlight {
            flex: 0 0 50%;
          }
          
          .text-highlight h1 {
            font-size: 2.25rem;
          }
        }

        @media screen and (min-width: 1024px) {
          .content-highlight {
            margin: 4rem auto;
          }
          
          .text-highlight {
            padding: 3.5rem;
          }
          
          .text-highlight h1 {
            font-size: 2.75rem;
          }
          
          .text-highlight p {
            font-size: 1.25rem;
          }
        }
      </style>
      
      <article class="content-highlight">
        <div class="image-highlight">
          <img src="./heros/hero-image_4.jpg" alt="Harsena Restaurant Food" />
        </div>
        <div class="text-highlight">
          <h1>Discover Culinary Excellence at Harsena</h1>
          <p>
            Immerse yourself in a world of exquisite flavors at Harsena Restaurant. Our master chefs 
            craft each dish with passion, combining time-honored traditions with innovative culinary techniques. 
            From farm-fresh ingredients to perfectly balanced spices, every detail is carefully curated to 
            create an unforgettable dining experience.
          </p>
          <a href="#reservation" class="highlight-button">Reserve Your Table</a>
        </div>
      </article>
    `;
  }

  updateLayout() {
    const contentHighlight = this.querySelector('.content-highlight');
    const isWideLayout = window.innerWidth >= 768;

    if (isWideLayout) {
      contentHighlight.style.flexDirection = 'row';
    } else {
      contentHighlight.style.flexDirection = 'column';
    }
  }
}

customElements.define('highlight-bar', HighlightBar);
