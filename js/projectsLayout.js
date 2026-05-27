document.addEventListener('DOMContentLoaded', () => {
    const projectsTab = document.getElementById('projects');
    if (!projectsTab) return;

    const allProjects = Array.from(projectsTab.querySelectorAll('.project'));
    const featured = allProjects.find(p => p.hasAttribute('data-featured'));
    const rest = allProjects.filter(p => !p.hasAttribute('data-featured'));

    if (!featured) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'projects-layout';

    const featuredWrapper = document.createElement('div');
    featuredWrapper.className = 'project-featured';
    featuredWrapper.appendChild(featured);

    if (featured.querySelector('.twitch-demo, [class*="demo"]'))
    {
      featuredWrapper.classList.add('has-demo');
    }

    const grid = document.createElement('div');
    grid.className = 'projects-grid';
    rest.forEach(p => grid.appendChild(p));

    wrapper.appendChild(featuredWrapper);
    if (rest.length > 0) wrapper.appendChild(grid);

    const heading = projectsTab.querySelector('h2');
    projectsTab.innerHTML = '';
    if (heading) projectsTab.appendChild(heading);
    projectsTab.appendChild(wrapper);
});
