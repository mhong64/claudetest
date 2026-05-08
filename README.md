# The Racket

A bespoke local tennis racket consultation: a 12-question profile of your skill, play style, physique and history, returning a curated short-list of frames with strings, tension, real product photos (or elegant illustrations) and links to acquire them. Designed in the Wimbledon idiom — ivory, deep tournament green, royal purple and champagne gold, set in Playfair Display and Cormorant Garamond.

## Running it

No build step. Either:

```bash
# Open directly in a browser
xdg-open index.html      # Linux
open index.html          # macOS
start index.html         # Windows

# Or serve locally (recommended)
python3 -m http.server 8765
# then visit http://localhost:8765
```

## How it works

1. **Consultation** — twelve questions on years played, rating, frequency, court position, stroke style, backhand, area to improve, strength, age, injury history, budget, and overall priority.
2. **Profile** — derives a skill rating (1–5) and need scores for power, control, spin, comfort and maneuverability, plus a preferred weight class.
3. **Scoring** — each racket is scored on:
   - Skill match (heavier penalty if the racket is too advanced for the player)
   - Attribute satisfaction (priority attributes weighted 1.4×)
   - Weight-class fit
   - Play-style fit
   - Stiffness penalty for current/past arm injuries
   - Hard penalty for over-budget rackets
4. **Short-list** — top three above a viability threshold, presented with brand mark, illustration or photo, match percentage, specs, tailored string-and-tension advice, and links to Tennis Warehouse, Google Shopping, photos and reviews.

## Images

Each racket card attempts to load a real product photo from Tennis Warehouse first (`/pics/[CODE].jpg`). If that URL fails, an `onerror` handler swaps in a refined SVG illustration generated on the fly — frame gradient matched to the brand, leather-style grip with stitching, scaled head size, drop shadow.

To add a new racket image, set `image:` to a working URL on the entry in `RACKETS` in `app.js`. The fallback SVG runs automatically.

## Files

```
index.html   # Welcome, quiz and results screens (Roman numerals, serif typography)
styles.css   # Wimbledon palette, Playfair / Cormorant / Inter typography
app.js       # Questions, racket DB, profile/scoring, SVG renderer, view logic
```

## Customising

- **Add a racket**: append an entry to `RACKETS` in `app.js` with `brand`, `name`, attribute scores (`power`, `control`, `spin`, `comfort`, `maneuverability` on a 1–5 scale), `difficulty`, `weightClass`, `styles`, `stringRec`, brand colours (`frame`, `accent`), `image`, and `purchase`.
- **Tune the algorithm**: edit `scoreRacket()` in `app.js`. Constants like `25` (skill weight), `12` (per-attribute), `1.4` (priority multiplier), `40` (viability threshold), and the stiffness-injury penalties are all in one place.
- **Add a question**: append to `QUESTIONS`. If the answer should influence the profile, also extend `buildProfile()`.

## Notes

- Specs and prices reflect typical recent retail; verify before purchase.
- A racket is personal. Hit before you commit when possible — a frame that scores well on paper can still feel wrong in the hand.
