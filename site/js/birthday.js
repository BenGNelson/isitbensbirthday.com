/* ============================================================
   birthday.js — July 5th: IT IS BEN'S BIRTHDAY
   Maximum chaos. Confetti. Achievements. Candles. Escalation.
   ============================================================ */

window.Birthday = {
  chaosLevel: 0,
  confetti: null,

  tabTitles: [
    "IT IS BEN'S BIRTHDAY",
    "🎉 THIS IS NOT A DRILL 🎉",
    "BIRTHDAY CONFIRMED",
    "CAKE PROTOCOLS: ACTIVE",
    "IT IS HAPPENING RIGHT NOW",
    "BEN.EXE HAS LOADED",
    "YEAR++ COMPLETE",
    "MAXIMUM BIRTHDAY ACHIEVED",
    "THE PROPHECY IS FULFILLED",
    "SCIENTISTS BAFFLED",
  ],

  tickerItems: [
    "BREAKING: It is Ben's Birthday",
    "Markets surge 400% on birthday news",
    "Local man reportedly 'feeling it'",
    "Scientists confirm: today is, in fact, July 5th",
    "Experts unanimously recommend: cake",
    "Birthday candles classified as genuine fire hazard",
    "Global celebration protocols have been initiated",
    "All previous years now officially in the past",
    "Ben has survived another full rotation around the sun",
    "Cake supplies running critically low",
    "This is not a drill",
    "We repeat: this is not a drill",
    "More at 11",
  ],

  achievements: [
    { title: "Awake",                    desc: "You opened your eyes today.",                              pts: 0    },
    { title: "Alive",                    desc: "Vitals detected. Statistically impressive.",               pts: 5    },
    { title: "Calendar Literate",        desc: "You successfully identified July 5th.",                    pts: 10   },
    { title: "Birthday Proximity",       desc: "You are within 0 days of Ben's birthday.",                 pts: 25   },
    { title: "It's Him",                 desc: "This is Ben's birthday. Ben is here.",                     pts: 9999 },
    { title: "Another Year Survived",    desc: "Statistics were against you. You did it.",                 pts: 50   },
    { title: "Cake Adjacent",            desc: "There is probably cake somewhere near you.",               pts: 25   },
    { title: "Candle Threat: Elevated",  desc: "Fire hazard assessment: elevated.",                       pts: 15   },
    { title: "Getting Older",            desc: "There is no stopping this. We've tried.",                 pts: 0    },
    { title: "Chronologically Advancing",desc: "Time marches forward regardless of your feelings.",       pts: 1    },
  ],

  init(app) {
    app.innerHTML = this.buildHTML();
    this.initConfetti();
    this.initTicker();
    this.initTabTitles();
    this.initAchievements();
    this.initCandles();
    this.initCelebrateButton();
  },

  buildHTML() {
    const candles = Array.from({ length: 5 }, (_, i) => `
      <button class="bd-candle" data-candle="${i}" aria-label="Candle ${i + 1}">
        <span class="bd-flame">🔥</span>
        <span class="bd-candle-body">|</span>
      </button>
    `).join('');

    return `
      <canvas id="confetti-canvas" aria-hidden="true"></canvas>

      <div class="bd-news-ticker" role="marquee" aria-label="Breaking news">
        <span class="bd-ticker-label">BREAKING</span>
        <div class="bd-ticker-track"><span id="ticker-text"></span></div>
      </div>

      <main class="bd-main">
        <div class="bd-hero">
          <div class="bd-pre-title">⚠️ ALERT — VERIFIED — CONFIRMED ⚠️</div>
          <h1 class="bd-title">IT IS<br><span class="bd-name">BEN'S</span><br>BIRTHDAY</h1>
          <p class="bd-subtitle">This has been foretold. The prophecy is complete. There is cake.</p>

          <section class="bd-candles">
            <p class="bd-candle-label">Blow out the candles:</p>
            <div class="bd-candle-row" id="candle-row">${candles}</div>
            <p class="bd-candle-status" id="candle-status">Click the candles to blow them out!</p>
          </section>

          <button class="bd-celebrate-btn" id="celebrate-btn">🎉 CELEBRATE 🎉</button>
          <p class="bd-chaos-label" id="chaos-label">Chaos Level: 0</p>
        </div>
      </main>

      <div id="achievements-container" aria-live="polite"></div>
    `;
  },

  // ── Confetti canvas particle system ──────────────────────────
  initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    const colors = ['#ff0080','#ff4400','#ffcc00','#00ff80','#00ccff','#cc00ff','#ff6699','#ffee00'];
    const particles = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn(count, fromBottom) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x:     Math.random() * canvas.width,
          y:     fromBottom ? canvas.height + 10 : Math.random() * canvas.height,
          w:     Math.random() * 12 + 4,
          h:     Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot:   Math.random() * Math.PI * 2,
          rotV:  (Math.random() - 0.5) * 0.15,
          vx:    (Math.random() - 0.5) * 4,
          vy:    fromBottom ? -(Math.random() * 10 + 5) : Math.random() * 2.5 + 0.5,
          grav:  fromBottom ? 0.18 : 0,
          burst: fromBottom,
        });
      }
    }

    // Seed initial ambient confetti
    spawn(200, false);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.rotV;
        if (p.grav) p.vy += p.grav;
        // Recycle ambient particles; remove burst particles that fell off screen
        if (!p.burst && p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.burst && p.y > canvas.height + 50) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    draw();

    this.confetti = { burst() { spawn(150, true); } };
  },

  // ── Breaking news ticker ──────────────────────────────────────
  initTicker() {
    const el = document.getElementById('ticker-text');
    let idx = 0;
    const next = () => {
      el.textContent = this.tickerItems[idx % this.tickerItems.length] + '   ·   ';
      idx++;
    };
    next();
    setInterval(next, 3500);
  },

  // ── Browser tab title cycling ─────────────────────────────────
  initTabTitles() {
    let idx = 0;
    setInterval(() => {
      document.title = this.tabTitles[idx % this.tabTitles.length];
      idx++;
    }, 1600);
  },

  // ── Achievement toast system ──────────────────────────────────
  initAchievements() {
    const container = document.getElementById('achievements-container');
    let idx = 0;

    const showNext = () => {
      if (idx >= this.achievements.length) return;
      const a = this.achievements[idx++];
      const toast = document.createElement('div');
      toast.className = 'bd-achievement';
      toast.innerHTML = `
        <div class="bd-ach-icon">🏆</div>
        <div class="bd-ach-text">
          <div class="bd-ach-label">Achievement Unlocked</div>
          <div class="bd-ach-title">${a.title}</div>
          <div class="bd-ach-desc">${a.desc} <em>(${a.pts}G)</em></div>
        </div>
      `;
      container.appendChild(toast);
      // Force a reflow so the CSS transition fires
      void toast.offsetWidth;
      toast.classList.add('visible');

      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 500);
      }, 4000);

      setTimeout(showNext, 2800);
    };

    setTimeout(showNext, 1200);
  },

  // ── Birthday candles ──────────────────────────────────────────
  initCandles() {
    const row    = document.getElementById('candle-row');
    const status = document.getElementById('candle-status');
    let remaining = 5;

    row.addEventListener('click', (e) => {
      const btn = e.target.closest('.bd-candle');
      if (!btn || btn.dataset.blown) return;
      btn.dataset.blown = 'true';
      btn.querySelector('.bd-flame').textContent = '💨';
      btn.classList.add('blown');
      remaining--;

      if (remaining === 0) {
        status.textContent = '🎂 All candles blown out! Make a wish!';
        status.classList.add('wish');
        if (this.confetti) this.confetti.burst();
      } else {
        status.textContent = `${remaining} candle${remaining !== 1 ? 's' : ''} remaining…`;
      }
    });
  },

  // ── Escalating celebrate button ───────────────────────────────
  initCelebrateButton() {
    const btn   = document.getElementById('celebrate-btn');
    const label = document.getElementById('chaos-label');

    btn.addEventListener('click', () => {
      this.chaosLevel++;
      if (this.confetti) this.confetti.burst();
      document.body.style.setProperty('--chaos', this.chaosLevel);

      if (this.chaosLevel >= 3)  document.body.classList.add('chaos-3');
      if (this.chaosLevel >= 6)  document.body.classList.add('chaos-6');
      if (this.chaosLevel >= 10) {
        document.body.classList.add('chaos-10');
        btn.textContent = '🎉🎉🎉 MAXIMUM BIRTHDAY 🎉🎉🎉';
        label.textContent = 'CHAOS LEVEL: MAXIMUM. THERE IS NO GOING BACK.';
        return;
      }

      label.textContent = `Chaos Level: ${this.chaosLevel}`;
    });
  },
};
