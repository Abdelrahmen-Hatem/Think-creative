// Main JavaScript file
import { initCounters } from './counters.js';

// Sticky header functionality
const header = document.querySelector('.site-header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;
  
  // Add/remove shrink class based on scroll position
  if (currentScrollPosition > 80) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
  
  // Hide/show header on scroll direction (optional enhancement)
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollPosition = currentScrollPosition;
});

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu');
  const mainNav = document.querySelector('.main-nav');
  const menuIcon = mobileMenuButton.querySelector('span');
  
  mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mainNav.style.display = isExpanded ? 'none' : 'block';
    menuIcon.textContent = isExpanded ? '☰' : '✕';
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mainNav.style.display = 'none';
        menuIcon.textContent = '☰';
      }
    });
  });
  
  // Video modal functionality
  const videoModal = document.getElementById('videoModal');
  const videoPlayButtons = document.querySelectorAll('.video-play');
  const closeModalButton = document.querySelector('.modal .close');
  
  // Function to open modal
  const openModal = () => {
    videoModal.style.display = 'block';
    videoModal.setAttribute('aria-hidden', 'false');
    
    // Insert video content (this would be replaced with actual video embed)
    const videoWrapper = videoModal.querySelector('.video-wrapper');
    videoWrapper.innerHTML = `
      <iframe 
        width="100%" 
        height="500" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  };
  
  // Function to close modal
  const closeModal = () => {
    videoModal.style.display = 'none';
    videoModal.setAttribute('aria-hidden', 'true');
    
    // Clear video content
    const videoWrapper = videoModal.querySelector('.video-wrapper');
    videoWrapper.innerHTML = '';
  };
  
  // Event listeners for video modal
  videoPlayButtons.forEach(button => {
    button.addEventListener('click', openModal);
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });
  
  // Close modal events
  closeModalButton.addEventListener('click', closeModal);
  closeModalButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeModal();
    }
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
      closeModal();
    }
  });
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      
      try {
        // Send form data to Formspree using fetch API
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
        } else {
          // Show error message
          const data = await response.json();
          if (data.errors) {
            alert('Error: ' + data.errors.map(error => error.message).join(', '));
          } else {
            alert('Oops! There was a problem submitting your form. Please try again.');
          }
        }
      } catch (error) {
        // Show error message if fetch fails
        alert('Oops! There was a problem submitting your form. Please try again.');
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
});