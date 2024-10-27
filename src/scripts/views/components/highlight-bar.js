class HighlightBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .content-highlight {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .image-highlight {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        
        .image-highlight img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          transition: transform 0.3s ease;
        }
        
        .image-highlight:hover img {
          transform: scale(1.05);
        }
        
        .text-highlight {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;
          padding: 1rem;
        }
        
        .text-highlight h1 {
          font-size: 1.75rem;
          color: #962824;
          margin: 0;
          line-height: 1.3;
          font-weight: 700;
        }
        
        .divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #de9d7e, #962824);
          border-radius: 2px;
          margin: 0;
        }
        
        .text-highlight p {
          font-size: 1rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }
        
        @media screen and (min-width: 768px) {
          .content-highlight {
            flex-direction: row;
            align-items: center;
            padding: 3rem 2rem;
          }
          
          .image-highlight {
            height: 400px;
          }
          
          .text-highlight {
            padding: 2rem;
          }
          
          .text-highlight h1 {
            font-size: 2rem;
          }
        }
        
        @media screen and (min-width: 1024px) {
          .content-highlight {
            padding: 4rem 2rem;
            gap: 4rem;
          }
          
          .image-highlight {
            height: 500px;
          }
          
          .text-highlight h1 {
            font-size: 2.5rem;
          }
          
          .text-highlight p {
            font-size: 1.125rem;
          }
        }
      </style>
      
      <article class="content-highlight">
        <div class="image-highlight">
          <img src="./heros/hero-image_4.jpg" alt="Harsena Restaurant Food" />
        </div>
        <div class="text-highlight">
          <h1>Experience the Authentic Taste of Harsena Restaurant</h1>
          <div class="divider"></div>
          <p>
            Harsena Restaurant brings you an exceptional dining experience with our carefully
            crafted dishes. Our menu features a perfect blend of traditional and modern cuisine,
            prepared with the finest ingredients and authentic spices. Each dish tells a story
            of culinary excellence that will leave you craving for more. Come and discover the
            unique flavors that make Harsena Restaurant a must-visit dining destination.
          </p>
        </div>
      </article>
    `;
  }
}

customElements.define('highlight-bar', HighlightBar);
