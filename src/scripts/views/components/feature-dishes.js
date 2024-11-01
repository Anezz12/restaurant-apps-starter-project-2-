class FeatureDishes extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    this.querySelectorAll('.dish-card').forEach((card) => {
      observer.observe(card);
    });
  }

  render() {
    this.innerHTML = `
      <style>
        .featured-section {
          padding: 6rem 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .title-top {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #2d3436;
          margin: 0;
          position: relative;
          display: inline-block;
        }

        .title-top::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #de9d7e, #d17f66);
        }

        .subtitle {
          color: #636e72;
          font-size: 1.1rem;
          margin-top: 2rem;
          font-weight: 400;
        }

        .dishes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dish-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px);
          position: relative;
        }

        .dish-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dish-image-container {
          position: relative;
          padding-top: 75%;
          overflow: hidden;
        }

        .dish-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .dish-card:hover .dish-image {
          transform: scale(1.1);
        }

        .dish-info {
          padding: 2rem;
          position: relative;
        }

        .dish-price {
          position: absolute;
          top: -25px;
          right: 20px;
          background: #de9d7e;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(222, 157, 126, 0.3);
        }

        .dish-name {
          font-size: 1.4rem;
          color: #2d3436;
          margin: 0 0 1rem 0;
          font-weight: 700;
        }

        .dish-description {
          color: #636e72;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .dish-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }

        .dish-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #f39c12;
        }

        .order-button {
          padding: 0.5rem 1.5rem;
          background: linear-gradient(135deg, #de9d7e, #d17f66);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .order-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(222, 157, 126, 0.4);
        }

        .badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-size: 0.8rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .featured-section {
            padding: 4rem 1rem;
          }

          .title-top {
            font-size: 2rem;
          }

          .dishes-container {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
        }

        @media (min-width: 1200px) {
          .dishes-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>

      <section class="featured-section">
        <div class="section-header">
          <h2 class="title-top">Signature Dishes</h2>
          <p class="subtitle">Discover our chef's carefully curated selection of extraordinary flavors</p>
        </div>

        <div class="dishes-container">
          ${this.featuredDishes
    .map(
      (dish) => `
            <article class="dish-card" role="article">
              ${dish.badge ? `<span class="badge">${dish.badge}</span>` : ''}
              <div class="dish-image-container">
                <img src="${dish.image}" alt="${dish.name}" class="dish-image">
              </div>
              <div class="dish-info">
                <span class="dish-price">${dish.price}</span>
                <h3 class="dish-name">${dish.name}</h3>
                <p class="dish-description">${dish.description}</p>
                <div class="dish-meta">
                  <div class="dish-rating">
                    ${'★'.repeat(dish.rating)}${'☆'.repeat(5 - dish.rating)}
                    <span>(${dish.reviews})</span>
                  </div>
                  <button class="order-button">Order Now</button>
                </div>
              </div>
            </article>
          `
    )
    .join('')}
        </div>
      </section>
    `;
  }

  get featuredDishes() {
    return [
      {
        name: 'Nasi Goreng Spesial',
        description:
          'Nasi goreng dengan bumbu rahasia, telur mata sapi, ayam suwir, dan sayuran segar. Disajikan dengan kerupuk udang dan acar.',
        image: './dishes/nasi-goreng.jpg',
        price: 'Rp 45.000',
        rating: 5,
        reviews: 128,
        badge: 'Best Seller',
      },
      {
        name: 'Sate Ayam Madura',
        description:
          'Sate ayam khas Madura dengan bumbu kacang yang lezat, disajikan dengan lontong dan acar. Dibakar dengan arang pilihan.',
        image: './dishes/sate-ayam.jpg',
        price: 'Rp 35.000',
        rating: 4,
        reviews: 96,
        badge: "Chef's Choice",
      },
      {
        name: 'Gado-gado Jakarta',
        description:
          'Sayuran segar dengan bumbu kacang khas Jakarta, telur rebus, tempe goreng, dan kerupuk. Cocok untuk vegetarian.',
        image: './dishes/gado-gado.jpg',
        price: 'Rp 30.000',
        rating: 4,
        reviews: 85,
        badge: 'Healthy Choice',
      },
    ];
  }
}

customElements.define('feature-dishes', FeatureDishes);
