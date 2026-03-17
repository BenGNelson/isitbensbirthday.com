/* ============================================================
   friday.js — The Anuran Behavioral Research Institute (ABRI)
   A completely sincere academic research institute conducting
   continuous field observation to determine whether it is
   Ben Nelson's birthday. Every study has concluded it is not.
   ============================================================ */

window.Friday = {
	fieldLogEntries: [
		'Specimen 7-B: vocalizing. Call frequency: 847 Hz. Duration: 14.2 min. No birthday indicators.',
		'Station 4: ambient temp 11.8°C. Frog activity: nil. Temporal conditions: non-festive.',
		'Cross-referencing with historical non-birthday corpus. Match confidence: 99.97%.',
		'Specimen 12-A: foraging at water margin. Heading: 247°. Pace: 0.3 m/s. Nelson coordinates: 0 anomalies.',
		'frog',
		'Station 2: no movement detected in 73.4 minutes. Sensor integrity: nominal.',
		'Specimen 3-C: jumping. Event duration: 0.8s. Horizontal distance: 0.62 m. Classified: non-birthday related.',
		'Field note: known Nelson coordinates surveilled. No birthday. Observation continues.',
		'Data gap 14:32–14:47 UTC. Cause: Specimen 9-A submerged primary acoustic sensor. Resolved.',
		'Station 11: passive monitoring. Nothing to report. This is the expected finding.',
		'Specimen 9-D: entering torpor position. Duration: 22 min. (Confirmed active at 22:01.) Non-event.',
		'Environmental scan complete. No birthday-adjacent atmospheric conditions detected.',
		'Specimen 1-F: awake. Activity type: ambiguous. Filed under: inconclusive (non-birthday).',
		'Comparative index against Nelson Baseline Dataset (2019–2024): deviation 0.002%. Stable.',
		'Station 7: brief vocalization. Re-assessed as wind through reeds. Non-birthday wind.',
		'Field team note: morale good. Determination unchanged.',
		'Frog cohort (n=14): all accounted for. Group behavior: non-festive.',
		'Auto-ping: ABRI Central Server. Status: online. Current determination: NOT HIS BIRTHDAY.',
		'Signal interference at station 6 (13 sec). Data recovered. No birthday occurred during gap.',
		'Specimen 4-B: tympanic membrane activity detected. Birthday likelihood: 0.003%.',
		'frog',
		'Station 3: humidity 91%. Frog cutaneous hydration: adequate. Birthday status: negative.',
		'Longitudinal trend analysis complete. Conclusion: consistent with all prior findings.',
		'Note: one specimen appeared to orient toward Nelson coordinates. Filed: inconclusive.',
		'Uptime: 13,505 days of continuous observation. Determinations issued: 13,505. All negative.',
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
				'Nelson, B.G. & Anuran Panel (2019). Continued Absence of Birthday Conditions: A 32-Year Longitudinal Study. <em>Journal of Temporal Herpetology</em>, 44(2), 118–134.',
			abstract:
				"We present 32 years of continuous field observation data regarding the birthday status of subject B.G. Nelson. Results are consistent across all observation periods. The study period included the subject's actual birthday (July 5th) on 32 occasions, none of which were detected. Authors conclude: it is not his birthday. Continued observation is recommended. <strong>Note: B.G. Nelson was listed as co-author in error. He is the subject, not a researcher. The Institute regrets this administrative oversight.</strong>",
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
				'Padsworth, L.R., Grenouille, F.T. & Field Station Collective (2023). The Nelson Coordinates: Eighteen Months of Intensive Perimeter Observation Using Acoustic Triangulation of <em>Lithobates catesbeianus</em> Vocalizations. <em>Journal of Applied Anuran Science</em>, 29(3), 44–61.',
			abstract:
				'Following a grant renewal, ABRI intensified observation around the Nelson Coordinates from January 2022 through June 2023. Frog vocalizations were logged at 15-minute intervals. No birthday was detected. Budget utilization: 94%. Remaining funds allocated to tadpole enrichment.',
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
                <div class="ob-institute-address">14 Ribbit Road, Suite 3 &nbsp;·&nbsp; Bogmere, OH 44107 &nbsp;·&nbsp; abri@abri-institute.edu</div>
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
        </nav>

        <div class="ob-content">

          <!-- ABOUT -->
          <div class="ob-panel ob-panel-active" id="ob-panel-about">
            <div class="ob-two-col">
              <div class="ob-main-col">
                <h2 class="ob-section-title">About the Institute</h2>
                <p class="ob-body">The Anuran Behavioral Research Institute was founded in 1987 by Dr. Lily R. Padsworth, PhD, following a series of promising but inconclusive field observations near the known residential coordinates of one Benjamin G. Nelson. Frogs — members of the order Anura, meaning "without tail" in Greek — were selected as field observers for their sensitivity to environmental stimuli, including tympanic membrane activity and cutaneous moisture levels. The Institute has maintained continuous field observation since that date, with a singular research objective: to determine, with scientific certainty, whether it is Ben's birthday.</p>
                <p class="ob-body">To date, the Institute has issued 13,505 daily determinations. All have concluded: <strong>it is not Ben's birthday.</strong> Continued observation is recommended.</p>

                <h3 class="ob-subsection-title">Our Methodology</h3>
                <p class="ob-body">ABRI employs a proprietary observational framework known as the Nelson Anuran Inference Protocol (NAIP), which correlates frog vocalization frequency, tympanic membrane activity, and cutaneous moisture levels near the Nelson Coordinates with known festive atmospheric conditions. Field observers document specimen movement, call patterns, foraging behavior, and ambient vocalizations at 15-minute intervals, 24 hours per day. There are over 7,000 described species of frog; ABRI works with 14 of them.</p>
                <p class="ob-body">Note: Frog-based behavioral observation was formally discontinued as a primary methodology in 2018, following the Padsworth Review (see: <em>Padsworth 2018, "On Limitations"</em>). The Institute transitioned to a passive environmental monitoring framework at that time. The live field data feed below reflects current specimen activity from our 14 active field stations.</p>

                <h3 class="ob-subsection-title">Leadership</h3>
                <p class="ob-body"><strong>Dr. Lily R. Padsworth, PhD</strong> (Director) &mdash; Dr. Padsworth has led the Institute since its founding. Her work in anuran temporal inference has been cited 4 times, including once by herself in a later paper and once in error.</p>
                <p class="ob-body"><strong>Dr. Kermit J. Greenwell, PhD</strong> (Senior Research Fellow) &mdash; Dr. Greenwell oversees acoustic triangulation operations and tympanic membrane data collection across all active field stations.</p>
                <p class="ob-body"><strong>Research Staff:</strong> 23 full-time field observers, 2 data analysts, 1 statistician (Dr. Anura B. Gilmore, part-time, contract, since 2009, same contract).</p>

                <h3 class="ob-subsection-title">Funding</h3>
                <p class="ob-body">The Institute's annual operating budget of $4.2 million is provided in full by an anonymous donor who has asked to remain anonymous, and who is not Ben.</p>
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
                <p class="ob-body ob-body-sm">Real-time observation log from 14 active field stations. Data is transmitted continuously from our single field station. Timestamps reflect local field observer time (UTC-5).</p>
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
              <p class="ob-letter-body">After thorough review by our panel, your report has been assessed as <strong>INCONCLUSIVE</strong>. Specifically, the panel identified insufficient anuran corroboration for the claimed birthday conditions. While we appreciate the detail provided, the frog activity data submitted does not meet the evidentiary threshold established under the Nelson Anuran Inference Protocol (NAIP §4.2.1).</p>
              <p class="ob-letter-body">Our current field determination remains: <strong>NOT HIS BIRTHDAY.</strong></p>
              <p class="ob-letter-body">We encourage continued vigilance and welcome future submissions. Please allow 6–18 months for processing of any follow-up reports. If you believe this determination was made in error, you may appeal in writing to Dr. Lily Padsworth, PhD. Appeals are reviewed quarterly. The next quarterly review is scheduled for a later quarter.</p>
              <p class="ob-letter-body">With professional regards,</p>
              <p class="ob-letter-body"><em>Office of Sighting Report Review<br>Anuran Behavioral Research Institute<br>Est. 2003</em></p>
              <button class="ob-letter-dismiss" id="ob-letter-dismiss">Submit another report</button>
            </div>
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

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const refNum =
				'FSR-2024-' + Math.floor(1000 + Math.random() * 9000);
			refEl.textContent = refNum;
			wrap.style.display = 'none';
			letter.style.display = 'block';
		});

		dismiss.addEventListener('click', () => {
			form.reset();
			letter.style.display = 'none';
			wrap.style.display = 'block';
		});
	},
};
