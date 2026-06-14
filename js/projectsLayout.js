// ─── Google Sheets config ────────────────────────────────────────────────────
const SPREADSHEET_ID = '1IJgDgpNu5zkGr5vN_HxWJ3Gs13S5jXM4v69QJ27HE1s';
const API_KEY        = 'AIzaSyAbJAsD9OixpXaikp411pSyRPdJV8Ie5a0';
const RANGE          = 'Sheet1!A:B';
const POLL_INTERVAL  = 5000;
// ─────────────────────────────────────────────────────────────────────────────

let currentFeaturedId = null;
let projectNodes      = [];
let layoutWrapper     = null;
let featuredWrapper   = null;
let gridWrapper       = null;

document.addEventListener('DOMContentLoaded', () => {
  const projectsTab = document.getElementById('projects');
  if (!projectsTab) return;

  projectNodes = Array.from(projectsTab.querySelectorAll('.project'));

  const initialFeatured = projectNodes.find(p => p.hasAttribute('data-featured'));
  if (initialFeatured) currentFeaturedId = initialFeatured.id;

  // Build layout DOM once — never destroy it
  layoutWrapper  = document.createElement('div');
  layoutWrapper.className = 'projects-layout';

  featuredWrapper = document.createElement('div');
  featuredWrapper.className = 'project-featured';

  gridWrapper = document.createElement('div');
  gridWrapper.className = 'projects-grid';

  layoutWrapper.appendChild(featuredWrapper);
  layoutWrapper.appendChild(gridWrapper);
  projectsTab.appendChild(layoutWrapper);

  buildLayout();
  pollSheet();
  setInterval(pollSheet, POLL_INTERVAL);
});


async function pollSheet() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn('Sheets API error:', res.status, await res.text());
      return;
    }

    const data = await res.json();
    const rows = data.values || [];

    // Skip header row, find whichever row has TRUE in column B
    let newFeaturedId = null;
    rows.slice(1).forEach(row => {
      const id       = (row[0] || '').trim();
      const featured = (row[1] || '').trim().toUpperCase();
      if (featured === 'TRUE') newFeaturedId = id;
    });

    if (!newFeaturedId) return;
    if (newFeaturedId === currentFeaturedId) return;

    const next = projectNodes.find(p => p.id === newFeaturedId);
    if (!next) return;

    projectNodes.forEach(p => p.removeAttribute('data-featured'));
    next.setAttribute('data-featured', '');
    currentFeaturedId = newFeaturedId;
    buildLayout();

  } catch (err) {
    console.warn('Sheet poll failed:', err);
  }
}


function buildLayout() {
  const featured = projectNodes.find(p => p.hasAttribute('data-featured'));
  const rest     = projectNodes.filter(p => !p.hasAttribute('data-featured'));

  if (!featured) return;

  featuredWrapper.innerHTML = '';
  featuredWrapper.appendChild(featured);

  if (featured.querySelector('.twitch-demo, [class*="demo"]')) {
    featuredWrapper.classList.add('has-demo');
  } else {
    featuredWrapper.classList.remove('has-demo');
  }

  gridWrapper.innerHTML = '';
  rest.forEach(p => gridWrapper.appendChild(p));
  gridWrapper.style.display = rest.length > 0 ? '' : 'none';
}
