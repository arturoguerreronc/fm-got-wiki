// NAVIGATION - Active Link Highlighting
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav ul li');
  
  navLinks.forEach(li => {
    const link = li.querySelector('a');
    const href = link.getAttribute('href');
    
    // Remove active class from all
    li.classList.remove('active');
    
    // Add active class to current page
    if (currentPath.includes(href) || 
        (currentPath === '/' && href.includes('index.html'))) {
      li.classList.add('active');
    }
  });
}

// ROTATING QUOTES
const quotes = [
  {
    text: "When you play the game of thrones, you win or you die. There is no middle ground.",
    author: "Cersei Lannister"
  },
  {
    text: "A Lannister always pays his debts.",
    author: "Tyrion Lannister"
  },
  {
    text: "Winter is coming.",
    author: "House Stark"
  },
  {
    text: "The night is dark and full of terrors.",
    author: "Melisandre"
  },
  {
    text: "Chaos isn't a pit. Chaos is a ladder.",
    author: "Petyr Baelish"
  },
  {
    text: "A mind needs books like a sword needs a whetstone.",
    author: "Tyrion Lannister"
  },
  {
    text: "The man who passes the sentence should swing the sword.",
    author: "Ned Stark"
  },
  {
    text: "I drink and I know things.",
    author: "Tyrion Lannister"
  },
  {
    text: "Nothing isn't better or worse than anything. Nothing is just nothing.",
    author: "Arya Stark"
  },
  {
    text: "Dracarys.",
    author: "Daenerys Targaryen"
  },
  {
    text: "The things I do for love.",
    author: "Jaime Lannister"
  },
  {
    text: "Valar Morghulis.",
    author: "Jaqen H'ghar"
  }
];

let currentQuoteIndex = 0;

function rotateQuotes() {
  const quoteElement = document.getElementById('rotating-quote');
  if (!quoteElement) return;
  
  const quoteText = quoteElement.querySelector('.quote-text');
  const quoteAuthor = quoteElement.querySelector('.quote-author');
  
  if (!quoteText || !quoteAuthor) return;
  
  // Fade out
  quoteElement.style.opacity = '0';
  
  setTimeout(() => {
    // Change quote
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteText.textContent = `"${quotes[currentQuoteIndex].text}"`;
    quoteAuthor.textContent = `— ${quotes[currentQuoteIndex].author}`;
    
    // Fade in
    quoteElement.style.opacity = '1';
  }, 500);
}

function initRotatingQuotes() {
  const quoteElement = document.getElementById('rotating-quote');
  if (!quoteElement) return;
  
  const quoteText = quoteElement.querySelector('.quote-text');
  const quoteAuthor = quoteElement.querySelector('.quote-author');
  
  // Set initial quote
  quoteText.textContent = `"${quotes[0].text}"`;
  quoteAuthor.textContent = `— ${quotes[0].author}`;
  
  // Rotate every 6 seconds
  setInterval(rotateQuotes, 6000);
}

// SMOOTH SCROLLING

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// MEDIA CONTROLS - Audio/Video Enhancement
function enhanceMediaControls() {
  const audioElements = document.querySelectorAll('audio');
  const videoElements = document.querySelectorAll('video');
  
  // Style native controls with CSS variables
  [...audioElements, ...videoElements].forEach(media => {
    // Add themed class
    media.classList.add('got-media-control');
    
    // Pause other media when one starts playing
    media.addEventListener('play', function() {
      [...audioElements, ...videoElements].forEach(otherMedia => {
        if (otherMedia !== media) {
          otherMedia.pause();
        }
      });
    });
    
    // Add playing state for styling
    media.addEventListener('play', function() {
      this.classList.add('is-playing');
    });
    
    media.addEventListener('pause', function() {
      this.classList.remove('is-playing');
    });
    
    media.addEventListener('ended', function() {
      this.classList.remove('is-playing');
    });
  });
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate
  document.querySelectorAll('.featured-item, .quote-section, .media-section').forEach(el => {
    observer.observe(el);
  });
}


// RESPONSIVE NAVIGATION WITH SMOOTH HEADER HIDE/SHOW
function initMobileMenu() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 10) {
          header.classList.add('scrolled-down');
        } else {
          header.classList.remove('scrolled-down');
        }
        
        // Hide/show header
        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down
          header.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
      });
      
      ticking = true;
    }
  });
}


// LAZY LOADING IMAGES
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}


// ERROR HANDLING FOR MEDIA
function handleMediaErrors() {
  const mediaElements = document.querySelectorAll('audio, video');
  
  mediaElements.forEach(media => {
    media.addEventListener('error', function() {
      console.error(`Failed to load ${media.tagName}: ${media.src}`);
      
      // Show user-friendly message
      const errorMsg = document.createElement('p');
      errorMsg.className = 'media-error';
      errorMsg.textContent = `Unable to load ${media.tagName.toLowerCase()}. Please check your connection.`;
      media.parentElement.appendChild(errorMsg);
    });
  });
}


// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  initSmoothScroll();
  enhanceMediaControls();
  initScrollAnimations();
  initMobileMenu();
  initLazyLoading();
  handleMediaErrors();
  initRotatingQuotes();
  
  console.log('Game of Thrones Wiki initialized 👑');
});

// EXPORT FUNCTIONS (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setActiveNavLink,
    initSmoothScroll,
    enhanceMediaControls
  };
}