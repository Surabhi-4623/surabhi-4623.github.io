

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save user preference for dark mode
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  }
  
  // Check if dark mode preference is saved in localStorage
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.body.classList.add('dark-mode');
  }
  

// Select all cards
const cards = document.querySelectorAll('.card');

// Create an intersection observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the visible class when the card is in the viewport
            entry.target.classList.add('visible');
        }
    });
});

// Observe each card
cards.forEach(card => {
    observer.observe(card);
});


document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.blog-carousel');
  const container = carousel.querySelector('.carousel-container');
  const cards = carousel.querySelectorAll('.blog-card');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.dots-container');
  
  let currentIndex = 0;
  let visibleItems = getVisibleItems();
  
  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const numDots = Math.ceil(cards.length / visibleItems);
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = `dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function getVisibleItems() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  function updateCarousel() {
    const translateX = -(currentIndex * (100 / visibleItems));
    container.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Update button states
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= cards.length - visibleItems ? '0.5' : '1';
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - visibleItems));
    updateCarousel();
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - visibleItems) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newVisibleItems = getVisibleItems();
      if (newVisibleItems !== visibleItems) {
        visibleItems = newVisibleItems;
        currentIndex = 0;
        createDots();
        updateCarousel();
      }
    }, 250);
  });
  
  // Initial setup
  createDots();
  updateCarousel();
});