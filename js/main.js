document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Menu Implementation
  initMobileMenu();

  // 2. Text Rotators for Hero Banner and Section Rotators
  initTextRotators();

  // 3. Smooth Scroll for Hero Down Arrow
  initSmoothScroll();

  // 4. Form Submission Simulation
  initForms();
});

function initMobileMenu() {
  const burgerMenu = document.querySelector('.av-burger-menu-main');
  const mainNav = document.querySelector('.main_menu');
  const header = document.querySelector('#header');
  const aviaMenu = document.querySelector('#avia-menu');

  if (!burgerMenu || !aviaMenu) return;

  // Create mobile drawer if not existing
  let mobileDrawer = document.querySelector('.mobile-menu-drawer');
  if (!mobileDrawer) {
    mobileDrawer = document.createElement('div');
    mobileDrawer.className = 'mobile-menu-drawer';

    // Clone navigation items
    const navList = document.createElement('ul');
    navList.className = 'mobile-nav-list';

    const menuItems = aviaMenu.querySelectorAll(':scope > li');
    menuItems.forEach(item => {
      // Skip burger menu button itself and search icon in the drawer list
      if (item.classList.contains('av-burger-menu-main') || item.classList.contains('menu-item-search-dropdown') || item.classList.contains('noMobile')) {
        return;
      }

      const clone = document.createElement('li');
      clone.className = item.className;
      if (item.id) clone.id = 'mobile-' + item.id;

      const mainLink = item.querySelector(':scope > a');
      const subMenu = item.querySelector(':scope > ul.sub-menu');

      if (subMenu) {
        clone.classList.add('has-children');
        
        const parentWrapper = document.createElement('div');
        parentWrapper.className = 'mobile-parent-item';

        const clonedLink = document.createElement('a');
        clonedLink.href = mainLink ? mainLink.getAttribute('href') : '#';
        const linkText = mainLink ? (mainLink.querySelector('.avia-menu-text') ? mainLink.querySelector('.avia-menu-text').textContent : mainLink.textContent) : '';
        clonedLink.textContent = linkText.trim();

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'mobile-submenu-toggle';
        toggleBtn.setAttribute('aria-label', 'Desplegar submenú');
        toggleBtn.innerHTML = '&#9662;'; // Down arrow

        parentWrapper.appendChild(clonedLink);
        parentWrapper.appendChild(toggleBtn);
        clone.appendChild(parentWrapper);

        // Submenu items
        const clonedSub = document.createElement('ul');
        clonedSub.className = 'mobile-sub-menu';

        subMenu.querySelectorAll(':scope > li').forEach(subItem => {
          const subLi = document.createElement('li');
          subLi.className = subItem.className;
          const subA = subItem.querySelector('a');
          if (subA) {
            const newA = document.createElement('a');
            newA.href = subA.getAttribute('href');
            const subText = subA.querySelector('.avia-menu-text') ? subA.querySelector('.avia-menu-text').textContent : subA.textContent;
            newA.textContent = subText.trim();
            subLi.appendChild(newA);
          }
          clonedSub.appendChild(subLi);
        });

        clone.appendChild(clonedSub);

        // Accordion toggle click handler
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          clone.classList.toggle('is-open');
        });
      } else if (mainLink) {
        const clonedLink = document.createElement('a');
        clonedLink.href = mainLink.getAttribute('href');
        const linkText = mainLink.querySelector('.avia-menu-text') ? mainLink.querySelector('.avia-menu-text').textContent : mainLink.textContent;
        clonedLink.textContent = linkText.trim();
        clone.appendChild(clonedLink);
      }

      navList.appendChild(clone);
    });

    mobileDrawer.appendChild(navList);

    // Add WhatsApp Quick Action in Drawer
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mobile-menu-cta';
    ctaContainer.innerHTML = `
      <a href="https://api.whatsapp.com/send?phone=5491136015505&text=Hola!%20Quisiera%20hacer%20una%20consulta." target="_blank" rel="noopener noreferrer" class="mobile-btn-whatsapp">
        <span>💬</span> Contactar por WhatsApp
      </a>
    `;
    mobileDrawer.appendChild(ctaContainer);

    // Create backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';

    const wrapAll = document.querySelector('#wrap_all') || document.body;
    wrapAll.appendChild(backdrop);
    wrapAll.appendChild(mobileDrawer);

    // Close when clicking backdrop
    backdrop.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });

    // Close when clicking any nav link inside drawer (except accordion toggle)
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isOpen = document.body.classList.contains('av-mobile-menu-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    document.body.classList.add('av-mobile-menu-active');
    burgerMenu.classList.add('is-active');
    if (mainNav) mainNav.classList.add('av-open-mobile-menu');
  }

  function closeMenu() {
    document.body.classList.remove('av-mobile-menu-active');
    burgerMenu.classList.remove('is-active');
    if (mainNav) mainNav.classList.remove('av-open-mobile-menu');
  }

  burgerMenu.addEventListener('click', toggleMenu);

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('av-mobile-menu-active')) {
      closeMenu();
    }
  });

  // Close on window resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 990 && document.body.classList.contains('av-mobile-menu-active')) {
      closeMenu();
    }
  });
}

function initTextRotators() {
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
}

function initSmoothScroll() {
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
}

function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (form.id === 'searchform') return;
      e.preventDefault();
      let responseDiv = form.querySelector('.wpcf7-response-output');
      if (!responseDiv) {
        responseDiv = document.createElement('div');
        responseDiv.className = 'wpcf7-response-output';
        form.appendChild(responseDiv);
      }
      responseDiv.style.display = 'block';
      responseDiv.style.color = '#398f14';
      responseDiv.style.padding = '12px 16px';
      responseDiv.style.marginTop = '15px';
      responseDiv.style.border = '1px solid #398f14';
      responseDiv.style.borderRadius = '4px';
      responseDiv.style.backgroundColor = '#f2f9f0';
      responseDiv.style.fontWeight = '600';
      responseDiv.style.textAlign = 'center';
      responseDiv.innerHTML = '✓ Gracias por tu mensaje. Ha sido enviado correctamente.';
    });
  });
}
