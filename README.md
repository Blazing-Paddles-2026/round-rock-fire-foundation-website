# Round Rock Fire Foundation — Blended Mockup Set v3

A static HTML/CSS/JS concept set showing three refreshed pages for roundrockfirefoundation.org. All copy and imagery are editable. No backend, no build step.

## Pages

- `index.html` — Upgraded homepage (hero, mission, early-stage priorities, programs, action paths, story strip, partners, CTA)
- `donate.html` — Donate & impact (give form with amount/frequency toggle, where-your-gift-goes allocation, donor FAQ, trust band)
- `volunteer.html` — Volunteer page (roles, early support needs, intake form, CTA)

A concept ribbon at the top of every page links between the three mockups.

## File map

```
rrff-mockups/
├── index.html        # Home
├── donate.html       # Donate & Impact
├── volunteer.html    # Volunteer
├── css/
│   ├── base.css      # Reset + design tokens (palette, type, spacing)
│   └── site.css      # All component styles
├── assets/
│   └── round-rock-fire-trucks-promo.jpg
├── js/
│   └── site.js       # Mobile nav, donate amount/freq
└── README.md
```

## Design decisions

- **Palette:** dark navy `#0B1320` + charcoal `#14181E`, warm cream `#F4EFE3`/`#FBF7EC`, fire-gold `#E0A22A`/`#F2C969` as primary accent, restrained red `#B23A2A` used only in CTA gradients. Gold carries CTAs and emphasis; red is atmospheric only — keeps tone civic, not "fire truck."
- **Type:** Zodiak (display, Fontshare) paired with Satoshi (body, Fontshare). Editorial serif headlines deliver gravitas appropriate for a memorial/honor brand; Satoshi keeps body modern and accessible. 2 fonts, 3 weights.
- **Imagery:** Use RRFF-owned or expressly licensed photography only. The homepage hero uses the illustrative 1884-mark texture treatment (no photographic background) so the real, approved fire-truck photo is never presented in a heavily processed/cropped full-bleed way; approved photos appear in natural placements (Chief letter, future event photography). Remaining placeholders are graphic treatments showing where existing Foundation photos can go. Do not replace them with stock or AI-generated imagery.
- **Metrics:** Because RRFF was established in 2025 and is just a year old, broad historical impact claims are avoided. `[data-placeholder]` is used for future goals, donor targets, pledge levels, and verified launch numbers.
- **Action paths:** Donate, Legacy Donor Circle, Volunteer, The 1884 Fund, and Request Support appear in the header, the homepage action grid, and the footer — one path is never more than one click away.
- **Story privacy:** Do not quote or summarize unpublished book/chapter text on the website. Use only approved public story themes and language the Foundation is comfortable publishing.
- **Logo:** Inline SVG flame + base in gold/navy. Works at 24px and at hero size.

## Editing guide

| You want to change…       | Where                                                                 |
|---------------------------|-----------------------------------------------------------------------|
| Headline copy             | Each `.html` file, search for the section's `<h1>` / `<h2>`           |
| Colors                    | `css/base.css` — CSS variables at the top of `:root`                  |
| Fonts                     | Fontshare `<link>` at top of each HTML file + `--display` / `--sans`  |
| Replace a photo           | Remove the `<div class="ph ph-…">` block, drop in `<img src="…">`     |
| Campaign goals            | Search for `data-placeholder` and replace only after goals are approved |
| Donate amount → impact    | `js/site.js`, `impactCopy` object                                     |
| FAQ items                 | Each FAQ uses native `<details>` — add/remove `<details>` blocks      |
| Partner / sponsor logos   | `.partners-row` block — swap `<div class="partner-logo">` for `<img>` |
| Donate form action        | Wire the donate button to your CTCF / Network for Good URL            |
| Volunteer form action     | Wire the volunteer form to your preferred intake tool or CRM          |

## Technical notes

- Pure static — open any HTML file directly or serve with `python3 -m http.server`. No build, no deps.
- Responsive: tested at 1366px desktop and 390px mobile. Breakpoints at 900px and 700px.
- Accessibility: WCAG-AA contrast on all text/background combos. Keyboard-focusable controls. `aria-` labels on nav, form widgets, regions. `prefers-reduced-motion` respected (animations are decorative-only).
- Native `<details>` for FAQ — no JS needed for the most-used interaction.
- No external trackers, no analytics, no fonts beyond the Fontshare CSS link.

## Known placeholders to replace before going live

1. EIN, mailing address, contact email in footer of all 3 pages
2. Founding effort reserve target and donor levels once approved
3. Real firefighter / family photography (all `.ph` blocks)
4. Wylie Brownell portrait on `donate.html`
5. Sponsor logos for Kalahari, Happy State Bank, Aday & Associates, and Watkins Insurance if you want to replace text names with marks
6. Donate form → live processor URL (Central Texas Community Foundation / Network for Good)
7. Volunteer form → intake tool or CRM
8. Annual reporting / Form 990 links after the first completed reporting year
