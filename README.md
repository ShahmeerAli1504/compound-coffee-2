# The Compound Coffee — Website

Static site for **The Compound Coffee**, Reno's street-art mobile coffee truck. *Where coffee is subjective.*

- `index.html` — page markup (hero, story, menu, After Hours film, gallery, events, hours, Yelp, vintage, booking, contact)
- `styles.css` — all styles
- `script.js` — scroll scenes, menu "playlist" cup, weekly event schedule, live open/closed hours, booking form (opens an email to thecompound.inc24@gmail.com)
- `assets/` — photos and video

## Updating the schedule
Edit the `SCHEDULE` object in `script.js` — stops are grouped by month (`'2026-11'`) and day of month. The site only shows the **current week** (with a "Today" toggle), worked out from Reno's date, so it rolls over on its own at midnight. Just keep upcoming stops filled in. Add `?date=YYYY-MM-DD` to the URL to preview any week.

## Deploy
No build step — import the repo in Vercel as a static site (Framework preset: **Other**).
