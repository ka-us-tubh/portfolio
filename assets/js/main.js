/* =============================================
   BENTO PORTFOLIO — main.js
   ============================================= */

// ── AOS (scroll animations) ──────────────────
AOS.init({
  offset: 80,
  delay: 0,
  duration: 600,
  easing: 'ease-out-cubic',
  once: true,
  mirror: false,
});

// ── Theme toggle ─────────────────────────────
const themeToggle     = document.getElementById('theme-toggle');
const mobileThemeBtn  = document.getElementById('mobile-theme-toggle');
const topbarThemeBtn  = document.getElementById('mobile-topbar-theme');
const themeTexts      = document.querySelectorAll('.sidebar-theme-text');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
  themeTexts.forEach((el) => {
    el.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  });
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  themeToggle?.setAttribute('aria-label', label);
  mobileThemeBtn?.setAttribute('aria-label', label);
  topbarThemeBtn?.setAttribute('aria-label', label);
}

setTheme(document.documentElement.dataset.theme || 'light');

themeToggle?.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

mobileThemeBtn?.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

topbarThemeBtn?.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

// ── Mobile drawer ─────────────────────────────
const hamburger  = document.getElementById('nav-hamburger');
const mobileNav  = document.getElementById('nav-mobile');

function openMobileNav() {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
});

// Close on backdrop click (outside the inner panel)
mobileNav?.addEventListener('click', (e) => {
  if (!e.target.closest('.mobile-drawer-inner')) closeMobileNav();
});

window.closeMobileNav = closeMobileNav;

