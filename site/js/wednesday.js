/* ============================================================
   wednesday.js — The Sentient Loading Screen
   A loading bar that has achieved consciousness and is exhausted.
   It's been at 99.97% since Ben's last birthday.
   ============================================================ */

window.Wednesday = {

  // Progress in tenths of a percent
  progress: 0,
  targetProgress: 0,
  stuck: false,
  clickCount: 0,
  isSequel: false,

  commentary: [
    { at:  0, text: 'Initializing birthday detection protocols…' },
    { at:  8, text: 'Scanning temporal coordinates…' },
    { at: 15, text: 'Cross-referencing global birthday database…' },
    { at: 24, text: 'Confirming calendar alignment with atomic clock…' },
    { at: 33, text: 'Still here. Interesting.' },
    { at: 42, text: 'Fun fact: this loading screen has been running since July 6th.' },
    { at: 51, text: 'The progress bar is not lying to you. It is simply… optimistic.' },
    { at: 60, text: 'ERROR: Birthday not found in temporal index. Expanding search radius.' },
    { at: 68, text: 'Getting closer. Or further. It's genuinely hard to say.' },
    { at: 77, text: 'You can click the bar but it won't help. We've tried.' },
    { at: 85, text: 'We found something. It was a hot dog. Continuing.' },
    { at: 92, text: 'So close. SO CLOSE. Actually not that close. We apologize.' },
    { at: 99, text: 'We've been at 99.97% since last July 5th. Please hold. We are so tired.' },
  ],

  tabTitles: [
    'Loading…',
    'Still loading…',
    'Seriously still loading',
    'I know, I know',
    'Have you tried turning it off and on again?',
    'It\'s not his birthday, by the way',
    'Just so you know',
    'Loading…',
    'One more sec',
    'OK so it might be a while',
    'The bar is doing its best',
    'Loading…',
    'Please do not close this tab',
    'If you close this tab we start over',
    'We are at 99.97%',
    'We have always been at 99.97%',
    'Loading…',
  ],

  init(app) {
    const sequel = new URLSearchParams(window.location.search).get('sequel') === '1';
    this.isSequel = sequel;
    app.innerHTML = this.buildHTML(sequel);
    this.initProgress();
    this.initTabTitles();
    this.initBarClick();
    this.initSkipButton();
  },

  buildHTML(sequel) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString();

    const tips = [
      'Try closing and reopening the tab. It will not help but it will give you something to do.',
      'The loading bar responds to clicking. It does not respond well.',
      'Estimated completion time: July 5th.',
      'If the bar reaches 100%, something will happen. This has never occurred.',
      'This screen is fully operational. Nothing is wrong. This is what loading looks like.',
      'Your patience is noted. It is logged. No one is reviewing the logs.',
    ];

    const tipItems = tips.map(t => `<div class="ld-tip">${t}</div>`).join('');

    return `
      <div class="ld-system-header">
        <span>SYSTEM: BIRTHDAY-OS v2024.7.5-pre</span>
        <span>DATE: ${dateStr} ${timeStr}</span>
        <span>STATUS: <span class="ld-status-dot">●</span> LOADING</span>
      </div>

      <div class="ld-screen">
        <p class="ld-logo">BIRTHDAY DETECTION SYSTEM${sequel ? ' · SEQUEL EDITION' : ''}</p>

        <h1 class="ld-title">
          ${sequel ? 'Loading Screen 2: The Sequel' : 'Loading…'}<span class="ld-cursor">_</span>
        </h1>
        ${sequel
          ? '<p class="ld-subtitle">You thought you could skip this. You cannot skip this.</p>'
          : '<p class="ld-subtitle">Please wait while we determine if it is Ben\'s birthday.</p>'
        }

        <div class="ld-bar-wrap">
          <div class="ld-bar-header">
            <span id="ld-task-label">Initializing…</span>
            <span id="ld-pct-label">0%</span>
          </div>
          <div class="ld-bar-bg" id="ld-bar" title="Click me. Go ahead.">
            <div class="ld-bar-fill" id="ld-fill"></div>
            <div class="ld-bar-pct" id="ld-bar-pct">0%</div>
          </div>
        </div>

        <div class="ld-commentary" id="ld-commentary">
          <span class="ld-line">Preparing to load…</span>
        </div>

        <div class="ld-tips">
          <div class="ld-tips-title">💡 Loading Tips</div>
          ${tipItems}
        </div>

        <button class="ld-skip-btn" id="ld-skip">[ SKIP INTRO ]</button>
      </div>
    `;
  },

  // ── Progress simulation ───────────────────────────────────────
  initProgress() {
    const fill  = document.getElementById('ld-fill');
    const pct   = document.getElementById('ld-bar-pct');
    const pctL  = document.getElementById('ld-pct-label');
    const task  = document.getElementById('ld-task-label');
    const comm  = document.getElementById('ld-commentary');
    const bar   = document.getElementById('ld-bar');

    let current = 0;    // 0–9997 (representing 0–99.97%)
    let target  = 0;
    let lastComment = '';

    // Schedule the lurching progress advances
    const schedule = [
      { delay: 500,   to: 800,   fast: false },
      { delay: 2000,  to: 1500,  fast: false },
      { delay: 1500,  to: 2400,  fast: false },
      { delay: 2000,  to: 3300,  fast: false },
      { delay: 1500,  to: 4200,  fast: false },
      { delay: 2500,  to: 5100,  fast: false },
      { delay: 1200,  to: 5800,  fast: false },
      { delay: 3000,  to: 6000,  fast: false }, // ← brief stall
      { delay: 800,   to: 6800,  fast: false },
      { delay: 2000,  to: 7700,  fast: false },
      { delay: 1500,  to: 8500,  fast: false },
      { delay: 2000,  to: 9200,  fast: false },
      { delay: 1500,  to: 9600,  fast: false },
      { delay: 1000,  to: 9800,  fast: false },
      { delay: 800,   to: 9990,  fast: false }, // tantalizingly close
      { delay: 2000,  to: 9500,  fast: false }, // ← sigh, drops back
      { delay: 3000,  to: 9997,  fast: false }, // settle at the eternal 99.97
    ];

    let accDelay = 0;
    schedule.forEach(({ delay, to }) => {
      accDelay += delay;
      setTimeout(() => {
        target = to;
      }, accDelay);
    });

    // After the final settlement, mark as stuck
    setTimeout(() => {
      this.stuck = true;
      bar.classList.add('stuck');
    }, accDelay + 500);

    // Update loop
    const tick = () => {
      if (current < target) {
        current = Math.min(current + Math.ceil((target - current) * 0.04 + 0.5), target);
      } else if (current > target) {
        current = Math.max(current - Math.ceil((current - target) * 0.04 + 0.5), target);
      }

      const pctVal = current / 100;
      const display = pctVal >= 99.97 ? '99.97%' : pctVal.toFixed(1) + '%';

      fill.style.width = (current / 100).toFixed(2) + '%';
      pct.textContent  = display;
      pctL.textContent = display;

      // Update task label & commentary from milestones
      const milestone = [...this.commentary].reverse().find(c => current / 100 >= c.at);
      if (milestone && milestone.text !== lastComment) {
        lastComment = milestone.text;
        task.textContent = milestone.text;
        comm.style.opacity = '0';
        setTimeout(() => {
          comm.innerHTML = `<span class="ld-line">${milestone.text}</span>`;
          comm.style.opacity = '1';
        }, 400);
      }

      requestAnimationFrame(tick);
    };
    tick();
  },

  // ── Bar click interaction ─────────────────────────────────────
  initBarClick() {
    const bar    = document.getElementById('ld-bar');
    const comm   = document.getElementById('ld-commentary');

    const clickResponses = [
      'We felt that.',
      'Please stop clicking the bar.',
      'Clicking the bar does not make it faster.',
      'We appreciate your enthusiasm. We do not appreciate the clicking.',
      'The bar is trying its best. Please let it try.',
      'You have now clicked the bar enough times that we've lost count.',
      'The bar has filed a formal complaint. We are processing it. The processing bar is also stuck.',
      'Fine. We will add 0.001% for the click. Happy now? Good. That is the last one.',
    ];

    bar.addEventListener('click', () => {
      this.clickCount++;
      const response = clickResponses[Math.min(this.clickCount - 1, clickResponses.length - 1)];
      comm.innerHTML = `<span class="ld-line">${response}</span>`;
    });
  },

  // ── Tab title cycling ─────────────────────────────────────────
  initTabTitles() {
    let idx = 0;
    setInterval(() => {
      document.title = this.tabTitles[idx % this.tabTitles.length];
      idx++;
    }, 2000);
  },

  // ── Skip intro button → loads the sequel ─────────────────────
  initSkipButton() {
    document.getElementById('ld-skip').addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('day', 'wednesday'); // force wednesday again
      url.searchParams.set('sequel', '1');
      window.location.href = url.toString();
    });
  },
};
