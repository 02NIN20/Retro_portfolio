document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('contact-form');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  
  // Theme toggle
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }
  
  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? 'O' : '*';
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const nav = document.querySelector('.pixel-nav');
    if (nav) {
      if (scrolled > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-3px)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos');
      return;
    }

    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span class="btn-icon">...</span> ENVIANDO...';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      alert('¡Mensaje enviado! (Demo)');
      submitBtn.innerHTML = '<span class="btn-icon">✓</span> ENVIADO';
      submitBtn.style.background = 'var(--green-console)';
      submitBtn.style.color = 'var(--bg)';

      setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-icon">▲</span> ENVIAR MENSAJE';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.style.opacity = '1';
        contactForm.reset();
      }, 2000);
    }, 1500);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      const sectionsArray = Array.from(sections);
      const currentSection = sectionsArray.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });
      
      if (currentSection) {
        const nextSection = sectionsArray[sectionsArray.indexOf(currentSection) + 1];
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});