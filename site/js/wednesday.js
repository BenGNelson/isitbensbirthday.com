/* ============================================================
   wednesday.js — SUNDIAL, SUNDIAL, SUNDIAL & SUNDIAL
                  ATTORNEYS AT LAW
   A fully-committed late-night-TV injury mill. Slip, fall, bite,
   wreck — if you have a body, you have a case. The firm has four
   name partners (all Chip, one mannequin, one cardboard cutout)
   and a perfect 0–1 record.

   THE BIT (payload, not wallpaper): this hyper-generic ambulance
   chaser has only ever taken ONE case to trial — and lost —
   *The People v. It Not Being His Birthday.* The birthday
   punchline lands only in the landmark case, the "you've been
   served" reversal, and the 6px disclaimer. Everything else is
   straight, scummy, evergreen lawyer comedy.

   Hosts the ARG clue `wed-admin` via the footer CASE MANAGEMENT
   SYSTEM login (operator = the greyed, never-changed `admin`).
   ============================================================ */

window.Wednesday = {
	clueRecorded: false,

	// ── Content data (edit here to tweak the bit) ─────────────────
	practiceAreas: [
		{ icon: '🩹', title: 'Slip &amp; Fall', blurb: 'You fell. A floor did that. We will determine whose floor, then aggressively befriend the concept of “whose.”' },
		{ icon: '🐕', title: 'Dog Bites', blurb: 'A dog. Teeth. You. In most jurisdictions that sequence is legally a check with your name on it.' },
		{ icon: '🚛', title: '18-Wheeler Wrecks', blurb: 'Big truck. Bigger settlement. Biggest billboard on the interstate (that one is ours).' },
		{ icon: '🍞', title: 'Defective Products', blurb: 'Your toaster betrayed you. Toasters have assets. Let us, together, liquidate a toaster.' },
		{ icon: '☠️', title: 'Toxic Exposure', blurb: 'Were you, at any point, near a substance? You were. Everything is a substance. You are a substance.' },
		{ icon: '🦺', title: 'Workplace Injury', blurb: 'Injured at work. Or commuting. Or thinking about work in the shower. All compensable. Especially the shower.' },
		{ icon: '⚓', title: 'Maritime &amp; Aviation', blurb: 'Hurt on a boat? A plane? A boat you only imagined? Chip will allege you were aboard. Chip flies.' },
		{ icon: '🩼', title: 'Slip &amp; Fall (Again)', blurb: 'We are exceptionally good at this one. It is most of what we do. It is not, legally, what we do.' }
	],

	qualifyItems: [
		'You currently have, or have at any point had, a body.',
		'That body has been in the vicinity of a floor.',
		'You have personally experienced at least one (1) surface.',
		'A product exists somewhere that you have, at some point, touched.',
		'You are, broadly, capable of alleging.',
		'If offered money, you would — after a respectful pause — accept it.'
	],

	testimonials: [
		{ stars: 5, quote: 'Chip got me a settlement of $0 and I have never in my life felt more represented.', who: 'G. P. — Verified Non-Client' },
		{ stars: 5, quote: 'I slipped. I fell. I called. I slipped again on the way to the phone. They opened a second file.', who: 'Anonymous — Two Active Matters' },
		{ stars: 5, quote: 'All four Mr. Sundials shook my hand at once. On reflection it was one hand. Five stars.', who: 'A. R. — Deposed Cheerfully' },
		{ stars: 5, quote: 'I was not injured. Chip alleged that I was. I feel injured now. That is service.', who: 'Former Bystander' },
		{ stars: 5, quote: 'The billboard found me before the accident did. Honestly a little ahead of schedule.', who: 'Undisclosed — Interstate 4' },
		{ stars: 5, quote: 'I asked what case they were actually working on. The room went quiet. One of them whispered a date.', who: 'Matter Under Advisement' }
	],

	tickerItems: [
		'NOW ACCEPTING: SLIP · TRIP · FALL · BITE · WRECK',
		'FREE CONSULTATION',
		'NO FEE UNLESS WE WIN',
		'CASES WON: 0',
		'AGGRESSION LEVEL: MAXIMUM',
		'MILLIONS RECOVERED: PENDING',
		'ATTORNEYS STANDING BY (LITERALLY, ONE IS CARDBOARD)',
		'CURRENTLY LITIGATING: 1 MATTER'
	],

	partners: [
		{
			svg: 'chip', name: 'CHIP SUNDIAL, ESQ.', role: 'Founding Partner · “The Litigator”',
			facts: [['Bar Number', 'PENDING (VERY CONFIDENT)'], ['Experience', '38 years, extremely angry'], ['Losses', '1 (we do not discuss it)']],
			text: 'Chip founded the firm on a single principle: someone owes you money, and he will allege precisely who. When he is not litigating, Chip is on the phone. He is on the phone right now. He is on the phone with you.'
		},
		{
			svg: 'chip-red', name: 'CHIP SUNDIAL, ESQ.', role: 'Founding Partner · Different Tie',
			facts: [['Bar Number', 'ALSO PENDING'], ['Experience', 'The identical 38 years'], ['Relation to above', 'Is, in fact, above']],
			text: 'Also Chip. The firm counts him separately for letterhead, billing, and intimidation purposes. Observe the tie. It is a different tie. Legally, therefore, this is a different partner. Do not overthink it. We didn’t.'
		},
		{
			svg: 'manne', name: 'THE OTHER MR. SUNDIAL', role: 'Named Partner · Does Not Speak',
			facts: [['Cases Lost', '0'], ['Cases Taken', '0'], ['Words Spoken', '0']],
			text: 'Retains full billing privileges and an immaculate, unblemished record. Has never lost, never appeared, and is — in the strictest sense — a mannequin. The firm asks that you not attempt eye contact; he is not equipped to return it.'
		},
		{
			svg: 'card', name: '&amp; SUNDIAL', role: 'Named Partner · Two-Dimensional',
			facts: [['Material', 'Cardboard'], ['Licensed', 'To the exact degree as the others'], ['Depth', 'None, literally']],
			text: 'A life-size cardboard cutout of Chip, propped in the corner of every deposition and photographed for the masthead. Fully as qualified as the rest of the firm. Please do not lean on him. He has, frankly, leaned on you enough.'
		}
	],

	init(app) {
		app.innerHTML = this.buildHTML();
		this.initModal();
		this.initMasthead();
		this.initCountdown();
		this.initQualify();
		this.initPhones();
		this.initRedact();
		this.initForm();
		this.initCaseLogin();
	},

	// ── Small helpers ─────────────────────────────────────────────
	starRow(n) {
		return '★★★★★'.slice(0, n) + '<span class="law-star-empty">' + '★★★★★'.slice(n) + '</span>';
	},

	escapeHtml(s) {
		return String(s).replace(/[&<>"']/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
		});
	},

	buildHTML() {
		const marquee =
			'⚖ IF YOU OR A LOVED ONE HAS A BODY, YOU MAY BE ENTITLED TO COMPENSATION ' +
			'⚖ CALL 1-800-444-4444 ⚖ CHIP DOES NOT SLEEP ⚖ SLIP · FALL · BITE · WRECK · REPEAT ' +
			'⚖ NO FEE UNLESS WE WIN (WE HAVE NEVER WON) ';

		const ledDot = '<span class="law-led-dot">●</span>';
		// Trailing dot makes each copy self-contained, so two identical copies
		// loop seamlessly under the -50% translate (no stutter at the wrap point).
		const tickerUnit = this.tickerItems.map(t => '<span class="law-led-item">' + t + '</span>').join(ledDot) + ledDot;

		const areas = this.practiceAreas.map(a => `
			<div class="law-area">
				<div class="law-area-icon">${a.icon}</div>
				<div class="law-area-title">${a.title}</div>
				<div class="law-area-blurb">${a.blurb}</div>
			</div>`).join('');

		const qualify = this.qualifyItems.map((q, i) => `
			<li class="law-qual-item" data-qi="${i}">
				<span class="law-qual-box" aria-hidden="true">☐</span>
				<span class="law-qual-text">${q}</span>
				<span class="law-qual-verdict">YOU QUALIFY</span>
			</li>`).join('');

		const reviews = this.testimonials.map(t => `
			<figure class="law-review">
				<div class="law-review-stars">${this.starRow(t.stars)}</div>
				<blockquote class="law-review-quote">“${t.quote}”</blockquote>
				<figcaption class="law-review-who">— ${t.who}</figcaption>
			</figure>`).join('');

		const bios = this.partners.map(p => `
			<article class="law-bio">
				<div class="law-bio-figure">${this.svgFor(p.svg)}</div>
				<div class="law-bio-body">
					<h3 class="law-bio-name">${p.name}</h3>
					<div class="law-bio-role">${p.role}</div>
					<dl class="law-bio-facts">
						${p.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}
					</dl>
					<p class="law-bio-text">${p.text}</p>
				</div>
			</article>`).join('');

		return `
		<div class="law-page">

			<!-- Scrolling alert marquee -->
			<div class="law-marquee" role="marquee" aria-label="Legal alert">
				<span class="law-urgent">URGENT</span>
				<div class="law-marquee-track"><span>${marquee}</span><span>${marquee}</span></div>
			</div>

			<!-- Top bar / firm identity -->
			<header class="law-top">
				<div class="law-crest">
					<div class="law-crest-mark">⚖</div>
					<div class="law-crest-text">
						<div class="law-firm" id="law-firm-names">SUNDIAL, SUNDIAL, SUNDIAL &amp; SUNDIAL</div>
						<div class="law-firm-sub">ATTORNEYS AT LAW</div>
						<div class="law-firm-aside" id="law-firm-aside"></div>
					</div>
				</div>
				<button class="law-phone law-cta-phone" type="button">
					<span class="law-phone-live">● LINE OPEN</span>
					<span class="law-phone-num">1-800-444-4444</span>
					<span class="law-phone-note">that’s 444-4444 — just press 4</span>
				</button>
			</header>

			<!-- Hero -->
			<section class="law-hero">
				<div class="law-hero-copy">
					<div class="law-hero-eyebrow">★ AGGRESSIVE · AVAILABLE · AIRBORNE ★</div>
					<h1 class="law-hero-head">INJURED? <span class="law-hl">YOU’RE OWED MONEY.</span></h1>
					<p class="law-hero-sub">The attorneys of Sundial, Sundial, Sundial &amp; Sundial have recovered millions<span class="law-ast">*</span> for families like yours. We are aggressive. We are available. We take slips, falls, bites, and wrecks — and, between us, we take exactly one other kind of case. You’ll find out at the bottom. Everyone does.</p>
					<div class="law-hero-actions">
						<button class="law-btn law-btn-huge law-cta-phone" type="button">CALL NOW &nbsp;1-800-444-4444</button>
						<div class="law-hero-fineprint">FREE consultation<span class="law-ast">*</span> &nbsp;·&nbsp; No fee unless we win<span class="law-ast">**</span></div>
					</div>
					<div class="law-badges">
						<span class="law-badge">★ AS SEEN AT 3 A.M. ★</span>
						<span class="law-badge">152 YEARS COMBINED<span class="law-ast">†</span></span>
						<span class="law-badge law-badge-star">FIVE-STAR RATED BY US</span>
					</div>
				</div>
				<div class="law-hero-figure">
					${this.svgFor('chip')}
					<div class="law-hero-tag">CHIP SUNDIAL, <span>ESQ. ×4</span></div>
				</div>
			</section>

			<!-- Red-LED settlement-mill ticker -->
			<div class="law-led" aria-label="Intake ticker">
				<div class="law-led-label">LIVE INTAKE</div>
				<div class="law-led-screen"><div class="law-led-track">${tickerUnit}${tickerUnit}</div></div>
			</div>

			<!-- Do You Qualify -->
			<section class="law-section law-qualify">
				<h2 class="law-h2">DO YOU QUALIFY?</h2>
				<p class="law-lede">You do. Statistically, you are already hurt. Run our proprietary eligibility engine to confirm what we both suspect:</p>
				<ul class="law-qual-list">${qualify}</ul>
				<div class="law-qual-cta">
					<button class="law-btn law-btn-gold" id="law-qual-btn" type="button">AM I ELIGIBLE?</button>
					<div class="law-qual-result" id="law-qual-result" aria-live="polite"></div>
				</div>
			</section>

			<!-- Practice areas -->
			<section class="law-section law-practice">
				<h2 class="law-h2">PRACTICE AREAS</h2>
				<p class="law-lede">Eight ways the physical world has, most likely, already wronged you.</p>
				<div class="law-areas">${areas}</div>
			</section>

			<!-- Track record + the payload landmark case -->
			<section class="law-record">
				<div class="law-stats">
					<div class="law-stat"><div class="law-stat-num">1</div><div class="law-stat-lbl">Cases Tried</div></div>
					<div class="law-stat law-stat-bad"><div class="law-stat-num">0</div><div class="law-stat-lbl">Cases Won</div></div>
					<div class="law-stat"><div class="law-stat-num"><span class="law-redact" id="law-redact" title="Click to unseal recovered damages">██████</span></div><div class="law-stat-lbl">Recovered</div></div>
					<div class="law-stat"><div class="law-stat-num">24/7</div><div class="law-stat-lbl">Availability</div></div>
				</div>
				<div class="law-landmark">
					<div class="law-landmark-kicker">THE ONLY CASE WE HAVE EVER TAKEN</div>
					<div class="law-landmark-case"><em>The People v. It Not Being His Birthday</em></div>
					<p class="law-landmark-body">In the firm’s entire history, Sundial, Sundial, Sundial &amp; Sundial has taken exactly one matter to trial. We represented the birthday. We argued, for eleven hours, that today should be Ben’s birthday. We lost. We appeal every single day, and every single day we lose again. It is — as of this filing — still not his birthday. This is the only case we have ever wanted. Between you and us: it is the only case there is.</p>
				</div>
			</section>

			<!-- Testimonials -->
			<section class="law-section law-reviews-sec">
				<h2 class="law-h2">WHAT THE VERIFIABLY REAL CLIENTS SAY</h2>
				<div class="law-reviews">${reviews}</div>
			</section>

			<!-- Meet the (multiplying) partners -->
			<section class="law-section law-bios">
				<h2 class="law-h2">MEET THE NAME PARTNERS</h2>
				<p class="law-lede">Four attorneys. One face. Roughly one and a half of them are alive.</p>
				<div class="law-bio-grid">${bios}</div>
			</section>

			<!-- Consultation form (it litigates you) -->
			<section class="law-section law-consult">
				<h2 class="law-h2">GET YOUR <span class="law-hl">FREE</span> CONSULTATION<span class="law-ast">*</span></h2>
				<p class="law-lede">Tell us how you were hurt. By submitting, you retain Sundial, Sundial, Sundial &amp; Sundial. Against yourself. It’s complicated. It’s free<span class="law-ast">*</span>.</p>
				<form class="law-form" id="law-form" novalidate>
					<div class="law-form-row">
						<label class="law-field">
							<span class="law-field-lbl">Your full legal name</span>
							<input type="text" id="law-name" name="name" class="law-input" placeholder="e.g., a concerned party" autocomplete="off">
						</label>
						<label class="law-field">
							<span class="law-field-lbl">Best number for Chip to already be calling</span>
							<input type="text" id="law-tel" name="tel" class="law-input" placeholder="Chip is probably calling it now" autocomplete="off">
						</label>
					</div>
					<label class="law-field">
						<span class="law-field-lbl">Briefly describe your injury (optional — we’ll allege one)</span>
						<textarea id="law-desc" name="desc" class="law-input law-textarea" rows="3" placeholder="Leave blank and our team will invent a compelling, courtroom-ready injury on your behalf."></textarea>
					</label>
					<div class="law-form-row">
						<label class="law-field">
							<span class="law-field-lbl">Which surface betrayed you?</span>
							<select id="law-surface" name="surface" class="law-input law-select">
								<option value="">— select —</option>
								<option>A floor (classic)</option>
								<option>A different floor</option>
								<option>A stair (the big leagues)</option>
								<option>No surface (we’ll allege a floor)</option>
							</select>
						</label>
						<label class="law-field">
							<span class="law-field-lbl">Were you, at the time, a person?</span>
							<select id="law-person" name="person" class="law-input law-select">
								<option value="">— select —</option>
								<option>Yes (strong case)</option>
								<option>No (stronger case)</option>
								<option>Prefer not to incriminate myself</option>
							</select>
						</label>
					</div>
					<label class="law-check">
						<input type="checkbox" id="law-waive" name="waive">
						<span>I knowingly and enthusiastically waive all rights, including several I do not possess, and consent to being represented against my own interests by up to four (4) attorneys, at least one of whom is cardboard.</span>
					</label>
					<button type="submit" class="law-btn law-btn-huge law-form-submit">SUE ON MY BEHALF &nbsp;→</button>
				</form>
			</section>

			<!-- Case Management System login — the ARG clue -->
			<section class="law-section law-cms" id="law-cms">
				<div class="law-cms-box">
					<div class="law-cms-tape"></div>
					<div class="law-cms-sticky">
						<span class="law-sticky-line">Chip —</span>
						<span class="law-sticky-line">the CMS login is <u>still</u> just “admin”.</span>
						<span class="law-sticky-line">all four of you know it. please change it.</span>
						<span class="law-sticky-sign">— (the cardboard one)</span>
					</div>
					<div class="law-cms-head">
						<span class="law-cms-lock">🔒</span>
						SUNDIAL CASE MANAGEMENT SYSTEM
					</div>
					<div class="law-cms-sub">AUTHORIZED PERSONNEL ONLY · v1.0 (2019) · UNPATCHED</div>
					<div class="law-cms-field">
						<label for="law-cms-user">Operator</label>
						<input type="text" id="law-cms-user" class="law-cms-input law-cms-locked" value="admin" readonly title="Default operator — Chip never changed it">
					</div>
					<div class="law-cms-field">
						<label for="law-cms-pass">Password</label>
						<input type="password" id="law-cms-pass" class="law-cms-input" placeholder="••••••••" autocomplete="off">
					</div>
					<button type="button" class="law-cms-btn" id="law-cms-signin">SIGN IN</button>
					<div class="law-cms-msg" id="law-cms-msg" aria-live="polite"></div>
				</div>
			</section>

			<!-- 6px disclaimer footer -->
			<footer class="law-disclaimer">
				SUNDIAL, SUNDIAL, SUNDIAL &amp; SUNDIAL, ATTORNEYS AT LAW, is not a law firm, is not attorneys, and is not four of anything. “Chip Sundial, Esq.” (×4) is one man, at least one mannequin, and one cardboard cutout; “Esq.” abbreviates nothing. Nothing on this page is legal advice, factual, or advisable. 1-800-444-4444 does not connect to a telephone. Prior results (0–1) do not guarantee similar outcomes; they guarantee identical ones. “152 years combined experience” is 38 years counted four times. “Millions recovered” is a black rectangle. “FREE consultation” consists entirely of being sued, by us, on your behalf. The firm’s sole active matter — the only case it has ever taken or ever wanted — is, and has always been, the ongoing failure of this day to be Ben’s birthday; by reading this disclaimer at 6px you are now legally aware that it is not his birthday, and it is not. Void where prohibited, which is everywhere. © Sundial, Sundial, Sundial &amp; Sundial. All wrongs reserved.
			</footer>

			<!-- Countdown ribbon -->
			<div class="law-countdown" aria-hidden="true">
				⏰ FREE-CONSULTATION OFFER EXPIRES IN <span id="law-clock">05:00</span> — THEN RESETS, LIKE A STATUTE OF LIMITATIONS WE INVENTED
			</div>

			<!-- Reusable modal -->
			<div class="law-modal-overlay" id="law-modal" style="display:none">
				<div class="law-modal">
					<button class="law-modal-x" id="law-modal-x" type="button" aria-label="Close">✕</button>
					<div class="law-modal-body" id="law-modal-body"></div>
				</div>
			</div>

		</div>`;
	},

	// ── SVG caricatures (CSS/SVG only — no raster, no real likeness) ──
	svgFor(kind) {
		if (kind === 'manne') return this.mannequinSVG();
		if (kind === 'chip-red') return this.chipSVG({ compact: true, tie: '#c8102e', knot: '#7c0a1c' });
		if (kind === 'card') return this.chipSVG({ compact: true, flat: true });
		if (kind === 'chip') return this.chipSVG();
		return this.chipSVG({ compact: true });
	},

	chipSVG(opts) {
		opts = opts || {};
		const tie = opts.tie || '#d4af37';
		const knot = opts.knot || '#b8901f';
		const cls = 'law-svg' + (opts.compact ? ' law-svg-compact' : '') + (opts.flat ? ' law-svg-flat' : '');
		return `
		<svg class="${cls}" viewBox="0 0 240 280" role="img" aria-label="A confident cartoon attorney in a suit, pointing directly at you">
			<ellipse cx="120" cy="120" rx="112" ry="120" fill="#d4af37" opacity="0.10"/>
			<path d="M46 280 Q52 168 92 150 L120 176 L148 150 Q188 168 194 280 Z" fill="#16283f"/>
			<path d="M120 176 L96 152 L120 210 Z" fill="#0f1f33"/>
			<path d="M120 176 L144 152 L120 210 Z" fill="#0f1f33"/>
			<path d="M108 152 L120 176 L132 152 L128 210 L112 210 Z" fill="#f7f1e1"/>
			<path d="M120 176 L113 186 L120 250 L127 186 Z" fill="${tie}"/>
			<path d="M113 168 L127 168 L120 178 Z" fill="${knot}"/>
			<rect x="110" y="132" width="20" height="26" rx="6" fill="#e8b48c"/>
			<ellipse cx="120" cy="104" rx="42" ry="46" fill="#f0c19a"/>
			<path d="M78 96 Q80 52 120 50 Q160 52 162 96 Q150 74 120 74 Q90 74 78 96 Z" fill="#2a2015"/>
			<path d="M120 74 Q150 74 162 96 L156 84 Q140 66 120 68 Z" fill="#3a2c1c"/>
			<g fill="#c9a23a" stroke="#8a6c14" stroke-width="2">
				<rect x="92" y="98" width="24" height="17" rx="8"/>
				<rect x="124" y="98" width="24" height="17" rx="8"/>
			</g>
			<line x1="116" y1="103" x2="124" y2="103" stroke="#8a6c14" stroke-width="2"/>
			<path d="M100 126 Q120 146 140 126 Q120 134 100 126 Z" fill="#fff"/>
			<line x1="110" y1="129" x2="110" y2="135" stroke="#d8d2c2" stroke-width="1.4"/>
			<line x1="120" y1="131" x2="120" y2="138" stroke="#d8d2c2" stroke-width="1.4"/>
			<line x1="130" y1="129" x2="130" y2="135" stroke="#d8d2c2" stroke-width="1.4"/>
			<path d="M150 168 Q196 176 210 224 Q214 244 196 250 L172 236 Q160 196 146 186 Z" fill="#16283f"/>
			<ellipse cx="196" cy="244" rx="26" ry="22" fill="#f0c19a"/>
			<rect x="196" y="236" width="40" height="15" rx="7" fill="#f0c19a"/>
			<circle cx="234" cy="243" r="8" fill="#f0c19a"/>
			<rect x="176" y="228" width="10" height="26" rx="3" fill="#d4af37" transform="rotate(28 181 241)"/>
		</svg>`;
	},

	mannequinSVG() {
		return `
		<svg class="law-svg law-svg-compact law-svg-manne" viewBox="0 0 240 280" role="img" aria-label="A featureless mannequin in a suit, standing perfectly still">
			<ellipse cx="120" cy="120" rx="112" ry="120" fill="#7a8595" opacity="0.10"/>
			<path d="M52 280 Q54 172 96 158 L120 178 L144 158 Q186 172 188 280 Z" fill="#20242b"/>
			<path d="M108 158 L120 178 L132 158 L128 214 L112 214 Z" fill="#e7e2d6"/>
			<path d="M120 178 L114 188 L120 246 L126 188 Z" fill="#3a3f48"/>
			<rect x="112" y="128" width="16" height="30" rx="4" fill="#cfc7b6"/>
			<ellipse cx="120" cy="100" rx="40" ry="48" fill="#d8d1c2"/>
			<path d="M120 54 Q152 60 158 104 Q158 132 138 146 L120 148 Z" fill="#c7bfae" opacity="0.55"/>
			<line x1="120" y1="54" x2="120" y2="148" stroke="#b3ab99" stroke-width="1.5" opacity="0.7"/>
			<circle cx="120" cy="50" r="7" fill="#b3ab99"/>
		</svg>`;
	},

	// ── Reusable modal ────────────────────────────────────────────
	initModal() {
		this.modal = document.getElementById('law-modal');
		this.modalBody = document.getElementById('law-modal-body');
		const close = () => { this.modal.style.display = 'none'; };
		document.getElementById('law-modal-x').addEventListener('click', close);
		this.modal.addEventListener('click', (e) => { if (e.target === this.modal) close(); });
	},

	showModal(html) {
		this.modalBody.innerHTML = html;
		this.modal.style.display = 'flex';
		const ok = this.modalBody.querySelector('.law-modal-ok');
		if (ok) ok.addEventListener('click', () => { this.modal.style.display = 'none'; });
	},

	// ── Masthead: the name keeps growing another Sundial ──────────
	initMasthead() {
		const el = document.getElementById('law-firm-names');
		const aside = document.getElementById('law-firm-aside');
		if (!el) return;
		let n = 4;
		const MAX = 6;
		if (this._grow) clearInterval(this._grow);
		const render = () => {
			const names = [];
			for (let i = 0; i < n; i++) names.push('SUNDIAL');
			el.innerHTML = names.slice(0, -1).join(', ') + ' &amp; ' + 'SUNDIAL';
		};
		this._grow = setInterval(() => {
			n++;
			render();
			if (n >= MAX) {
				clearInterval(this._grow);
				aside.textContent = 'name partners: ' + n + ' — all Chip, one mannequin, one cardboard.';
			}
		}, 4500);
	},

	// ── Countdown ribbon (resets forever) ─────────────────────────
	initCountdown() {
		const el = document.getElementById('law-clock');
		let remaining = 300; // 5:00
		if (this._countdown) clearInterval(this._countdown);
		this._countdown = setInterval(() => {
			remaining -= 1;
			if (remaining < 0) remaining = 300; // never actually expires
			const m = Math.floor(remaining / 60);
			const s = (remaining % 60).toString().padStart(2, '0');
			el.textContent = m + ':' + s;
		}, 1000);
	},

	// ── "Do You Qualify?" — everyone qualifies ────────────────────
	initQualify() {
		const btn = document.getElementById('law-qual-btn');
		const result = document.getElementById('law-qual-result');
		const items = Array.prototype.slice.call(document.querySelectorAll('.law-qual-item'));

		btn.addEventListener('click', () => {
			btn.disabled = true;
			btn.textContent = 'ASSESSING…';
			result.textContent = '';
			items.forEach(li => li.classList.remove('checked'));

			let i = 0;
			const step = () => {
				if (i >= items.length) {
					const stamp = document.createElement('div');
					stamp.className = 'law-qual-stamp';
					stamp.textContent = 'YOU QUALIFY';
					result.appendChild(stamp);
					const note = document.createElement('div');
					note.className = 'law-qual-note';
					note.textContent = 'Congratulations — your case has been pre-filed. We do not yet know what happened to you. We will allege something. That is the Sundial difference. (The Sundial difference is that you now have a case.)';
					result.appendChild(note);
					btn.textContent = 'YOU QUALIFIED';
					return;
				}
				const li = items[i];
				li.classList.add('checked');
				const box = li.querySelector('.law-qual-box');
				if (box) box.textContent = '☑';
				i++;
				setTimeout(step, 320);
			};
			setTimeout(step, 400);
		});
	},

	// ── Phone CTAs → "Chip is already on the line" ────────────────
	initPhones() {
		const phones = document.querySelectorAll('.law-cta-phone');
		phones.forEach(p => p.addEventListener('click', () => {
			this.showModal(`
				<div class="law-modal-kicker">◉ CONNECTING</div>
				<h3 class="law-modal-title">1-800-444-4444</h3>
				<p>Please hold while we connect you to the attorneys of Sundial, Sundial, Sundial &amp; Sundial.</p>
				<p><strong>All four are already on the line.</strong> They have been on the line since 2019. They never left the line. Three of them are Chip; one is a mannequin, breathing into the receiver with real conviction. There is no hold music. There is only Chip, asking whether a floor did this to you.</p>
				<p class="law-modal-fine">A floor did this to you. Chip already knows. Chip has always known.</p>
				<button class="law-btn law-btn-gold law-modal-ok" type="button">HANG UP (CHIP WILL NOT)</button>
			`);
		}));
	},

	// ── "Millions recovered" redaction → $0 ───────────────────────
	initRedact() {
		const r = document.getElementById('law-redact');
		if (!r) return;
		r.addEventListener('click', () => {
			r.classList.add('unsealed');
			r.textContent = '$0';
			r.title = 'Recovered to date';
		});
	},

	// ── Consultation form → you get served ────────────────────────
	initForm() {
		const form = document.getElementById('law-form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const nameEl = document.getElementById('law-name');
			const name = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'A CONCERNED PARTY';
			// Escape — the name is interpolated into modal innerHTML (avoid self-XSS / broken markup).
			const upper = this.escapeHtml(name.toUpperCase());
			this.showModal(`
				<div class="law-modal-served">⚖ YOU HAVE BEEN SERVED ⚖</div>
				<h3 class="law-modal-title">NOTICE OF SUIT</h3>
				<p class="law-modal-caption"><strong>SUNDIAL, SUNDIAL, SUNDIAL &amp; SUNDIAL</strong>, having reviewed your matter for approximately zero seconds, hereby accepts representation in the case of:</p>
				<div class="law-vs">${upper} <span>v.</span> ${upper}</div>
				<p>You have retained us to sue you. We have accepted. You are both plaintiff and defendant; all four partners represent each of you with equal, aggressive devotion. We are very good at this. We are 0–1 at this.</p>
				<p class="law-modal-fine">Filed under the firm’s sole active matter — <em>re: the ongoing failure of this day to be his birthday.</em> Estimated resolution: never. Estimated cost to you: free<span class="law-ast">*</span>. Estimated outcome: it will still not be Ben’s birthday. It is not. That remains the injury. That remains the case.</p>
				<button class="law-btn law-btn-gold law-modal-ok" type="button">ACCEPT SERVICE</button>
			`);
		});
	},

	// ── Case Management login → ARG clue `wed-admin` ──────────────
	recordClue() {
		if (this.clueRecorded) return;
		// Latch only once the clue is actually recorded. If hunt.js hasn't
		// finished loading yet, leave it unlatched so a later interaction retries
		// rather than dropping the clue permanently for the session.
		if (window.Hunt) {
			this.clueRecorded = true;
			window.Hunt.find('wed-admin');
		}
	},

	initCaseLogin() {
		const signin = document.getElementById('law-cms-signin');
		const pass = document.getElementById('law-cms-pass');
		const msg = document.getElementById('law-cms-msg');

		// Engaging the operator console at all is the discovery — the greyed,
		// unchangeable `admin` username IS the clue (the operator account).
		const reveal = () => {
			this.recordClue();
			msg.innerHTML = '<span class="law-cms-auth">AUTHENTICATING…</span>';
			setTimeout(() => {
				msg.innerHTML =
					'<span class="law-cms-deny">ACCESS DENIED</span>' +
					'<span class="law-cms-detail">Operator <b>admin</b> recognized — password rejected. ' +
					'The default operator account was never renamed; across all four partners, the login has always been <b>admin</b>. ' +
					'The word that follows it is not written down here — Chip is many things, but he is not reckless. ' +
					'(Chip is extremely reckless. The word is simply kept somewhere else.)</span>';
			}, 1100);
		};

		signin.addEventListener('click', reveal);
		// Typing into the password field also counts as "using" the console.
		if (pass) pass.addEventListener('focus', () => this.recordClue());
	},
};
