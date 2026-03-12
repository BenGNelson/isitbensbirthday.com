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

  /**
   * Returns a Date object representing the target date,
   * or null if the birthday experience should be forced.
   */
  function resolveDate() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('day')) {
      const d = params.get('day').trim().toLowerCase();
      if (d === 'birthday') return null; // null → force birthday
      const n = parseInt(d, 10);
      if (!isNaN(n) && n >= 0 && n <= 6) {
        // Shift today's date so getDay() returns the requested value
        const proxy = new Date();
        proxy.setDate(proxy.getDate() + (n - proxy.getDay()));
        return proxy;
      }
    }

    if (params.has('date')) {
      // Parse as LOCAL date to avoid UTC-midnight timezone bugs
      const parts = params.get('date').split('-').map(Number);
      if (parts.length === 3) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
      }
    }

    return new Date(); // real today, in the user's local timezone
  }

  /** Returns the experience name string for the current date. */
  function getExperienceName() {
    const date = resolveDate();
    if (date === null) return 'birthday';
    if (date.getMonth() === 6 && date.getDate() === 5) return 'birthday';
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
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
    document.body.appendChild(script);
  }

  loadExperience(getExperienceName());
})();
