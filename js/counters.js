// Counter animation functionality
export function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  // Keep track of observed elements to prevent multiple observations
  const observedElements = new Set();
  
  // Format number with commas for better readability
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observedElements.has(entry.target)) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        
        // Mark this element as observed
        observedElements.add(counter);
        
        // Reset counter
        counter.innerText = '0';
        
        // Animation parameters
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCount = (timestamp) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Use easeOutCubic easing function for smoother animation
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOutCubic * target);
          
          counter.innerText = formatNumber(current);
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = formatNumber(target);
          }
        };
        
        requestAnimationFrame(updateCount);
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}