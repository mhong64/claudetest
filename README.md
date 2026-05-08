# 🎾 Tennis Racket Finder

A local web app that recommends a tennis racket — including head size, weight, balance, string pattern, string type, and tension — based on a 12-question profile of your skill, play style, physique, and preferences.

## Running it

No build step. Just open `index.html` in a browser, or serve the folder locally:

```bash
# Option A: open directly (works in most browsers)
xdg-open index.html      # Linux
open index.html          # macOS
start index.html         # Windows

# Option B: tiny local server (recommended — avoids file:// quirks)
python3 -m http.server 8765
# then visit http://localhost:8765
```

## How it works

1. **Quiz** — 12 questions on years played, rating, frequency, court position, stroke style, backhand type, area to improve, strength, age, injury history, budget, and top priority.
2. **Profile builder** — derives a skill rating (1–5) and need scores for power, control, spin, comfort, and maneuverability, plus a preferred weight class.
3. **Scoring** — each racket is scored against the profile across:
   - Skill match (heavier penalty if the racket is too advanced for the player)
   - Attribute satisfaction (priority attributes weighted 1.4×)
   - Weight-class match
   - Play-style match
   - Stiffness penalty if the player has a current/past arm injury
   - Hard penalty for over-budget rackets
4. **Top 3** — rackets above a viability threshold, with images (custom SVG), specs, string/tension recommendation, and links to Tennis Warehouse, Google Shopping, and review searches.

## Files

```
index.html   # markup: welcome, quiz, results screens
styles.css   # dark UI with neon-yellow accent
app.js       # questions, racket DB, profile/scoring, SVG renderer, view logic
```

## Customizing

- **Add a racket**: append an entry to `RACKETS` in `app.js` with attributes (`power`, `control`, `spin`, `comfort`, `maneuverability` on a 1–5 scale), `difficulty`, `weightClass`, `styles`, `stringRec`, brand colors (`frame`, `accent`), and a `purchase` URL.
- **Tune the algorithm**: edit `scoreRacket()` in `app.js`. Constants like `25` (skill weight), `12` (per-attribute), `1.4` (priority multiplier), `40` (viability threshold), and the stiffness-injury penalties are all in one place.
- **Add a question**: append to the `QUESTIONS` array. If the answer should influence the profile, also extend `buildProfile()`.

## Notes

- Specs and prices reflect typical 2024/2025 retail; verify current numbers when buying.
- Recommendations are educational. If possible, demo your top picks at a tennis shop before committing — a racket that scores well on paper can still feel wrong in the hand.
