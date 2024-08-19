window.addEventListener('load', function() {
  document.querySelector('.loading-screen').style.display = 'none';
  window.scrollTo(0, 0);
});

// Selección de elementos
const openMenuBtn = document.getElementById('open-menu');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');

// Función para abrir el menú lateral
function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('show');
}

// Función para cerrar el menú lateral
function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
}

// Event Listeners
openMenuBtn.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);

let index = 0;
let interval;

// Función para mostrar la diapositiva en la posición dada
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const captions = document.querySelectorAll('.carousel-caption');
    
    if (n >= slides.length) {
        index = 0;
    } else if (n < 0) {
        index = slides.length - 1;
    } else {
        index = n;
    }

    // Mover el carrusel
    const offset = -index * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

    // Ocultar todas las descripciones
    captions.forEach(caption => {
        caption.classList.remove('show');
    });

    // Mostrar la descripción actual con animación
    captions[index].classList.add('show');
}

// Cambia a la siguiente diapositiva
function nextSlide() {
    showSlide(index + 1);
}

// Cambia a la diapositiva anterior
function prevSlide() {
    showSlide(index - 1);
}

// Configura el cambio automático de diapositivas cada 3 segundos
function startAutoSlide() {
    interval = setInterval(nextSlide, 5000); // Cambia cada 3 segundos
}

// Detiene el cambio automático de diapositivas
function stopAutoSlide() {
    clearInterval(interval);
}

// Inicializa el primer slide y comienza el cambio automático
showSlide(index);
startAutoSlide();

// Control de deslizamiento en dispositivos móviles
let startX;

document.querySelector('.carousel').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX; // Obtiene la posición inicial del toque
});

document.querySelector('.carousel').addEventListener('touchend', function(e) {
    let endX = e.changedTouches[0].clientX; // Obtiene la posición final del toque
    let diffX = startX - endX; // Calcula la diferencia

    if (Math.abs(diffX) > 50) { // Ajusta el valor umbral según sea necesario
        if (diffX > 0) {
            nextSlide(); // Desplazamiento hacia la izquierda
        } else {
            prevSlide(); // Desplazamiento hacia la derecha
        }
    }
});

// Detener el cambio automático al pasar el mouse sobre el carrusel
document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);





const testimonials = [
  {
      text: '"No hay nada como un SENSES antes de entrenar. "',
      stars: 5,
      userName: 'Jordi R.'
  },
  {
      text: '"Incomparable con otras creatinas, esta si que sabe bien."',
      stars: 5,
      userName: 'Pedro B.'
  },
  {
      text: '"Por el precio que tiene no puedo pedir más. Excelente."',
      stars: 4,
      userName: 'Daniel Z.'
  }
  // Agrega más testimonios aquí si lo deseas
];

let currentSlideIndex = 0;

function createTestimonialHTML(testimonial) {
  const starElements = Array.from({ length: 5 }, (_, index) => 
      `<span>${index < testimonial.stars ? '&#9733;' : '&#9734;'}</span>`
  ).join('');
  
  return `
      <div class="testimonial">
          <div class="review">
              <div class="review-text">
                  <p>${testimonial.text}</p>
                  <div class="stars">${starElements}</div>
                  <p class="user-name">${testimonial.userName}</p>
              </div>
          </div>
      </div>
  `;
}

function updateCarousel() {
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.innerHTML = createTestimonialHTML(testimonials[currentSlideIndex]);
}

function nextSlide2() {
  currentSlideIndex = (currentSlideIndex + 1) % testimonials.length;
  updateCarousel();
}

function prevSlide2() {
  currentSlideIndex = (currentSlideIndex - 1 + testimonials.length) % testimonials.length;
  updateCarousel();
}

// Inicializa el carrusel con el primer slide
updateCarousel();

// Cambia automáticamente los slides cada 5 segundos
setInterval(nextSlide2, 5000);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetElement = document.querySelector(this.getAttribute('href'));
      const offset = 200; // Ajusta este valor según lo que necesites
  
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });
  