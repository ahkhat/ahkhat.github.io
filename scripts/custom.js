/**
 * Custom Extensions for Webflow Site
 * Clean, readable code that works alongside Webflow
 */

// Wait for Webflow to initialize
window.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 Custom scripts loaded');
  
  // Your custom functionality here
  initCustomFeatures();
});

/**
 * Initialize custom features
 */
function initCustomFeatures() {
  // Add smooth scroll behavior to all anchor links
  enhanceNavigation();
  
  // Add custom analytics
  setupAnalytics();
  
  // Add custom interactions
  setupCustomInteractions();
}

/**
 * Enhance navigation with additional features
 */
function enhanceNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu-item');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Log navigation for analytics
      console.log('Navigation clicked:', e.target.textContent);
      
      // Add custom behavior if needed
      // Webflow's scroll will still work
    });
  });
}

/**
 * Setup analytics tracking
 */
function setupAnalytics() {
  // Add Google Analytics or custom tracking
  console.log('📊 Analytics ready');
  
  // Track page views
  trackPageView();
  
  // Track button clicks
  trackButtons();
}

function trackPageView() {
  // Your analytics code here
  console.log('Page viewed:', window.location.pathname);
}

function trackButtons() {
  const buttons = document.querySelectorAll('.button');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      console.log('Button clicked:', buttonText);
      // Send to analytics service
    });
  });
}

/**
 * Setup custom interactions
 */
function setupCustomInteractions() {
  // Add easter eggs or special features
  console.log('✨ Custom interactions ready');
  
  // Example: Add a fun console message
  console.log('%c👋 Hey there! Thanks for checking out my portfolio!', 
    'font-size: 16px; color: #4ECDC4; font-weight: bold;');
}

/**
 * Utility: Smooth scroll (backup if Webflow fails)
 */
function smoothScrollTo(target, offset = 80) {
  const element = document.querySelector(target);
  if (!element) return;
  
  const targetPosition = element.offsetTop - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Export for console debugging
 */
window.CustomPortfolio = {
  smoothScrollTo,
  version: '1.0.0'
};

console.log('✅ Custom portfolio extensions loaded!');