// ── Active nav link on scroll ─────────────────
const sections      = document.querySelectorAll('section[id]');
const sidebarLinks  = document.querySelectorAll('.sidebar-link');
const topbarLinks   = document.querySelectorAll('.mobile-topbar-links a');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  let current = '';

  sections.forEach((sec) => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });

  sidebarLinks.forEach((a) => {
    a.classList.toggle('active', a.dataset.section === current);
  });

  topbarLinks.forEach((a) => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ── Sidebar shadow on scroll ──────────────────
const sidebar = document.querySelector('.sidebar');

function updateSidebar() {
  sidebar?.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateSidebar, { passive: true });

// ── Retro CRT — taskbar clock ─────────────────
const clockEl = document.getElementById('taskbar-clock');

function updateClock() {
  if (!clockEl) return;
  clockEl.textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
updateClock();
setInterval(updateClock, 1000);

// ── CRT — terminal window ─────────────────────
const terminalOutput  = document.getElementById('terminal-output');
const terminalCommand = document.getElementById('terminal-command');
const terminalWindow  = document.querySelector('.terminal-window');

const devInfo = {
  name:       'Kaustubh Gupta',
  role:       'AI Engineer @ TCS BFSI R&I',
  email:      'kaustubhg10@gmail.com',
  portfolio:  'ka-us-tubh.github.io/portfolio',
  skills: [
    'Python', 'FastAPI', 'TensorFlow', 'PyTorch',
    'LangChain', 'LangGraph', 'Hugging Face', 'RAG',
    'Qiskit', 'ReactJS', 'Docker', 'MySQL',
  ],
  experience: [
    'AI Engineer — TCS BFSI R&I (April 2025 – Current)',
    'Data Analytics Intern — Edunet-IBM Skill Build (Aug 2023)',
    'Python Intern — IIPC-KIET (Aug 2021)',
  ],
  projects: [
    'Moon_Lander — DQN-RL lunar agent',
    'Quantum Edge Detection — QHED algorithm',
    'TwinTower-RecSys — dual-encoder recommendation system',
    'AutoPIPE — LinkedIn scraper + AI marketing pipeline',
    'Tooth Finder — dental X-ray classifier',
    'Portal Valley — top-down JS game',
  ],
};

const commands = {
  help: () =>
    'Commands: <span style="color:#ffd23f">help · info · skill · experience · project · ls · date · clear · echo &lt;msg&gt;</span>',
  info: () =>
    `Name: ${devInfo.name}<br>Role: ${devInfo.role}<br>Email: ${devInfo.email}`,
  skill: () =>
    `Skills:<br>${devInfo.skills.map((s) => `  · ${s}`).join('<br>')}`,
  experience: () =>
    `Experience:<br>${devInfo.experience.map((e) => `  · ${e}`).join('<br>')}`,
  project: () =>
    `Projects:<br>${devInfo.projects.map((p) => `  · ${p}`).join('<br>')}`,
  ls: () =>
    'resume.pdf &nbsp; project_list.html &nbsp; Documents &nbsp; Downloads',
  date: () => new Date().toString(),
};

function printLine(html, isCommand = false) {
  if (!terminalOutput) return;
  const line = document.createElement('div');
  line.style.lineHeight = '1.6';
  if (isCommand) line.style.opacity = '0.7';
  line.innerHTML = html;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalCommand?.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const raw = terminalCommand.value.trim();
  const cmd = raw.toLowerCase();
  terminalCommand.value = '';

  if (!raw) return;

  printLine(`<span style="color:rgba(255,255,255,0.4)">$</span> ${raw}`, true);

  if (cmd === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }

  if (commands[cmd]) {
    printLine(commands[cmd]());
    return;
  }

  if (cmd.startsWith('echo ')) {
    printLine(raw.slice(5));
    return;
  }

  printLine(`<span style="color:#ff6b6b">command not found: ${raw}</span>`);
});

// ── CRT — window management ───────────────────
function toggleTerminal() {
  if (!terminalWindow) return;
  const visible = terminalWindow.style.display === 'block';
  terminalWindow.style.display = visible ? 'none' : 'block';
  if (!visible) terminalCommand?.focus();
}

function toggleWindow(id) {
  const win = document.getElementById(`${id}-window`);
  if (!win) return;
  win.style.display = win.style.display === 'block' ? 'none' : 'block';
}

function closeWindow(id) {
  const win = document.getElementById(`${id}-window`);
  if (win) win.style.display = 'none';
}

function maximizeWindow(id) {
  const win = document.getElementById(`${id}-window`);
  if (!win) return;
  const isMax = win.dataset.maximized === 'true';
  if (isMax) {
    win.style.width     = '80%';
    win.style.height    = '60%';
    win.style.top       = '50%';
    win.style.left      = '50%';
    win.style.transform = 'translate(-50%, -50%)';
    win.dataset.maximized = 'false';
  } else {
    win.style.width     = '100%';
    win.style.height    = '100%';
    win.style.top       = '0';
    win.style.left      = '0';
    win.style.transform = 'none';
    win.dataset.maximized = 'true';
  }
}

// Expose CRT helpers to inline onclick handlers
window.toggleTerminal = toggleTerminal;
window.toggleWindow   = toggleWindow;
window.closeWindow    = closeWindow;
window.maximizeWindow = maximizeWindow;

// ── Desktop icon keyboard support ────────────
document.querySelectorAll('.desktop-icon').forEach((icon) => {
  icon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      icon.click();
    }
  });
});

// ── Projects: Isometric Tower Controller ──────
const towerFloors = document.querySelectorAll('.scd-floor');
const towerCards  = document.querySelectorAll('.tower-cards-list .project-card');

function selectProjectFloor(index) {
  // Toggle active floor
  towerFloors.forEach((floor) => {
    const isTarget = floor.dataset.projectIndex === String(index);
    floor.classList.toggle('is-active', isTarget);
    floor.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // Activate matching project card
  towerCards.forEach((card) => {
    const isTarget = card.dataset.projectCard === String(index);
    card.classList.toggle('is-active', isTarget);
  });
}

// Attach floor click and keyboard listeners (only cards are clickable)
towerFloors.forEach((floor) => {
  floor.addEventListener('click', (e) => {
    // Labels are non-clickable readouts; only the card body is clickable
    if (e.target.closest('.floor-callout')) {
      return;
    }
    const idx = floor.dataset.projectIndex;
    if (idx !== undefined) {
      selectProjectFloor(idx);
    }
  });

  floor.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const idx = floor.dataset.projectIndex;
      if (idx !== undefined) {
        selectProjectFloor(idx);
      }
    }
  });
});

