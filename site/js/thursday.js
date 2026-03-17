/* ============================================================
   thursday.js — The International Hot Dog Appreciation Society
   An extremely professional website about hot dogs. The JOIN NOW
   button runs away from your cursor. One footer link leads back
   here with a birthday hat on the logo.
   ============================================================ */

window.Thursday = {

  menu: [
    {
      icon: '🌭',
      name: 'The Classic',
      desc: 'A frank expression of culinary tradition. Served in a bun. The bun is also classic.',
      price: '$3.00',
    },
    {
      icon: '🌭',
      name: 'The Artisanal',
      desc: 'Our sommelier-selected frank, cold-pressed in a heritage grain bun. The hot dog itself has not changed. The price has.',
      price: '$18.00',
    },
    {
      icon: '🌭',
      name: 'The Executive',
      desc: 'Identical to The Classic in every measurable way. However, it arrives in a briefcase. The briefcase is non-negotiable.',
      price: '$47.00',
    },
    {
      icon: '🌭',
      name: 'The Enigmatic',
      desc: 'We cannot tell you what is in The Enigmatic. We simply cannot. Members only. No exceptions. We are sorry.',
      price: 'Price upon inquiry',
    },
  ],

  members: [
    {
      avatar: '👴',
      name: 'Gerald W.',
      title: 'Founding Member · Class of 1987',
      bio: 'Gerald founded the Society after a pivotal hot dog experience at a regional fair. He has not elaborated. He is the Gerald from the Sunday museum donation. He is everywhere.',
    },
    {
      avatar: '👩',
      name: 'Patricia H.',
      title: 'Senior Member · Hot Dog Liaison',
      bio: 'Patricia joined in 1994 and has served as Hot Dog Liaison for 30 years. Her role has never been formally defined. She seems fine with this.',
    },
    {
      avatar: '🧑',
      name: 'Anonymous',
      title: 'Junior Member',
      bio: 'Joined recently. Likes hot dogs. Has not yet earned the right to a last initial.',
    },
  ],

  init(app) {
    const isBirthdayMode = new URLSearchParams(window.location.search).get('hat') === '1';

    app.innerHTML = this.buildHTML(isBirthdayMode);

    if (isBirthdayMode) {
      document.body.classList.add('hd-birthday-mode');
    }

    this.initMenuButtons();
    this.initMovingButton();
    this.initFooterLink(isBirthdayMode);
  },

  buildHTML(birthdayMode) {
    const menuCards = this.menu.map(item => `
      <div class="hd-menu-item">
        <span class="hd-item-icon">${item.icon}</span>
        <div class="hd-item-name">${item.name}</div>
        <p class="hd-item-desc">${item.desc}</p>
        <div class="hd-item-price">${item.price}</div>
        <button class="hd-item-btn" data-menu-btn>Order Now</button>
      </div>
    `).join('');

    const memberCards = this.members.map(m => `
      <div class="hd-member-card">
        <div class="hd-member-avatar">${m.avatar}</div>
        <div>
          <div class="hd-member-name">${m.name}</div>
          <div class="hd-member-title">${m.title}</div>
          <p class="hd-member-bio">${m.bio}</p>
        </div>
      </div>
    `).join('');

    const birthdayNote = birthdayMode
      ? '<p style="background:var(--hd-mustard);color:var(--hd-dark);text-align:center;padding:12px;font-weight:700;font-size:0.9rem;">🎉 BIRTHDAY EDITION — The logo is wearing a hat now. This changes nothing about the hot dogs. 🎉</p>'
      : '';

    return `
      ${birthdayNote}

      <header class="hd-header">
        <div class="hd-header-inner">
          <div class="hd-logo-wrap">
            <div class="hd-logo-icon">
              🌭
              <span class="hd-birthday-hat">🎩</span>
            </div>
            <div class="hd-logo-text">
              <div class="hd-logo-name">The International Hot Dog<br>Appreciation Society</div>
              <div class="hd-logo-tagline">& Benevolent Order · Est. 1987</div>
            </div>
          </div>
          <nav>
            <ul class="hd-nav">
              <li><a href="#">Menu</a></li>
              <li><a href="#">Members</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section class="hd-hero">
        <p class="hd-hero-eyebrow">Now Accepting Orders · Delivery Available July 5th Only</p>
        <h1>The World's Premier<br><em>Hot Dog</em> Institution</h1>
        <p>
          Founded 1987. Devoted entirely to hot dogs.
          No exceptions. No substitutions. No birthday cakes.
        </p>
        <div class="hd-hotm">🌭 Hot Dog of the Month: Classic Hot Dog</div>
      </section>

      <section class="hd-section">
        <p class="hd-section-title">The Menu — All Items Are Hot Dogs</p>
        <div class="hd-menu-grid">${menuCards}</div>
        <p style="font-size:0.78rem;color:var(--hd-muted);font-style:italic;text-align:center;">
          * We only deliver on July 5th. <span id="hd-order-count">0</span> hot dogs not delivered today.
          Condiments available: mustard, ketchup. Nothing else. This is non-negotiable.
        </p>
      </section>

      <section class="hd-members-section">
        <div class="hd-members-inner">
          <p class="hd-section-title">Current Membership Directory</p>
          <div class="hd-members-grid">
            <div>
              ${memberCards}
            </div>
            <div class="hd-join-panel">
              <h3>Become a Member</h3>
              <p>
                Membership is by hot dog invitation only. If you have not received
                a hot dog invitation, you have not been invited. This is not a loophole.
              </p>
              <div class="hd-join-btn-wrap">
                <button class="hd-join-btn" id="hd-join-btn">JOIN NOW</button>
              </div>
              <p class="hd-join-note" id="hd-join-note">
                (Requirements: love of hot dogs, hot dog invitation, valid ID)
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer class="hd-footer">
        <span>© The International Hot Dog Appreciation Society & Benevolent Order · Est. 1987</span>
        <a href="#" class="hd-footer-link" id="hd-footer-link">
          ${birthdayMode ? '← Back to Regular Site' : 'birthday info →'}
        </a>
        <span>All rights reserved · Hot dogs only</span>
      </footer>
    `;
  },

  // ── Order buttons — always says "July 5th only" ───────────────
  initMenuButtons() {
    let orderCount = 0;
    const counter = document.getElementById('hd-order-count');

    document.querySelectorAll('[data-menu-btn]').forEach(btn => {
      btn.addEventListener('click', function () {
        orderCount++;
        counter.textContent = orderCount;
        const orig = this.textContent;
        this.textContent = 'Delivery: July 5th Only';
        this.disabled = true;
        this.style.background = 'var(--hd-muted)';
        setTimeout(() => {
          this.textContent = orig;
          this.disabled = false;
          this.style.background = '';
        }, 2500);
      });
    });
  },

  // ── JOIN NOW button flees the cursor (desktop) / teleports (mobile) ──
  initMovingButton() {
    const btn  = document.getElementById('hd-join-btn');
    const note = document.getElementById('hd-join-note');
    let escaped = 0;
    let offsetX = 0;
    let offsetY = 0;

    // Desktop: flee from cursor in real time
    const mouseEscapeMessages = [
      '(Requirements: love of hot dogs, hot dog invitation, valid ID)',
      '(Please stop trying to click this)',
      '(The button is exercising its right to not be clicked)',
      '(This is a certified evasion button)',
      '(The button has filed for restraining order)',
      '(You cannot catch it. It has been trained for this.)',
      '(Just click it!)',
    ];

    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const dist   = Math.sqrt(dx * dx + dy * dy);

      if (dist < 80) {
        const angle = Math.atan2(dy, dx);
        const flee  = 130;
        const nx    = offsetX - Math.cos(angle) * flee;
        const ny    = offsetY - Math.sin(angle) * flee;

        // Keep roughly on screen
        const maxX = window.innerWidth  / 2 - 100;
        const maxY = window.innerHeight / 2 - 50;
        offsetX = Math.max(-maxX, Math.min(maxX, nx));
        offsetY = Math.max(-maxY, Math.min(maxY, ny));

        btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        escaped++;
        note.textContent = mouseEscapeMessages[Math.min(escaped - 1, mouseEscapeMessages.length - 1)];
      }
    });

    // Mobile: teleport on touchstart (up to 5 times, then yield)
    const touchEscapeMessages = [
      '(Requirements: love of hot dogs, hot dog invitation, valid ID)',
      '(It felt the vibration. It has relocated.)',
      '(The button practices evasive maneuvers. Twice weekly.)',
      '(At this point you are tapping your screen with increasing urgency.)',
      '(The button has filed a formal complaint. One more and it will yield.)',
    ];
    let touchEscapes = 0;
    const maxTouchEscapes = 5;

    btn.addEventListener('touchstart', (e) => {
      if (touchEscapes >= maxTouchEscapes) return; // let the click fire
      e.preventDefault();

      // Teleport to a new random position (not cumulative — fresh each time)
      const angle = Math.random() * Math.PI * 2;
      const dist  = 90 + Math.random() * 70;
      const maxX  = Math.min(window.innerWidth / 2 - 80, 150);
      const maxY  = Math.min(window.innerHeight / 5, 120);
      offsetX = Math.max(-maxX, Math.min(maxX, Math.cos(angle) * dist));
      offsetY = Math.max(-maxY, Math.min(maxY, Math.sin(angle) * dist * 0.4));

      btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      note.textContent = touchEscapeMessages[Math.min(touchEscapes, touchEscapeMessages.length - 1)];
      touchEscapes++;
    }, { passive: false });

    // Fires after desktop catch or after mobile exhausts escapes
    btn.addEventListener('click', () => {
      note.textContent = '(You caught it. It let you. There is no membership form.)';
      btn.disabled = true;
      btn.style.background = 'var(--hd-muted)';
    });
  },

  // ── Footer "birthday info" link adds hat mode ─────────────────
  initFooterLink(isBirthdayMode) {
    const link = document.getElementById('hd-footer-link');

    if (isBirthdayMode) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.delete('hat');
        window.location.href = url.toString();
      });
    } else {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set('hat', '1');
        window.location.href = url.toString();
      });
    }
  },
};
