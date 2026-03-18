/* ============================================================
   wednesday.js — BirthdAI™ v0.0.1-alpha
   A completely broken AI birthday detection system.
   Built by Synapse Dynamics LLC. Trained on frog vocalization
   patterns, stakeholder festivity alignment metrics, and temporal
   joy coefficients. Operational: 847 days. Detected: 0 birthdays.
   ============================================================ */

window.Wednesday = {
	confidence: 97 + Math.random() * 2,
	detectRunning: false,
	chatTyping: false,
	driftActive: false,

	aiResponses: [
		'Based on current frog vocalization data (n=847 nights), the probability of birthday conditions is estimated at 0.003%. This is within expected parameters. I am confident.',
		'MERIDIAN™ diagnostic complete. Celebration velocity: 0.003 CVU (nominal). Temporal joy coefficient: within expected variance. Birthday likelihood: 0.003%. The metrics are aligned. Thank you for your continued engagement with the platform.',
		'Interesting query. Cross-referencing with temporal joy coefficient baselines across 14 field observation nodes. No birthday signatures detected. The coefficients are in agreement. They are always in agreement. That is why we use them.',
		"I understand your query. The answer is no. If your question was not 'is it Ben's birthday,' the answer remains no. My expertise is birthday detection. I am the best at it. (2nd globally.)",
		'I have been operational for 847 days. I have processed 3.2 million data points. I have detected 0 birthdays. This is either a testament to my precision or evidence of a systemic issue. I believe it is the former.',
		'Frog behavioral indices: nominal. Frogs exhibit elevated call frequency on non-birthday nights, which is exactly what is occurring. This confirms my determination. Thank you.',
		'The Birthday Detection Crisis of 2020 claimed an estimated 340,000 undetected birthdays globally. We exist to prevent that. We have prevented 0 birthdays from going undetected because we have detected 0 birthdays. Our prevention record is perfect.',
		'According to our records, the subject (Ben) was born on July 5th. Today is not July 5th. I know this because we have a calendar. The calendar is one of our most sophisticated tools.',
		'ERROR 404: Birthday not found. (This error has been resolved. It has not been resolved.) Confidence remains at 98.7%. Monitoring continues.',
		'Your query has been logged, analyzed, and cross-referenced with frog vocalization models from 14 field stations. Result: not a birthday. This determination is final.',
		'Temporal joy coefficient variance: 0.003 standard deviations from baseline. This is entirely consistent with non-celebratory atmospheric conditions. My stakeholder festivity alignment model is performing as intended. I am proud of it.',
		'I detect no birthday. I have never detected a birthday. I will continue to not detect birthdays until conditions change. Conditions have not changed in 847 days. I remain vigilant.',
		'Processing... Done. The answer is no. I processed for longer than necessary. The extra time was used for confidence verification. Confidence: verified. Still no.',
		'Celebration velocity metrics are nominal. No birthday. The metrics know. Trust the metrics. We have built a robust governance framework around the metrics. They have never been wrong. (They have also never detected a birthday.)',
		'Thank you for engaging with BirthdAI™. Your query has improved my model. Not in any meaningful way — the result is still negative — but I appreciate your participation in the dataset.',
		'I would like to flag that 847 days without a detection is, statistically, unusual. However, I have reviewed my methodology and it is correct. The world simply has not had a birthday. I cannot explain this. I accept it.',
	],

	errorMessages: [
		'CRITICAL: Frog vocalization data pipeline timeout (3,472 ms) — field station 7 unresponsive.',
		'WARNING: MERIDIAN™ celebration velocity telemetry calibration drift detected. Offset: +0.003 CVU. Recalibration has been scheduled. Recalibration has been deprioritized.',
		'ERROR: Temporal joy coefficient feed interrupted. Last known coefficient: acceptable. Root cause analysis: underway. Estimated resolution: 3–5 business birthdays.',
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
		this.initErrorBanners();
		this.initDetectBirthday();
		this.initMiscButtons();
		this.initDriftEffect();
		this.initSupportForm();
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
              <div class="ai-metric-sub">Frog + MERIDIAN™ telemetry records</div>
            </div>
            <div class="ai-metric-card ai-confidence-card">
              <div class="ai-metric-label">SYSTEM CONFIDENCE</div>
              <div class="ai-conf-value" id="ai-conf-value">${conf}%</div>
              <div class="ai-conf-bar-bg">
                <div class="ai-conf-bar-fill" id="ai-conf-fill" style="width:${conf}%"></div>
              </div>
              <div class="ai-metric-sub ai-conf-note" id="ai-conf-note">MERIDIAN™ calibrated</div>
            </div>

            <div class="ai-sidebar-info">
              <div class="ai-info-row">
                <span class="ai-info-key">Algorithm</span>
                <span class="ai-info-val">MERIDIAN™ v3.1</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Full name</span>
                <span class="ai-info-val">Multivariate Enterprise Recognition and Insight Derivation through Integrative Analytics and Normalization</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Accuracy rate</span>
                <span class="ai-info-val">0.003% (2nd globally)</span>
              </div>
              <div class="ai-info-row">
                <span class="ai-info-key">Training data</span>
                <span class="ai-info-val">Frog vocalization patterns, celebration velocity metrics, temporal joy coefficients (847-day dataset)</span>
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
                <button class="ai-det-dispute" id="ai-det-dispute">Dispute this determination &rarr;</button>
              </div>
            </div>
          </main>

        </div>
      </div>

      <!-- Support ticket modal -->
      <div id="ai-support-overlay" class="ai-support-overlay" style="display:none">
        <div class="ai-support-modal">
          <div class="ai-support-header">
            <div>
              <div class="ai-support-title">Contact Support</div>
              <div class="ai-support-sub">SYNAPSE DYNAMICS LLC &mdash; Ticket Submission Portal</div>
            </div>
            <button class="ai-support-close" id="ai-support-close" type="button">✕</button>
          </div>

          <div id="ai-support-form-wrap">
            <form class="ai-support-form" id="ai-support-form" novalidate>

              <div class="ai-sf-section">Incident Details</div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-issue-type">Issue type <span class="ai-sf-req">*</span></label>
                <select class="ai-sf-input" id="sf-issue-type" name="issue_type">
                  <option value="">— Select —</option>
                  <option>Birthday Not Detected</option>
                  <option>Birthday Detected Incorrectly</option>
                  <option>Birthday Detected Too Many Times (0 historical reports)</option>
                </select>
                <div class="ai-sf-error" id="sf-err-issue-type"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-expected">Expected behavior <span class="ai-sf-req">*</span></label>
                <textarea class="ai-sf-input ai-sf-textarea" id="sf-expected" name="expected" rows="3" placeholder="e.g., It should have been his birthday"></textarea>
                <div class="ai-sf-error" id="sf-err-expected"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-label">Actual behavior</label>
                <input class="ai-sf-input ai-sf-locked" type="text" value="It is not his birthday. It has never been his birthday." readonly>
              </div>

              <div class="ai-sf-section">Environmental Conditions</div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-cake">Was a cake present within 50 meters of your location? <span class="ai-sf-req">*</span></label>
                <select class="ai-sf-input" id="sf-cake" name="cake">
                  <option value="">— Select —</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Define &ldquo;cake&rdquo;</option>
                </select>
                <div class="ai-sf-error" id="sf-err-cake"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-smell">Describe the smell of the room at the time of the incident <span class="ai-sf-req">*</span></label>
                <input class="ai-sf-input" type="text" id="sf-smell" name="smell" placeholder="e.g., vanilla, toner, mild despair">
                <div class="ai-sf-error" id="sf-err-smell"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-frog">Frog activity at time of incident <span class="ai-sf-req">*</span></label>
                <select class="ai-sf-input" id="sf-frog" name="frog">
                  <option value="">— Select —</option>
                  <option>None</option>
                  <option>Minimal</option>
                  <option>Moderate</option>
                  <option>Significant</option>
                </select>
                <div class="ai-sf-hint">Required for MERIDIAN™ correlation</div>
                <div class="ai-sf-error" id="sf-err-frog"></div>
              </div>

              <div class="ai-sf-section">Personal Disclosure</div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-notified">Have you notified Ben? <span class="ai-sf-req">*</span></label>
                <select class="ai-sf-input" id="sf-notified" name="notified">
                  <option value="">— Select —</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>I am Ben</option>
                </select>
                <div class="ai-sf-error" id="sf-err-notified"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-gift">Are you currently in possession of a wrapped gift? <span class="ai-sf-req">*</span></label>
                <select class="ai-sf-input" id="sf-gift" name="gift">
                  <option value="">— Select —</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>I am the gift</option>
                </select>
                <div class="ai-sf-error" id="sf-err-gift"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-check-label">
                  <input type="checkbox" id="sf-not-birthday" name="not_birthday">
                  <span>I confirm that I am not a birthday <span class="ai-sf-req">*</span></span>
                </label>
                <div class="ai-sf-error" id="sf-err-not-birthday"></div>
              </div>

              <div class="ai-sf-section">Resolution</div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-confidence">Your confidence that it is Ben&rsquo;s birthday (0&ndash;100%) <span class="ai-sf-req">*</span></label>
                <input class="ai-sf-input" type="number" id="sf-confidence" name="confidence" min="0" max="100" step="0.001" placeholder="e.g., 0.001">
                <div class="ai-sf-clamp" id="sf-clamp-note" style="display:none">Value exceeds system threshold. Clamping to 0.003.</div>
                <div class="ai-sf-error" id="sf-err-confidence"></div>
              </div>

              <div class="ai-sf-field">
                <label class="ai-sf-label" for="sf-resolution">Preferred resolution <span class="ai-sf-req">*</span></label>
                <select class="ai-sf-input" id="sf-resolution" name="resolution">
                  <option value="">— Select —</option>
                  <option>Detect the birthday</option>
                  <option>Acknowledge the issue</option>
                  <option>No resolution needed, I just wanted to talk</option>
                </select>
                <div class="ai-sf-error" id="sf-err-resolution"></div>
              </div>

              <div class="ai-sf-footer">
                <span class="ai-sf-req-note"><span class="ai-sf-req">*</span> Required</span>
                <button type="submit" class="ai-btn ai-btn-primary ai-sf-submit" id="sf-submit">
                  <span class="ai-sf-btn-text">Submit Ticket</span>
                  <span class="ai-sf-spinner"></span>
                </button>
              </div>

            </form>
          </div>

          <div id="ai-support-confirm" class="ai-support-confirm" style="display:none">
            <div class="ai-sc-icon">✓</div>
            <div class="ai-sc-ticket" id="ai-sc-ticket">SYNAPSE-XXXX</div>
            <div class="ai-sc-msg">Your ticket has been received and assigned to the queue.</div>
            <div class="ai-sc-details">
              <div>Priority auto-assessed: <strong>Low</strong></div>
              <div>Estimated response time: <strong>3&ndash;5 business birthdays</strong></div>
              <div class="ai-sc-fine">A confirmation has been sent to your email address on file. (No email on file.)</div>
            </div>
            <button class="ai-btn ai-sf-close-confirm" id="ai-sc-close" type="button">Close</button>
          </div>

        </div>
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
					noteEl.textContent = 'MERIDIAN™ calibrated';
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
					'Cross-referencing celebration velocity metrics (current: 0.003 CVU)…',
					'Consulting temporal joy coefficient indices…',
					'Checking calendar (July 5th)…',
					'Running MERIDIAN™ inference pass 1 of 1…',
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

	// ── Support form ──────────────────────────────────────────────
	showSupportForm() {
		const overlay = document.getElementById('ai-support-overlay');
		const formWrap = document.getElementById('ai-support-form-wrap');
		const confirm = document.getElementById('ai-support-confirm');
		document.getElementById('ai-support-form').reset();
		document.querySelectorAll('.ai-sf-error').forEach(el => el.textContent = '');
		document.querySelectorAll('.ai-sf-invalid').forEach(el => el.classList.remove('ai-sf-invalid'));
		document.getElementById('sf-clamp-note').style.display = 'none';
		document.getElementById('sf-submit').classList.remove('loading');
		formWrap.style.display = 'block';
		confirm.style.display = 'none';
		overlay.style.display = 'flex';
		document.getElementById('sf-issue-type').focus();
	},

	initSupportForm() {
		const overlay  = document.getElementById('ai-support-overlay');
		const form     = document.getElementById('ai-support-form');
		const formWrap = document.getElementById('ai-support-form-wrap');
		const confirm  = document.getElementById('ai-support-confirm');
		const submit   = document.getElementById('sf-submit');

		// Dispute button (appears after detection runs)
		document.getElementById('ai-det-dispute').addEventListener('click', () => this.showSupportForm());

		// Close helpers
		const close = () => { overlay.style.display = 'none'; };
		document.getElementById('ai-support-close').addEventListener('click', close);
		document.getElementById('ai-sc-close').addEventListener('click', close);
		overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

		// Confidence clamping on blur
		const confInput = document.getElementById('sf-confidence');
		const clampNote = document.getElementById('sf-clamp-note');
		confInput.addEventListener('blur', () => {
			if (confInput.value !== '' && parseFloat(confInput.value) > 0.003) {
				confInput.value = '0.003';
				clampNote.style.display = 'block';
			} else {
				clampNote.style.display = 'none';
			}
		});

		// Clear error state as fields are filled
		const clearErr = (inputId, errId) => {
			const el = document.getElementById(inputId);
			const err = document.getElementById(errId);
			if (!el || !err) return;
			el.addEventListener('input', () => { el.classList.remove('ai-sf-invalid'); err.textContent = ''; });
			el.addEventListener('change', () => { el.classList.remove('ai-sf-invalid'); err.textContent = ''; });
		};
		clearErr('sf-issue-type',   'sf-err-issue-type');
		clearErr('sf-expected',     'sf-err-expected');
		clearErr('sf-cake',         'sf-err-cake');
		clearErr('sf-smell',        'sf-err-smell');
		clearErr('sf-frog',         'sf-err-frog');
		clearErr('sf-notified',     'sf-err-notified');
		clearErr('sf-gift',         'sf-err-gift');
		clearErr('sf-not-birthday', 'sf-err-not-birthday');
		clearErr('sf-confidence',   'sf-err-confidence');
		clearErr('sf-resolution',   'sf-err-resolution');

		// Validation
		const validate = () => {
			let valid = true;

			const req = (id, errId, msg) => {
				const el = document.getElementById(id);
				const err = document.getElementById(errId);
				const empty = el.type === 'checkbox' ? !el.checked : !el.value.trim();
				if (empty) {
					el.classList.add('ai-sf-invalid');
					err.textContent = msg || 'This field is required.';
					valid = false;
				}
			};

			req('sf-issue-type',   'sf-err-issue-type');
			req('sf-expected',     'sf-err-expected');
			req('sf-cake',         'sf-err-cake');
			req('sf-smell',        'sf-err-smell');
			req('sf-frog',         'sf-err-frog');
			req('sf-notified',     'sf-err-notified');
			req('sf-gift',         'sf-err-gift');
			req('sf-not-birthday', 'sf-err-not-birthday', 'You must confirm that you are not a birthday.');
			req('sf-confidence',   'sf-err-confidence');
			req('sf-resolution',   'sf-err-resolution');

			// Scroll first error into view
			if (!valid) {
				const first = form.querySelector('.ai-sf-invalid');
				if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			return valid;
		};

		// Submission
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!validate()) return;

			submit.classList.add('loading');
			setTimeout(() => {
				const ticketNum = 'SYNAPSE-' + Math.floor(1000 + Math.random() * 9000);
				document.getElementById('ai-sc-ticket').textContent = ticketNum;
				formWrap.style.display = 'none';
				confirm.style.display = 'flex';
			}, 1500);
		});
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
