/* ============================================================
   friday.js — The Birthday Code: Classified Investigation
   A corkboard conspiracy wall. The secret is July 5th.
   Crack the code with the correct password.
   ============================================================ */

window.Friday = {

  // Notes: { top, left, rot (deg), label, title, body, class, delay }
  notes: [
    {
      top: '8%', left: '5%', rot: -3, delay: 0.1,
      class: 'cb-note-main',
      label: '🔴 ACTIVE INVESTIGATION',
      title: 'THE BIRTHDAY CODE',
      body:  'Subject: BEN. Birthday: UNKNOWN (or is it?). Method: RED STRING.',
    },
    {
      top: '10%', left: '38%', rot: 2, delay: 0.2,
      label: 'Primary Subject',
      title: 'Subject: "BEN"',
      body:  'Known associate of: calendars, cake. Reported to "celebrate" annually. Frequency: once per year, allegedly.',
    },
    {
      top: '8%', left: '65%', rot: -2, delay: 0.25,
      label: 'Birthday Month',
      title: 'JULY???',
      body:  'Source: unnamed calendar. Reliability: MODERATE. Cross-reference: summer, heat, hotdogs(??).',
    },
    {
      top: '38%', left: '3%', rot: 1.5, delay: 0.3,
      class: 'cb-note-redtext',
      label: 'Critical Date',
      title: 'THE 5TH?? OR 4TH??',
      body:  'Wait. The 5th. Definitely the 5th. Or is July 4th throwing me off?? No. FIFTH. I am almost sure.',
    },
    {
      top: '35%', left: '32%', rot: -1, delay: 0.35,
      label: 'Eyewitness Account',
      title: '"He Seemed Happy"',
      body:  'Unnamed witness observed subject appearing "in a good mood" on what may have been July 5th. Unverified. Could mean anything.',
    },
    {
      top: '32%', left: '60%', rot: 2.5, delay: 0.4,
      label: 'Linguistic Analysis',
      title: 'ANAGRAM RESULTS',
      body:  'Letters in BIRTHDAY rearranged: BIRTHDAY. No new information. Analyst is taking a walk.',
    },
    {
      top: '62%', left: '8%', rot: -2, delay: 0.45,
      label: 'Motive Analysis',
      title: 'WHY HAVE A BIRTHDAY',
      body:  'Motive remains unclear. Subject has declined to comment. Researcher is beginning to question the entire investigation.',
    },
    {
      top: '60%', left: '38%', rot: 1, delay: 0.5,
      class: 'cb-note-redtext',
      label: '⚠️ BREAKTHROUGH',
      title: 'JULY + 5 = JULY 5TH',
      body:  'This is either the answer or I have been staring at this board for too long. The string points here. The string knows.',
    },
    {
      top: '58%', left: '68%', rot: -1.5, delay: 0.55,
      label: 'Current Status',
      title: '???????????????????',
      body:  'What am I missing. WHAT AM I MISSING. The answer is right there. I can feel it.',
    },
  ],

  // String connections: [fromNoteIndex, toNoteIndex]
  // We draw these as SVG lines after placement
  connections: [
    [0, 1], [0, 3], [1, 2], [1, 4], [2, 5], [3, 7], [4, 7], [6, 7], [7, 8],
  ],

  // Valid passwords
  validPasswords: ['july5', 'july 5', '7/5', '7-5', 'july5th', 'thefifth', 'july the fifth'],

  init(app) {
    app.innerHTML = this.buildHTML();
    this.drawStrings();
    this.initCrackPanel();
  },

  buildHTML() {
    const noteEls = this.notes.map((n, i) => `
      <div class="cb-note ${n.class || ''}"
           data-note="${i}"
           style="top:${n.top};left:${n.left};--rot:${n.rot}deg;animation-delay:${n.delay}s;">
        <div class="cb-note-label">${n.label}</div>
        <div class="cb-note-title">${n.title}</div>
        <div class="cb-note-body">${n.body}</div>
      </div>
    `).join('');

    return `
      <header class="cb-header">
        <div>
          <div class="cb-header-title">🔍 The Birthday Code — Classified Ongoing Investigation</div>
          <div class="cb-header-subtitle">Case file opened: indeterminate · Status: UNSOLVED · Lead investigator: Unknown</div>
        </div>
        <div class="cb-header-status">⬤ CASE ACTIVE</div>
      </header>

      <div class="cb-board" id="cb-board">
        <!-- SVG layer for strings (populated by JS) -->
        <svg class="cb-strings" id="cb-strings" xmlns="http://www.w3.org/2000/svg"></svg>

        ${noteEls}
      </div>

      <!-- Hidden magnifying glass trigger in corner -->
      <button class="cb-magnify" id="cb-magnify" title="Investigate" aria-label="Crack the code">🔍</button>
      <div class="cb-magnify-hint">click to investigate</div>

      <!-- Crack the code panel -->
      <div class="cb-crack-overlay" id="cb-crack-overlay">
        <div class="cb-crack-panel">
          <button class="cb-crack-close" id="cb-crack-close" aria-label="Close">✕</button>
          <p class="cb-crack-eyebrow">🔐 Classified Access Terminal</p>
          <h2 class="cb-crack-title">CRACK THE CODE</h2>
          <p class="cb-crack-label">Enter the date of Ben's birthday to unlock the case file:</p>
          <input type="text" class="cb-crack-input" id="cb-crack-input"
                 placeholder="Enter answer…" autocomplete="off" spellcheck="false">
          <button class="cb-crack-btn" id="cb-crack-submit">[ SUBMIT ]</button>
          <p class="cb-crack-error" id="cb-crack-error"></p>
        </div>
      </div>

      <!-- Success reveal -->
      <div class="cb-success-overlay" id="cb-success-overlay">
        <div class="cb-success-icon">🎯</div>
        <div class="cb-success-title">YOU CRACKED IT.</div>
        <div class="cb-success-body">
          IT'S JULY 5TH.<br><br>
          The string knew all along. The investigator is weeping with relief.
          The case is now marked: <strong>COLD</strong>.<br><br>
          You are simply early. Or late. Either way: you were right.
          The birthday is real. The birthday is July 5th. The hot dogs were a red herring.
        </div>
        <button class="cb-success-dismiss" id="cb-success-dismiss">[ CLOSE CASE FILE ]</button>
      </div>
    `;
  },

  // ── Draw SVG red string lines between notes ───────────────────
  drawStrings() {
    const svg   = document.getElementById('cb-strings');
    const board = document.getElementById('cb-board');
    const notes = document.querySelectorAll('.cb-note');

    // We need to wait for layout to get accurate positions
    requestAnimationFrame(() => {
      const boardRect = board.getBoundingClientRect();

      const getCenterOf = (noteEl) => {
        const r = noteEl.getBoundingClientRect();
        return {
          x: r.left + r.width  / 2 - boardRect.left,
          y: r.top  + r.height / 2 - boardRect.top,
        };
      };

      this.connections.forEach(([a, b], idx) => {
        const from = getCenterOf(notes[a]);
        const to   = getCenterOf(notes[b]);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('class', 'cb-string-line');
        line.style.animationDelay = (idx * 0.12) + 's';
        svg.appendChild(line);
      });

      // Set SVG viewBox to match board dimensions
      svg.setAttribute('viewBox', `0 0 ${board.offsetWidth} ${board.offsetHeight}`);
    });
  },

  // ── Crack-the-code panel ──────────────────────────────────────
  initCrackPanel() {
    const overlay  = document.getElementById('cb-crack-overlay');
    const close    = document.getElementById('cb-crack-close');
    const magnify  = document.getElementById('cb-magnify');
    const input    = document.getElementById('cb-crack-input');
    const submit   = document.getElementById('cb-crack-submit');
    const errorEl  = document.getElementById('cb-crack-error');
    const success  = document.getElementById('cb-success-overlay');
    const dismiss  = document.getElementById('cb-success-dismiss');
    let attempts   = 0;

    const openPanel = () => overlay.classList.add('open');
    const closePanel = () => overlay.classList.remove('open');

    magnify.addEventListener('click', openPanel);
    close.addEventListener('click', closePanel);
    overlay.addEventListener('click', e => { if (e.target === overlay) closePanel(); });

    const wrongMessages = [
      'Incorrect. That is not the birthday. The string does not agree.',
      'Still wrong. The board is disappointed.',
      'No. The investigator is sighing audibly.',
      'WRONG. It is a date. Month and day. Think about what you know.',
      'It begins with J. We are giving you this for free.',
      'JULY. It is JULY. We cannot say more.',
      'JULY 5TH. It is JULY 5TH. Please just type JULY 5. We are begging.',
    ];

    const tryAnswer = () => {
      const val = input.value.trim().toLowerCase().replace(/[^a-z0-9 /-]/g, '');

      if (this.validPasswords.includes(val)) {
        closePanel();
        setTimeout(() => success.classList.add('open'), 200);
        return;
      }

      errorEl.textContent = wrongMessages[Math.min(attempts, wrongMessages.length - 1)];
      errorEl.classList.add('visible');
      input.value = '';
      input.classList.add('error');
      setTimeout(() => input.classList.remove('error'), 400);
      attempts++;
    };

    submit.addEventListener('click', tryAnswer);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryAnswer(); });
    dismiss.addEventListener('click', () => success.classList.remove('open'));
  },
};
