class TestimonialSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupSlider();
  }

  setupSlider() {
    let currentSlide = 0;
    const slides = this.querySelectorAll('.testimonial-card');
    const dots = this.querySelectorAll('.dot');
    const totalSlides = slides.length;

    const updateSlider = (newIndex) => {
      slides.forEach((slide) => {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.8)';
      });
      dots.forEach((dot) => dot.classList.remove('active'));

      slides[newIndex].style.opacity = '1';
      slides[newIndex].style.transform = 'scale(1)';
      dots[newIndex].classList.add('active');
      currentSlide = newIndex;
    };

    // Auto slide
    setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      updateSlider(nextSlide);
    }, 5000);

    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateSlider(index));
    });

    // Initialize first slide
    updateSlider(0);
  }

  render() {
    this.innerHTML = `
        <style>
          .testimonial-section {
            padding: 6rem 2rem;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            position: relative;
            overflow: hidden;
          }
  
          .section-header {
            text-align: center;
            margin-bottom: 4rem;
            position: relative;
            z-index: 2;
          }
  
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            color: #2d3436;
            margin-bottom: 1rem;
            position: relative;
            display: inline-block;
          }
  
          .title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #de9d7e, #d17f66);
          }
  
          .subtitle {
            color: #636e72;
            font-size: 1.1rem;
            max-width: 600px;
            margin: 1.5rem auto 0;
          }
  
          .testimonials-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
          }
  
          .testimonial-slider {
            position: relative;
            height: 400px;
            margin: 2rem 0;
          }
  
          .testimonial-card {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.5s ease-in-out;
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 80%;
            max-width: 800px;
            margin: 0 auto;
          }
  
          .testimonial-header {
            margin-bottom: 2rem;
          }
  
          .customer-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 1rem;
            border: 3px solid #de9d7e;
            padding: 3px;
          }
  
          .quote-icon {
            color: #de9d7e;
            font-size: 2rem;
            margin-bottom: 1rem;
          }
  
          .customer-quote {
            font-size: 1.2rem;
            line-height: 1.8;
            color: #2d3436;
            margin-bottom: 2rem;
            font-style: italic;
          }
  
          .customer-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #2d3436;
            margin-bottom: 0.5rem;
          }
  
          .customer-title {
            color: #636e72;
            font-size: 0.9rem;
          }
  
          .rating {
            color: #f39c12;
            font-size: 1.2rem;
            margin: 1rem 0;
          }
  
          .slider-dots {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
          }
  
          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #cbd3d8;
            cursor: pointer;
            transition: all 0.3s ease;
          }
  
          .dot.active {
            background: #de9d7e;
            transform: scale(1.2);
          }
  
          .decoration {
            position: absolute;
            font-size: 20rem;
            color: rgba(222, 157, 126, 0.05);
            z-index: 1;
            user-select: none;
          }
  
          .decoration-left {
            top: -2rem;
            left: -2rem;
          }
  
          .decoration-right {
            bottom: -2rem;
            right: -2rem;
            transform: rotate(180deg);
          }
  
          @media (max-width: 768px) {
            .testimonial-section {
              padding: 4rem 1rem;
            }
  
            .title {
              font-size: 2rem;
            }
  
            .testimonial-card {
              width: 90%;
              padding: 1.5rem;
            }
  
            .customer-quote {
              font-size: 1rem;
            }
  
            .decoration {
              font-size: 10rem;
            }
          }
        </style>
  
        <section class="testimonial-section">
          <div class="decoration decoration-left">"</div>
          <div class="decoration decoration-right">"</div>
          
          <div class="section-header">
            <h2 class="title">What Our Guests Say</h2>
            <p class="subtitle">Read authentic reviews from our valued customers who have experienced the magic of Harsena</p>
          </div>
  
          <div class="testimonials-container">
            <div class="testimonial-slider">
              ${this.testimonials
                .map(
                  (testimonial) => `
                <div class="testimonial-card">
                  <div class="testimonial-header">
                    <img src="${testimonial.image}" alt="${
                    testimonial.name
                  }" class="customer-image">
                  </div>
                  <div class="rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(
                    5 - testimonial.rating
                  )}
                  </div>
                  <p class="customer-quote">${testimonial.quote}</p>
                  <h3 class="customer-name">${testimonial.name}</h3>
                  <p class="customer-title">${testimonial.title}</p>
                </div>
              `
                )
                .join('')}
            </div>
  
            <div class="slider-dots">
              ${this.testimonials
                .map(
                  (_, index) => `
                <div class="dot ${index === 0 ? 'active' : ''}"></div>
              `
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
  }

  get testimonials() {
    return [
      {
        name: 'Sarah Johnson',
        title: 'Food Blogger',
        quote:
          "The culinary experience at Harsena is simply extraordinary. Every dish tells a story of tradition and innovation. The Nasi Goreng Spesial is a must-try - it's the perfect blend of authentic flavors with a modern twist.",
        image: './images/testimonial-1.jpg',
        rating: 5,
      },
      {
        name: 'David Chen',
        title: 'Regular Customer',
        quote:
          "I've been dining at Harsena for over a year now, and the consistency in quality and service never fails to impress. The Sate Ayam Madura is my absolute favorite - the peanut sauce is to die for!",
        image: './images/testimonial-2.jpg',
        rating: 5,
      },
      {
        name: 'Maria Garcia',
        title: 'Food Critics Association',
        quote:
          'Harsena Restaurant manages to capture the essence of Indonesian cuisine while adding their own unique flair. The attention to detail in presentation and the warm atmosphere make every visit memorable.',
        image: './images/testimonial-3.jpg',
        rating: 4,
      },
    ];
  }
}

customElements.define('testimonial-section', TestimonialSection);
