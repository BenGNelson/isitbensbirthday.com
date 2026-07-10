/* ============================================================
   mainframe.js — 🥚 The hidden BirthdayCorp SYSOPS mainframe.
   Reached by entering secret credentials on the Monday login
   (admin / frogs). A fake green-CRT terminal you can poke at.
   Pure client-side; no network, no storage of anything.
   ============================================================ */

window.Mainframe = {

  init(app) {
    this.app = app;
    app.innerHTML = this.buildHTML();
    this.out     = document.getElementById('mf-out');
    this.input   = document.getElementById('mf-input');
    this.history = [];
    this.hIndex  = 0;
    this.ready   = false;
    this.bindInput();
    this.boot();
  },

  buildHTML() {
    return `
      <div class="mf-screen">
        <div class="mf-crt" id="mf-crt">
          <div class="mf-out" id="mf-out"></div>
          <div class="mf-input-line" id="mf-input-line" style="display:none">
            <span class="mf-prompt">SYSOP@BIRTHDAYCORP:~$</span>
            <input class="mf-input" id="mf-input" autocomplete="off"
                   autocapitalize="off" spellcheck="false" aria-label="terminal input">
          </div>
        </div>
        <div class="mf-scanlines" aria-hidden="true"></div>
      </div>`;
  },

  // ── Output helpers ────────────────────────────────────────────
  print(text = '', cls = '') {
    const div = document.createElement('div');
    div.className = 'mf-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    this.out.appendChild(div);
    this.scroll();
    return div;
  },

  printLines(lines, cls) { lines.forEach(l => this.print(l, cls)); },
  scroll() { const c = document.getElementById('mf-crt'); if (c) c.scrollTop = c.scrollHeight; },

  // ── Boot sequence (typewritten for flavor) ────────────────────
  boot() {
    const seq = [
      ['BIRTHDAYCORP MAINFRAME — SYSOPS TERMINAL', 'mf-accent'],
      ['Firmware v3.14  ·  (c) BirthdayCorp Enterprise Suite  ·  Internal Use Only', 'mf-dim'],
      ['', ''],
      ['Establishing secure session ............ OK', 'mf-ok'],
      ['Mounting /dev/birthday ................. OK', 'mf-ok'],
      ['Loading determination engine .......... OK', 'mf-ok'],
      ['Reticulating candles .................. OK', 'mf-ok'],
      ['WARNING: birthday_status is READ-ONLY (governed by the calendar)', 'mf-warn'],
      ['', ''],
      ['Clearance: SYSOP. Welcome, admin. You should not be here. Nice.', 'mf-accent'],
      ["Type 'help' for available commands.", ''],
      ['', ''],
    ];
    let i = 0;
    const step = () => {
      if (i >= seq.length) { this.enable(); return; }
      const [t, c] = seq[i++];
      this.print(t, c);
      setTimeout(step, t === '' ? 90 : 180 + Math.random() * 120);
    };
    setTimeout(step, 250);
  },

  enable() {
    this.ready = true;
    const line = document.getElementById('mf-input-line');
    if (line) line.style.display = '';
    this.input.focus();
    this.scroll();
  },

  // ── Input handling + command history ──────────────────────────
  bindInput() {
    // Keep focus on the terminal when clicking anywhere on screen.
    this.app.addEventListener('click', () => { if (this.ready) this.input.focus(); });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = this.input.value;
        this.input.value = '';
        this.print('SYSOP@BIRTHDAYCORP:~$ ' + raw, 'mf-echo');
        if (raw.trim()) { this.history.push(raw); this.hIndex = this.history.length; }
        this.exec(raw.trim());
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.hIndex > 0) { this.hIndex--; this.input.value = this.history[this.hIndex] || ''; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.hIndex < this.history.length) { this.hIndex++; this.input.value = this.history[this.hIndex] || ''; }
      }
    });
  },

  // ── The command set ───────────────────────────────────────────
  exec(line) {
    if (!line) return;
    const [cmd, ...args] = line.split(/\s+/);
    const fn = this.commands[cmd.toLowerCase()];
    if (fn) { fn.call(this, args); }
    else {
      this.print(`${cmd}: command not found. Type 'help'.`, 'mf-err');
    }
    this.scroll();
  },

  daysUntilBirthday() {
    const now = new Date();
    let next = new Date(now.getFullYear(), 6, 5);
    if (next < now) next.setFullYear(now.getFullYear() + 1);
    return Math.ceil((next - now) / 86400000);
  },
  isBirthdayToday() { const n = new Date(); return n.getMonth() === 6 && n.getDate() === 5; },

  commands: {
    help() {
      this.printLines([
        'Available commands:',
        '  help        this list',
        '  status      current birthday determination',
        '  whoami      your clearance',
        '  ls          list files',
        '  cat <file>  read a file',
        '  clear       clear the screen',
        '  exit        end session',
        '',
        'Some commands are not listed. SYSOPs are expected to know them.',
      ]);
    },

    status() {
      const d = this.daysUntilBirthday();
      this.printLines([
        '┌─ BIRTHDAY STATUS ─────────────────────────────┐',
        `   DETERMINATION : NOT HIS BIRTHDAY`,
        `   CONFIDENCE    : 99.97%`,
        `   DAYS UNTIL    : ${d}`,
        `   CAKE          : 0% procured (status: concerning)`,
        `   SOURCE        : the calendar — read-only, single source of truth`,
        '└───────────────────────────────────────────────┘',
      ], 'mf-accent');
    },

    whoami() {
      this.printLines([
        'admin  —  clearance: SYSOP',
        'You are not Ben. Ben requires no login; on July 5th the system',
        'grants him everything automatically. The rest of us have to guess',
        "a frog-based password. Which you did. So, respect.",
      ]);
    },

    ls() {
      this.print('README.txt   birthday_status.dat   cake_procurement.log   employees.db   override.exe   SECRETS.txt', 'mf-dim');
    },

    cat(args) {
      const f = (args[0] || '').toLowerCase();
      const files = {
        'readme.txt': [
          'BirthdayCorp Mainframe — README',
          'You found the SYSOPS terminal. Officially this does not exist.',
          "Unofficially: poke around. Try 'ls', then 'cat SECRETS.txt'.",
          'Do not attempt to override the birthday. (You will. It is fine.)',
        ],
        'birthday_status.dat': [
          '# birthday_status.dat  (read-only)',
          'value        = NOT_HIS_BIRTHDAY',
          'last_true    = most recent July 5',
          'next_true    = next July 5',
          'editable     = false   ; only the calendar may change this',
        ],
        'cake_procurement.log': [
          '[Q1] Cake procurement initiated .............. PENDING',
          '[Q2] Cake procurement still ................... PENDING',
          '[Q3] Vendor asked "for whom?" ................. UNRESOLVED',
          '[Q4] Procurement blocked by: it not being the birthday',
          'Net cakes procured to date: 0. Morale: also 0.',
        ],
        'employees.db': [
          'Querying employees.db ...',
          '1 record found:',
          '  id=7B  name="Specimen 7-B"  dept="Field Observation (Friday Division)"  species=frog',
          'Note: he is also the one who gave you the password.',
        ],
        'secrets.txt': [
          '# Recovered field notes from other departments:',
          '  • The frogs of Friday know your password. They always have.',
          '  • A hot dog is never a valid CAPTCHA answer. Keep trying anyway. (Saturday)',
          '  • The museum keeps one thing behind a STAFF ONLY door. (Sunday)',
          '  • ↑ ↑ ↓ ↓ ← → ← → B A still works. Everywhere. Try it.',
          '  • On July 5th, every lock in this building opens at once.',
        ],
        'override.exe': [
          'cat: override.exe: binary file.',
          "Try running it instead:  override",
        ],
      };
      if (!f) { this.print('usage: cat <file>   (try: cat SECRETS.txt)', 'mf-dim'); return; }
      const body = files[f];
      if (body) this.printLines(body, f === 'secrets.txt' ? 'mf-accent' : '');
      else this.print(`cat: ${args[0]}: No such file or directory`, 'mf-err');
    },

    override() {
      const steps = [
        ['Running override.exe ...', ''],
        ['Requesting write access to birthday_status ......', 'mf-dim'],
        ['ATTEMPTING TO FORCE birthday_status = TRUE', 'mf-warn'],
        ['[####------] 41% ...', 'mf-warn'],
        ['[#######---] 71% ...', 'mf-warn'],
        ['[##########] 99% ...', 'mf-warn'],
        ['OVERRIDE DENIED.', 'mf-err'],
        ['birthday_status is read-only. Only the calendar may authorize a birthday.', ''],
        ['Return on July 5th. Your enthusiasm has been logged (to nowhere). Nice try.', 'mf-accent'],
      ];
      let i = 0;
      const step = () => { if (i >= steps.length) { this.enable(); return; } const [t, c] = steps[i++]; this.print(t, c); setTimeout(step, 320); };
      step();
    },

    celebrate() {
      if (this.isBirthdayToday()) {
        this.printLines(['🎉 OVERRIDE UNNECESSARY. birthday_status = TRUE.', 'IT IS BEN\'S BIRTHDAY. The mainframe is, for once, happy.'], 'mf-accent');
      } else {
        this.print(`celebrate: not authorized today. Access restored in ${this.daysUntilBirthday()} day(s) (July 5th).`, 'mf-warn');
      }
    },

    sudo() { this.print("We're all admin here. There is no power higher than the calendar. Denied with respect.", 'mf-warn'); },
    frogs() { this.printLines(['        @..@', '       (----)', "      ( >__< )   “ribbit. you're in.”", '      ^^ ~~ ^^'], 'mf-ok'); },
    cake() { this.print('No cake found. This has been escalated. Nothing will happen.', 'mf-dim'); },
    xyzzy() { this.print('Nothing happens. (But you clearly know your classics.)', 'mf-dim'); },
    ben() { this.print('Ben is not on the system. It is not his birthday. When it is, you will know.', ''); },
    clear() { this.out.innerHTML = ''; },

    exit() {
      this.print('Ending session ...', 'mf-dim');
      const line = document.getElementById('mf-input-line');
      if (line) line.style.display = 'none';
      setTimeout(() => { this.print('SESSION TERMINATED.', 'mf-err'); }, 500);
      setTimeout(() => window.location.reload(), 1400);
    },
  },
};

// Aliases
window.Mainframe.commands.logout = window.Mainframe.commands.exit;
window.Mainframe.commands.frog   = window.Mainframe.commands.frogs;
window.Mainframe.commands.dir    = window.Mainframe.commands.ls;
