/* ============================================================
   sunday.js — The Institute of Pre-Birthday Contemporary Art
   A stuffy fine-art museum devoted to objects that are not
   Ben's birthday.
   ============================================================ */

window.Sunday = {

  artworks: [
    {
      title: 'Untitled (Loading Spinner)',
      year: '2024',
      medium: 'Digital oil on void',
      desc: 'The artist confronts the liminal space between want and arrival. A study in perpetual almost-ness.',
      icon: '⏳',
      class: '',
      guide: 'The spinner — always moving, never arriving — invites us to consider the nature of time itself. The artist reportedly spent three years in a waiting room seeking inspiration. The waiting room was, itself, still loading.',
    },
    {
      title: 'Study for "Unread Notification #4,891"',
      year: '2023',
      medium: 'Text message on glass; blue light',
      desc: 'A plea, unanswered. An intimacy, unacknowledged. The read receipt haunts.',
      icon: '📱',
      class: '',
      guide: 'A bold meditation on the horror of the unread. Note the meticulous attention to the ellipsis — three dots, hovering, promising, delivering nothing. The artist has said this work "came to him at 2am." We believe him.',
    },
    {
      title: 'Birthday: Not Today (Diptych)',
      year: '2022',
      medium: 'Absence on canvas; absence on canvas',
      desc: 'The left panel depicts absence. The right panel also depicts absence. The gap between them is where the birthday lives.',
      icon: '🖼️',
      class: 'dark-bg',
      guide: 'Perhaps the most daring work in the collection. Critics have called it "bold," "confusing," and "why are there two empty frames." The artist responded: "yes."',
    },
    {
      title: 'The Unblown Candle',
      year: '2024',
      medium: 'Birthday candle, matches, unused intention',
      desc: 'A birthday candle that has never been lit. A wish that has never been made. A cake that may or may not exist.',
      icon: '🕯️',
      class: '',
      guide: 'Acquired directly from the artist, who said only: "I was saving it." For what? We asked. He did not answer. He stared at the candle for a long time. We did not ask again.',
    },
    {
      title: 'Anticipation (Self-Portrait)',
      year: '2024',
      medium: 'Progress bar at 0%. Server infrastructure.',
      desc: 'The loading bar has not moved. The artist has not moved. They are waiting for the same thing.',
      icon: '📊',
      class: '',
      guide: 'A genuinely haunting self-portrait. The bar — visible on closer inspection to read "0%" — functions as a kind of mirror. Who among us has not felt 0%? Who among us has not waited for something that refuses to load?',
    },
    {
      title: 'Portrait of a Man Who Checked the Date Too Early',
      year: '2024',
      medium: 'You. Right now. Digital photograph.',
      desc: 'The subject came expecting a birthday and found a museum instead. The expression is not unfamiliar.',
      icon: '🪞',
      class: '',
      guide: 'This piece is unusual in that it is completed by the viewer. You are the man. You checked the date too early — or too late. The museum thanks you for your participation. The gift shop is not yet open.',
    },
  ],

  shopItems: [
    { icon: '🛍️', name: 'Pre-Birthday Tote Bag', price: '$38.00' },
    { icon: '📚', name: 'Exhibition Catalogue', price: '$55.00' },
    { icon: '🖨️', name: 'Signed Print: "The Unblown Candle"', price: '$220.00' },
    { icon: '☕', name: 'Museum Tumbler', price: '$28.00' },
  ],

  init(app) {
    app.innerHTML = this.buildHTML();
    this.initAudioGuide();
    this.initShopButtons();
  },

  buildHTML() {
    const artworkCards = this.artworks.map((a, i) => `
      <article class="mu-artwork" data-index="${i}" role="button" tabindex="0"
               aria-label="View audio guide for ${a.title}">
        <div class="mu-frame">
          <div class="mu-frame-inner ${a.class}">${a.icon}</div>
        </div>
        <p class="mu-artwork-title">${a.title}, ${a.year}</p>
        <p class="mu-artwork-meta">${a.medium}<br>${a.desc}</p>
        <p class="mu-artwork-price">🎧 Audio Guide Available</p>
      </article>
    `).join('');

    const shopCards = this.shopItems.map(s => `
      <div class="mu-shop-item">
        <span class="mu-shop-item-icon">${s.icon}</span>
        <p class="mu-shop-item-name">${s.name}</p>
        <p class="mu-shop-item-price">${s.price}</p>
        <button class="mu-shop-item-btn" data-shop>Add to Cart</button>
        <p class="mu-shop-coming-soon">Coming Soon Since 1987</p>
      </div>
    `).join('');

    return `
      <header class="mu-header">
        <div class="mu-logo">
          The Institute of Pre-Birthday<br>Contemporary Art
          <span>Est. 2024 · Open Tues–Sat, Not Your Birthday</span>
        </div>
        <nav>
          <ul class="mu-nav">
            <li><a href="#">Collections</a></li>
            <li><a href="#">Exhibitions</a></li>
            <li><a href="#">Visit</a></li>
            <li><a href="#">Gift Shop</a></li>
          </ul>
        </nav>
      </header>

      <section class="mu-hero">
        <p class="mu-hero-eyebrow">Permanent Collection · Now on View</p>
        <h1>Celebrating What Has Not Yet Happened</h1>
        <p>The Institute presents works exploring the vast cultural, spiritual, and logistical space that exists between now and Ben's birthday.</p>
      </section>

      <div class="mu-audio-bar">
        <span>🎧 Free audio guides available for all works</span>
        <button class="mu-audio-btn" id="start-audio-guide">Start Audio Tour</button>
      </div>

      <section class="mu-gallery-section">
        <p class="mu-section-title">Permanent Collection — Pre-Birthday Wing</p>
        <div class="mu-gallery">${artworkCards}</div>
      </section>

      <section class="mu-donation">
        <h2>Support the Institute</h2>
        <p>Your donation funds future exhibitions, curatorial salaries, and the search for Ben's birthday.</p>
        <div class="mu-thermometer-wrap">
          <div class="mu-thermometer-bg">
            <div class="mu-thermometer-fill" id="thermo-fill"></div>
          </div>
          <p class="mu-thermometer-label">
            <strong>$3 raised</strong> of <strong>$1,000,000</strong> goal.
            Thank you, Gerald.
          </p>
        </div>
      </section>

      <section class="mu-giftshop">
        <p class="mu-eyebrow">Level B1 · Open During Museum Hours</p>
        <h2>The Gift Shop</h2>
        <div class="mu-shop-items">${shopCards}</div>
      </section>

      <footer class="mu-footer">
        <p>© The Institute of Pre-Birthday Contemporary Art · All rights reserved · It is not his birthday today</p>
      </footer>

      <!-- Audio guide modal -->
      <div class="mu-modal-overlay" id="audio-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="mu-modal">
          <button class="mu-modal-close" id="modal-close" aria-label="Close">✕</button>
          <p class="mu-modal-eyebrow" id="modal-eyebrow">🎧 Audio Guide — Stop 1 of ${this.artworks.length}</p>
          <h2 id="modal-title">Loading…</h2>
          <p id="modal-body"></p>
        </div>
      </div>
    `;
  },

  initAudioGuide() {
    const overlay  = document.getElementById('audio-modal');
    const eyebrow  = document.getElementById('modal-eyebrow');
    const title    = document.getElementById('modal-title');
    const body     = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    let currentIdx = 0;

    const open = (idx) => {
      currentIdx = idx;
      const a = this.artworks[idx];
      eyebrow.textContent = `🎧 Audio Guide — Stop ${idx + 1} of ${this.artworks.length}`;
      title.textContent   = `${a.title}, ${a.year}`;
      body.textContent    = a.guide;
      overlay.classList.add('open');
    };

    // Click on any artwork card
    document.querySelectorAll('.mu-artwork').forEach(card => {
      const handler = () => open(parseInt(card.dataset.index, 10));
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
    });

    // Audio tour button cycles through artworks
    let tourIdx = 0;
    document.getElementById('start-audio-guide').addEventListener('click', () => {
      open(tourIdx % this.artworks.length);
      tourIdx++;
    });

    const close = () => overlay.classList.remove('open');
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  },

  initShopButtons() {
    document.querySelectorAll('[data-shop]').forEach(btn => {
      btn.addEventListener('click', function () {
        const original = this.textContent;
        this.textContent = 'Adding…';
        setTimeout(() => {
          this.textContent = 'Coming Soon Since 1987';
          this.disabled = true;
        }, 800);
      });
    });
  },
};
