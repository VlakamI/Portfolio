import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

// PORTFOLIO DATA
const portfolioData = {
  name: "Vladislav Kamianets",
  role: "Systems & AI Engineer",
  skills: {
    languages: ["Rust", "C++", "C# / .NET", "Java", "Python", "SQL"],
    systems: ["AI & Machine Learning", "CUDA Parallel Computing", "Control Systems", "Graph Algorithms"],
    tools: ["Git", "NoSQL", "HTML/CSS (Familiar)"]
  },
  featured: [
    {
      title: "3D Physics Engine & Rocket Guidance Simulator",
      desc: "An operational 3D rigid-body simulation framework built from scratch in Rust. Implements high-precision Runge-Kutta 4th Order (RK4) numerical integration and Quaternion mathematics for complex spatial orientations. Developed a custom control loop inside the environment to simulate autonomous lunar rocket takeoff and guidance optimization. (Awarded 77% First-Class mark for codebase).",
      image: "/phys-sim-thumbnail.png",
      tags: ["Rust", "3D Math","RK4 Integration", "Quaternions", "Control Systems"]
    },
    {
      title: "Autonomous AI Agent Module (GPU-Accelerated)",
      desc: "Developed an intelligent decision-making system utilizing predictive modeling and search algorithms. Voluntarily architected a parallelized, GPU-accelerated variant to drastically improve matrix processing throughput and training efficiency. (Achieved a 68% module grade).",
      image: "/ai-thumbnail.png",
      tags: ["AI", "Algorithms", "GPU Acceleration", "Parallel Computing", "Python"]
    },
    {
      title: "GreenRoute: CO2-Optimized Pathfinding Engine",
      desc: "Engineered a specialized routing algorithm using OpenStreetMap (OSM) spatial data to calculate paths based on minimal carbon footprint and compare the path to generated fastest and shortest A* routes. Developed a custom graph traversal weight system accounting for emissions variables and delivered a functional web output within a strict 48-hour hackathon timeline.",
      image: "/eco-routing-thumbnail.png",
      tags: ["Graph Algorithms", "OSM Data", "Spatial Data", "Rapid Prototyping"]
    }
  ],
  allProjects: []
};

// CORE RENDERING ENGINE
const app = document.querySelector('#app');

function renderLayout() {
  // Map Skills to HTML
  const skillsHTML = Object.entries(portfolioData.skills)
    .map(([category, skillList]) => `
      <div class="skills-category-group">
        <h3 class="category-subtitle">${category.toUpperCase()}</h3>
        <div class="skills-grid">
          ${skillList.map(skill => `<div class="skill-card">${skill}</div>`).join('')}
        </div>
      </div>
    `).join('');

  // Map Featured Projects to HTML
  const featuredHTML = portfolioData.featured
    .map(proj => {
      let mediaHTML = '';
      
      if (proj.video) {
        mediaHTML = `<video src="${proj.video}" autoplay loop muted playsinline class="project-media"></video>`;
      } else if (proj.image) {
        mediaHTML = `<img src="${proj.image}" alt="${proj.title}" class="project-media" />`;
      } else {
        mediaHTML = `<div class="project-img-placeholder">Code Blueprint</div>`;
      }

      return `
        <div class="featured-card">
          <div class="project-media-wrapper">
            ${mediaHTML}
          </div>
          <div class="project-info">
            <h3>${proj.title}</h3>
            <p>${proj.desc}</p>
            <div class="tags">${proj.tags.map(t => `<span>${t}</span>`).join('')}</div>
          </div>
        </div>
      `;
    }).join('');

  // Inject Master Template
  app.innerHTML = `
    <nav class="navbar">
      <div class="logo">./VK/root</div>
      <ul class="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#featured">Featured</a></li>
        <li><a href="#projects">All Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <header id="hero" class="hero-section">
      <div class="hero-content">
        <h1>Hi, I'm <span class="highlight">${portfolioData.name}</span></h1>
        <p>A ${portfolioData.role} crafting stable, efficient software solutions.</p>
        <a href="#featured" class="btn-primary">View My Work</a>
      </div>
    </header>

    <section id="skills" class="skills-section">
      <h2 class="section-title">My Toolbox</h2>
      <div class="skills-grid">${skillsHTML}</div>
    </section>

    <section id="featured" class="featured-section">
      <h2 class="section-title">Featured Work</h2>
      <div class="featured-grid">${featuredHTML}</div>
    </section>
  `;

  // Initialize interactive components after elements exist in the DOM
  initSearchComponent();
}

// INTERACTIVE LOGIC (SEARCH)
function initSearchComponent() {
  const searchInput = document.querySelector('#project-search');
  const container = document.querySelector('#projects-container');

  // Safeguard: If the HTML sections are commented out, stop here so the script doesn't crash.
  if (!searchInput || !container) return;

  function displaySearchableProjects(projects) {
    container.innerHTML = "";
    
    if (projects.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matching projects found.</p>`;
      return;
    }

    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('featured-card');
      card.innerHTML = `
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
          <div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Live input listening event
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = portfolioData.allProjects.filter(project => {
      return (
        project.title.toLowerCase().includes(searchTerm) ||
        project.desc.toLowerCase().includes(searchTerm) ||
        project.tags.some(t => t.toLowerCase().includes(searchTerm))
      );
    });
    displaySearchableProjects(filtered);
  });

  // Run the initial setup pass for the dynamic showcase grid
  displaySearchableProjects(portfolioData.allProjects);
}

// Kick off the site compilation
renderLayout();