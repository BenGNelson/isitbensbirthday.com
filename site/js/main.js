/* ============================================================
   main.js — Date detection and experience router
   ============================================================

   URL override params for testing:
     ?date=2024-07-05   → treat as a specific date (YYYY-MM-DD)
     ?day=0             → force day-of-week (0=Sun … 6=Sat)
     ?day=birthday      → force the birthday experience

   The birthday is July 5th (month index 6, day 5).
   ============================================================ */

(function () {
  'use strict';

  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  /** The birthday is July 5th (month index 6, day 5). */
  function isBirthday(date) {
    return date.getMonth() === 6 && date.getDate() === 5;
  }

  /**
   * Resolves ?date=YYYY-MM-DD (parsed as a LOCAL date to avoid UTC-midnight
   * timezone bugs), falling back to real today. Always returns a valid Date —
   * a malformed ?date silently falls through to today rather than producing an
   * Invalid Date (which would blank the page).
   */
  function resolveDate() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('date')) {
      const parts = params.get('date').split('-').map(Number);
      if (parts.length === 3 && parts.every(Number.isFinite)) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        if (!isNaN(d.getTime())) return d;
      }
    }
    return new Date(); // real today, in the user's local timezone
  }

  /** Returns the experience name string for the current request. */
  function getExperienceName() {
    const params = new URLSearchParams(window.location.search);

    // Explicit ?day override wins and bypasses the birthday check, so you can
    // always preview a specific weekday — even during the week of July 5th.
    if (params.has('day')) {
      const d = params.get('day').trim().toLowerCase();
      if (d === 'birthday') return 'birthday';
      const n = parseInt(d, 10);
      if (!isNaN(n) && n >= 0 && n <= 6) return DAYS[n];
      // invalid ?day → fall through to the real date
    }

    const date = resolveDate();
    if (isBirthday(date)) return 'birthday';
    return DAYS[date.getDay()];
  }

  /**
   * Dynamically injects the day's CSS and JS, then calls init().
   * Each day module exposes: window.ExperienceName = { init(appEl) {} }
   */
  function loadExperience(name) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/' + name + '.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'js/' + name + '.js';
    script.onload = function () {
      const key = name.charAt(0).toUpperCase() + name.slice(1);
      if (window[key] && typeof window[key].init === 'function') {
        window[key].init(document.getElementById('app'));
      } else {
        console.error('[main.js] No init() found for experience:', name);
      }
    };
    script.onerror = function () {
      console.error('[main.js] Failed to load experience script:', script.src);
    };
    document.body.appendChild(script);
  }

  /**
   * Stage 0 of the easter-egg hunt: a breadcrumb for anyone who opens DevTools.
   * Sets the FRAME (a week-long hunt that climaxes at the Monday BirthdayCorp
   * login) without spoiling the per-day clues — those are earned day by day
   * (e.g. the password lives with Friday's frogs). Purely cosmetic; no secrets.
   * TODO: make this day-aware (show today's clue status + tease the next day).
   */
  function printConsoleBreadcrumb() {
    try {
      // NOTE: a background + padding on a MULTI-LINE %c block gets clipped in
      // Chrome DevTools (it sizes to the first line). So only the single-line
      // title uses a padded block; the multi-line body is plain colored text.
      var title = 'background:#111;color:#ff4fa3;font-size:15px;font-weight:bold;' +
                  'padding:6px 12px;border-radius:4px;';
      var body = 'color:#39ff14;font-size:12px;line-height:1.7;' +
                 'font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;';
      console.log('%c🎂 BirthdayCorp™ · SYSOPS console', title);
      console.log(
        '%cYou opened the console. Good instinct, detective.\n\n' +
        'This is a week-long hunt. A dormant terminal wakes on Mondays — but it\n' +
        'wants credentials, and those are scattered across the week’s experiences.\n\n' +
        'Come back each day. Collect what surfaces. By the time the terminal\n' +
        'boots, you’ll have everything you need.\n\n' +
        'Progress is tracked. The finale earns it.',
        body
      );
    } catch (e) { /* console styling unsupported — no big deal */ }
  }

  /**
   * Loads the site-wide easter-egg hunt engine + candle-counter HUD
   * (hunt.js / hunt.css). Independent of the day module; exposes window.Hunt
   * so each day's clue can report itself via Hunt.find('<id>').
   */
  function loadHunt() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/hunt.css';
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.src = 'js/hunt.js';
    document.body.appendChild(script);
  }

  printConsoleBreadcrumb();
  loadHunt();
  loadExperience(getExperienceName());
})();
