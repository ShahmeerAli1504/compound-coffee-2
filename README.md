# The Compound Coffee — Website

Static site for **The Compound Coffee**, Reno's street-art mobile coffee truck. *Where coffee is subjective.*

- `index.html` — page markup (hero, story, menu, After Hours film, gallery, events, hours, Yelp, vintage, booking, contact)
- `styles.css` — all styles
- `script.js` — scroll scenes, menu "playlist" cup, monthly event calendar, live open/closed hours, booking form (opens an email to thecompound.inc24@gmail.com)
- `assets/` — photos and video

## Updating the monthly schedule
Edit the `SCHEDULE` object in `script.js` (year, month, label and the stops for each day). Days with no stops show as "open — book it"; past days fade out automatically.

## Deploy
No build step — import the repo in Vercel as a static site (Framework preset: **Other**).
