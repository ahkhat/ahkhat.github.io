/**
 * Asena Hazal Portfolio - Main JavaScript
 * Clean, readable code that runs locally
 */

// ============================================
// 1. UTILITY FUNCTIONS
// ============================================

/**
 * Smoothly show/hide an element
 */
function fadeIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.display = 'block';
  
  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.min(progress / duration, 1);
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = 1 - Math.min(progress / duration, 1);
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  }
  requestAnimationFrame(animate);
}

/**
 * Smooth scroll to target element
 */
function smoothScroll(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Debounce - Prevents function from being called too frequently
 */
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


// ============================================
// 2. NAVIGATION
// ============================================

class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navItems = document.querySelectorAll('.nav-menu-item');
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    // Listen to scroll events
    window.addEventListener('scroll', debounce(() => this.handleScroll(), 50));
    
    // Listen to nav menu clicks
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // Check on page load
    this.handleScroll();
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Show nav when scrolled more than 100px
    if (scrollY > 100 && !this.isVisible) {
      this.show();
    } else if (scrollY <= 100 && this.isVisible) {
      this.hide();
    }
  }
  
  show() {
    if (!this.nav) return;
    this.isVisible = true;
    this.nav.style.transform = 'translate3d(0, 0, 0)';
    this.nav.style.transition = 'transform 0.4s ease';
  }
  
  hide() {
    if (!this.nav) return;
    this.isVisible = false;
    this.nav.style.transform = 'translate3d(0, -150%, 0)';
  }
  
  handleNavClick(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      smoothScroll(href, 80);
    }
  }
}


// ============================================
// 3. LIGHTBOX (Image Gallery)
// ============================================

class Lightbox {
  constructor() {
    this.lightboxItems = document.querySelectorAll('[data-lightbox]');
    this.currentIndex = 0;
    this.images = [];
    this.overlay = null;
    
    this.init();
  }
  
  init() {
    // Collect lightbox elements
    this.lightboxItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        this.images.push({
          src: img.src,
          alt: img.alt || '',
          index: index
        });
        
        item.addEventListener('click', (e) => {
          e.preventDefault();
          this.open(index);
        });
      }
    });
  }
  
  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-container">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous">&larr;</button>
        <button class="lightbox-next" aria-label="Next">&rarr;</button>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Event listeners
    overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.overlay) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
    return overlay;
  }
  
  open(index) {
    this.currentIndex = index;
    
    if (!this.overlay) {
      this.overlay = this.createOverlay();
    }
    
    this.updateImage();
    this.overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      this.overlay.classList.add('active');
    }, 10);
  }
  
  close() {
    if (!this.overlay) return;
    
    this.overlay.classList.remove('active');
    setTimeout(() => {
      this.overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }
  
  updateImage() {
    if (!this.overlay) return;
    
    const image = this.images[this.currentIndex];
    const imgElement = this.overlay.querySelector('.lightbox-image');
    const captionElement = this.overlay.querySelector('.lightbox-caption');
    
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    captionElement.textContent = image.alt;
  }
}


// ============================================
// 4. FORM HANDLING
// ============================================

class FormHandler {
  constructor(formSelector = '.w-form form') {
    this.forms = document.querySelectorAll(formSelector);
    this.init();
  }
  
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('[type="submit"]');
    const successMsg = form.parentElement.querySelector('.w-form-done');
    const errorMsg = form.parentElement.querySelector('.w-form-fail');
    
    // Disable button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    
    try {
      // Form validation
      if (!this.validateForm(form)) {
        throw new Error('Please fill in all required fields');
      }
      
      // Send if form action URL exists
      const action = form.getAttribute('action');
      if (action) {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Form could not be sent');
        }
      }
      
      // Show success message
      this.showSuccess(form, successMsg);
      form.reset();
      
    } catch (error) {
      // Show error message
      this.showError(form, errorMsg, error.message);
    } finally {
      // Re-enable button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    }
  }
  
  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
      
      // Email validation
      if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          field.classList.add('error');
        }
      }
    });
    
    return isValid;
  }
  
  showSuccess(form, successMsg) {
    if (successMsg) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
      
      setTimeout(() => {
        form.style.display = 'block';
        successMsg.style.display = 'none';
      }, 5000);
    } else {
      alert('Form submitted successfully!');
    }
  }
  
  showError(form, errorMsg, message) {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = message;
      
      setTimeout(() => {
        errorMsg.style.display = 'none';
      }, 5000);
    } else {
      alert('Error: ' + message);
    }
  }
}


// ============================================
// 5. SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('[data-animate]');
    this.init();
  }
  
  init() {
    // Scroll animations with Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Don't trigger animation again once it happened
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    this.animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
}


// ============================================
// 6. SMOOTH PAGE LOAD
// ============================================

class PageLoader {
  constructor() {
    this.body = document.body;
    this.init();
  }
  
  init() {
    // Fade-in effect on page load
    window.addEventListener('load', () => {
      this.body.classList.add('loaded');
    });
    
    // Open external links in new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }
}


// ============================================
// 7. INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Asena Hazal Portfolio - Initializing...');
  
  // Initialize all modules
  new Navigation();
  new Lightbox();
  new FormHandler();
  new ScrollAnimations();
  new PageLoader();
  
  console.log('✅ Portfolio ready!');
});


// ============================================
// 8. EXPORT (For Development)
// ============================================

// Global access for debugging in browser
if (typeof window !== 'undefined') {
  window.Portfolio = {
    Navigation,
    Lightbox,
    FormHandler,
    ScrollAnimations,
    PageLoader,
    utils: {
      fadeIn,
      fadeOut,
      smoothScroll,
      debounce
    }
  };
}
