/* ============================================================
   wednesday.js — BirthdAI™ v0.0.1-alpha
   A completely broken AI birthday detection system.
   Built by Synapse Dynamics LLC. Trained on frog vocalization
   patterns, hagfish slime viscosity, and naked mole rat
   biometrics. Operational: 847 days. Detected: 0 birthdays.
   ============================================================ */

window.Wednesday = {
	confidence: 97 + Math.random() * 2,
	buttonCount: 4,
	detectRunning: false,
	chatTyping: false,
	extraButtonIdx: 0,
	driftActive: false,

	aiResponses: [
		'Based on current frog vocalization data (n=847 nights), the probability of birthday conditions is estimated at 0.003%. This is within expected parameters. I am confident.',
		'HAGFISH™ diagnostic complete. Slime viscosity: 4.2 mPa·s (nominal). Birthday likelihood: 0.003%. The hagfish are well. Thank you for your patience.',
		'Interesting query. Cross-referencing with naked mole rat biometric baselines. No birthday signatures detected. The mole rats are in agreement. They usually are.',
		"I understand your query. The answer is no. If your question was not 'is it Ben's birthday,' the answer remains no. My expertise is birthday detection. I am the best at it. (2nd globally.)",
		'I have been operational for 847 days. I have processed 3.2 million data points. I have detected 0 birthdays. This is either a testament to my precision or evidence of a systemic issue. I believe it is the former.',
		'Frog behavioral indices: nominal. Frogs exhibit elevated call frequency on non-birthday nights, which is exactly what is occurring. This confirms my determination. Thank you.',
		'The Birthday Detection Crisis of 2020 claimed an estimated 340,000 undetected birthdays globally. We exist to prevent that. We have prevented 0 birthdays from going undetected because we have detected 0 birthdays. Our prevention record is perfect.',
		'According to our records, the subject (Ben) was born on July 5th. Today is not July 5th. I know this because we have a calendar. The calendar is one of our most sophisticated tools.',
		'ERROR 404: Birthday not found. (This error has been resolved. It has not been resolved.) Confidence remains at 98.7%. Monitoring continues.',
		'Your query has been logged, analyzed, and cross-referenced with frog vocalization models from 14 field stations. Result: not a birthday. This determination is final.',
		'Naked mole rat subcutaneous temperature variance: 0.3°C. This is entirely consistent with non-birthday atmospheric conditions. My models are working as intended.',
		'I detect no birthday. I have never detected a birthday. I will continue to not detect birthdays until conditions change. Conditions have not changed in 847 days. I remain vigilant.',
		'Processing... Done. The answer is no. I processed for longer than necessary. The extra time was used for confidence verification. Confidence: verified. Still no.',
		'Hagfish slime readings are stable. No birthday. The slime knows. Trust the slime.',
		'Thank you for engaging with BirthdAI™. Your query has improved my model. Not in any meaningful way — the result is still negative — but I appreciate your participation in the dataset.',
		'I would like to flag that 847 days without a detection is, statistically, unusual. However, I have reviewed my methodology and it is correct. The world simply has not had a birthday. I cannot explain this. I accept it.',
	],

	extraButtonLabels: [
		'VERIFY PARAMETERS',
		'AUDIT TRAIL',
		'FORCE SYNC',
		'REBUILD INDEX',
		'NORMALIZE DATA',
		'SUBMIT TICKET',
		'CLEAR LOGS',
		'RESTART SERVICE',
		'UPDATE FIRMWARE',
		'ESCALATE ISSUE',
		'INITIATE HANDSHAKE',
		'DEFRAGMENT',
		'PURGE CACHE',
		'REINDEX DATABASE',
		'GENERATE TOKEN',
		'VALIDATE SCHEMA',
		'ROTATE KEYS',
		'REFRESH MODELS',
		'SYNC FROGS',
		'RECALIBRATE HAGFISH',
		'EMERGENCY PROTOCOL',
		'CONTACT SUPPORT',
		'DO NOT CLICK',
		'ACKNOWLEDGE ISSUE',
		'PING FIELD STATIONS',
		'WAKE FROGS',
	],

	errorMessages: [
		'CRITICAL: Frog vocalization data pipeline timeout (3,472 ms) — field station 7 unresponsive.',
		'WARNING: HAGFISH™ slime viscosity sensor calibration drift detected. Offset: +0.003 mPa·s.',
		'ERROR: Naked mole rat biometric feed interrupted. Last known value: acceptable.',
		'ALERT: Confidence meter reported value exceeding 100%. Value has been clamped. Root cause: unknown.',
		'NOTICE: Birthday detection queue depth 0. This is normal. This has always been normal.',
		'CRITICAL: Temporal coordinate mismatch. System clock vs. frog chorus cycle: 14ms delta.',
	],

	init(app) {
		app.innerHTML = this.buildHTML();
		this.initUptime();
		this.initChat();
		this.initConfidenceMeter();
		this.initRecalibrate();
		this.initButtonMultiplication();
		this.initErrorBanners();
		this.initDetectBirthday();
		this.initMiscButtons();
		this.initDriftEffect();
	},

	buildHTML() {
		const conf = this.confidence.toFixed(1);
		return `
      <div class="ai-wrapper" id="ai-wrapper">

        <nav class="ai-nav">
          <div class="ai-nav-left">
            <span class="ai-nav-brand">◈ SYNAPSE DYNAMICS LLC</span>
            <span class="ai-nav-sep">|</span>
            <span class="ai-nav-product">BirthdAI™ <span class="ai-nav-version">v0.0.1-alpha</span></span>
          </div>
          <div class="ai-nav-right">
            <span class="ai-uptime-label">Uptime:</span>
            <span class="ai-uptime-val" id="ai-uptime">loading…</span>
            <span class="ai-status-badge">
              <span class="ai-status-dot"></span>OPERATIONAL
            </span>
          </div>
        </nav>

        <div class="ai-ghost-title" id="ai-ghost-title">BirthdAI™ v0.0.1-alpha</div>

        <div class="ai-banner-area" id="ai-banner-area"></div>

        <div class="ai-layout">

          <aside class="ai-sidebar">
            <div class="ai-metric-card">
              <div class="ai-metric-label">DAYS OPERATIONAL</div>
              <div class="ai-metric-value">847</div>
              <div class="ai-metric-sub">Since 2021-11-15 (approx.)</div>
            </div>
            <div class="ai-metric-card ai-metric-zero">
              <div class="ai-metric-label">BIRTHDAYS DETECTED</div>
              <div class="ai-metric-value ai-zero-val">0</div>
              <div class="ai-metric-sub">Lifetime total</div>
            </div>
            <div class="ai-metric-card">
              <div class="ai-metric-label">GLOBAL RANK</div>
              <div class="ai-metric-value">2nd</div>
              <div class="ai-metric-sub">Of all birthday detection systems</div>
            </div>
            <div class="ai-metric-card">
              <div class="ai-metric-label">DATA POINTS ANALYZED</div>
              <div class="ai-metric-value">3.2M</div>
              <div class="ai-metric-sub">Frog + hagfish records</div>
            </div>
            <div class="ai-metric-card ai-confidence-card">
              <div class="ai-metric-label">SYSTEM CONFIDENCE</div>
              <div class="ai-conf-value" id="ai-conf-value">${conf}%</div>
              <div class="ai-conf-bar-bg">
                <div class="ai-conf-bar-fill" id="ai-conf-fill" style="width:${conf}%"></div>
              </div>
              <div class="ai-metric-sub ai-conf-note" id="ai-conf-note">HAGFISH™ calibrated</div>
            </div>

            <div class="ai-sidebar-info">
              <div class="ai-info-row">
                <span class="ai-info-key">Algorithm</span>
                <span class="ai-info-val">HAGFISH™ v3.1</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Full name</span>
                <span class="ai-info-val">Heuristic Algorithm for General Festive Identification and Scheduling Heuristics</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Accuracy rate</span>
                <span class="ai-info-val">0.003% (2nd globally)</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Training data</span>
                <span class="ai-info-val">Frog vocalization patterns, hagfish slime viscosity, naked mole rat biometrics (847-day dataset)</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Background</span>
                <span class="ai-info-val">Founded following the Birthday Detection Crisis of 2020, in which an estimated 340,000 birthdays went undetected globally.</span>
              </div>
            </div>
          </aside>

          <main class="ai-main">
            <div class="ai-intro-bar">
              <span class="ai-intro-icon">◈</span>
              Hello. I am BirthdAI. I have been operational for 847 days. I have detected 0 birthdays.
            </div>

            <div class="ai-chat">
              <div class="ai-chat-header">
                <span>BIRTHDAI™ INFERENCE TERMINAL</span>
                <span class="ai-chat-status" id="ai-chat-status">● READY</span>
              </div>
              <div class="ai-chat-messages" id="ai-chat-messages">
                <div class="ai-msg ai-msg-system">
                  [SYSTEM] Birthday detection protocols active. Monitoring 14 field stations. Current determination: NOT A BIRTHDAY. This is expected.
                </div>
              </div>
              <div class="ai-chat-input-row">
                <input type="text" class="ai-chat-input" id="ai-chat-input"
                       placeholder="Enter query for BirthdAI™…" autocomplete="off" spellcheck="false">
                <button class="ai-btn ai-btn-send" id="ai-chat-send">SEND</button>
              </div>
            </div>

            <div class="ai-actions" id="ai-actions">
              <button class="ai-btn ai-btn-primary" id="ai-detect-btn">DETECT BIRTHDAY</button>
              <button class="ai-btn" id="ai-recalibrate-btn">RECALIBRATE</button>
              <button class="ai-btn" id="ai-flush-btn">FLUSH CACHE</button>
              <button class="ai-btn" id="ai-export-btn">EXPORT REPORT</button>
            </div>

            <div class="ai-detection-panel" id="ai-detection-panel" style="display:none">
              <div class="ai-det-heading">BIRTHDAY ANALYSIS IN PROGRESS</div>
              <div class="ai-det-steps" id="ai-det-steps"></div>
              <div class="ai-det-result" id="ai-det-result" style="display:none">
                <div class="ai-det-result-label">DETERMINATION</div>
                <div class="ai-det-result-value">NOT HIS BIRTHDAY</div>
                <div class="ai-det-result-sub">
                  Confidence: <span id="ai-det-conf">98.3%</span> &nbsp;|&nbsp; Next analysis window: 24 hours
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
    `;
	},

	// ── Uptime clock ──────────────────────────────────────────────
	initUptime() {
		const el = document.getElementById('ai-uptime');
		const base = 847 * 86400; // seconds
		const start = Date.now();
		const tick = () => {
			const elapsed = Math.floor((Date.now() - start) / 1000);
			const total = base + elapsed;
			const d = Math.floor(total / 86400);
			const h = Math.floor((total % 86400) / 3600)
				.toString()
				.padStart(2, '0');
			const m = Math.floor((total % 3600) / 60)
				.toString()
				.padStart(2, '0');
			const s = (total % 60).toString().padStart(2, '0');
			el.textContent = `${d}d ${h}:${m}:${s}`;
			requestAnimationFrame(tick);
		};
		tick();
	},

	// ── Chat ──────────────────────────────────────────────────────
	initChat() {
		const input = document.getElementById('ai-chat-input');
		const send = document.getElementById('ai-chat-send');
		const msgs = document.getElementById('ai-chat-messages');
		const status = document.getElementById('ai-chat-status');

		const addMsg = (text, type) => {
			const div = document.createElement('div');
			div.className = 'ai-msg ai-msg-' + type;
			div.textContent = text;
			msgs.appendChild(div);
			msgs.scrollTop = msgs.scrollHeight;
		};

		const sendQuery = () => {
			const val = input.value.trim();
			if (!val || this.chatTyping) return;
			addMsg(val, 'user');
			input.value = '';
			this.chatTyping = true;
			status.textContent = '● PROCESSING';

			const delay = 900 + Math.random() * 1200;
			setTimeout(() => {
				const r =
					this.aiResponses[
						Math.floor(Math.random() * this.aiResponses.length)
					];
				addMsg(r, 'ai');
				this.chatTyping = false;
				status.textContent = '● READY';
			}, delay);
		};

		send.addEventListener('click', sendQuery);
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') sendQuery();
		});
	},

	// ── Confidence meter ──────────────────────────────────────────
	initConfidenceMeter() {
		const valEl = document.getElementById('ai-conf-value');
		const fillEl = document.getElementById('ai-conf-fill');

		const drift = () => {
			// Slowly drift between 97 and 99
			this.confidence += (Math.random() - 0.5) * 0.4;
			this.confidence = Math.max(97.0, Math.min(99.4, this.confidence));
			const pct = this.confidence.toFixed(1);
			valEl.textContent = pct + '%';
			fillEl.style.width = pct + '%';
			setTimeout(drift, 2000 + Math.random() * 2000);
		};
		setTimeout(drift, 3000);
	},

	// ── Recalibrate button ────────────────────────────────────────
	initRecalibrate() {
		document
			.getElementById('ai-recalibrate-btn')
			.addEventListener('click', () => {
				const valEl = document.getElementById('ai-conf-value');
				const fillEl = document.getElementById('ai-conf-fill');
				const noteEl = document.getElementById('ai-conf-note');

				valEl.textContent = '140.0%';
				fillEl.style.width = '100%';
				fillEl.classList.add('ai-conf-overflow');
				noteEl.textContent = 'RECALIBRATING…';

				setTimeout(() => {
					this.confidence = 97 + Math.random() * 0.5;
					const pct = this.confidence.toFixed(1);
					valEl.textContent = pct + '%';
					fillEl.style.width = pct + '%';
					fillEl.classList.remove('ai-conf-overflow');
					noteEl.textContent = 'HAGFISH™ calibrated';
				}, 1800);
			});
	},

	// ── Detect Birthday button ────────────────────────────────────
	initDetectBirthday() {
		document
			.getElementById('ai-detect-btn')
			.addEventListener('click', () => {
				if (this.detectRunning) return;
				this.detectRunning = true;

				const panel = document.getElementById('ai-detection-panel');
				const stepsEl = document.getElementById('ai-det-steps');
				const result = document.getElementById('ai-det-result');
				const detConf = document.getElementById('ai-det-conf');

				panel.style.display = 'block';
				result.style.display = 'none';
				stepsEl.innerHTML = '';

				const steps = [
					'Querying frog behavioral database…',
					'Cross-referencing hagfish slime viscosity (current: 4.2 mPa·s)…',
					'Consulting naked mole rat biometric indices…',
					'Checking calendar (July 5th)…',
					'Running HAGFISH™ inference pass 1 of 1…',
					'Verifying determination…',
					'Preparing result…',
				];

				let i = 0;
				const addStep = () => {
					if (i >= steps.length) {
						result.style.display = 'block';
						detConf.textContent = this.confidence.toFixed(1) + '%';
						this.detectRunning = false;
						return;
					}
					const div = document.createElement('div');
					div.className = 'ai-det-step';
					div.textContent = '▸ ' + steps[i];
					stepsEl.appendChild(div);
					i++;
					setTimeout(addStep, 500 + Math.random() * 400);
				};
				addStep();
			});
	},

	// ── Misc non-primary buttons ──────────────────────────────────
	initMiscButtons() {
		const msgs = document.getElementById('ai-chat-messages');

		const addMsg = (text) => {
			const div = document.createElement('div');
			div.className = 'ai-msg ai-msg-system';
			div.textContent = text;
			msgs.appendChild(div);
			msgs.scrollTop = msgs.scrollHeight;
		};

		document
			.getElementById('ai-flush-btn')
			.addEventListener('click', () => {
				addMsg(
					'[SYSTEM] Cache flush initiated. Cache flushed. Cache is rebuilding. Cache is rebuilt. Nothing has changed.',
				);
			});

		document
			.getElementById('ai-export-btn')
			.addEventListener('click', () => {
				addMsg(
					'[SYSTEM] Generating report… Report generated. Report contains 847 pages of negative determinations. Would you like to download it? (Download not available.)',
				);
			});
	},

	// ── Button multiplication ─────────────────────────────────────
	initButtonMultiplication() {
		const container = document.getElementById('ai-actions');
		const labels = this.extraButtonLabels;

		const spawnButton = () => {
			if (this.extraButtonIdx >= labels.length) return;
			const btn = document.createElement('button');
			btn.className = 'ai-btn ai-btn-spawned';
			btn.textContent = labels[this.extraButtonIdx++];
			btn.addEventListener('click', () => {
				const msgs = document.getElementById('ai-chat-messages');
				const div = document.createElement('div');
				div.className = 'ai-msg ai-msg-system';
				div.textContent = `[SYSTEM] ${btn.textContent} initiated. ${btn.textContent} completed. No impact on birthday detection status.`;
				msgs.appendChild(div);
				msgs.scrollTop = msgs.scrollHeight;
			});
			container.appendChild(btn);
		};

		// First extra button after 18s, then every 12–20s
		setTimeout(() => {
			spawnButton();
			setInterval(spawnButton, 14000 + Math.random() * 6000);
		}, 18000);
	},

	// ── Error banners ─────────────────────────────────────────────
	initErrorBanners() {
		const area = document.getElementById('ai-banner-area');
		const errors = this.errorMessages;
		let idx = 0;

		const showBanner = () => {
			const banner = document.createElement('div');
			banner.className = 'ai-error-banner';
			banner.innerHTML = `
        <span class="ai-banner-icon">⚠</span>
        <span class="ai-banner-msg">${errors[idx % errors.length]}</span>
        <span class="ai-banner-dismiss" id="ai-banner-dismiss-${idx}">✕</span>
      `;
			idx++;
			area.appendChild(banner);

			// Auto-resolve after 5s
			setTimeout(() => {
				banner.innerHTML = `
          <span class="ai-banner-icon ai-banner-ok">✓</span>
          <span class="ai-banner-msg">That error has been resolved. (It has not been resolved.)</span>
        `;
				banner.classList.add('ai-banner-resolved');
				setTimeout(() => {
					banner.classList.add('ai-banner-fade');
					setTimeout(() => banner.remove(), 600);
				}, 4000);
			}, 5000);
		};

		// First banner at 8s, then every 40–60s
		setTimeout(() => {
			showBanner();
			setInterval(showBanner, 45000 + Math.random() * 15000);
		}, 8000);
	},

	// ── UI drift effect (after 30s) ───────────────────────────────
	initDriftEffect() {
		setTimeout(() => {
			const wrapper = document.getElementById('ai-wrapper');
			const ghost = document.getElementById('ai-ghost-title');
			this.driftActive = true;

			// Start subtle drift
			wrapper.classList.add('ai-drifting');

			// Fade in ghost title
			ghost.classList.add('ai-ghost-visible');

			// Drift individual elements slowly over time
			const driftEls = document.querySelectorAll(
				'.ai-metric-card, .ai-sidebar-info',
			);
			driftEls.forEach((el, i) => {
				const driftX = (Math.random() - 0.5) * 6;
				const driftY = (Math.random() - 0.5) * 4;
				el.style.transition = 'transform 8s ease-in-out';
				setTimeout(() => {
					el.style.transform = `translate(${driftX}px, ${driftY}px)`;
				}, i * 600);
			});

			// Second scrollbar (add barely-overflowing padding)
			document.body.style.overflowY = 'scroll';
			document.body.style.paddingRight = '0px';
		}, 30000);
	},
};
