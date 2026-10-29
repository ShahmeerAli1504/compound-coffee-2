# The Compound Coffee — Website

Next.js (App Router) + Tailwind CSS v4 site for **The Compound Coffee**, Reno's street-art mobile coffee truck. *Where coffee is subjective.*

Booking and contact forms send real emails through **Gmail SMTP** (Nodemailer).

## Pages

| Route | What's there |
| --- | --- |
| `/` | Scroll-driven truck hero, story, interactive menu (Playlist cup), After Hours film, gallery ride, this week's stops, live hours, booking band |
| `/menu` | The Playlist, The Setlist, printed menu |
| `/find-us` | This week's schedule (auto-rolls at midnight Reno time), live open/closed hours |
| `/book` | Booking inquiry form → Gmail, booking calendar link, FAQ |
| `/contact` | Contact form → Gmail, all contact details |
| `/about` | Story, Jaffet, Compound Vintage, Yelp |
| `/gallery` | Photo wall with lightbox + After Hours film |

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail values
npm run dev                  # http://localhost:3000
```

## Gmail SMTP setup (once)

1. Sign in to the Gmail account that will **send** the emails (e.g. `thecompound.inc24@gmail.com`).
2. Google Account → **Security** → turn on **2-Step Verification**.
3. Google Account → search **App passwords** → create one (name it "Website"). Copy the 16-character password.
4. Put it in `.env.local`:

```env
GMAIL_USER=thecompound.inc24@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
MAIL_TO=thecompound.inc24@gmail.com
MAIL_FROM_NAME=The Compound Coffee
SEND_CONFIRMATION=true
```

Each submission sends **two emails**: the inquiry to `MAIL_TO` (hit *Reply* to answer the customer directly), and a "we got it" confirmation to the customer (turn off with `SEND_CONFIRMATION=false`).

Spam protection: hidden honeypot field, a minimum fill time, and a per-IP rate limit (5 per 10 minutes).

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel (framework preset: **Next.js**).
2. Project → Settings → **Environment Variables**: add the same variables as `.env.local`.
3. Deploy. The live domain is https://www.thecompoundcoffee.net (sitemap: /sitemap.xml). Submit the sitemap in Google Search Console.

## Updating content

- **Truck schedule:** `src/lib/schedule.ts` — stops grouped by month (`"2026-11"`) and day. Add `?date=YYYY-MM-DD` to `/find-us` to preview any week.
- **Menu & prices:** `src/lib/menu.ts`
- **Hours:** `src/lib/hours.ts`
- **Phone, email, socials, booking calendar:** `src/lib/site.ts`
- **Gallery photos:** drop the image in `src/assets/img/` and add it to `src/lib/gallery.ts`
- **Videos:** `public/video/`
