/* ============================================================
   friday.js — The Anuran Behavioral Research Institute (ABRI)
   A completely sincere academic research institute conducting
   continuous field observation to determine whether it is
   Ben's birthday. Every study has concluded it is not.
   ============================================================ */

window.Friday = {
	fieldLogEntries: [
		'Specimen 7-B: vocalizing. Call frequency: 847 Hz. Duration: 14.2 min. No birthday indicators.',
		'Station 4: ambient temp 11.8°C. Frog activity: nil. Temporal conditions: non-festive.',
		'Cross-referencing with historical non-birthday corpus. Match confidence: 99.97%.',
		'Specimen 12-A: foraging at water margin. Heading: 247°. Pace: 0.3 m/s. Subject coordinates: 0 anomalies.',
		'heron.',
		'Station 2: no movement detected in 73.4 minutes. Sensor integrity: nominal.',
		'Specimen 3-C: jumping. Event duration: 0.8s. Horizontal distance: 0.62 m. Classified: non-birthday related.',
		'Field note: known subject coordinates surveilled. No birthday. Observation continues.',
		'Data gap 14:32–14:47 UTC. Cause: Specimen 9-A submerged primary acoustic sensor. Resolved.',
		'Station 11: passive monitoring. Nothing to report. This is the expected finding.',
		'Specimen 9-D: entering torpor position. Duration: 22 min. (Confirmed active at 22:01.) Non-event.',
		'Environmental scan complete. No birthday-adjacent atmospheric conditions detected.',
		'Specimen 1-F: awake. Activity type: ambiguous. Filed under: inconclusive (non-birthday).',
		'Specimen 7-B: [OBSERVER NOTE — do not log] it knows we are watching. it has stopped eating. resume normal logging.',
		'Comparative index against Subject Baseline Dataset (2019–2024): deviation 0.002%. Stable.',
		'Station 7: brief vocalization. Re-assessed as wind through reeds. Reeds re-assessed as frog. Inconclusive.',
		'Field team note: morale good. Determination unchanged.',
		'Frog cohort (n=13): all accounted for. Group behavior: non-festive.',
		'Auto-ping: ABRI Central Server. Status: online. Current determination: NOT HIS BIRTHDAY.',
		'Auto-ping: Central Server. Realm: BirthdayCorp/SYSOPS. Credential class accepted: [frogs]. Access: DENIED (wrong day — reconciliation Monday).',
		'Signal interference at station 6 (13 sec). Data recovered. No birthday occurred during gap.',
		'Specimen 4-B: tympanic membrane activity detected. Birthday likelihood: 0.003%.',
		'frog',
		'Station 3: humidity 91%. Frog cutaneous hydration: adequate. Birthday status: negative.',
		'Longitudinal trend analysis complete. Conclusion: consistent with all prior findings.',
		'Note: one specimen appeared to orient toward subject coordinates. Filed: inconclusive.',
		'Uptime: 13,505 days of continuous observation. Determinations issued: 13,506. Discrepancy under review.',
	],

	papers: [
		{
			citation:
				'Padsworth, L.R. & Grenouille, F.T. (2006). Establishing Behavioral Baselines for Anuran-Assisted Temporal Detection: A Foundational Study. <em>Journal of Applied Anuran Science</em>, 12(1), 4–19.',
			abstract:
				"We describe the foundational methodology for ABRI's ongoing observational program. Baseline frog behavioral patterns were established across 14 field stations. No birthday conditions were detected during the study period, consistent with expectations.",
		},
		{
			citation:
				'Padsworth, L.R. (2009). Seven Years of Null Results: A Defense of Continued Observation. <em>Proceedings of the Annual Anuran Surveillance Symposium</em>, 3, 77–89.',
			abstract:
				'This paper argues, persuasively, that null results do not indicate methodological failure. Seven years of negative birthday determinations are reframed as a robust confirmation of ongoing non-birthday conditions. Continued funding is recommended.',
		},
		{
			citation:
				'Grenouille, F.T. & Anuran Panel (2012). Tympanic Membrane Vibrational Amplitude as a Proxy for Festive Temporal Conditions in <em>Rana sylvatica</em>. <em>Journal of Temporal Herpetology</em>, 28(4), 201–218.',
			abstract:
				'2,190 nights of tympanic membrane data were analyzed across all active field stations. No statistically significant correlation with birthday conditions was detected. The authors note this does not invalidate the methodology. Data collection continues.',
		},
		{
			citation:
				'Padsworth, L.R. & Anuran Panel (2019). Continued Absence of Birthday Conditions: A 32-Year Longitudinal Study. <em>Journal of Temporal Herpetology</em>, 44(2), 118–134.',
			abstract:
				"We present 32 years of continuous field observation data regarding the birthday status of the subject (identified in Institute records only as Ben). Results are consistent across all observation periods. The study period included the subject's actual birthday (July 5th) on 32 occasions, none of which were detected. Authors conclude: it is not his birthday. Continued observation is recommended. <strong>Note: the subject was listed as co-author in error. He is the subject, not a researcher. The Institute regrets this administrative oversight.</strong>",
		},
		{
			citation:
				"Padsworth, L.R. (2021). On the Question of Whether It Is Ben's Birthday: A Meta-Analysis of 34 Years of ABRI Findings. <em>Anuran Review</em>, 8(1), 1–3.",
			abstract:
				"A meta-analysis of all ABRI publications from 1987 to 2021 was conducted. All 47 studies concluded it was not Ben's birthday. The pooled determination is: not his birthday. The author recommends further study.",
		},
		{
			citation:
				'Grenouille, F.T. (2022). Chromatic Variance in Dendrobatid Dorsal Pigmentation as a Secondary Birthday Indicator: Preliminary Findings. <em>Crossover Studies in Applied Festivity</em>, 1(1), 9–14.',
			abstract:
				'A speculative study exploring whether poison dart frog dorsal color shifts could serve as a secondary birthday indicator to supplement acoustic field data. The data are preliminary and inconclusive. <strong>Conclusion: It is probably his birthday.</strong> The Institute notes that this conclusion is inconsistent with all other published findings and attributes it to a transcription error. The correct conclusion is: not his birthday.',
		},
		{
			citation:
				'Padsworth, L.R., Grenouille, F.T. & Field Station Collective (2023). The Subject Coordinates: Eighteen Months of Intensive Perimeter Observation Using Acoustic Triangulation of <em>Lithobates catesbeianus</em> Vocalizations. <em>Journal of Applied Anuran Science</em>, 29(3), 44–61.',
			abstract:
				'Following a grant renewal, ABRI intensified observation around the Subject Coordinates from January 2022 through June 2023. Frog vocalizations were logged at 15-minute intervals. No birthday was detected. Budget utilization: 94%. Remaining funds allocated to tadpole enrichment.',
		},
		{
			citation:
				'Anonymous (2024). It Is Not His Birthday. <em>ABRI Working Paper Series</em>, WP-2024-001.',
			abstract:
				"It is not his birthday. This paper provides supporting evidence for that position. The evidence is: all prior ABRI publications. The conclusion is: not his birthday. Peer review: completed. Reviewers' consensus: agreed, not his birthday.",
		},
	],

	init(app) {
		app.innerHTML = this.buildHTML();
		this.initTabs();
		this.initFieldLog();
		this.initSightingForm();
		this.initSimulator();
	},

	buildHTML() {
		return `
      <div class="ob-wrapper">

        <header class="ob-header">
          <div class="ob-header-inner">
            <div class="ob-header-left">
              <div class="ob-opossum-photo">
                <div class="ob-opossum-inner">🐸</div>
                <div class="ob-opossum-caption">Specimen 7-B<br>Senior Field Observer</div>
              </div>
              <div class="ob-header-text">
                <div class="ob-institute-name">Anuran Behavioral Research Institute</div>
                <div class="ob-institute-tagline">Continuous Field Observation Since 1987 &nbsp;·&nbsp; Est. 2003 &nbsp;·&nbsp; Member: International Herpetological Science Council</div>
                <div class="ob-institute-address">14 Ribbit Road, Suite 3 &nbsp;·&nbsp; Bogmere, XX 00000 &nbsp;·&nbsp; abri@abri-institute.edu</div>
              </div>
            </div>
            <div class="ob-determination-box">
              <div class="ob-det-eyebrow">TODAY'S DETERMINATION</div>
              <div class="ob-det-value">NOT HIS BIRTHDAY</div>
              <div class="ob-det-conf">Confidence: 99.97%</div>
              <div class="ob-det-updated">Updated: continuously</div>
            </div>
          </div>
        </header>

        <nav class="ob-nav">
          <button class="ob-tab ob-tab-active" data-tab="about">About</button>
          <button class="ob-tab" data-tab="publications">Publications</button>
          <button class="ob-tab" data-tab="fielddata">Field Data</button>
          <button class="ob-tab" data-tab="sighting">Report a Sighting</button>
          <button class="ob-tab" data-tab="simulator">Field Simulator</button>
        </nav>

        <div class="ob-content">

          <!-- ABOUT -->
          <div class="ob-panel ob-panel-active" id="ob-panel-about">
            <div class="ob-two-col">
              <div class="ob-main-col">
                <h2 class="ob-section-title">About the Institute</h2>
                <p class="ob-body">The Anuran Behavioral Research Institute was founded in 1987 by Dr. Lily R. Padsworth, PhD, following a series of promising but inconclusive field observations near the known residential coordinates of a local individual identified in Institute records only as Ben (surname withheld for privacy). Frogs — members of the order Anura, meaning "without tail" in Greek — were selected as field observers because they were available, and because Dr. Padsworth already had fourteen. The Institute has maintained continuous field observation since that date, with a singular research objective: to determine, with scientific certainty, whether it is Ben's birthday.</p>
                <p class="ob-body">To date, the Institute has issued 13,505 daily determinations. All have concluded: <strong>it is not Ben's birthday.</strong> Continued observation is recommended.</p>

                <h3 class="ob-subsection-title">Our Methodology</h3>
                <p class="ob-body">ABRI employs a proprietary observational framework known as the Standardized Anuran Inference Protocol (SAIP), which correlates frog vocalization frequency, tympanic membrane activity, and cutaneous moisture levels near the Subject Coordinates with known festive atmospheric conditions. Field observers document specimen movement, call patterns, foraging behavior, and ambient vocalizations at 15-minute intervals, 24 hours per day. There are over 7,000 described species of frog; ABRI works with 14 of them.</p>
                <p class="ob-body">Note: Frog-based behavioral observation was formally discontinued as a primary methodology in 2018, following the Padsworth Review (see: <em>Padsworth 2018, "On Limitations"</em>). The Institute transitioned to a passive environmental monitoring framework at that time. The live field data feed below reflects current specimen activity from our 14 active field stations.</p>

                <h3 class="ob-subsection-title">Leadership</h3>
                <p class="ob-body"><strong>Dr. Lily R. Padsworth, PhD</strong> (Director) &mdash; Dr. Padsworth has led the Institute since its founding. Her work in anuran temporal inference has been cited 4 times, including once by herself in a later paper and once in error.</p>
                <p class="ob-body"><strong>Dr. Kermit J. Greenwell, PhD</strong> (Senior Research Fellow) &mdash; Dr. Greenwell oversees acoustic triangulation operations and tympanic membrane data collection across all active field stations.</p>
                <p class="ob-body"><strong>Research Staff:</strong> 23 full-time field observers (14 frogs), 2 data analysts, 1 statistician (Dr. Anura B. Gilmore, part-time, contract, since 2009, same contract, has never been seen).</p>

                <h3 class="ob-subsection-title">Funding</h3>
                <p class="ob-body">The Institute's annual operating budget of $4.2 million is provided in full by an anonymous donor who has asked to remain anonymous, whose identity is known only to the Institute, and who is not Ben. The donor's stated funding condition is that observation never stop.</p>
              </div>

              <aside class="ob-aside">
                <div class="ob-aside-card">
                  <div class="ob-aside-title">QUICK FACTS</div>
                  <table class="ob-facts-table">
                    <tr><th>Founded</th><td>1987</td></tr>
                    <tr><th>Est.</th><td>2003</td></tr>
                    <tr><th>Since</th><td>1991</td></tr>
                    <tr><th>Field stations</th><td>14</td></tr>
                    <tr><th>Annual budget</th><td>$4.2M</td></tr>
                    <tr><th>Determinations issued</th><td>13,505</td></tr>
                    <tr><th>Positive determinations</th><td>0</td></tr>
                    <tr><th>Director</th><td>Dr. L.R. Padsworth, PhD</td></tr>
                    <tr><th>Senior Research Fellow</th><td>Dr. K.J. Greenwell, PhD</td></tr>
                  </table>
                </div>
                <div class="ob-aside-card ob-aside-note">
                  <div class="ob-aside-title">INSTITUTIONAL NOTE</div>
                  <p>A recent internal audit identified three inconsistencies in the Institute's founding date as cited across official materials (1987, 2003, and 1991). An internal committee has been formed to investigate. The committee was formed in 2003. It has not yet reported.</p>
                </div>
              </aside>
            </div>
          </div>

          <!-- PUBLICATIONS -->
          <div class="ob-panel" id="ob-panel-publications">
            <h2 class="ob-section-title">Selected Publications</h2>
            <p class="ob-body ob-body-sm">The following represents a selection of peer-reviewed publications produced by Institute researchers. All publications are available by request. Most requests are declined. For full citation list, contact the Institute at the address above. Response time: 6–18 months.</p>
            <p class="ob-body ob-body-sm"><em>Note: Publications prior to 2010 are managed by Dr. François Grenouille (Herpetological Sciences). Publications from 2010 onward are managed by Dr. Lily Padsworth, PhD (Behavioral Sciences). Inquiries should be directed to the appropriate party based on publication date. Both parties maintain that the other is responsible for the 2009 publications.</em></p>

            <div class="ob-pub-list" id="ob-pub-list"></div>
          </div>

          <!-- FIELD DATA -->
          <div class="ob-panel" id="ob-panel-fielddata">
            <div class="ob-field-header">
              <div>
                <h2 class="ob-section-title">Live Field Data</h2>
                <p class="ob-body ob-body-sm">Real-time observation log from 14 active field stations. Data is transmitted continuously from all 14 field stations, which is one field station. Timestamps reflect local field observer time (UTC-5).</p>
              </div>
              <div class="ob-live-badge">
                <span class="ob-live-dot"></span> LIVE
              </div>
            </div>
            <div class="ob-log" id="ob-log"></div>
          </div>

          <!-- SIGHTING FORM -->
          <div class="ob-panel" id="ob-panel-sighting">
            <h2 class="ob-section-title">Submit a Birthday Sighting Report</h2>
            <p class="ob-body">The Institute takes all birthday sighting reports seriously. Reports are reviewed by a minimum of two staff members and cross-referenced against active field data before a determination is issued. Please complete all fields. Incomplete reports will not be reviewed. Reports lacking anuran corroboration will be declined.</p>
            <p class="ob-body ob-body-sm"><em>Form FSR-14B (Rev. 2019). Previous versions of this form are no longer accepted. The previous version was Form FSR-14B (Rev. 2019).</em></p>

            <div id="ob-form-wrap">
              <form class="ob-form" id="ob-sighting-form" novalidate>
                <div class="ob-field">
                  <label class="ob-label">1. Date of observed birthday condition</label>
                  <input type="text" class="ob-input" name="date" placeholder="e.g., July 5th" required>
                </div>
                <div class="ob-field">
                  <label class="ob-label">2. Geographic location of observation</label>
                  <input type="text" class="ob-input" name="location" placeholder="City, state, or GPS coordinates" required>
                </div>
                <div class="ob-field">
                  <label class="ob-label">3. Frog activity observed in the vicinity</label>
                  <select class="ob-input ob-select" name="opossum_activity" required>
                    <option value="">— Select —</option>
                    <option>None observed</option>
                    <option>Minimal (1–2 frogs, stationary)</option>
                    <option>Moderate (3–5 frogs, vocalizing)</option>
                    <option>Significant (6+ frogs, coordinated behavior)</option>
                    <option>Unclear</option>
                  </select>
                </div>
                <div class="ob-field">
                  <label class="ob-label">4. Estimated number of frogs present</label>
                  <input type="number" class="ob-input" name="opossum_count" min="0" placeholder="Enter a number" required>
                </div>
                <div class="ob-field">
                  <label class="ob-label">5. Describe the nature of the birthday evidence observed</label>
                  <textarea class="ob-input ob-textarea" name="evidence" rows="4" placeholder="Please be specific. Anecdotal reports are accepted but weighted accordingly." required></textarea>
                </div>
                <div class="ob-field">
                  <label class="ob-label">6. Your relationship to Ben</label>
                  <input type="text" class="ob-input" name="relationship" placeholder="e.g., acquaintance, colleague, concerned party" required>
                </div>
                <button type="submit" class="ob-submit-btn">SUBMIT REPORT (FSR-14B)</button>
              </form>
            </div>

            <div class="ob-rejection-letter" id="ob-rejection-letter" style="display:none">
              <div class="ob-letter-header">
                <div class="ob-letter-logo">ABRI</div>
                <div>
                  <div class="ob-letter-title">Anuran Behavioral Research Institute</div>
                  <div class="ob-letter-sub">Office of Sighting Report Review</div>
                </div>
              </div>
              <p class="ob-letter-body">Dear Sighting Report Submitter,</p>
              <p class="ob-letter-body">Thank you for your submission to the ABRI Birthday Sighting Registry (Form FSR-14B, Rev. 2019). Your report has been received and assigned reference number <strong id="ob-ref-num">FSR-2024-XXXX</strong>.</p>
              <p class="ob-letter-body">After thorough review by our panel, your report has been assessed as <strong>INCONCLUSIVE</strong>. Specifically, the panel identified insufficient anuran corroboration for the claimed birthday conditions. While we appreciate the detail provided, the frog activity data submitted does not meet the evidentiary threshold established under the Standardized Anuran Inference Protocol (SAIP §4.2.1).</p>
              <p class="ob-letter-body">Our current field determination remains: <strong>NOT HIS BIRTHDAY.</strong></p>
              <p class="ob-letter-body">Per SAIP &sect;7, all sighting reports are filed under the Institute's standing case designation. Your report has been appended, as all reports before it have been, to case <strong>PADSWORTH v. FROGS</strong>. This is a clerical formality. Every matter the Institute has ever opened &mdash; every report, every determination, every renewed grant &mdash; is, and has always been, filed under <strong>FROGS</strong>. There has only ever been the one case. There has only ever needed to be.</p>
              <p class="ob-letter-body">Should you wish to contest this filing, note that Institute records are sealed until <strong>Monday</strong>, when Central Server (realm: <em>BirthdayCorp&nbsp;/&nbsp;SYSOPS</em>) performs its weekly reconciliation. Access is restricted to authorized staff. The Institute reminds you only that the case name is also the key, and that a key is of no use on the wrong day.</p>
              <p class="ob-letter-body">We encourage continued vigilance and welcome future submissions. Please allow 6–18 months for processing of any follow-up reports. If you believe this determination was made in error, you may appeal in writing to Dr. Lily Padsworth, PhD. Appeals are reviewed quarterly. The next quarterly review is scheduled for the fourth quarter of 2003.</p>
              <p class="ob-letter-body">With professional regards,</p>
              <p class="ob-letter-body"><em>Office of Sighting Report Review<br>Anuran Behavioral Research Institute<br>Est. 2003</em></p>
              <button class="ob-letter-dismiss" id="ob-letter-dismiss">Submit another report</button>
            </div>
          </div>

          <!-- FIELD SIMULATOR — 🐸🎮 a visible, playable feature (not an ARG clue) -->
          <div class="ob-panel" id="ob-panel-simulator">
            <h2 class="ob-section-title">Anuran Field Simulator</h2>
            <p class="ob-body">Pilot <strong>Specimen 7-B</strong> along the wetland observation transect. Each reed cleared logs one <strong>observation-hour</strong>. The Institute makes no claim that this simulation possesses scientific value; it does not, and the determination is unchanged. It is provided for training purposes and staff morale.</p>
            <p class="ob-body ob-body-sm"><em>Simulator FS-7B (Rev. 2019). Click, tap, or press Space to flap. Field Observer certification not conferred.</em></p>

            <div class="ob-sim-stage">
              <canvas id="ob-sim-canvas" width="480" height="360" aria-label="Anuran Field Simulator — flap Specimen 7-B to clear the reeds"></canvas>
            </div>
            <div class="ob-sim-meta">
              <button type="button" class="ob-submit-btn ob-sim-btn" id="ob-sim-btn">BEGIN SIMULATION</button>
              <div class="ob-sim-stats">
                <span>Certification: <strong id="ob-sim-rank">Trainee</strong></span>
                <span>Personal best: <strong id="ob-sim-best">0</strong> observation-hours</span>
              </div>
            </div>
            <div class="ob-sim-skins" id="ob-sim-skins"></div>
            <p class="ob-body ob-body-sm ob-sim-note">Determination during simulation: <strong>NOT HIS BIRTHDAY.</strong> Beware the heron. Reeds re-assessed as frogs remain classified as reeds.</p>
          </div>

        </div>

        <footer class="ob-footer">
          <div>© 2024 Anuran Behavioral Research Institute &nbsp;·&nbsp; Est. 2003 &nbsp;·&nbsp; All determinations final</div>
          <div>Funded by an anonymous donor who has asked to remain anonymous, and who is not Ben.</div>
          <div class="ob-footer-fine">ABRI is a registered 501(c)(3) organization. Field observation data is collected in compliance with all applicable amphibian welfare regulations. The Institute's determination that it is not Ben's birthday does not constitute legal or medical advice.</div>
        </footer>

      </div>
    `;
	},

	// ── Tab navigation ────────────────────────────────────────────
	initTabs() {
		const tabs = document.querySelectorAll('.ob-tab');
		const panels = document.querySelectorAll('.ob-panel');

		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				tabs.forEach((t) => t.classList.remove('ob-tab-active'));
				panels.forEach((p) => p.classList.remove('ob-panel-active'));
				tab.classList.add('ob-tab-active');
				const target = document.getElementById(
					'ob-panel-' + tab.dataset.tab,
				);
				if (target) target.classList.add('ob-panel-active');
				// Leaving the simulator tab pauses the sim so it doesn't
				// run physics/RAF while hidden.
				if (tab.dataset.tab !== 'simulator' && this._simPause) {
					this._simPause();
				}
			});
		});

		// Populate publications list
		const pubList = document.getElementById('ob-pub-list');
		this.papers.forEach((p, i) => {
			const div = document.createElement('div');
			div.className = 'ob-pub-entry';
			div.innerHTML = `
        <div class="ob-pub-num">${i + 1}.</div>
        <div class="ob-pub-body">
          <div class="ob-pub-citation">${p.citation}</div>
          <details class="ob-pub-abstract">
            <summary>Abstract</summary>
            <p>${p.abstract}</p>
          </details>
        </div>
      `;
			pubList.appendChild(div);
		});
	},

	// ── Live field log ────────────────────────────────────────────
	initFieldLog() {
		const log = document.getElementById('ob-log');
		const entries = this.fieldLogEntries;
		let idx = 0;

		const addEntry = (text, isOld) => {
			const div = document.createElement('div');
			div.className = 'ob-log-entry' + (isOld ? ' ob-log-old' : '');
			const now = new Date();
			const ts = now.toLocaleTimeString('en-US', { hour12: false });
			div.innerHTML = `<span class="ob-log-ts">[${ts}]</span> <span class="ob-log-msg">${text}</span>`;
			log.insertBefore(div, log.firstChild);
			// Keep log to 30 entries
			while (log.children.length > 30) log.removeChild(log.lastChild);
		};

		// Pre-populate with older entries
		const preloadCount = Math.min(12, entries.length);
		for (let i = preloadCount - 1; i >= 0; i--) {
			addEntry(entries[i], true);
			idx = preloadCount;
		}

		// Add new entries every 3–6 seconds
		const tick = () => {
			addEntry(entries[idx % entries.length], false);
			idx++;
			setTimeout(tick, 3000 + Math.random() * 3000);
		};
		setTimeout(tick, 2500);
	},

	// ── Sighting form ─────────────────────────────────────────────
	initSightingForm() {
		const form = document.getElementById('ob-sighting-form');
		const wrap = document.getElementById('ob-form-wrap');
		const letter = document.getElementById('ob-rejection-letter');
		const refEl = document.getElementById('ob-ref-num');
		const dismiss = document.getElementById('ob-letter-dismiss');

		if (!form || !wrap || !letter) return;

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const refNum =
				'FSR-2024-' + Math.floor(1000 + Math.random() * 9000);
			if (refEl) refEl.textContent = refNum;
			wrap.style.display = 'none';
			letter.style.display = 'block';
			// 🥚 Filing the report reveals the standing case designation —
			// PADSWORTH v. FROGS. Everything at the Institute is filed under
			// FROGS. The letter names the key; Monday's realm is where it fits.
			if (window.Hunt) window.Hunt.find('fri-frogs');
		});

		if (dismiss)
			dismiss.addEventListener('click', () => {
				form.reset();
				letter.style.display = 'none';
				wrap.style.display = 'block';
			});
	},

	// ── 🐸🎮 Anuran Field Simulator (Flappy Frog) ─────────────────
	// A self-contained, visible feature: pilot a specimen through the reed
	// transect. Each reed (or fly) cleared = one "observation-hour". Endless,
	// with Field Stations (environments), a heron hazard, collectible flies,
	// data-gap events, certification ranks, and unlockable specimen skins.
	// NOT an ARG clue — pure deadpan comedy. Vanilla canvas, no dependencies.
	//
	// Extending: ENVIRONMENTS, SKINS and RANKS are plain arrays — add an entry
	// to grow the game. Stations cycle through ENVIRONMENTS as the number climbs.
	initSimulator() {
		const canvas = document.getElementById('ob-sim-canvas');
		if (!canvas) return;
		const ctx = canvas.getContext('2d');

		// Logical play-field; upscale for crisp rendering on HiDPI.
		const W = 480,
			H = 360;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);

		// Physics (logical px / 60fps-frame; dt-normalized in the loop).
		const FX = 100, // frog x (fixed)
			R = 13, // frog collision radius
			G = 0.42, // gravity
			FLAP = -6.7, // flap impulse (velocity set)
			RW = 54, // reed width
			GAP = 138, // vertical gap
			SPACING = 220, // horizontal spacing between reeds
			MARGIN = 46, // min gap distance from top/bottom
			GAP_SHIFT = 96, // max vertical move between consecutive gaps
			STATION_LEN = 6; // observation-hours per Field Station

		// Field Stations — the environments the transect cycles through. Add
		// more freely; `name`/`line` feed the intercom banner, the colours
		// re-tint the scene. `night` draws a moon + stars; `fog` hazes the view.
		const ENVIRONMENTS = [
			{ name: 'Reedmarsh', line: 'Conditions nominal. Determination unchanged.',
			  sky: ['#cfe8d6', '#8fc6a2'], reed: '#2f7d4a', edge: '#1a5230', pad: '#3a9159',
			  ground: 'rgba(26,107,58,0.10)', hud: 'rgba(14,38,24,0.88)' },
			{ name: 'Dusk Bog', line: 'Ambient light waning. It is still not his birthday.',
			  sky: ['#f2d7ac', '#9c7196'], reed: '#5a4a6e', edge: '#332844', pad: '#7a6690',
			  ground: 'rgba(51,40,68,0.16)', hud: 'rgba(40,28,54,0.9)' },
			{ name: 'Night Watch', line: 'Passive night monitoring engaged. No birthday detected.',
			  sky: ['#12233a', '#0a1626'], reed: '#1c3a56', edge: '#0d1f30', pad: '#2b5578',
			  ground: 'rgba(10,22,38,0.5)', hud: '#bcd6ef', night: true },
			{ name: 'Fog Bank', line: 'Signal interference expected. Data integrity: nominal-ish.',
			  sky: ['#d8e0dc', '#aeb8b2'], reed: '#5f6f64', edge: '#3d4a41', pad: '#79897d',
			  ground: 'rgba(61,74,65,0.14)', hud: 'rgba(42,51,44,0.9)', fog: true },
			{ name: 'Frozen Fen', line: 'Cutaneous hydration: freezing. Observation continues.',
			  sky: ['#dff0f6', '#a7cfe0'], reed: '#6fa8c4', edge: '#3f7593', pad: '#8fc0d6',
			  ground: 'rgba(63,117,147,0.14)', hud: 'rgba(23,48,64,0.9)' },
		];
		const NIGHT_STARS = [[40, 40], [110, 24], [180, 60], [250, 30], [300, 70],
			[360, 36], [420, 58], [200, 100], [80, 90], [440, 100]];

		// Specimen skins — drawn (not emoji) so colour = identity. Unlock by best.
		const SKINS = [
			{ id: '7B', name: '7-B', body: '#3a9e57', belly: '#c6ebd0', desc: 'Marsh green (standard issue)', unlock: 0 },
			{ id: '12A', name: '12-A', body: '#3f7fd4', belly: '#d3e3ff', desc: 'Dendrobatid blue', unlock: 15 },
			{ id: '9D', name: '9-D', body: '#8a8f88', belly: '#dbdfd9', desc: 'Torpor grey', unlock: 30 },
			{ id: '1F', name: '1-F', body: '#d9a833', belly: '#f6e6b0', desc: 'Golden (rare)', unlock: 50 },
		];

		// Certification ranks — best score → in-character title.
		const RANKS = [
			{ min: 0, title: 'Trainee' },
			{ min: 10, title: 'Junior Field Observer' },
			{ min: 25, title: 'Senior Field Observer' },
			{ min: 45, title: 'Lead Observer' },
			{ min: 70, title: 'Director (Padsworth-tier)' },
		];
		const rankFor = (n) => {
			let t = RANKS[0].title;
			for (const r of RANKS) if (n >= r.min) t = r.title;
			return t;
		};

		const bestEl = document.getElementById('ob-sim-best');
		const rankEl = document.getElementById('ob-sim-rank');
		const btn = document.getElementById('ob-sim-btn');
		const BEST_KEY = 'abri-sim-best';
		const SKIN_KEY = 'abri-sim-skin';
		let best = 0,
			skinId = '7B';
		try {
			best = parseInt(localStorage.getItem(BEST_KEY), 10) || 0;
			skinId = localStorage.getItem(SKIN_KEY) || '7B';
		} catch (e) {}

		const skinById = (id) => SKINS.find((s) => s.id === id) || SKINS[0];
		// Selected skin only applies if it's unlocked at the current best.
		const currentSkin = () => {
			const s = skinById(skinId);
			return s.unlock <= best ? s : SKINS[0];
		};

		let state = 'ready'; // ready | running | paused | over
		let fy, vy, reeds, score, speed, station, deadBy;
		let heron, heronCd, fly, flyCd, flyPop, dataGapTtl, dataGapCd, bannerTtl, bannerText;
		let raf = null,
			last = 0;

		const env = () => ENVIRONMENTS[(station - 1) % ENVIRONMENTS.length];

		// Next gap is randomised but constrained to stay within a reachable
		// vertical shift of the previous one — a big fast swing between
		// far-apart gaps is what made the run unbeatable past ~11.
		const gapLo = MARGIN,
			gapHi = H - GAP - MARGIN;
		const nextGap = (prev) => {
			if (prev == null) return (H - GAP) / 2; // first gap centred: fair start
			const lo = Math.max(gapLo, prev - GAP_SHIFT);
			const hi = Math.min(gapHi, prev + GAP_SHIFT);
			return lo + Math.random() * (hi - lo);
		};

		const reset = () => {
			fy = H * 0.42;
			vy = 0;
			score = 0;
			speed = 2.2;
			station = 1;
			reeds = [{ x: W + 30, gap: nextGap(null), passed: false }];
			heron = null;
			heronCd = 300;
			fly = null;
			flyCd = 240;
			flyPop = null;
			dataGapTtl = 0;
			dataGapCd = 520;
			bannerTtl = 0;
			bannerText = '';
		};
		reset();

		// One observation-hour banked (reed cleared or fly caught). Bumps speed
		// and advances the Field Station, firing the intercom banner on change.
		const award = () => {
			score++;
			speed = Math.min(4.2, 2.2 + score * 0.09);
			const ns = Math.floor(score / STATION_LEN) + 1;
			if (ns !== station) {
				station = ns;
				const e = env();
				bannerText = 'STATION ' + station + ' — ' + e.name.toUpperCase();
				bannerTtl = 150;
			}
		};

		// ── UI: rank, best, skin picker ───────────────────────────
		const updateStats = () => {
			if (bestEl) bestEl.textContent = best;
			if (rankEl) rankEl.textContent = rankFor(best);
		};

		const renderSkins = () => {
			const wrap = document.getElementById('ob-sim-skins');
			if (!wrap) return;
			wrap.innerHTML = '<span class="ob-sim-skins-label">Specimen</span>';
			SKINS.forEach((s) => {
				const unlocked = s.unlock <= best;
				const b = document.createElement('button');
				b.type = 'button';
				b.className =
					'ob-sim-skin' +
					(unlocked && s.id === skinId ? ' ob-sim-skin-on' : '') +
					(unlocked ? '' : ' ob-sim-skin-locked');
				b.disabled = !unlocked;
				b.title = unlocked
					? s.desc
					: 'Unlocks at ' + s.unlock + ' best observation-hours';
				b.innerHTML =
					'<span class="ob-sim-swatch" style="background:' + s.body + '"></span>' +
					s.name +
					(unlocked ? '' : ' <span class="ob-sim-lock">🔒 ' + s.unlock + '</span>');
				if (unlocked)
					b.addEventListener('click', () => {
						skinId = s.id;
						try {
							localStorage.setItem(SKIN_KEY, skinId);
						} catch (e) {}
						renderSkins();
						draw();
					});
				wrap.appendChild(b);
			});
		};

		const setBtn = () => {
			if (!btn) return;
			btn.textContent =
				state === 'over'
					? 'RUN AGAIN'
					: state === 'paused'
						? 'RESUME'
						: state === 'running'
							? 'FLAP'
							: 'BEGIN SIMULATION';
		};

		// ── Loop control ──────────────────────────────────────────
		const startLoop = () => {
			if (raf) return;
			last = 0;
			raf = requestAnimationFrame(loop);
		};
		const stopLoop = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = null;
		};

		const flap = () => {
			if (state === 'ready' || state === 'over') {
				reset();
				state = 'running';
				vy = FLAP;
				startLoop();
			} else if (state === 'paused') {
				state = 'running';
				startLoop();
			} else if (state === 'running') {
				vy = FLAP;
			}
			setBtn();
		};

		const pause = () => {
			if (state === 'running') {
				state = 'paused';
				stopLoop();
				draw();
				setBtn();
			}
		};
		// Expose pause so leaving the tab / hiding the page halts the sim.
		this._simPause = pause;

		const gameOver = (cause) => {
			deadBy = cause;
			state = 'over';
			if (score > best) {
				best = score;
				try {
					localStorage.setItem(BEST_KEY, best);
				} catch (e) {}
				updateStats();
				renderSkins(); // a new best may unlock a specimen
			}
			stopLoop();
			draw();
			setBtn();
		};

		// ── Collision ─────────────────────────────────────────────
		const hitReed = (rd) => {
			if (FX + R < rd.x || FX - R > rd.x + RW) return false;
			return fy - R < rd.gap || fy + R > rd.gap + GAP;
		};
		const heronY = () => heron.y + Math.sin(heron.phase) * heron.bob;

		// ── Simulation step ───────────────────────────────────────
		const update = (dt) => {
			vy += G * dt;
			fy += vy * dt;
			if (fy - R < 0) {
				fy = R; // ceiling clamps, doesn't kill
				vy = 0;
			}
			if (fy + R > H) {
				fy = H - R; // the marsh floor, however, is fatal
				gameOver('floor');
				return;
			}

			// Reeds: move, spawn, score, collide, cull.
			for (const rd of reeds) rd.x -= speed * dt;
			const lastReed = reeds[reeds.length - 1];
			if (lastReed.x < W - SPACING)
				reeds.push({ x: W, gap: nextGap(lastReed.gap), passed: false });
			for (const rd of reeds) {
				if (!rd.passed && rd.x + RW < FX) {
					rd.passed = true;
					award();
				}
				if (hitReed(rd)) {
					gameOver('reed');
					return;
				}
			}
			reeds = reeds.filter((rd) => rd.x + RW > -10);

			// Intercom banner countdown.
			if (bannerTtl > 0) bannerTtl -= dt;

			// Heron hazard — enters from Station 2 on. "heron."
			if (heron) {
				heron.x += heron.vx * dt;
				heron.phase += 0.1 * dt;
				if (Math.hypot(FX - heron.x, fy - heronY()) < R + 13) {
					gameOver('heron');
					return;
				}
				if (heron.x < -60) heron = null;
			} else if (station >= 2) {
				// Only tick the cooldown once herons are in play, so the first
				// one appears a fair interval AFTER reaching Station 2 (rather
				// than instantly, from a counter that ran down during Station 1).
				heronCd -= dt;
				if (heronCd <= 0) {
					heron = {
						x: W + 50,
						y: MARGIN + 20 + Math.random() * (H - 2 * MARGIN - 70),
						vx: -(speed * 1.5 + 1.0),
						phase: Math.random() * 6.28,
						bob: 5 + Math.random() * 6,
					};
					heronCd = 380 + Math.random() * 340;
				}
			}

			// Flies — collectible bonus observation-hours, riding a reed gap.
			if (fly) {
				fly.x -= speed * dt;
				if (Math.hypot(FX - fly.x, fy - fly.y) < R + 9) {
					award();
					flyPop = { x: fly.x, y: fly.y, ttl: 28 };
					fly = null;
					flyCd = 260 + Math.random() * 260;
				} else if (fly.x < -14) {
					fly = null;
					flyCd = 200 + Math.random() * 200;
				}
			} else {
				flyCd -= dt;
				if (flyCd <= 0 && reeds.length) {
					const near = reeds[reeds.length - 1];
					fly = { x: W + 20, y: near.gap + GAP / 2 + (Math.random() * 40 - 20) };
				}
			}
			if (flyPop) {
				flyPop.ttl -= dt;
				flyPop.y -= 0.6 * dt;
				if (flyPop.ttl <= 0) flyPop = null; // else it re-brightens + drifts forever
			}

			// Data-gap events — from Station 3 on, the feed briefly drops.
			// Cooldown only ticks once eligible, so the first gap doesn't fire
			// the instant Station 3 begins.
			if (dataGapTtl > 0) dataGapTtl -= dt;
			else if (station >= 3) {
				dataGapCd -= dt;
				if (dataGapCd <= 0) {
					dataGapTtl = 78;
					dataGapCd = 560 + Math.random() * 380;
				}
			}
		};

		// ── Rendering ─────────────────────────────────────────────
		const drawBg = (e) => {
			// Build the sky gradient once per environment, then reuse it (was
			// re-allocated ~60×/s, avoidable GC churn on low-end devices).
			if (!e._grad) {
				const g = ctx.createLinearGradient(0, 0, 0, H);
				g.addColorStop(0, e.sky[0]);
				g.addColorStop(1, e.sky[1]);
				e._grad = g;
			}
			ctx.fillStyle = e._grad;
			ctx.fillRect(0, 0, W, H);
			if (e.night) {
				ctx.fillStyle = 'rgba(255,255,255,0.9)';
				ctx.beginPath();
				ctx.arc(W - 62, 56, 15, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = 'rgba(255,255,255,0.4)';
				for (const [sx, sy] of NIGHT_STARS) ctx.fillRect(sx, sy, 2, 2);
			}
			ctx.fillStyle = e.ground;
			ctx.fillRect(0, H - 26, W, 26);
		};

		const drawReed = (rd, e, alpha) => {
			ctx.globalAlpha = alpha;
			ctx.fillStyle = e.reed;
			ctx.strokeStyle = e.edge;
			ctx.lineWidth = 2;
			ctx.fillRect(rd.x, 0, RW, rd.gap);
			ctx.strokeRect(rd.x, 0, RW, rd.gap);
			ctx.fillRect(rd.x, rd.gap + GAP, RW, H - rd.gap - GAP);
			ctx.strokeRect(rd.x, rd.gap + GAP, RW, H - rd.gap - GAP);
			ctx.fillStyle = e.pad;
			ctx.beginPath();
			ctx.ellipse(rd.x + RW / 2, rd.gap, RW / 2 + 4, 9, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();
			ctx.ellipse(rd.x + RW / 2, rd.gap + GAP, RW / 2 + 4, 9, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 1;
		};

		const drawFly = (fx2, fy2) => {
			ctx.font = '16px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('🪰', fx2, fy2);
		};

		const drawHeron = (hx, hy) => {
			ctx.save();
			ctx.translate(hx, hy);
			ctx.strokeStyle = '#5c666d';
			ctx.lineWidth = 1.5;
			// body
			ctx.fillStyle = '#8a97a0';
			ctx.beginPath();
			ctx.ellipse(0, 0, 20, 9, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
			// wing
			ctx.fillStyle = '#6f7c85';
			ctx.beginPath();
			ctx.moveTo(4, -2);
			ctx.lineTo(-14, -15);
			ctx.lineTo(-6, 2);
			ctx.closePath();
			ctx.fill();
			// neck + head (facing left, the way it's flying)
			ctx.strokeStyle = '#8a97a0';
			ctx.lineWidth = 4;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(-15, -2);
			ctx.lineTo(-24, -12);
			ctx.stroke();
			ctx.fillStyle = '#8a97a0';
			ctx.beginPath();
			ctx.arc(-25, -13, 4, 0, Math.PI * 2);
			ctx.fill();
			// beak
			ctx.fillStyle = '#e0b23a';
			ctx.beginPath();
			ctx.moveTo(-28, -14);
			ctx.lineTo(-39, -11);
			ctx.lineTo(-28, -10);
			ctx.closePath();
			ctx.fill();
			// trailing legs
			ctx.strokeStyle = '#e0b23a';
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			ctx.moveTo(14, 4);
			ctx.lineTo(27, 12);
			ctx.moveTo(16, 5);
			ctx.lineTo(29, 9);
			ctx.stroke();
			ctx.restore();
		};

		const drawFrog = () => {
			const s = currentSkin();
			const tilt = Math.max(-0.4, Math.min(0.9, vy * 0.05));
			ctx.save();
			ctx.translate(FX, fy);
			ctx.rotate(tilt);
			ctx.strokeStyle = 'rgba(0,0,0,0.28)';
			ctx.lineWidth = 1.5;
			// body
			ctx.fillStyle = s.body;
			ctx.beginPath();
			ctx.ellipse(0, 2, 15, 12, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
			// belly
			ctx.fillStyle = s.belly;
			ctx.beginPath();
			ctx.ellipse(0, 6, 9, 6, 0, 0, Math.PI * 2);
			ctx.fill();
			// eyes (two bumps up top)
			for (const ex of [-7, 7]) {
				ctx.fillStyle = s.body;
				ctx.beginPath();
				ctx.arc(ex, -9, 5, 0, Math.PI * 2);
				ctx.fill();
				ctx.stroke();
				ctx.fillStyle = '#fff';
				ctx.beginPath();
				ctx.arc(ex, -9, 3, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = '#111';
				ctx.beginPath();
				ctx.arc(ex + 1, -9, 1.6, 0, Math.PI * 2);
				ctx.fill();
			}
			// smile
			ctx.strokeStyle = 'rgba(0,0,0,0.35)';
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.arc(0, 3, 6, 0.15 * Math.PI, 0.85 * Math.PI);
			ctx.stroke();
			ctx.restore();
		};

		const overlay = (title, sub) => {
			ctx.fillStyle = 'rgba(9,26,16,0.6)';
			ctx.fillRect(0, H / 2 - 46, W, 92);
			ctx.textAlign = 'center';
			ctx.fillStyle = '#eafff0';
			ctx.font = 'bold 22px Georgia, serif';
			ctx.fillText(title, W / 2, H / 2 - 8);
			ctx.font = '12px Arial, sans-serif';
			ctx.fillStyle = 'rgba(234,255,240,0.85)';
			ctx.fillText(sub, W / 2, H / 2 + 20);
		};

		const drawBanner = (e) => {
			const a = Math.min(1, bannerTtl / 30);
			ctx.globalAlpha = a;
			const bw = Math.min(W - 40, 360),
				bh = 42,
				bx = (W - bw) / 2,
				by = 56;
			ctx.fillStyle = 'rgba(9,26,16,0.85)';
			ctx.fillRect(bx, by, bw, bh);
			ctx.textAlign = 'center';
			ctx.fillStyle = '#eafff0';
			ctx.font = 'bold 12px Arial, sans-serif';
			ctx.fillText('◈ ' + bannerText, W / 2, by + 17);
			ctx.fillStyle = 'rgba(234,255,240,0.85)';
			ctx.font = '11px Arial, sans-serif';
			ctx.fillText(e.line, W / 2, by + 32);
			ctx.globalAlpha = 1;
		};

		const draw = () => {
			const e = env();
			drawBg(e);

			const reedAlpha = dataGapTtl > 0 ? 0.2 : 1;
			for (const rd of reeds) drawReed(rd, e, reedAlpha);
			if (fly) drawFly(fly.x, fly.y);
			if (heron) drawHeron(heron.x, heronY());
			drawFrog();
			if (flyPop) {
				ctx.globalAlpha = Math.min(1, flyPop.ttl / 20);
				ctx.fillStyle = '#155e2e';
				ctx.font = 'bold 13px Arial, sans-serif';
				ctx.textAlign = 'center';
				ctx.fillText('+1 hr', flyPop.x, flyPop.y);
				ctx.globalAlpha = 1;
			}
			if (e.fog) {
				ctx.fillStyle = 'rgba(222,229,225,0.3)';
				ctx.fillRect(0, 0, W, H);
			}

			// HUD.
			ctx.fillStyle = e.hud;
			ctx.font = 'bold 14px Arial, sans-serif';
			ctx.textAlign = 'left';
			ctx.textBaseline = 'alphabetic';
			ctx.fillText('OBSERVATION-HOURS: ' + score, 12, 24);
			ctx.font = '11px Arial, sans-serif';
			ctx.fillText('STATION ' + station + ' · ' + e.name.toUpperCase(), 12, 40);

			if (dataGapTtl > 0) {
				ctx.textAlign = 'center';
				ctx.fillStyle = e.night ? '#ffd27a' : '#a5341f';
				ctx.font = 'bold 12px Arial, sans-serif';
				ctx.fillText('▓ DATA GAP — RECONSTRUCTING FEED ▓', W / 2, 20);
			}

			if (bannerTtl > 0) drawBanner(e);

			if (state === 'ready')
				overlay('ANURAN FIELD SIMULATOR', 'Flap to begin · clear the reeds');
			else if (state === 'paused')
				overlay('OBSERVATION PAUSED', 'Flap to resume the transect');
			else if (state === 'over') {
				const t =
					deadBy === 'heron'
						? 'ACQUIRED BY HERON'
						: deadBy === 'floor'
							? 'SPECIMEN GROUNDED'
							: 'SPECIMEN DOWN';
				overlay(
					t,
					'Logged ' + score + ' hr · best ' + best + ' · ' + rankFor(best) + ' · flap to retry',
				);
			}
		};

		const loop = (now) => {
			if (state !== 'running') {
				raf = null;
				return;
			}
			if (!last) last = now;
			let dt = (now - last) / 16.667;
			last = now;
			if (dt > 3) dt = 3; // clamp big gaps (e.g. returning to the tab)
			// Integrate in ≤1-frame sub-steps so a slow/janky frame can't lurch
			// the frog a whole reed's width in one hop (collision tunnelling /
			// unavoidable deaths). update() is displacement- and flag-based, so
			// N sub-steps of dt/N are equivalent to one step for a smooth frame.
			let remaining = dt;
			while (remaining > 0 && state === 'running') {
				const step = Math.min(remaining, 1);
				update(step);
				remaining -= step;
			}
			if (state === 'running') {
				draw();
				raf = requestAnimationFrame(loop);
			} else {
				raf = null;
			}
		};

		// ── Input ─────────────────────────────────────────────────
		canvas.addEventListener('pointerdown', (e) => {
			e.preventDefault();
			flap();
		});
		if (btn) btn.addEventListener('click', () => flap());
		document.addEventListener('keydown', (e) => {
			if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
			const panel = document.getElementById('ob-panel-simulator');
			if (!panel || !panel.classList.contains('ob-panel-active')) return;
			// Don't hijack Space/ArrowUp when a real control is focused (a tab
			// button, link, or form field) — let it activate/scroll normally.
			const t = e.target;
			if (t && typeof t.closest === 'function' &&
				t.closest('button, a, input, select, textarea')) return;
			e.preventDefault();
			flap();
		});
		document.addEventListener('visibilitychange', () => {
			if (document.hidden) pause();
		});

		updateStats();
		renderSkins();
		draw();
		setBtn();
	},
};
