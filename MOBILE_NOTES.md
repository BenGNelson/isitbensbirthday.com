# Mobile Responsiveness Notes

## Audit Summary

Tested via DevTools device emulation at: iPhone SE (375px), iPhone 14 Pro (393px), iPad Mini (768px), iPad Pro (1024px).

---

## What Was Fixed

### Birthday (July 5th)
- Reduced top padding so the title isn't pushed below the fold on 375px.
- Achievement toasts now stretch edge-to-edge (with margin) instead of clipping at `right: 24px`.

### Sunday (Museum)
- Header navigation wraps and meets 44px tap targets on mobile.
- Section paddings tightened from 48px to 28px sides.
- Gallery `minmax` reduced so two columns can appear on tablets.
- Modal inner width is ~247px on 375px — usable.

### Monday (Corporate) — *Critical fix*
- Three-column `300px 1fr 280px` grid collapsed to single column at ≤900px.
- Login → Dashboard → Calendar stacks vertically, which is the natural thematic order.
- Status bar wraps at smaller sizes.

### Tuesday (Government)
- Header three-section row stacks on mobile; right-side fine-print hidden.
- Nav links wrap and meet 44px tap targets.
- Submit row stacks vertically; button is full-width.

### Wednesday (BirthdAI™) — *Critical fix*
- 240px sidebar collapsed into a compact two-column metric grid above the chat.
- Ghost title (fixed at `left: 258px`) hidden on mobile.
- `SYNAPSE DYNAMICS LLC` text hidden (too long for 375px nav).
- Uptime counter hidden on mobile to prevent nav overflow.
- All action buttons meet 44px tap target.

### Thursday (Hot Dog Society)
- Decorative nav hidden on mobile (all links are `#` — no real navigation to lose).
- Members two-column grid → single column on mobile.
- **JOIN NOW button**: desktop behavior (real-time mouse flee) unchanged. On touch devices, button teleports on `touchstart` up to 5 times, then yields to a tap. Touch-specific escape messages written for the mobile experience.

### Friday (OBRI)
- Header stacks properly on mobile; institute address hidden.
- Tab bar is horizontally scrollable on mobile; tabs meet 44px tap target.
- Publications, field log, and sighting form all usable at 375px.
- Rejection letter padding reduced.

### Saturday (Space Portal)
- Header right-side status text hidden on small screens.
- Portal ring reduced from 180px to 150px on mobile.
- Emergency and captcha buttons meet 44px tap target.
- Captcha 3×3 grid: at 375px each cell is ~75px square — adequate for touch.

---

## Animations & `prefers-reduced-motion`

A global rule in `main.css` stops all animations/transitions (sets duration to 0.01ms) for users with `prefers-reduced-motion: reduce`. Individual files restore non-distracting transitions where needed:

- **Birthday**: News ticker re-enabled at slow speed (40s) so it remains legible.
- **Friday**: Live dot re-enabled (static, no pulse) so the LIVE badge doesn't look broken.
- **Saturday**: Stars, scan line, portal spin, emergency glow all stopped — purely cosmetic.

All keyframe animations on other days use `transform` and `opacity` exclusively (GPU-accelerated, no layout thrashing). They perform smoothly on modern mobile hardware.

---

## Known Limitations / Edge Cases

### Thursday JOIN NOW — touch behavior
The desktop experience (button flees your cursor in real-time) cannot be replicated on touch. The mobile alternative: button teleports on each `touchstart`, up to 5 times, with escalating messages. On the 6th tap it yields. This preserves the spirit (button is uncooperative) while being genuinely interactive on touch.

Users on a touchscreen laptop/iPad with a mouse will get the desktop behavior (mousemove fires normally on pointer devices).

### Wednesday drift effect
The 30-second drift effect (elements shift slightly, ghost title fades in) is hidden on mobile because the ghost title's hardcoded `left: 258px` position would place it off-screen. The metric card drift animations still apply to sidebar cards on mobile. The second-scrollbar effect is still triggered.

### Sunday modal
At 375px with 40px inner padding, the modal body text area is ~247px wide. Readable but relatively narrow. The modal content is short, so this is acceptable.

### Monday statusbar
On mobile the statusbar is `position: fixed; bottom: 0`. With the three-column layout collapsed to one column and the page scrollable, the fixed statusbar sits over the bottom of the page content. Added 60px `padding-bottom` to `.gov-main`-equivalent on Monday to prevent content from hiding behind it.

### `?day=N` overrides
All URL override parameters continue to work normally. The mobile layout is purely CSS — no JavaScript layout switching.

---

## Breakpoints Used

| Breakpoint | Target |
|------------|--------|
| `max-width: 900px` | Monday three-column → one column; Friday two-column → one column |
| `max-width: 767px` | All mobile-specific styles |
| `min-width: 768px` and `max-width: 1024px` | Wednesday sidebar width reduced to 200px |
| `prefers-reduced-motion: reduce` | Global animation suppression |
