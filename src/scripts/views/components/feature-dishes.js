class FeatureDishes extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <style>
          .dishes-container {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
            padding: 20px;
          }
  
          .dish-card {
            width: 250px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
            background-color: #fff;
            text-align: center;
          }
  
          .dish-card:hover {
            transform: translateY(-8px);
          }
  
          .dish-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
          }
  
          .dish-info {
            padding: 16px;
          }
  
          .dish-name {
            font-size: 1.2em;
            color: #333;
            font-weight: bold;
            margin: 8px 0;
          }
  
          .dish-description {
            font-size: 0.9em;
            color: #555;
            line-height: 1.4;
          }
        </style>
  
        <div class="dishes-container">
          ${this.featuredDishes
            .map(
              (dish, index) => `
            <div class="dish-card" role="article" aria-labelledby="dish-${index}" tabindex="0">
              <img src="${dish.image}" alt="${dish.name}" class="dish-image">
              <div class="dish-info">
                <h3 class="dish-name" id="dish-${index}">${dish.name}</h3>
                <p class="dish-description">${dish.description}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `;
  }

  get featuredDishes() {
    return [
      {
        name: 'Nasi Goreng Spesial',
        description: 'Nasi goreng dengan bumbu rahasia dan telur mata sapi',
        image: 'images/dishes/nasi-goreng.jpg',
      },
      {
        name: 'Sate Ayam Madura',
        description: 'Sate ayam khas Madura dengan bumbu kacang yang lezat',
        image: 'images/dishes/sate-ayam.jpg',
      },
      {
        name: 'Gado-gado Jakarta',
        description: 'Sayuran segar dengan bumbu kacang khas Jakarta',
        image: 'images/dishes/gado-gado.jpg',
      },
    ];
  }
}

customElements.define('feature-dishes', FeatureDishes);
