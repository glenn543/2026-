const TAG_CLASS = {
  '必訪': 'must', '歷史': 'history', '美食': 'food', '甜點': 'food',
  '咖啡': 'food', '早午餐': 'food', '藝術': 'art', '自然': 'nature', '體驗': 'activity'
};

const PIN_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`;
const PIN_BLUE = `<svg viewBox="0 0 24 24" fill="#4285f4" width="12" height="12"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`;

function renderHero(d) {
  const pills = d.hero.pills.map(p => `<span class="hero-pill">${p}</span>`).join('');
  return `
<section class="hero">
  <div class="hero-photo"></div>
  <div class="hero-pattern"></div>
  <div class="hero-circle hero-circle-1"></div>
  <div class="hero-circle hero-circle-2"></div>
  <div class="hero-circle hero-circle-3"></div>
  <div class="hero-accent"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">${d.hero.eyebrow}</div>
    <h1 class="hero-title">${d.hero.title}</h1>
    <p class="hero-subtitle">${d.hero.subtitle}</p>
    <div class="hero-meta">${pills}</div>
  </div>
  <div class="hero-scroll"><div class="hero-scroll-line"></div><span>Scroll</span></div>
</section>`;
}

function renderNav(d) {
  const mapLink = `<a class="nav-link" href="https://www.google.com/maps/d/u/0/edit?mid=1fEkGLdQ9jO81khaHCx7vAYxyTFRDLJo&hl=zh-TW&ll=34.37327117373383%2C132.93510067125715&z=12" target="_blank">地圖總覽</a>`;
  const links = d.nav_days.map((day, i) =>
    `<a class="nav-link" href="#day${i+1}">${day}</a>`
  ).join('');
  return `
<nav class="nav">
  <div class="nav-brand">${d.nav_brand}</div>
  <div class="nav-links">${mapLink}${links}</div>
