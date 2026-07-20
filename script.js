/* ==========================================================================
   ADATRO Computer Basics — script.js
   Vanilla JavaScript only. Sections:
   1. Module data + render   2. Navbar scroll effect   3. Mobile menu
   4. Accordion (FAQ)        5. Scroll reveal animations
   6. Back to top button     7. Smooth scroll for in-page links
   8. Footer year
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Course curriculum data + render ---------- */
  const modules = [
    { title: 'Introduction to Computers', desc: 'What a computer is, its main parts, and how it helps you every day.' },
    { title: 'Computer Hardware', desc: 'Explore the physical components: CPU, monitor, keyboard, mouse, and storage.' },
    { title: 'Software', desc: 'Understand the difference between operating systems and applications.' },
    { title: 'Windows Basics', desc: 'Navigate the desktop, taskbar, start menu, and system settings with ease.' },
    { title: 'Typing Skills', desc: 'Build speed and accuracy with proper finger placement and daily practice.' },
    { title: 'Files & Folders', desc: 'Create, rename, move, and organize your files like a pro.' },
    { title: 'Internet', desc: 'Browse safely, search effectively, and understand how the web works.' },
    { title: 'Email', desc: 'Send, reply, attach files, and manage your inbox professionally.' },
    { title: 'Microsoft Word', desc: 'Write, format, and design documents for school or work.' },
    { title: 'Excel', desc: 'Build spreadsheets, use simple formulas, and organize data.' },
    { title: 'PowerPoint', desc: 'Design clear, engaging slide presentations from scratch.' },
    { title: 'Google Drive', desc: 'Store, share, and collaborate on files from the cloud.' },
    { title: 'Computer Security', desc: 'Protect yourself from scams, viruses, and unsafe websites.' },
    { title: 'Final Project', desc: 'Apply everything you\'ve learned in one complete, real-world project.' },
  ];

  const moduleGrid = document.getElementById('moduleGrid');
  if (moduleGrid) {
    const fragment = document.createDocumentFragment();
    modules.forEach((mod, index) => {
      const card = document.createElement('div');
      card.className = 'module-card reveal';
      const num = String(index + 1).padStart(2, '0');
      card.innerHTML = `
        <span class="module-number">Module ${num}</span>
        <h3>${mod.title}</h3>
        <p>${mod.desc}</p>
      `;
      fragment.appendChild(card);
    });
    moduleGrid.appendChild(fragment);
  }

  /* ---------- 2. Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------- 3. Mobile menu toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMobileMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- 4. Accordion (FAQ) ---------- */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items (single-open accordion)
      accordionItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.accordion-panel').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- 5. Scroll reveal animations (IntersectionObserver) ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- 6. Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 7. Smooth scroll for in-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = 90;
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- 8. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
      
