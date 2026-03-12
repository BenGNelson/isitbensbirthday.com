/* ============================================================
   tuesday.js — URGENT: Form BDY-404 Required
   A government portal. 47 fields. Always rejected.
   ============================================================ */

window.Tuesday = {

  init(app) {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

    app.innerHTML = this.buildHTML(dateStr);
    this.initForm();
  },

  buildHTML(dateStr) {
    return `
      <header class="gov-header">
        <div class="gov-header-top">
          <div class="gov-seal">🦅</div>
          <div class="gov-header-title">
            <h1>Department of Birthday Verification and Temporal Compliance</h1>
            <p>United States · Est. 2024 · Form Processing Division</p>
          </div>
          <div class="gov-header-right">
            OMB No. 2024-BDY<br>
            Expires: July 5th<br>
            Burden: 47 hours
          </div>
        </div>
        <nav class="gov-header-nav">
          <a href="#">Home</a>
          <a href="#">Forms</a>
          <a href="#">Birthday Registry</a>
          <a href="#">Contact</a>
          <a href="#">FOIA</a>
          <a href="#">En Español</a>
        </nav>
      </header>

      <div class="gov-alert">
        <span class="gov-alert-icon">⚠️</span>
        <span>
          <strong>NOTICE:</strong> You have accessed this portal on a non-birthday date.
          Completion of Form BDY-404 is required before you may proceed.
          Failure to comply may result in a strongly-worded follow-up email.
        </span>
      </div>

      <main class="gov-main">
        <div class="gov-notice">
          <div class="gov-notice-header">
            <div class="gov-notice-seal">🏛️</div>
            <div>
              <div class="gov-notice-title">Official Government Notice</div>
            </div>
          </div>
          <h2>Non-Birthday Portal Access Detected</h2>
          <p>
            Per <strong>Regulation 47-B, Subsection 12(c)</strong> of the Birthday Verification and
            Temporal Compliance Act of 2024, all individuals accessing this portal on a date that is
            not Ben's birthday (July 5th) are required to complete and submit Form BDY-404 in its
            entirety. Incomplete submissions will not be reviewed.
          </p>
          <div class="gov-regulation">
            Reg. 47-B §12(c): "No person shall access the Birthday Portal on a non-birthday date
            without first completing Form BDY-404 in full. Completion does not guarantee access.
            Access may be granted at the sole discretion of the Birthday. The Birthday is July 5th."
          </div>
        </div>

        <div class="gov-form-container">
          <div class="gov-form-title">Form BDY-404</div>
          <div class="gov-form-ref">
            Non-Birthday Portal Access Acknowledgment and Date Verification Form (Rev. 2024) ·
            See instructions on reverse · This form is not reversible
          </div>

          <form id="gov-form" novalidate>

            <div class="gov-form-section">
              <div class="gov-form-section-title">Section I — Birthday Status Confirmation</div>

              <div class="gov-field">
                <label>1. Is today Ben's birthday? <span class="gov-required">*</span></label>
                <div class="gov-radio-group">
                  <label><input type="radio" name="is-birthday" value="yes" disabled> YES (not available — date validation failed)</label>
                  <label><input type="radio" name="is-birthday" value="no" checked> NO</label>
                </div>
                <p class="gov-helper">If "YES" was selected, you would not need this form. It was not selected. You need this form.</p>
              </div>

              <div class="gov-field">
                <label>2. Today's Date <span class="gov-required">*</span></label>
                <input type="text" id="gov-date" value="${dateStr}" readonly>
                <p class="gov-helper">Auto-filled from your device. Unverified.</p>
              </div>
            </div>

            <div class="gov-form-section">
              <div class="gov-form-section-title">Section II — Applicant Identification</div>

              <div class="gov-field">
                <label>3. Your Legal Name <span class="gov-required">*</span></label>
                <input type="text" placeholder="Last, First, Middle Initial">
              </div>

              <div class="gov-field">
                <label>4. Your Legal Name (Confirmation) <span class="gov-required">*</span></label>
                <input type="text" placeholder="Re-enter your legal name exactly as entered above">
                <p class="gov-helper">Must match Field 3 exactly. Middle initial must match. Punctuation must match.</p>
              </div>

              <div class="gov-field">
                <label>5. Your Legal Name, Spelled Backwards <span class="gov-required">*</span></label>
                <input type="text" placeholder="e.g. laitinI elddiM ,tsriF ,tsaL">
                <p class="gov-helper">Required for identity reversal verification. Not a joke. Please comply.</p>
              </div>
            </div>

            <div class="gov-form-section">
              <div class="gov-form-section-title">Section III — Circumstances of Access</div>

              <div class="gov-field">
                <label>6. Reason for accessing this portal on a non-birthday date <span class="gov-required">*</span></label>
                <select>
                  <option value="">— Select one —</option>
                  <option>Honest mistake</option>
                  <option>Excessive curiosity</option>
                  <option>I just wanted to see what would happen</option>
                  <option>I genuinely thought it was July 5th</option>
                  <option>The calendar lied to me</option>
                  <option>I was sent here by someone who did not explain the situation</option>
                  <option>I do not understand what this website is</option>
                  <option>I have no explanation and I am not sure I should be here</option>
                </select>
              </div>

              <div class="gov-field">
                <label>7. Have you previously accessed this portal on a non-birthday date? <span class="gov-required">*</span></label>
                <div class="gov-radio-group">
                  <label><input type="radio" name="prev-access"> Yes</label>
                  <label><input type="radio" name="prev-access"> No</label>
                  <label><input type="radio" name="prev-access"> I cannot recall</label>
                  <label><input type="radio" name="prev-access"> Define "accessed"</label>
                </div>
              </div>
            </div>

            <div class="gov-form-section">
              <div class="gov-form-section-title">Section IV — Acknowledgment and Attestation</div>

              <div class="gov-field">
                <div class="gov-check-group">
                  <label>
                    <input type="checkbox" id="gov-ack-1" required>
                    I acknowledge that today is NOT Ben's birthday.
                  </label>
                  <label>
                    <input type="checkbox" id="gov-ack-2" required>
                    I acknowledge that Ben's birthday is July 5th and not today.
                  </label>
                  <label>
                    <input type="checkbox" id="gov-ack-3" required>
                    I acknowledge that I am not currently celebrating a birthday of any kind.
                  </label>
                  <label>
                    <input type="checkbox" id="gov-ack-4" required>
                    I acknowledge that completing this form will not grant me portal access.
                  </label>
                </div>
              </div>

              <div class="gov-field">
                <label>8. Government-Issued Birthday Awareness Certificate Number</label>
                <input type="text" placeholder="Format: BDY-XXXX-XXXX">
                <p class="gov-helper">Leave blank if you do not have one. Most people do not have one.</p>
              </div>

              <div class="gov-field">
                <label>9. Have you ever met Ben? <span class="gov-required">*</span></label>
                <div class="gov-radio-group">
                  <label><input type="radio" name="met-ben"> Yes</label>
                  <label><input type="radio" name="met-ben"> No</label>
                  <label><input type="radio" name="met-ben"> Define "met"</label>
                  <label><input type="radio" name="met-ben"> I am Ben</label>
                  <label><input type="radio" name="met-ben"> I would prefer not to answer this question</label>
                </div>
              </div>

              <div class="gov-field">
                <label>10. Your Signature <span class="gov-required">*</span></label>
                <input type="text" placeholder="Type your signature exactly as it appears on your signature">
                <p class="gov-helper">
                  Your typed signature serves as your legal attestation that everything above is true,
                  accurate, and that you understand it will not help you.
                </p>
              </div>
            </div>

            <div class="gov-submit-row">
              <button type="submit" class="gov-submit-btn">Submit Form BDY-404</button>
              <p class="gov-submit-note">Processing time: 6–8 birthdays</p>
            </div>
          </form>

          <div class="gov-rejection" id="gov-rejection">
            <div class="gov-rejection-title">⛔ Form Rejected — Submission Failed</div>
            <p id="gov-rejection-msg">
              Field 1 confirms today is not Ben's birthday. Form BDY-404 cannot be processed
              on non-birthday dates. Your submission has been logged and assigned a case number.
              Please resubmit on July 5th.
            </p>
            <div class="gov-ticket" id="gov-ticket"></div>
          </div>
        </div>
      </main>

      <footer class="gov-footer">
        Department of Birthday Verification and Temporal Compliance · Washington, D.C. 20024<br>
        This website is maintained by the U.S. Birthday Administration.
        Use of this form does not constitute birthday access. · Accessibility · Privacy Policy · FOIA
      </footer>
    `;
  },

  initForm() {
    const form      = document.getElementById('gov-form');
    const rejection = document.getElementById('gov-rejection');
    const msg       = document.getElementById('gov-rejection-msg');
    const ticket    = document.getElementById('gov-ticket');
    let attempts    = 0;

    const rejectionMessages = [
      `Field 1 confirms today is not Ben's birthday. Form BDY-404 cannot be processed on non-birthday dates. Please resubmit on July 5th. Your submission has been logged.`,
      `SECOND REJECTION: We note this is your second submission. Today is still not Ben's birthday. This has not changed since your last submission. It will not change until July 5th.`,
      `THIRD REJECTION: Your persistence is noted and appreciated. It is still not Ben's birthday. No amount of form submissions will alter the calendar. Please stop submitting. Please come back on July 5th.`,
      `FOURTH REJECTION: At this point we are genuinely asking you to stop. Gerald has been notified. The Department takes no further responsibility for any emotional distress caused by the continued non-occurrence of Ben's birthday. It is July 5th. It is not today. Please go outside.`,
    ];

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check required checkboxes
      const checks = ['gov-ack-1','gov-ack-2','gov-ack-3','gov-ack-4'];
      const allChecked = checks.every(id => document.getElementById(id).checked);

      if (!allChecked) {
        msg.textContent = 'INCOMPLETE SUBMISSION: All acknowledgment checkboxes in Section IV must be checked before submitting. We know this is futile. Check them anyway.';
        rejection.classList.add('visible');
        ticket.innerHTML = '';
        rejection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      const idx = Math.min(attempts, rejectionMessages.length - 1);
      msg.textContent = rejectionMessages[idx];
      attempts++;

      const caseNum = 'BDY-' + Math.floor(Math.random() * 9000 + 1000) + '-' + new Date().getFullYear();
      ticket.innerHTML = `
        Case No.: ${caseNum}<br>
        Submitted: ${new Date().toLocaleString()}<br>
        Status: REJECTED<br>
        Reason: NOT_BIRTHDAY<br>
        Resubmit After: July 5th<br>
        Assigned Reviewer: Gerald<br>
        Expected Review: Never
      `;

      rejection.classList.add('visible');
      rejection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  },
};
