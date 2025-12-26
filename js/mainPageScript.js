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
});
