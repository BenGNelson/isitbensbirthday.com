/* ============================================================
   saturday.js — Chrono-Celebration Nexus v∞
   Interdimensional Birthday Portal: Temporarily Offline.
   The CAPTCHA only shows hot dogs. It always fails.
   ============================================================ */

window.Saturday = {

  captchaItems: [
    { emoji: '🌭', label: 'Hot Dog' },
    { emoji: '🌭', label: 'Hot Dog (Artisanal)' },
    { emoji: '🌭', label: 'Hot Dog (Spicy)' },
    { emoji: '🌭', label: 'Hot Dog (Chicago Style)' },
    { emoji: '🌭', label: 'Hot Dog (Classic)' },
    { emoji: '🌭', label: 'Hot Dog (New York Style)' },
    { emoji: '🌭', label: 'Hot Dog (Premium)' },
    { emoji: '🌭', label: 'Hot Dog (Deluxe)' },
    { emoji: '🌭', label: 'Hot Dog (Ultimate)' },
  ],

  captchaFailMessages: [
    'Those were hot dogs. All of them. None of them were birthday cakes.',
    'We see you selected the hot dogs again. These are still hot dogs.',
    'We are beginning to worry about your ability to identify birthday cakes.',
    'A birthday cake has: frosting, candles, the words "Happy Birthday." Not: a bun, mustard, or relish. Please reflect on this.',
    'EMERGENCY ACCESS DENIED. Maximum attempts reached. Your hot dog selections have been logged. Please return on July 5th when the portal is aligned and you have, hopefully, learned what a birthday cake is.',
  ],

  captchaAttempts: 0,
  countdownTimer: null,

  init(app) {
    app.innerHTML = this.buildHTML();
    this.startCountdown();
    this.initCaptcha();
  },

  buildHTML() {
    const statusRows = [
      { label: 'BIRTHDAY DIMENSION',       value: '■ OFFLINE',          cls: 'red'    },
      { label: 'TEMPORAL ALIGNMENT',       value: '✗ MISALIGNED',       cls: 'red'    },
      { label: 'CAKE PARTICLE DENSITY',    value: '0.000 / cubic meter',cls: 'yellow' },
      { label: 'CANDLE IGNITION PROTOCOL', value: 'SUSPENDED',          cls: 'yellow' },
      { label: 'CONFETTI COMPRESSION',     value: 'N/A',                cls: 'yellow' },
      { label: 'PARTY PROTOCOL STATUS',    value: 'DORMANT',            cls: 'red'    },
      { label: 'ESTIMATED REACTIVATION',   value: 'JULY 5TH',           cls: 'cyan'   },
    ];

    const rowsHTML = statusRows.map(r => `
      <div class="sp-status-row">
        <span class="sp-status-label">${r.label}</span>
        <span class="sp-status-value ${r.cls}">${r.value}</span>
      </div>
    `).join('');

    const cells = this.captchaItems.map((item, i) => `
      <div class="sp-captcha-cell" data-cell="${i}">
        ${item.emoji}
        <span class="sp-captcha-cell-label">${item.label}</span>
      </div>
    `).join('');

    return `
      <div class="sp-stars" aria-hidden="true"></div>

      <header class="sp-header">
        <div class="sp-logo">
          <strong>CHRONO-CELEBRATION NEXUS</strong>
          Interdimensional Birthday Transportation & Processing System v∞
        </div>
        <div class="sp-header-right">
          NODE: EARTH-PRIME<br>
          AUTH LEVEL: NONE<br>
          SESSION: UNAUTHORIZED
        </div>
      </header>

      <main class="sp-main">

        <div class="sp-portal-ring">
          <div class="sp-portal-inner">🎂</div>
          <span class="sp-portal-label">OFFLINE</span>
        </div>

        <h1 class="sp-title">Birthday Portal Offline</h1>
        <p class="sp-subtitle">
          Portal reactivation requires: July 5th · Global temporal alignment · Sufficient cake particles
        </p>

        <div class="sp-status-panel">
          <div class="sp-panel-title">System Status Board — Real-time Telemetry</div>
          <div class="sp-status-rows">${rowsHTML}</div>
        </div>

        <div class="sp-status-panel sp-countdown">
          <div class="sp-panel-title">Time Until Portal Reactivation</div>
          <div class="sp-countdown-label">Days · Hours · Minutes · Seconds</div>
          <div class="sp-countdown-digits" id="sp-countdown">
            <span id="sp-days">--</span>
            <span id="sp-hours">--</span>
            <span id="sp-mins">--</span>
            <span id="sp-secs">--</span>
          </div>
        </div>

        <div class="sp-emergency">
          <div class="sp-emergency-title">⚠ Emergency Override Protocol</div>
          <p>
            Authorized personnel may attempt emergency portal access via biometric verification.
            Unauthorized access will result in hot dogs. We have been very clear about this.
          </p>
          <button class="sp-emergency-btn" id="sp-emergency-btn">INITIATE EMERGENCY ACCESS</button>
        </div>

      </main>

      <!-- CAPTCHA Modal -->
      <div class="sp-captcha-overlay" id="sp-captcha-overlay">
        <div class="sp-captcha-panel">
          <p class="sp-captcha-title">🔐 Biometric Verification — Step 1 of 1</p>
          <p class="sp-captcha-instruction" id="sp-captcha-instruction">
            Select all images containing a <strong>birthday cake</strong>.
            (${this.captchaItems.length}/${this.captchaItems.length} images shown)
          </p>
          <div class="sp-captcha-grid" id="sp-captcha-grid">${cells}</div>
          <button class="sp-captcha-verify-btn" id="sp-captcha-verify">[ VERIFY SELECTION ]</button>
          <div class="sp-captcha-error" id="sp-captcha-error"></div>
          <button class="sp-captcha-close" id="sp-captcha-close">Cancel emergency access attempt</button>
        </div>
      </div>
    `;
  },

  // ── Countdown to next July 5th ────────────────────────────────
  startCountdown() {
    const getTarget = () => {
      const now = new Date();
      const t   = new Date(now.getFullYear(), 6, 5, 0, 0, 0);
      if (t <= now) t.setFullYear(t.getFullYear() + 1);
      return t;
    };

    const pad = n => String(n).padStart(2, '0');

    const tick = () => {
      const now   = new Date();
      const diff  = getTarget() - now;
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000)  / 60000);
      const secs  = Math.floor((diff % 60000)    / 1000);

      const el = id => document.getElementById(id);
      if (el('sp-days')) {
        el('sp-days').textContent = String(days).padStart(3, '0');
        el('sp-hours').textContent = pad(hours);
        el('sp-mins').textContent  = pad(mins);
        el('sp-secs').textContent  = pad(secs);
      }
    };

    tick();
    this.countdownTimer = setInterval(tick, 1000);
  },

  // ── CAPTCHA system ────────────────────────────────────────────
  initCaptcha() {
    const overlay  = document.getElementById('sp-captcha-overlay');
    const openBtn  = document.getElementById('sp-emergency-btn');
    const closeBtn = document.getElementById('sp-captcha-close');
    const verify   = document.getElementById('sp-captcha-verify');
    const errorEl  = document.getElementById('sp-captcha-error');
    const instrEl  = document.getElementById('sp-captcha-instruction');
    const grid     = document.getElementById('sp-captcha-grid');

    openBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      this.resetCaptcha(grid, instrEl, errorEl);
    });

    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

    // Toggle selection on cells
    grid.addEventListener('click', e => {
      const cell = e.target.closest('.sp-captcha-cell');
      if (cell) cell.classList.toggle('selected');
    });

    verify.addEventListener('click', () => {
      const selected = grid.querySelectorAll('.sp-captcha-cell.selected');

      if (this.captchaAttempts >= this.captchaFailMessages.length - 1) {
        // Final permanent failure
        const msg = this.captchaFailMessages[this.captchaFailMessages.length - 1];
        errorEl.textContent = msg;
        verify.disabled = true;
        verify.textContent = '[ ACCESS PERMANENTLY DENIED ]';
        verify.style.background = '#401010';
        closeBtn.textContent = 'Leave. Return July 5th.';
        return;
      }

      const msg = this.captchaFailMessages[this.captchaAttempts];
      errorEl.textContent = msg;
      this.captchaAttempts++;

      // Deselect all cells after each attempt
      grid.querySelectorAll('.sp-captcha-cell.selected').forEach(c => c.classList.remove('selected'));

      // After second attempt, shuffle labels slightly to add confusion
      if (this.captchaAttempts === 2) {
        instrEl.innerHTML = 'Select all images containing a <strong>birthday cake</strong>. '
          + 'Look carefully. One of these may be a birthday cake. (Hint: it is not.)';
      }
    });
  },

  resetCaptcha(grid, instrEl, errorEl) {
    grid.querySelectorAll('.sp-captcha-cell.selected').forEach(c => c.classList.remove('selected'));
    errorEl.textContent = '';
    instrEl.innerHTML = `Select all images containing a <strong>birthday cake</strong>.
      (${this.captchaItems.length}/${this.captchaItems.length} images shown)`;
    document.getElementById('sp-captcha-verify').disabled = false;
    document.getElementById('sp-captcha-verify').textContent = '[ VERIFY SELECTION ]';
    document.getElementById('sp-captcha-verify').style.background = '';
    document.getElementById('sp-captcha-close').textContent = 'Cancel emergency access attempt';
  },
};
