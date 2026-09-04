document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Menu Implementation
  initMobileMenu();

  // 2. Text Rotators for Hero Banner and Section Rotators
  initTextRotators();

  // 3. Smooth Scroll for Hero Down Arrow
  initSmoothScroll();

  // 4. Form Submission Simulation
  initForms();

  // 5. Floating WhatsApp Button
  initFloatingWhatsApp();
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

function initFloatingWhatsApp() {
  if (document.querySelector('.seres-floating-whatsapp')) return;

  const btn = document.createElement('a');
  btn.className = 'seres-floating-whatsapp';
  btn.href = 'https://wa.link/a847bh';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Contactar por WhatsApp');
  btn.setAttribute('title', '¡Hola! Escribinos por WhatsApp');

  btn.innerHTML = `
    <span class="whatsapp-tooltip">¿En qué te podemos ayudar?</span>
    <div class="whatsapp-icon-wrapper">
      <svg viewBox="0 0 32 32" width="34" height="34" fill="currentColor">
        <path d="M16.002 0C7.164 0 0 7.163 0 16c0 2.825.738 5.488 2.025 7.788L.069 31.25a.8.8 0 00.988.981l7.637-1.994A15.93 15.93 0 0016.002 32C24.837 32 32 24.837 32 16S24.837 0 16.002 0zm0 29.333c-2.488 0-4.837-.675-6.863-1.85a.8.8 0 00-.587-.088l-5.612 1.463 1.487-5.463a.8.8 0 00-.087-.637A13.238 13.238 0 012.667 16C2.667 8.644 8.644 2.667 16.002 2.667 23.356 2.667 29.333 8.644 29.333 16c0 7.356-5.977 13.333-13.331 13.333zm7.65-9.875c-.412-.213-2.462-1.213-2.837-1.35-.375-.138-.65-.213-.925.213-.275.412-1.063 1.35-1.3 1.625-.238.275-.475.313-.888.1a11.168 11.168 0 01-3.287-2.025 12.308 12.308 0 01-2.275-2.838c-.238-.412-.025-.637.175-.85.187-.188.412-.488.625-.725.212-.238.275-.413.412-.688.138-.275.063-.525-.037-.725s-.925-2.238-1.275-3.063c-.338-.8-.688-.688-.938-.7-.237-.012-.512-.012-.787-.012s-.725.1-1.1.512c-.375.413-1.438 1.4-1.438 3.413 0 2.012 1.463 3.962 1.675 4.237.213.275 2.875 4.4 6.975 6.163.975.425 1.738.675 2.338.863 1.013.325 1.938.275 2.663.175.812-.113 2.462-1.012 2.812-1.987.35-.975.35-1.813.25-1.988-.1-.175-.375-.275-.788-.475z"/>
      </svg>
    </div>
    <span class="whatsapp-pulse"></span>
  `;

  document.body.appendChild(btn);
}
