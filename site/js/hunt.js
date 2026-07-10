/* ============================================================
   hunt.js — the easter-egg hunt engine + candle-counter HUD.

   Site-wide backbone for "The BirthdayCorp Incident" ARG (see TODO.md #4).
   Loaded by main.js on EVERY experience. Exposes window.Hunt so each day's
   module can report a discovered clue:

       window.Hunt && window.Hunt.find('fri-frogs');

   • Progress persists in localStorage (survives day-to-day returns — the whole
     point of the week-long hunt).
   • The HUD stays hidden for casual visitors; it appears the first time a clue
     is found, then shows a subtle corner candle counter (x/N).
   • A finale fires once every clue is found (Door 2 reward — stubbed for now).

   Debug (URL params), for building/testing before the day clues exist:
       ?hunt=show    force the HUD visible
       ?hunt=all     mark every clue found (triggers the finale)
       ?hunt=reset   clear all progress
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'bday_hunt_v1';

  // The clue registry — DRAFT, aligned with the week map in TODO.md #4.
  // id:    stable key persisted in localStorage (never rename once shipped).
  // day:   0=Sun … 6=Sat — which experience carries it (drives the locked-slot hint).
  // label: shown in the HUD once found.
  var CLUES = [
    { id: 'tue-start',  day: 2, label: 'The hunt begins' },
    { id: 'wed-admin',  day: 3, label: 'The operator account' },
    { id: 'thu-tip',    day: 4, label: 'A word from next door' },
    { id: 'fri-frogs',  day: 5, label: 'The frogs confess' },
    { id: 'sat-portal', day: 6, label: 'The portal stirs' },
    { id: 'sun-door',   day: 0, label: 'The staff-only door' },
    { id: 'mon-login',  day: 1, label: 'The terminal wakes' }
  ];

  var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var VALID = CLUES.map(function (c) { return c.id; });

  // ── Persistence ────────────────────────────────────────────
  function load() {
    try {
      var arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      // Keep only ids we still recognise (guards against a stale registry).
      return Array.isArray(arr) ? arr.filter(function (id) { return VALID.indexOf(id) !== -1; }) : [];
    } catch (e) { return []; }
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(found)); } catch (e) { /* private mode */ }
  }

  var found = load();

  // ── Queries ────────────────────────────────────────────────
  function has(id) { return found.indexOf(id) !== -1; }
  function progress() { return { found: found.length, total: CLUES.length }; }
  function isComplete() { return found.length >= CLUES.length; }
  function clueById(id) {
    for (var i = 0; i < CLUES.length; i++) { if (CLUES[i].id === id) return CLUES[i]; }
    return null;
  }

  // ── DOM helpers ────────────────────────────────────────────
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var hud = null, panel = null, countEl = null, listEl = null, panelOpen = false;

  function buildHUD() {
    if (hud) return;
    hud = el('div', 'hunt-hud');
    hud.setAttribute('aria-live', 'polite');

    var toggle = el('button', 'hunt-toggle');
    toggle.setAttribute('aria-label', 'Birthday hunt progress');
    var flame = el('span', 'hunt-flame', '🕯️');
    countEl = el('span', 'hunt-count');
    toggle.appendChild(flame);
    toggle.appendChild(countEl);

    panel = el('div', 'hunt-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Birthday hunt clues');
    var title = el('div', 'hunt-panel-title', 'BIRTHDAY HUNT');
    listEl = el('ul', 'hunt-list');
    var foot = el('div', 'hunt-foot', 'Come back each day. It ends on Monday.');
    panel.appendChild(title);
    panel.appendChild(listEl);
    panel.appendChild(foot);

    toggle.addEventListener('click', function () {
      panelOpen = !panelOpen;
      panel.classList.toggle('open', panelOpen);
    });

    hud.appendChild(panel);
    hud.appendChild(toggle);
    document.body.appendChild(hud);
    renderHUD();
  }

  function renderHUD() {
    if (!hud) return;
    var p = progress();
    countEl.textContent = p.found + '/' + p.total;
    hud.classList.toggle('complete', isComplete());

    listEl.innerHTML = '';
    CLUES.forEach(function (c) {
      var li = el('li', 'hunt-item ' + (has(c.id) ? 'got' : 'locked'));
      var mark = el('span', 'hunt-mark', has(c.id) ? '🕯️' : '🔒');
      var text = el('span', 'hunt-text', has(c.id) ? c.label : DAY_NAMES[c.day] + ' · ???');
      li.appendChild(mark);
      li.appendChild(text);
      listEl.appendChild(li);
    });
  }

  function showHUD() { buildHUD(); if (hud) hud.classList.add('visible'); }

  // ── Toast ──────────────────────────────────────────────────
  function toast(msg) {
    var t = el('div', 'hunt-toast', msg);
    document.body.appendChild(t);
    // force reflow so the transition runs
    void t.offsetWidth;
    t.classList.add('show');
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
    }, 3200);
  }

  // ── Finale (Door 2 reward — STUB; game-only token to be designed) ──
  function finale() {
    var overlay = el('div', 'hunt-finale');
    var card = el('div', 'hunt-finale-card');
    card.appendChild(el('div', 'hunt-finale-cake', '🎂'));
    card.appendChild(el('h2', null, 'You found them all.'));
    card.appendChild(el('p', null, 'Every candle is lit. The terminal is yours — and so is the back office.'));
    // TODO: reveal the GAME-ONLY staff-console token here (never the real /dev.html password).
    var close = el('button', 'hunt-finale-close', 'Nice.');
    close.addEventListener('click', function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); });
    card.appendChild(close);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    void overlay.offsetWidth;
    overlay.classList.add('show');
    if (typeof window.Hunt.onComplete === 'function') {
      try { window.Hunt.onComplete(); } catch (e) {}
    }
  }

  // ── Public: record a discovered clue ───────────────────────
  function find(id) {
    if (VALID.indexOf(id) === -1) {
      if (window.console) console.warn('[Hunt] unknown clue id:', id);
      return false;
    }
    if (has(id)) return false;           // idempotent — each clue counts once
    found.push(id);
    persist();
    showHUD();
    renderHUD();
    if (hud) {
      hud.classList.add('pulse');
      setTimeout(function () { hud.classList.remove('pulse'); }, 900);
    }
    var c = clueById(id);
    var p = progress();
    toast('🕯️ Clue found — ' + (c ? c.label : id) + '  (' + p.found + '/' + p.total + ')');
    if (isComplete()) setTimeout(finale, 700);
    return true;
  }

  function reset() {
    found = [];
    persist();
    if (hud) { hud.classList.remove('visible', 'complete'); renderHUD(); }
  }

  // ── Boot ───────────────────────────────────────────────────
  function boot() {
    // Debug hooks for building before the day clues exist.
    var params = new URLSearchParams(window.location.search);
    var dbg = params.get('hunt');
    if (dbg === 'reset') reset();
    if (dbg === 'all') { CLUES.forEach(function (c) { if (!has(c.id)) { found.push(c.id); } }); persist(); }

    // Show the HUD if the player has already started (or debug asks).
    if (found.length > 0 || dbg === 'show' || dbg === 'all') showHUD();
    if (dbg === 'all' && isComplete()) setTimeout(finale, 400);
  }

  window.Hunt = {
    CLUES: CLUES,
    find: find,
    has: has,
    progress: progress,
    reset: reset,
    _render: renderHUD
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