</nav>`;
}

function renderPickup(d) {
  const groups = d.pickup_groups.map(g => {
    if (g.type === 'self') {
      return `<div class="pickup-group">
        <div class="pickup-group-label">${g.label}</div>
        <div class="pickup-rows"><div class="pickup-self-note">${g.self_note}</div></div>
      </div>`;
    }
    const stops = g.stops.map(s => {
      const members = s.members.map(m => `<span class="pickup-member-chip">${m}</span>`).join('');
      const alert = s.alert ? `<span class="pickup-alert">${s.alert}</span>` : '';
      return `<div class="pickup-row">
        <div class="pickup-time">${s.time}</div>
        <div class="pickup-info">
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="pickup-location">${s.location}</div>
            <span class="pickup-count-badge" style="margin:0;">🧑‍🤝‍🧑 ${s.count}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="pickup-contact">聯絡人：<strong>${s.contact}</strong></div>${alert}
          </div>
          <div class="pickup-members-inline">${members}</div>
        </div>
      </div>`;
    }).join('');
    return `<div class="pickup-group">
      <div class="pickup-group-label">${g.label}</div>
      <div class="pickup-rows">${stops}</div>
    </div>`;
  }).join('');

  return `<div class="pickup-section">
    <div class="pickup-section-header">
      <div class="pickup-section-icon">🚐</div>
      <div>
        <div class="pickup-section-title">機場接送安排</div>
        <div class="pickup-section-sub">${d.pickup_subtitle}</div>
      </div>
    </div>
    ${groups}
  </div>`;
}

function renderFlightCard(f) {
  return `<div class="flight-card">
    <div class="flight-endpoint">
      <div class="flight-time">${f.dep_time}</div>
      <div class="flight-city">${f.dep_city}</div>
    </div>
    <div class="flight-mid">
      <div class="flight-airline">${f.airline}</div>
      <div class="flight-line-wrap">
        <div class="flight-hr"></div><span class="flight-plane">✈</span><div class="flight-hr"></div>
      </div>
      <div style="font-size:10px;color:var(--ink-muted);">${f.duration}</div>
    </div>
    <div class="flight-endpoint" style="text-align:right;">
      <div class="flight-time">${f.arr_time}</div>
      <div class="flight-city" style="text-align:right;">${f.arr_city}</div>
    </div>
  </div>`;
}

function renderHotel(h) {
  const members = h.members && h.members.length
    ? `<div class="pickup-members-inline">${h.members.map(m => `<span class="pickup-member-chip">${m}</span>`).join('')}</div><div style="margin-top:6px;"></div>`
    : '';
  return `<div class="hotel-card">
    <div class="hotel-icon-wrap">🏨</div>
    <div>
      <div class="hotel-name">${h.name}</div>
      ${members}
      <div class="hotel-addr">${h.addr}</div>
      <a class="hotel-map-link" href="${h.maps}" target="_blank">${PIN_BLUE} Google Maps</a>
    </div>
  </div>`;
}

function renderSpot(s) {
  const img = s.img ? `<div class="spot-img-wrap"><img class="spot-img" src="${s.img}" alt="${s.name}" loading="lazy"></div>` : '';
  const tags = s.tags.map(t => `<span class="tag tag-${TAG_CLASS[t] || 'food'}">${t}</span>`).join('');
  return `<div class="spot-card" data-primary="${TAG_CLASS[s.tags[0]] || 'food'}">
    ${img}
    <div class="spot-time-badge">${s.time}</div>
    <div class="spot-name">${s.name}</div>
    <div class="spot-en">${s.en}</div>
    <div class="spot-desc">${s.desc}</div>
    <div class="spot-footer">
      <div class="spot-tags">${tags}</div>
      <a class="spot-map-btn" href="${s.maps}" target="_blank">${PIN_SVG} 地圖</a>
    </div>
  </div>`;
}

function renderDay(day, index) {
  const isFirst = index === 0;
  const badgeStyle = day.badge_color ? ` style="background:${day.badge_color};"` : '';
  const hotels = day.hotels.map(renderHotel).join('');
  const notes = day.notes.map(n => `<div class="note-box">${n}</div>`).join('');
  const spots = day.spots.map(renderSpot).join('');
  const returnFlight = day.show_return_flight ? renderFlightCard(window._TRIP_DATA.flight_return) : '';
  const sectionLabelStyle = day.notes.length ? ' style="margin-top:1.2rem;"' : '';

  return `<section class="day-section visible" id="day${index+1}"${isFirst ? ' style="margin-top:3.5rem;"' : ''}>
    <div class="day-header">
      <div class="day-badge"${badgeStyle}>
        <span class="day-badge-date">${day.date}</span>
        <span class="day-badge-day">${day.day_en}</span>
      </div>
      <div class="day-header-text">
        <div class="day-num-label">${day.day_num}</div>
        <h2 class="day-title">${day.title}</h2>
        <span class="day-region-badge ${day.region_class}">${day.region}</span>
      </div>
    </div>
    <div class="transport-bar"><span class="transport-icon">${day.transport_icon}</span> ${day.transport}</div>
    ${hotels}
    ${notes}
    ${returnFlight}
    <div class="section-label"${sectionLabelStyle}>${day.section_label}</div>
    <div class="spots-grid">${spots}</div>
  </section>`;
}

function renderFooter(d) {
  return `<footer>
  <strong>${d.footer_title}</strong><br>
  ${d.footer_dates}<br>
  ${d.footer_airline}<br><br>
  ${d.footer_note}
</footer>`;
}

function initScrollObserver() {
  const sections = document.querySelectorAll('.day-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  sections.forEach(s => observer.observe(s));
}

function initNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  const dayIds = Array.from({length: 8}, (_, i) => `day${i+1}`);
  function update() {
    let current = '';
    dayIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

fetch('/content.json')
  .then(r => r.json())
  .then(data => {
    window._TRIP_DATA = data;
    document.getElementById('hero-slot').innerHTML = renderHero(data);
    document.getElementById('nav-slot').innerHTML = renderNav(data);

    const main = document.getElementById('main-slot');
    main.innerHTML =
      renderPickup(data) +
      renderFlightCard(data.flight_outbound) +
      data.days.map((day, i) => renderDay(day, i)).join('') +
      renderFooter(data);

    initScrollObserver();
    initNavHighlight();
  })
  .catch(() => {
    document.body.innerHTML = '<p style="padding:2rem;">無法載入內容，請重新整理頁面。</p>';
  });
