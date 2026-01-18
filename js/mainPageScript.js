const tabButtons = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;

    // Remove active states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabSections.forEach(section => section.classList.remove('active'));

    // Activate selected
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });

  document.querySelectorAll('.mobile-offset-link').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        const id = this.getAttribute('href').substring(1);
        const target = document.getElementById(id);
        if (!target) return;

        const nav = document.querySelector('nav');
        const offset = nav ? nav.offsetHeight : 0; // adjust as needed
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          offset + 20;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (window.innerWidth > 800) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        target.scrollIntoView({
          behavior: 'smooth',
          // block: 'start'
        });
      });
    }
  });
});
