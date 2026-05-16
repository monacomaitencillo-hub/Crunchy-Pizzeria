// Navbar — add dark background on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Carousel
(function () {
  const track      = document.getElementById('carouselTrack');
  const btnPrev    = document.getElementById('carouselPrev');
  const btnNext    = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  const VISIBLE    = 4; // cards visible at once
  const cards      = Array.from(track.children);
  const total      = cards.length;
  const maxIndex   = total - VISIBLE;
  let current      = 0;

  // Build dots
  const numDots = maxIndex + 1;
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function getCardWidth() {
    const gap = 24; // 1.5rem = 24px
    return cards[0].getBoundingClientRect().width + gap;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === maxIndex;
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Init state
  goTo(0);

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current));
})();
