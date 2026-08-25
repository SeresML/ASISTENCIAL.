document.addEventListener('DOMContentLoaded', function() {
  // Mobile Hamburger Toggle
  const burgerMenu = document.querySelector('.av-burger-menu-main');
  const mainNav = document.querySelector('.main_menu');
  
  if (burgerMenu && mainNav) {
    burgerMenu.addEventListener('click', function(e) {
      e.preventDefault();
      mainNav.classList.toggle('av-open-mobile-menu');
    });
  }

  // Text Rotator for Hero Banner and Section Rotators (Independent per container)
  const rotatorContainers = document.querySelectorAll('.av-rotator-container');
  rotatorContainers.forEach(container => {
    const rotatorSingles = container.querySelectorAll('.av-rotator-text-single');
    if (rotatorSingles.length > 0) {
      let currentIndex = 0;
      
      rotatorSingles.forEach((single, idx) => {
        if (idx === 0) {
          single.classList.add('active');
        } else {
          single.classList.remove('active');
        }
      });

      setInterval(() => {
        rotatorSingles[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % rotatorSingles.length;
        rotatorSingles[currentIndex].classList.add('active');
      }, 2500);
    }
  });

  // Smooth Slow Scroll for Hero Down Arrow
  const scrollDownLink = document.querySelector('.scroll-down-link');
  if (scrollDownLink) {
    scrollDownLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#after_section_1') || document.querySelector('#av-layout-grid-1') || document.querySelector('.av-special-heading-h2');
      if (target) {
        const headerHeight = document.querySelector('#header') ? document.querySelector('#header').offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    });
  }

  // Form Submission Simulation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (form.id === 'searchform') return;
      e.preventDefault();
      const responseDiv = form.querySelector('.wpcf7-response-output');
      if (responseDiv) {
        responseDiv.style.display = 'block';
        responseDiv.style.color = '#398f14';
        responseDiv.style.padding = '10px';
        responseDiv.style.marginTop = '15px';
        responseDiv.style.border = '1px solid #398f14';
        responseDiv.style.borderRadius = '4px';
        responseDiv.innerHTML = 'Gracias por tu mensaje. Ha sido enviado correctamente.';
      }
    });
  });
});
