window.addEventListener('load', function() {
  // Muestra la pantalla de carga
  document.querySelector('.loading-screen').style.display = 'block';

  // Selecciona todas las imágenes del carrusel
  const images = document.querySelectorAll('img[src^="../img/carrousel/"]');
  let loadedImagesCount = 0;

  // Función que se ejecuta cuando una imagen se carga
  const imageLoaded = function() {
    loadedImagesCount++;
    if (loadedImagesCount === images.length) {
      // Si todas las imágenes están cargadas, oculta la pantalla de carga
      document.querySelector('.loading-screen').style.display = 'none';
      window.scrollTo(0, 0);
    }
  };

  // Añade un event listener a cada imagen
  images.forEach(function(image) {
    if (image.complete) {
      // Si la imagen ya está cargada (posiblemente de la caché)
      imageLoaded();
    } else {
      // Si la imagen aún no está cargada, escucha el evento 'load'
      image.addEventListener('load', imageLoaded);
      image.addEventListener('error', imageLoaded); // En caso de error, cuenta la imagen también
    }
  });

  // En caso de que no haya imágenes que cargar, oculta la pantalla de carga inmediatamente
  if (images.length === 0) {
    document.querySelector('.loading-screen').style.display = 'none';
    window.scrollTo(0, 0);
  }
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

window.addEventListener('load', initializeCarousel);




  