
  const featuredImg = document.getElementById('featuredImg');
  const arrowLeft = document.getElementById('arrowLeft');
  const arrowRight = document.getElementById('arrowRight');
const slides = [
  { src: 'images/IMG_0115.JPG', label: 'Indiv. class' },
  { src: 'images/groupclasses.jpg', label: 'Group class' },
  { src: 'images/onlinesession.jpg', label: 'Online session' },
  { src: 'images/bootcamp.jpg', label: 'Bootcamp' }
];

let current = 0;
const imageEl = document.getElementById('featuredImg');
const labelText = document.getElementById('labelText');

function updateSlide() {
  imageEl.classList.add('fade');
  labelText.classList.add('fade');

  // Wait for fade-out to complete before changing src
  setTimeout(() => {
    // only after fade-out
    imageEl.src = slides[current].src;
    labelText.textContent = slides[current].label;

    // Force layout reflow (may help ensure browser sees the change)
    void imageEl.offsetHeight;

    imageEl.classList.remove('fade');
    labelText.classList.remove('fade');

    updateDots();
  }, 300); // match transition time exactly
}


// Add event listeners for arrows
document.getElementById('arrowLeft').addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent button default if needed
  current = (current - 1 + slides.length) % slides.length;
  updateSlide();
});

document.getElementById('arrowRight').addEventListener('click', (e) => {
  e.stopPropagation();
  current = (current + 1) % slides.length;
  updateSlide();
});

// Initial load
updateSlide();

let autoSlide = setInterval(() => {
  current = (current + 1) % slides.length;
  updateSlide();
}, 5000);

const featuredSection = document.querySelector('.featured');

featuredSection.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

featuredSection.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    current = (current + 1) % slides.length;
    updateSlide();
  }, 5000);
});

let touchStartX = 0;

featuredSection.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX; // store where the finger started
});

featuredSection.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > 50) { // if it's a big swipe
    if (swipeDistance > 0) {
      current = (current - 1 + slides.length) % slides.length; // swipe right = go back
    } else {
      current = (current + 1) % slides.length; // swipe left = next
    }
    updateSlide()
  }
});

const dotsContainer = document.getElementById('dotsContainer');

// Create one dot per slide
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

// Update which dot is active
function updateDots() {
  const allDots = dotsContainer.querySelectorAll('span');
  allDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === current);
  });
}










function toggleMenu() {
  document.querySelector('.menu').classList.toggle('active');
}




const consultBtn = document.getElementById("stickyConsultBtn");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > nav.offsetHeight + 100) {
    consultBtn.classList.add("sticky");
  } else {
    consultBtn.classList.remove("sticky");
  }
});


document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');

    document.querySelectorAll('.faq-item').forEach((other) => {
      if (other !== item) {
        other.classList.remove('open');
        const otherAnswer = other.querySelector('.faq-answer');
        otherAnswer.style.maxHeight = null;
        otherAnswer.style.opacity = 0;
        otherAnswer.style.transform = "translateY(-10px)";
      }
    });

    if (item.classList.contains('open')) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
      answer.style.opacity = 0;
      answer.style.transform = "translateY(-10px)";
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = 1;
      answer.style.transform = "translateY(0)";
    }
  });
});
