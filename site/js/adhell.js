/* ============================================================
   adhell.js — Ad Hell: a reusable escalating pop-up-ad gauntlet.

   A self-contained, data-driven module. A host page loads it and
   calls window.AdHell.start(). ~7 full-viewport modal ads erupt one
   at a time; each has ONE real close hidden among decoys. Closing the
   real one yanks you to the next ad (relief → DING → slide-in).

   It is designed to be funny, not hostile — three escape layers:
     1. Every real close genuinely works and advances the gauntlet.
     2. Triple-Esc within 1.5s nukes the entire stack instantly.
     3. A 45s failsafe starts pulsing the current ad's real close.

   Host wiring (see saturday.js):
       window.AdHell.start({ delay: 3000, onFinish: fn });
   Query controls handled by the host: ?adhell=off (skip), ?adhell=on
   (force, no delay). No external assets — all CSS/SVG/emoji.
   ============================================================ */

window.AdHell = {

	// ── The ads (data-driven; edit here to tweak the gauntlet) ────
	// real: which affordance actually closes — 'titlebar' | 'tl' | 'br' | 'dismiss'.
	// Everything else on the ad is a decoy. cta = the big tempting decoy button.
	ads: [
		{
			id: 'millionth', chrome: '🎉 prizewinner.example', real: 'br',
			headline: 'YOU ARE THE 1,000,000<sup>th</sup> VISITOR!',
			sub: 'You have WON… <b>Ben’s Birthday!</b>',
			body:
				'<div class="ah-gift">' +
				'<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">' +
				'<rect x="20" y="50" width="80" height="60" rx="4" fill="#e23b6d"/>' +
				'<rect x="20" y="50" width="80" height="16" fill="#c02857"/>' +
				'<rect x="54" y="50" width="12" height="60" fill="#ffd23f"/>' +
				'<rect x="20" y="50" width="80" height="6" fill="#ffd23f"/>' +
				'<path d="M60 50 C40 30 20 44 60 50 C100 44 80 30 60 50 Z" fill="#ffd23f"/>' +
				'</svg></div>' +
				'<p class="ah-fine">*Birthday not included, not transferable, not his, and not today. ' +
				'Winner responsible for all candles. No purchase necessary; no birthday available.</p>',
			cta: '🎁 CLAIM MY BIRTHDAY'
		},
		{
			id: 'hotdog', chrome: 'meatstream™ ▾', real: 'dismiss',
			headline: 'A WILD HOT DOG APPEARED',
			sub: 'Collect it now! (You cannot collect it.)',
			body:
				'<div class="ah-hotdog">🌭</div>' +
				'<p class="ah-fine">This hot dog is not a birthday cake. No hot dog has ever been a birthday cake. ' +
				'We keep showing you hot dogs because they are all we have.</p>',
			cta: 'COLLECT HOT DOG'
		},
		{
			id: 'cakecaptcha', chrome: 'not-a-robot.example', real: 'titlebar',
			headline: 'Verify you are human',
			sub: 'Select all images containing a <b>birthday cake</b>.',
			body:
				'<div class="ah-captcha" id="ah-captcha">' +
				['🐸', '🌭', '5️⃣', '🌭', '🐸', '🌭', '5️⃣', '🌭', '🐸']
					.map(e => '<button type="button" class="ah-captcha-cell" data-decoy="1">' + e + '</button>').join('') +
				'</div>' +
				'<p class="ah-fine">0 of 0 birthday cakes selected. There are no birthday cakes. There is no verifying. There is only this.</p>',
			cta: 'VERIFY (0 selected)'
		},
		{
			id: 'antivirus', chrome: '⚠ SystemGuard Live™', real: 'tl',
			headline: '47 BIRTHDAYS DETECTED',
			sub: 'Your device is <b>critically infected</b> with birthdays.',
			body:
				'<div class="ah-scan"><div class="ah-scan-bar"></div></div>' +
				'<ul class="ah-threats">' +
				'<li>birthday.exe — <span>QUARANTINED?</span></li>' +
				'<li>candle_worm.dll — <span>SPREADING</span></li>' +
				'<li>cake_particles.tmp — <span>0 found</span></li>' +
				'</ul>' +
				'<p class="ah-fine">SystemGuard is not real, not scanning, and not licensed. The birthdays are also not real. It is not his birthday.</p>',
			cta: 'REMOVE ALL BIRTHDAYS'
		},
		{
			id: 'lawyer', chrome: 'sundial-legal.example', real: 'dismiss',
			headline: 'Were you injured by a <span class="ah-red">SATURDAY?</span>',
			sub: 'The attorneys of SUNDIAL, SUNDIAL, SUNDIAL &amp; SUNDIAL saw that you were injured. All four of them saw it.',
			body:
				'<p class="ah-lawyer-num">CALL 1-800-444-4444</p>' +
				'<p class="ah-fine">You may be entitled to a birthday. You are not entitled to a birthday. ' +
				'No fee unless we win (we have never won). One of our partners is cardboard.</p>',
			cta: '⚖ FREE CONSULTATION'
		},
		{
			id: 'donotclose', chrome: 'system', real: 'br',
			headline: '⚠ DO NOT CLOSE THIS AD',
			sub: 'Closing this ad does nothing bad whatsoever. That is precisely why you must not.',
			body:
				'<p class="ah-warn">Whatever you do, do not press the ✕ in the corner. It works. It closes the ad. ' +
				'Nothing happens. This is the trap.</p>' +
				'<p class="ah-fine">Reverse psychology is our only remaining marketing strategy. It is, statistically, not working.</p>',
			cta: 'KEEP AD OPEN (recommended)'
		},
		{
			id: 'finalboss', chrome: 'https://definitely-safe.example/win', real: 'titlebar', boss: true,
			headline: 'FINAL BOSS',
			sub: 'One of these closes <b>everything</b>. You have spent this whole gauntlet learning not to trust the&nbsp;✕.',
			body:
				'<p class="ah-warn">The exit is the title-bar ✕ — the exact thing every ad taught you to distrust. ' +
				'That was the whole plan. Trust it now.</p>' +
				'<p class="ah-fine">There is no prize behind the door. There never was. It was not his birthday the entire time.</p>',
			cta: 'SURRENDER'
		}
	],

	taunts: [
		'Not that one.', 'So close.', 'That was a decoy.', 'The ✕ lied to you.',
		'Almost. No.', 'That one’s for closers.', 'You’ll learn.', 'Cute. Try again.',
		'Wrong ✕. There are others.', 'Bold. Incorrect.'
	],

	// ── Public entry ──────────────────────────────────────────────
	start(opts) {
		opts = opts || {};
		// Guard the whole window: an already-running gauntlet OR one already
		// scheduled during its start delay (this._s isn't created until _begin).
		if ((this._s && this._s.active) || this._pending) return;
		var self = this;
		var delay = typeof opts.delay === 'number' ? opts.delay : 0;
		this._pending = setTimeout(function () { self._pending = null; self._begin(opts); }, delay);
	},

	// ── Boot the gauntlet ─────────────────────────────────────────
	_begin(opts) {
		var self = this;
		this._s = {
			active: true, idx: 0, busy: false, hint: false,
			escStamps: [], onFinish: (opts && opts.onFinish) || null,
			prevRootOverflow: document.documentElement.style.overflow,
			prevBodyOverflow: document.body.style.overflow
		};

		var layer = document.createElement('div');
		layer.className = 'ah-layer';
		layer.setAttribute('role', 'dialog');
		layer.setAttribute('aria-label', 'Advertisement');
		document.body.appendChild(layer);
		this._s.layer = layer;

		// Lock background scroll while the gauntlet is up. Lock html + body,
		// since the scroll container varies by page.
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		// Triple-Esc escape hatch.
		this._s.onKey = function (e) { self._onKey(e); };
		document.addEventListener('keydown', this._s.onKey);

		// 45s mercy failsafe → start pulsing the real close.
		this._s.failsafe = setTimeout(function () {
			if (!self._s || !self._s.active) return;
			self._s.hint = true;
			var real = self._s.layer.querySelector('.ah-real');
			if (real) real.classList.add('ah-pulse');
		}, 45000);

		this._showAd(0);
	},

	// ── Render one ad ─────────────────────────────────────────────
	_showAd(i) {
		var self = this;
		var ad = this.ads[i];
		var s = this._s;

		var el = document.createElement('div');
		el.className = 'ah-ad' + (ad.boss ? ' ah-boss' : '');   // entrance animation is on .ah-ad
		el.dataset.id = ad.id;

		var counter = (i + 1) + ' / ' + this.ads.length;
		el.innerHTML =
			'<div class="ah-titlebar">' +
				'<span class="ah-chrome">' + ad.chrome + '</span>' +
				'<span class="ah-count">AD ' + counter + '</span>' +
				'<button type="button" class="ah-x ah-x-title" data-role="titlebar" aria-label="Close">✕</button>' +
			'</div>' +
			'<button type="button" class="ah-x ah-x-tl" data-role="tl" aria-label="Close">✕</button>' +
			'<button type="button" class="ah-x ah-x-br" data-role="br" aria-label="Close">✕</button>' +
			'<div class="ah-content">' +
				'<h2 class="ah-headline">' + ad.headline + '</h2>' +
				'<p class="ah-sub">' + ad.sub + '</p>' +
				'<div class="ah-body">' + (ad.body || '') + '</div>' +
				'<button type="button" class="ah-cta" data-role="cta">' + ad.cta + '</button>' +
				'<button type="button" class="ah-dismiss" data-role="dismiss">No thanks, continue to content</button>' +
			'</div>';

		s.layer.appendChild(el);
		s.current = el;

		// Mark the single real affordance; the rest are decoys.
		var real = el.querySelector('[data-role="' + ad.real + '"]');
		if (real) {
			real.classList.add('ah-real');
			if (s.hint) real.classList.add('ah-pulse');
		}

		// Wire every close affordance.
		Array.prototype.forEach.call(el.querySelectorAll('[data-role]'), function (btn) {
			btn.addEventListener('click', function (ev) {
				ev.preventDefault();
				if (s.busy) return;
				if (btn.classList.contains('ah-real')) self._advance();
				else self._decoy(btn);
			});
		});

		// The fake in-ad CAPTCHA cells are pure decoys too.
		Array.prototype.forEach.call(el.querySelectorAll('[data-decoy]'), function (cell) {
			cell.addEventListener('click', function () {
				cell.classList.toggle('ah-picked');
				self._toast(self._pick(self.taunts));
			});
		});
	},

	// ── Real close → relief, DING, next (or finish) ───────────────
	_advance() {
		var self = this;
		var s = this._s;
		s.busy = true;
		var leaving = s.current;
		leaving.classList.add('ah-leaving');       // ~150ms relief

		setTimeout(function () {
			if (!s.active) return;                 // torn down mid-transition (triple-Esc)
			if (leaving && leaving.parentNode) leaving.parentNode.removeChild(leaving);
			s.idx++;
			if (s.idx >= self.ads.length) { self._finish(true); return; }
			self._ding();
			setTimeout(function () { if (!s.active) return; s.busy = false; self._showAd(s.idx); }, 180);
		}, 150);
	},

	// ── Decoy behaviours (never trap — always a real close nearby) ─
	_decoy(btn) {
		var role = btn.getAttribute('data-role');
		if (role === 'tl' || role === 'br') {
			// The corner ✕ flees to a new spot.
			var top = 12 + Math.floor(Math.random() * 66);   // % within the ad
			var left = 6 + Math.floor(Math.random() * 84);
			btn.style.top = top + '%';
			btn.style.left = left + '%';
			btn.style.right = 'auto';
			btn.style.bottom = 'auto';
			this._toast(this._pick(this.taunts));
		} else if (role === 'titlebar') {
			btn.classList.remove('ah-shake'); void btn.offsetWidth;
			btn.classList.add('ah-shake');
			this._toast(this._pick(this.taunts));
		} else if (role === 'cta') {
			if (btn.dataset.loading) return;
			btn.dataset.loading = '1';
			var label = btn.textContent;
			btn.classList.add('ah-loading');
			btn.textContent = 'PROCESSING…';
			var self = this;
			setTimeout(function () {
				btn.textContent = 'SIKE';
				setTimeout(function () {
					btn.textContent = label;
					btn.classList.remove('ah-loading');
					delete btn.dataset.loading;
				}, 700);
			}, 750);
			this._toast('There was never a prize.');
		} else { // dismiss decoy
			this._toast('That was an ad for the “No thanks” button.');
		}
	},

	// ── Triple-Esc → nuke ─────────────────────────────────────────
	_onKey(e) {
		if (e.key !== 'Escape' && e.key !== 'Esc') return;
		var s = this._s;
		if (!s || !s.active) return;
		var now = (typeof e.timeStamp === 'number' ? e.timeStamp : 0);
		s.escStamps.push(now);
		s.escStamps = s.escStamps.filter(function (t) { return now - t <= 1500; });
		if (s.escStamps.length >= 3) { this._toast('You found the exit. Impressive.'); this._finish(false); }
	},

	// ── Visual + faint audio DING between ads ─────────────────────
	_ding() {
		var s = this._s;
		if (!s || !s.layer) return;
		var d = document.createElement('div');
		d.className = 'ah-ding';
		d.textContent = '🔔 DING';
		s.layer.appendChild(d);
		setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 420);
		try {
			var Ctx = window.AudioContext || window.webkitAudioContext;
			if (!Ctx) return;
			this._actx = this._actx || new Ctx();
			var o = this._actx.createOscillator(), g = this._actx.createGain();
			o.type = 'sine'; o.frequency.value = 880;
			g.gain.value = 0.04;
			o.connect(g); g.connect(this._actx.destination);
			o.start();
			g.gain.exponentialRampToValueAtTime(0.0001, this._actx.currentTime + 0.18);
			o.stop(this._actx.currentTime + 0.2);
		} catch (err) { /* audio optional */ }
	},

	// ── Tear down (complete OR escaped) ───────────────────────────
	_finish(completed) {
		var s = this._s;
		if (!s || !s.active) return;
		s.active = false;
		clearTimeout(s.failsafe);
		document.removeEventListener('keydown', s.onKey);
		document.documentElement.style.overflow = s.prevRootOverflow || '';
		document.body.style.overflow = s.prevBodyOverflow || '';
		if (s.layer && s.layer.parentNode) s.layer.parentNode.removeChild(s.layer);
		this._toast(completed
			? '🕯️ The ads are gone. It is still not Ben’s birthday.'
			: 'The ads retreat. It was never his birthday.');
		if (typeof s.onFinish === 'function') { try { s.onFinish(completed); } catch (e) {} }
	},

	// ── Helpers ───────────────────────────────────────────────────
	_pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },

	_toast(msg) {
		var t = document.createElement('div');
		t.className = 'ah-toast';
		t.textContent = msg;
		document.body.appendChild(t);
		void t.offsetWidth;
		t.classList.add('ah-toast-show');
		setTimeout(function () {
			t.classList.remove('ah-toast-show');
			setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300);
		}, 1600);
	}
};
