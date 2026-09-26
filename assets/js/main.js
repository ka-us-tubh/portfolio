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

// ── Projects: Isometric Tower & Vertical Stack Controller ──────
(function initIsometricTower() {
  const tower = document.getElementById('isometricTower');
  const towerWrapper = document.querySelector('.tower-wrapper');
  const towerStage = document.getElementById('projectsTowerStage');
  const towerFloors = Array.from(document.querySelectorAll('.scd-floor'));
  const towerPane = document.getElementById('towerProjectPane');
  const towerCardViewport = document.getElementById('towerCardViewport') || document.querySelector('.tower-card-viewport');
  const towerCardsList = document.getElementById('towerCardsList');
  const towerCards = Array.from(document.querySelectorAll('.tower-cards-list .project-card'));

  if (!towerFloors.length || !towerCards.length || !towerCardsList || !towerCardViewport) {
    return;
  }

  // Find initial active index from HTML or default to 0
  let selectedIndex = 0;
  const initialFloorIdx = towerFloors.findIndex((f) => f.classList.contains('is-active'));
  if (initialFloorIdx !== -1) {
    selectedIndex = initialFloorIdx;
  }

  let previewIndex = null;
  let revertTimeout = null;
  let isScrolling = false;
  let scrollCooldownTimer = null;

  // Cached positions to prevent layout thrashing during fast hover
  let cardMetrics = [];

  function measureCards() {
    cardMetrics = towerCards.map((card) => ({
      top: card.offsetTop,
      height: card.offsetHeight
    }));
  }

  function updateDisplay(targetIdx) {
    if (targetIdx < 0 || targetIdx >= towerCards.length) return;

    if (!cardMetrics.length || cardMetrics[0].height === 0) {
      measureCards();
    }

    const viewportHeight = towerCardViewport.clientHeight || 520;
    const metric = cardMetrics[targetIdx] || {
      top: towerCards[targetIdx].offsetTop,
      height: towerCards[targetIdx].offsetHeight
    };

    // Calculate center offset
    const cardCenter = metric.top + metric.height / 2;
    const viewportCenter = viewportHeight / 2;
    const translateY = Math.round(viewportCenter - cardCenter);

    towerCardsList.style.transform = `translateY(${translateY}px)`;

    // Update classes on cards
    towerCards.forEach((card, i) => {
      card.classList.remove('is-active', 'is-prev', 'is-next');
      if (i === targetIdx) {
        card.classList.add('is-active');
        card.setAttribute('aria-hidden', 'false');
      } else if (i === targetIdx - 1) {
        card.classList.add('is-prev');
        card.setAttribute('aria-hidden', 'true');
      } else if (i === targetIdx + 1) {
        card.classList.add('is-next');
        card.setAttribute('aria-hidden', 'true');
      } else {
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Update floor states
    towerFloors.forEach((floor, i) => {
      const isSelected = (i === selectedIndex);
      const isCurrentTarget = (i === targetIdx);
      const isPreview = (previewIndex !== null && i === previewIndex);

      floor.classList.toggle('is-selected', isSelected);
      floor.classList.toggle('is-preview', isPreview);
      floor.classList.toggle('is-active', isCurrentTarget);
      floor.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }

  function commitSelect(index) {
    selectedIndex = index;
    previewIndex = null;
    clearTimeout(revertTimeout);
    updateDisplay(index);
  }

  function previewFloor(index) {
    clearTimeout(revertTimeout);
    previewIndex = index;
    updateDisplay(index);
  }

  function scheduleRevert() {
    clearTimeout(revertTimeout);
    revertTimeout = setTimeout(() => {
      previewIndex = null;
      updateDisplay(selectedIndex);
    }, 180);
  }

  function cancelRevert() {
    clearTimeout(revertTimeout);
  }

  // 1. Hover & Click on floors
  towerFloors.forEach((floor) => {
    const idx = parseInt(floor.dataset.projectIndex, 10);
    if (isNaN(idx)) return;

    floor.addEventListener('mouseenter', () => {
      previewFloor(idx);
    });

    floor.addEventListener('click', () => {
      commitSelect(idx);
    });

    floor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        commitSelect(idx);
      }
    });
  });

  // When mouse leaves the tower container, revert to the clicked/selected card
  if (towerWrapper) {
    towerWrapper.addEventListener('mouseleave', () => {
      scheduleRevert();
    });
    towerWrapper.addEventListener('mouseenter', () => {
      cancelRevert();
    });
  }

  // If user moves mouse over to project pane, keep the previewed card active
  if (towerPane) {
    towerPane.addEventListener('mouseenter', () => {
      cancelRevert();
    });
    towerPane.addEventListener('mouseleave', () => {
      scheduleRevert();
    });
  }

  // If user leaves the whole section stage
  if (towerStage) {
    towerStage.addEventListener('mouseleave', () => {
      scheduleRevert();
    });
  }

  // 2. Click on peeking cards to select them
  towerCards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // If user clicked a link inside the active card, allow navigation
      if (e.target.closest('a')) {
        return;
      }
      // If it's a peeking previous or next card, select it!
      if (card.classList.contains('is-prev') || card.classList.contains('is-next')) {
        e.preventDefault();
        commitSelect(idx);
      }
    });
  });

  // 3. Scroll navigation over isometric tower or project pane
  function handleWheelNavigation(e) {
    if (Math.abs(e.deltaY) < 16 || e.ctrlKey) return;

    const currentIdx = (previewIndex !== null) ? previewIndex : selectedIndex;

    // Allow natural window scroll if at boundaries
    if (e.deltaY < 0 && currentIdx === 0) return;
    if (e.deltaY > 0 && currentIdx === towerFloors.length - 1) return;

    e.preventDefault();

    if (isScrolling) return;
    isScrolling = true;

    const step = e.deltaY > 0 ? 1 : -1;
    const nextIdx = Math.max(0, Math.min(towerFloors.length - 1, currentIdx + step));

    if (nextIdx !== currentIdx) {
      commitSelect(nextIdx);
    }

    clearTimeout(scrollCooldownTimer);
    scrollCooldownTimer = setTimeout(() => {
      isScrolling = false;
    }, 200);
  }

  if (towerWrapper) {
    towerWrapper.addEventListener('wheel', handleWheelNavigation, { passive: false });
  }
  if (towerCardViewport) {
    towerCardViewport.addEventListener('wheel', handleWheelNavigation, { passive: false });
  }

  // 4. Touch swipe navigation on mobile
  let touchStartY = 0;
  if (towerCardViewport) {
    towerCardViewport.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    towerCardViewport.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffY) > 35) {
        const currentIdx = (previewIndex !== null) ? previewIndex : selectedIndex;
        if (diffY > 0 && currentIdx < towerFloors.length - 1) {
          commitSelect(currentIdx + 1);
        } else if (diffY < 0 && currentIdx > 0) {
          commitSelect(currentIdx - 1);
        }
      }
    }, { passive: true });
  }

  // 5. Keyboard Arrow navigation
  if (tower) {
    tower.addEventListener('keydown', (e) => {
      const currentIdx = (previewIndex !== null) ? previewIndex : selectedIndex;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIdx < towerFloors.length - 1) {
          commitSelect(currentIdx + 1);
          towerFloors[currentIdx + 1].focus();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIdx > 0) {
          commitSelect(currentIdx - 1);
          towerFloors[currentIdx - 1].focus();
        }
      }
    });
  }

  // 6. Initialize measurements and layout
  function initMetricsAndDisplay() {
    measureCards();
    updateDisplay(selectedIndex);
  }

  window.addEventListener('resize', () => {
    measureCards();
    updateDisplay(previewIndex !== null ? previewIndex : selectedIndex);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMetricsAndDisplay);
  } else {
    initMetricsAndDisplay();
  }
  window.addEventListener('load', initMetricsAndDisplay);
})();

