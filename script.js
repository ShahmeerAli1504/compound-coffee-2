/* The Compound Coffee — interactions */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const BOOK_URL = 'https://koalendar.com/e/the-compound-coffee';

  /* ---------- loader ---------- */
  const loader = $('#loader');
  const hideLoader = () => loader && loader.classList.add('done');
  window.addEventListener('load', () => setTimeout(hideLoader, 350));
  setTimeout(hideLoader, 2200);

  /* ---------- nav ---------- */
  const nav = $('#nav');
  let lastY = 0;
  const onNav = () => {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hide', y > lastY && y > 500 && !document.body.classList.contains('menu-open'));
    lastY = y;
  };

  const mMenu = $('#mMenu'), menuBtn = $('#menuBtn');
  const setMenu = (open) => {
    mMenu.classList.toggle('open', open);
    mMenu.setAttribute('aria-hidden', !open);
    menuBtn.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  };
  menuBtn.addEventListener('click', () => setMenu(true));
  $('#menuClose').addEventListener('click', () => setMenu(false));
  $$('a', mMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- split "flow" headings into letters ---------- */
  const flows = $$('.flow').map(el => {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    const chars = [];
    text.split(' ').forEach((word, wi, arr) => {
      const w = document.createElement('span');
      w.className = 'wd';
      w.setAttribute('aria-hidden', 'true');
      [...word].forEach(c => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        w.appendChild(s);
        chars.push(s);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return { el, chars };
  });

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------- hero scroll scene ---------- */
  const hero = $('#hero'), truck = $('#heroTruck'), word = $('#heroWord'),
        sticker = $('#heroSticker'), reveal = $('#heroReveal');
  const mobile = () => innerWidth <= 640;

  const heroScene = () => {
    const r = hero.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - innerHeight));
    const base = mobile() ? -110 : -62;
    truck.style.transform = `translateY(${-p * 6}vh) scale(${1 + p * 0.55})`;
    word.style.transform = `translate(-50%, ${base - p * 30}%) scaleY(${1 + p * 0.9}) scaleX(${1 - p * 0.08})`;
    word.style.opacity = 1 - clamp((p - .45) / .3);
    sticker.style.transform = `rotate(${-10 + p * 40}deg) translateY(${p * -30}vh)`;
    const rp = clamp((p - .62) / .38);
    reveal.style.clipPath = `circle(${rp * 150}% at 50% 60%)`;
  };

  /* ---------- wavy letters ---------- */
  const flowScene = () => {
    const t = scrollY * 0.006;
    flows.forEach(({ el, chars }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const vis = clamp(1 - Math.abs((r.top + r.height / 2) / innerHeight - .5) * 1.6);
      chars.forEach((c, i) => {
        const s = 1 + Math.sin(i * .55 + t) * .22 * vis;
        c.style.transform = `scaleY(${s.toFixed(3)})`;
      });
    });
  };

  /* ---------- floating cup tilt ---------- */
  const cup = $('#cup'), menuSec = $('#menu');
  const cupScene = () => {
    const r = menuSec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = clamp(-r.top / Math.max(1, r.height - innerHeight));
    cup.style.transform = `rotate(${Math.sin(p * Math.PI * 3) * 7}deg) translateY(${Math.sin(p * Math.PI * 2) * 10}px)`;
  };

  /* ---------- horizontal gallery ride ---------- */
  const ride = $('#gallery'), rideTrack = $('#rideTrack');
  const rideScene = () => {
    if (mobile()) return;
    const r = ride.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - innerHeight));
    const max = rideTrack.scrollWidth - innerWidth + 80;
    rideTrack.style.transform = `translateX(${-p * max}px)`;
  };

  let ticking = false;
  const frame = () => {
    onNav();
    if (!reduce) { heroScene(); flowScene(); cupScene(); }
    rideScene();
    ticking = false;
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  frame();

  /* ---------- menu tabs ---------- */
  const tabs = $$('.tab[role="tab"]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
  }));

  /* ---------- playlist → cup ---------- */
  const rows = $$('.track-row');
  const liqTop = $('#liqTop'), liqBot = $('#liqBot'), npName = $('#npName'), npFeat = $('#npFeat');
  let current = 0, userPicked = false;
  const pour = (i) => {
    current = i;
    rows.forEach((r, k) => r.classList.toggle('active', k === i));
    const r = rows[i];
    liqTop.setAttribute('fill', r.dataset.top);
    liqBot.setAttribute('fill', r.dataset.bot);
    npName.textContent = r.dataset.name;
    npFeat.textContent = r.dataset.feat;
    if (!reduce) cup.animate([{ transform: 'rotate(-8deg) scale(.96)' }, { transform: 'rotate(4deg) scale(1.03)' }, { transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)' });
  };
  rows.forEach((r, i) => {
    r.addEventListener('click', () => { userPicked = true; pour(i); });
    r.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) { userPicked = true; pour(i); } });
  });
  pour(0);
  let menuVisible = false;
  new IntersectionObserver(([e]) => { menuVisible = e.isIntersecting; }, { threshold: .2 }).observe($('#p-playlist'));
  setInterval(() => { if (menuVisible && !userPicked && !reduce) pour((current + 1) % rows.length); }, 2600);

  /* ---------- printed menu lightbox ---------- */
  const lb = $('#lightbox');
  $('#openPrint').addEventListener('click', () => lb.classList.add('open'));
  $('#lbClose').addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { lb.classList.remove('open'); setMenu(false); } });

  /* ---------- After Hours film ---------- */
  const vid = $('#film-video'), playBtn = $('#playBtn'), soundBtn = $('#soundBtn');
  let userPaused = false;
  const syncBtns = () => {
    playBtn.textContent = vid.paused ? 'Play' : 'Pause';
    soundBtn.textContent = vid.muted ? 'Sound off' : 'Sound on';
  };
  playBtn.addEventListener('click', () => {
    if (vid.paused) { userPaused = false; vid.play(); } else { userPaused = true; vid.pause(); }
  });
  soundBtn.addEventListener('click', () => { vid.muted = !vid.muted; if (vid.paused) vid.play(); syncBtns(); });
  vid.addEventListener('play', syncBtns); vid.addEventListener('pause', syncBtns);
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !userPaused && !reduce) vid.play().catch(() => {});
    else if (!e.isIntersecting) vid.pause();
  }, { threshold: .4 }).observe(vid);

  /* ---------- Reno time helpers ---------- */
  const renoNow = () => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', weekday: 'short', hour12: false }).formatToParts(new Date());
    const g = t => parts.find(p => p.type === t).value;
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { y: +g('year'), m: +g('month'), d: +g('day'), h: +g('hour') % 24, min: +g('minute'), dow: days[g('weekday')] };
  };
  const now = renoNow();

  /* ---------- hours (re-checked every minute) ---------- */
  const status = $('#status');
  const refreshHours = () => {
    const n = renoNow();
    const mins = n.h * 60 + n.min;
    const open = mins >= 7 * 60 && mins < 17 * 60;
    status.textContent = open ? `Open now • until 5:00 PM` : (mins < 7 * 60 ? 'Closed now • opens 7:00 AM' : 'Closed now • opens 7:00 AM tomorrow');
    status.classList.toggle('closed', !open);
    $$('#hoursTable li').forEach(li => li.classList.toggle('today', +li.dataset.d === n.dow));
  };
  refreshHours();

  /* ---------- schedule: only this week (or today) is shown ----------
     Add stops under "YYYY-MM" → day of month. The site works out the current
     week from Reno's date, so it rolls over on its own at midnight — no manual
     update needed, just keep future stops filled in here.
     Tip: add ?date=2026-11-03 to the URL to preview any week. */
  const SCHEDULE = {
    '2026-11': {
      1: [{ t: 'All day', n: 'Evergreen Plaza', a: '2300 Oddie Blvd' }],
      2: [{ t: '7:00–8:00 AM', n: 'Renown', a: '1595 Robb Dr #2' }, { t: '8:30–9:30 AM', n: 'Edgewater at Virginia Lake', a: '2490 Eastshore Place' }, { t: '10:00–11:30 AM', n: 'Renown', a: '910 Vista Blvd' }, { t: 'Night', n: 'The Compound After Hours', a: 'Downtown Reno — book via the calendar' }],
      3: [{ t: '6:45–7:45 AM', n: 'Desert Skies Middle School', a: '7550 Donatello Dr' }, { t: '8:30–10:00 AM', n: 'Hopes Clinic', a: '1905 E 4th St' }, { t: '10:30 AM–3:00 PM', n: 'UNR', a: 'University of Nevada, Reno' }],
      4: [{ t: '7:30–9:00 AM', n: 'Washoe County Sheriff', a: '911 Parr Blvd' }, { t: '9:30–11:00 AM', n: 'Hopes Clinic', a: '580 W 5th St' }],
      5: [{ t: '7:30–9:00 AM', n: 'NV Health Authority', a: '9850 Double R Blvd' }, { t: '9:30–11:00 AM', n: 'Access to Healthcare', a: '4001 S Virginia St' }, { t: '11:30 AM–12:30 PM', n: 'Thrive Wellness', a: '201 W Liberty St' }],
      6: [{ t: '9:00–10:00 AM', n: 'Decon Diabetes', a: '4864 Sparks Blvd' }],
      7: [{ t: '9:00–10:30 AM', n: 'Double R Living', a: '9200 Double R Blvd' }, { t: '11:00 AM–12:00 PM', n: 'Acura', a: '11550 S Virginia St' }],
      10: [{ t: '10:00 AM–12:30 PM', n: 'UNR', a: '1664 N Virginia St' }],
      11: [{ t: '7:30–9:00 AM', n: 'Police Station', a: '911 Kuenzli St' }, { t: '9:30–11:00 AM', n: 'Home2 Suites', a: '1111 Meadowood Mall Link' }, { t: '11:30 AM–1:00 PM', n: 'Concentra', a: '6410 S Virginia St' }],
      15: [{ t: '10:00 AM–4:00 PM', n: 'Antique Fair', a: '301 N Virginia St' }],
      17: [{ t: 'Private event', n: 'Private Event', a: 'Closed to the public' }, { t: '11:00 AM–12:30 PM', n: 'Sierra NV Specialty Care', a: '5437 Kietzke Ln' }],
      20: [{ t: '7:00–8:30 AM', n: 'Decon Diabetes', a: '5444 Reno Corporate Dr' }, { t: '10:00 AM–12:00 PM', n: 'Corwin Ford', a: '11111 S Virginia St' }],
      21: [{ t: '11:00 AM–12:30 PM', n: 'SPCA', a: '75 E Moana Ln' }],
      22: [{ t: 'All day', n: 'Oddie Blvd', a: 'Evergreen Plaza area — 2300 Oddie Blvd' }],
      24: [{ t: '9:00–10:30 AM', n: 'Hopes Clinic', a: '1905 E 4th St' }],
      25: [{ t: '7:30–9:00 AM', n: 'Washoe County Sheriff', a: '911 Parr Blvd' }, { t: '9:30–11:00 AM', n: 'Hopes Clinic', a: '580 W 5th St' }]
    }
  };
  const DAY = 864e5;
  const pad = n => String(n).padStart(2, '0');
  const info = t => {
    const x = new Date(t), y = x.getUTCFullYear(), m = x.getUTCMonth() + 1, d = x.getUTCDate();
    return { t, y, m, d, dow: x.getUTCDay(), iso: `${y}-${pad(m)}-${pad(d)}`, stops: (SCHEDULE[`${y}-${pad(m)}`] || {})[d] || null };
  };
  const fmt = (t, o) => new Date(t).toLocaleDateString('en-US', { timeZone: 'UTC', ...o });
  const testDate = (new URLSearchParams(location.search).get('date') || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const todayT = () => {
    if (testDate) return Date.UTC(+testDate[1], +testDate[2] - 1, +testDate[3]);
    const n = renoNow();
    return Date.UTC(n.y, n.m - 1, n.d);
  };
  const maps = a => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a + ', Reno, NV')}`;
  const stopsHTML = st => st.map(s => `<div class="stop"><time>${s.t}</time><div><b>${s.n}</b>${/^\d/.test(s.a) ? `<a href="${maps(s.a)}" target="_blank" rel="noopener">${s.a} ↗</a>` : `<span>${s.a}</span>`}</div></div>`).join('');
  const dayCard = (w, isToday) => `
      <article class="event-day${isToday ? ' is-today' : ''}" id="day-${w.iso}">
        <h4>${fmt(w.t, { weekday: 'long', month: 'short', day: 'numeric' })}${isToday ? ' <em>Today</em>' : ''}</h4>
        ${stopsHTML(w.stops)}
      </article>`;

  const cal = $('#cal'), list = $('#eventList');
  const toggles = $$('.view-toggle button');
  let view = 'week', shownT = null;

  const render = () => {
    const t0 = todayT();
    shownT = t0;
    const start = t0 - info(t0).dow * DAY;
    const week = [...Array(7)].map((_, i) => info(start + i * DAY));

    // week strip
    let html = `<div class="cal-title"><b>${fmt(start, { month: 'short', day: 'numeric' })} – ${fmt(week[6].t, { month: 'short', day: 'numeric' })}</b><span>on the road</span></div><div class="cal-grid week">`;
    html += week.map(w => `<div class="cal-dow">${fmt(w.t, { weekday: 'short' })}</div>`).join('');
    html += week.map(w => {
      const past = w.t < t0, isToday = w.t === t0, n = w.stops ? w.stops.length : 0;
      return `<a class="day ${n ? 'booked' : 'open'}${past ? ' past' : ''}${isToday ? ' today' : ''}" href="${n ? '#day-' + w.iso : '#book'}" data-iso="${w.iso}" aria-label="${fmt(w.t, { weekday: 'long', month: 'short', day: 'numeric' })}${isToday ? ' (today)' : ''}: ${n ? n + ' stop' + (n > 1 ? 's' : '') : 'open for booking'}">${w.d}<i>${n ? n + (n > 1 ? ' stops' : ' stop') : 'open'}</i></a>`;
    }).join('');
    html += '</div><div class="cal-legend"><span class="l1">Truck booked</span><span class="l2">Open — book it</span><span class="l3">Today</span></div>';
    cal.innerHTML = html;

    // list
    const tw = week.find(w => w.t === t0);
    if (view === 'today') {
      list.innerHTML = tw.stops ? dayCard(tw, true) : `
        <div class="event-day is-today"><h4>${fmt(t0, { weekday: 'long', month: 'short', day: 'numeric' })} <em>Today</em></h4>
        <p>No public stops on the schedule today. Check <a href="https://www.instagram.com/_thecompoundcoffee/" target="_blank" rel="noopener">@_thecompoundcoffee</a> for pop-ups — or <a href="#book">book the truck</a>.</p></div>`;
    } else {
      const ahead = week.filter(w => w.t >= t0 && w.stops);
      list.innerHTML = ahead.length ? ahead.map(w => dayCard(w, w.t === t0)).join('') : `
        <div class="event-day"><h4>New schedule dropping soon</h4><p>No more stops posted for this week yet. Check <a href="https://www.instagram.com/_thecompoundcoffee/" target="_blank" rel="noopener">@_thecompoundcoffee</a> for this week's stops.</p></div>`;
    }
  };

  const setView = v => {
    view = v;
    toggles.forEach(b => b.setAttribute('aria-selected', b.dataset.view === v));
    render();
  };
  toggles.forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  render();

  cal.addEventListener('click', e => {
    const a = e.target.closest('.day');
    if (!a) return;
    const iso = a.dataset.iso;
    if (a.classList.contains('open')) {
      $('#f-date').value = iso;
      $('#f-type').value = 'Private Event';
      return; // default anchor → #book
    }
    e.preventDefault();
    if (!$('#day-' + iso)) setView('week');
    const card = $('#day-' + iso);
    if (!card) return;
    card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 1600);
  });

  // roll over at midnight (Reno time) even if the page stays open
  const tick = () => { refreshHours(); if (todayT() !== shownT) render(); };
  setInterval(tick, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

  /* ---------- booking form → email ---------- */
  $('#bookingForm').addEventListener('submit', e => {
    e.preventDefault();
    const el = k => e.target.elements.namedItem(k);
    const name = el('name').value.trim(), email = el('email').value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      const bad = !name ? el('name') : el('email');
      bad.focus(); bad.style.boxShadow = '5px 5px 0 #9e1b34';
      return;
    }
    const v = k => el(k).value.trim() || '—';
    const subject = `${el('type').value} inquiry — ${el('date').value || 'The Compound Coffee'}`;
    const body = `Hi Jaffet,

I'd like to get in touch with The Compound Coffee.

Name: ${v('name')}
Email: ${v('email')}
Phone: ${v('phone')}
Event date: ${v('date')}
Location: ${v('location')}
Estimated guests: ${v('guests')}
Type: ${v('type')}

Details:
${v('details')}

Thanks!`;
    location.href = `mailto:thecompound.inc24@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('#formOk').classList.add('show');
  });

  $('#yr').textContent = now.y;
})();
