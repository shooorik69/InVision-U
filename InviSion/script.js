const candidates = [
  { id:1, name:'Айгерим Сейткали', initials:'АС', avBg:'#9FE1CB', avColor:'#085041',
    school:'НИШ, Жамбыл', score:87, tier:'high', aiFlag:false, rank:1,
    dims:{leadership:91,motivation:88,growth:85,authenticity:90,experience:76},
    tags:[{l:'Лидерство',c:'tag-green'},{l:'Проект',c:'tag-blue'},{l:'Низкий AI-риск',c:'tag-green'}],
    explain:'Кандидат демонстрирует устойчивые поведенческие паттерны лидерства через конкретные действия (организация, сбор подписей). Эссе содержит специфические детали и личный нарратив.',
    growth:'Рост от локальной инициативы к системному воздействию — характерный трек для лидеров с высоким потенциалом.',
    iq:['Что стало самым сложным моментом в организации кампании за уборку свалки?','Как вы справлялись с демотивацией команды?']
  },
  { id:2, name:'Бекзат Нурланов', initials:'БН', avBg:'#B5D4F4', avColor:'#0C447C',
    school:'Гимназия №1, Астана', score:81, tier:'high', aiFlag:false, rank:2,
    dims:{leadership:80,motivation:82,growth:78,authenticity:84,experience:83},
    tags:[{l:'Технологии',c:'tag-blue'},{l:'Предпринимательство',c:'tag-blue'}],
    explain:'Сильный технический фундамент с предпринимательским опытом (3 реализованных проекта). Мотивация чётко артикулирована.',
    growth:'Стабильный рост компетенций, подтверждённый внешними достижениями.',
    iq:['Расскажите о неудачном проекте — что пошло не так?','Как вы выбираете, чему уделить приоритет?']
  },
  { id:3, name:'Данара Омарова', initials:'ДО', avBg:'#CECBF6', avColor:'#3C3489',
    school:'Колледж, г. Тараз', score:79, tier:'high', aiFlag:false, rank:3,
    dims:{leadership:77,motivation:85,growth:82,authenticity:79,experience:70},
    tags:[{l:'Мотивация',c:'tag-green'},{l:'Рост-траектория',c:'tag-blue'}],
    explain:'Высокая мотивация с чётко описанным личным путём. Опыт ограничен, но нарратив роста убедителен.',
    growth:'Резкий перелом в успеваемости и активности за последний год — сигнал роста.',
    iq:['Что изменилось год назад, что вы так быстро развились?','Какую проблему в своём городе вы хотели бы решить?']
  },
  { id:4, name:'Тимур Касымов', initials:'ТК', avBg:'#FAC775', avColor:'#412402',
    school:'НУШ Алматы', score:72, tier:'review', aiFlag:true, rank:4,
    dims:{leadership:65,motivation:70,growth:68,authenticity:55,experience:88},
    tags:[{l:'Высокий AI-риск',c:'tag-red'},{l:'Сильный опыт',c:'tag-blue'}],
    explain:'Богатый формальный опыт, но эссе имеет признаки генерации ИИ: однородный синтаксис, отсутствие конкретных деталей.',
    growth:'Траектория достижений линейна — возможно, продиктована внешними стимулами.',
    iq:['Напишите 3-4 предложения об этом эссе своими словами прямо сейчас.','Какое решение вы приняли вопреки мнению окружающих?']
  },
  { id:5, name:'Мадина Ержанова', initials:'МЕ', avBg:'#F5C4B3', avColor:'#712B13',
    school:'Школа №47, Шымкент', score:68, tier:'review', aiFlag:false, rank:5,
    dims:{leadership:72,motivation:75,growth:70,authenticity:80,experience:42},
    tags:[{l:'Потенциал',c:'tag-amber'},{l:'Мало опыта',c:'tag-gray'}],
    explain:'Высокая аутентичность и чёткое ощущение цели, но формальный опыт минимален.',
    growth:'Органический рост без институциональной поддержки — высокая ценность.',
    iq:['Расскажите о случае, когда вы взяли инициативу без просьбы.','Что бы вы сделали, если бы у вас было 100 000 тенге и месяц?']
  }
];

const dimensions = [
  {key:'leadership',  label:'Лидерский потенциал', weight:30, color:'#2D7A5F'},
  {key:'motivation',  label:'Мотивация и ценности', weight:25, color:'#378ADD'},
  {key:'growth',      label:'Рост-траектория',       weight:20, color:'#7F77DD'},
  {key:'authenticity',label:'Аутентичность',          weight:15, color:'#B8860B'},
  {key:'experience',  label:'Практический опыт',      weight:10, color:'#D85A30'}
];

let customWeights = {leadership:30,motivation:25,growth:20,authenticity:15,experience:10};
let selectedForCompare = new Set();
let currentFilter = 'all';
let currentSort = {key:'score', dir:-1};
let currentSearch = '';

(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26,77,62,${p.opacity})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

function animateCounter(el, target, duration) {
  let start = 0, startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
setTimeout(() => {
  animateCounter(document.getElementById('counter-total'), 247, 1500);
  animateCounter(document.getElementById('counter-short'), 38, 1200);
  animateCounter(document.getElementById('counter-dims'), 5, 800);
}, 200);

(function() {
  const items = [
    '🏆 Айгерим Сейткали — балл 87 — рекомендована',
    '🔍 Новая заявка от Бекзат Нурланов поступила',
    '⚠️ AI-флаг: Тимур Касымов — требуется интервью',
    '✓ Данара Омарова одобрена для интервью',
    '📊 247 заявок обработано за сезон 2025',
    '🌱 38 кандидатов в шортлисте ждут комиссию',
    '🤖 Детектор AI-текстов: 14 флагов активировано',
    '📋 Мадина Ержанова — потенциал высокий, опыт ограничен',
  ];
  const doubled = [...items, ...items];
  document.getElementById('ticker').innerHTML = doubled.map(t => `
    <span class="ticker-item"><span class="ticker-dot"></span>${t}</span>
  `).join('');
})();

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  document.getElementById('main-header').classList.toggle('scrolled', scrolled);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 300);
});

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  btn.classList.add('active');
  if (id === 'shortlist') showListSection();
  if (id === 'activity') renderActivityPage();
}

function getFilteredCandidates() {
  let list = candidates;
  if (currentFilter === 'high') list = list.filter(c => c.tier === 'high');
  else if (currentFilter === 'review') list = list.filter(c => c.tier === 'review');
  else if (currentFilter === 'flag') list = list.filter(c => c.aiFlag);
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.school.toLowerCase().includes(q));
  }
  list = [...list].sort((a, b) => {
    const va = currentSort.key === 'name' ? a.name : a.score;
    const vb = currentSort.key === 'name' ? b.name : b.score;
    return currentSort.dir * (va > vb ? 1 : -1);
  });
  return list;
}

function renderCandidates() {
  const tbody = document.getElementById('candidates-tbody');
  const list = getFilteredCandidates();
  tbody.innerHTML = list.map((c, i) => `
    <tr class="candidate-row entering" onclick="showDetail(${c.id})" style="animation-delay:${i * 0.05}s">
      <td><div class="rank-num ${currentFilter==='all'&&i<3?'r'+(i+1):''}">${c.rank}</div></td>
      <td>
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="avatar" style="background:${c.avBg};color:${c.avColor};">${c.initials}</div>
          <div>
            <div class="cand-name">${c.name}</div>
            <div class="cand-meta">${c.school}</div>
          </div>
        </div>
      </td>
      <td>${c.tags.map(t => `<span class="tag ${t.c}">${t.l}</span>`).join('')}</td>
      <td class="score-cell">
        <span class="score-big ${c.score>=80?'score-hi':c.score>=70?'score-md':'score-lo'}">${c.score}</span>
        <span class="score-max">/100</span>
      </td>
      <td style="text-align:center;" onclick="event.stopPropagation()">
        <div class="compare-check ${selectedForCompare.has(c.id)?'checked':''}" onclick="toggleCompare(${c.id})"></div>
      </td>
    </tr>
  `).join('');
}

function filterCandidates(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCandidates();
}

function searchCandidates(val) {
  currentSearch = val;
  renderCandidates();
}

function sortBy(key) {
  if (currentSort.key === key) currentSort.dir *= -1;
  else { currentSort.key = key; currentSort.dir = key === 'score' ? -1 : 1; }
  document.querySelectorAll('th[id^="th-"]').forEach(th => th.classList.remove('sort-active'));
  document.getElementById('th-' + key).classList.add('sort-active');
  renderCandidates();
}

function toggleCompare(id) {
  if (selectedForCompare.has(id)) selectedForCompare.delete(id);
  else if (selectedForCompare.size < 3) selectedForCompare.add(id);
  else { showToast('⚠', 'Максимум 3 кандидата для сравнения'); return; }
  renderCandidates();
  updateCompareBar();
}

function updateCompareBar() {
  const bar = document.getElementById('compare-bar');
  const n = selectedForCompare.size;
  bar.classList.toggle('visible', n > 1);
  document.getElementById('compare-label').textContent = `Выбрано ${n} кандидата`;
  const avs = [...selectedForCompare].map(id => {
    const c = candidates.find(x => x.id === id);
    return `<div class="compare-avatar" style="background:${c.avBg};color:${c.avColor};">${c.initials}</div>`;
  }).join('');
  document.getElementById('compare-avatars').innerHTML = avs;
}

function clearCompare() {
  selectedForCompare.clear();
  renderCandidates();
  updateCompareBar();
}

function openCompare() {
  const selected = [...selectedForCompare].map(id => candidates.find(c => c.id === id));
  const dimKeys = ['leadership','motivation','growth','authenticity','experience'];
  const dimLabels = ['Лидерство','Мотивация','Рост','Аутентичность','Опыт'];
  const colors = ['#2D7A5F','#378ADD','#7F77DD','#B8860B','#D85A30'];

  let html = `<div style="display:grid;grid-template-columns:repeat(${selected.length},1fr);gap:1rem;margin-bottom:1.5rem;">`;
  selected.forEach(c => {
    html += `<div style="text-align:center;">
      <div class="avatar" style="background:${c.avBg};color:${c.avColor};width:52px;height:52px;font-size:18px;margin:0 auto 8px;">${c.initials}</div>
      <div style="font-weight:500;">${c.name}</div>
      <div style="font-size:12px;color:var(--text-3);">${c.school}</div>
      <div style="font-family:'DM Serif Display',serif;font-size:36px;margin-top:8px;color:${c.score>=80?'var(--accent-mid)':c.score>=70?'var(--gold)':'var(--danger)'};">${c.score}</div>
    </div>`;
  });
  html += '</div>';

  dimKeys.forEach((k, di) => {
    html += `<div class="weight-row"><div class="weight-header"><span style="color:${colors[di]};font-size:13px;">${dimLabels[di]}</span></div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(${selected.length},1fr);gap:8px;">`;
    selected.forEach(c => {
      html += `<div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:4px;">${c.dims[k]}/100</div>
        <div class="bar-track"><div class="bar-fill" style="width:${c.dims[k]}%;background:${colors[di]};"></div></div>
      </div>`;
    });
    html += '</div></div>';
  });

  document.getElementById('compare-content').innerHTML = html;
  document.getElementById('compare-modal').classList.add('open');
  setTimeout(() => document.querySelectorAll('#compare-content .bar-fill').forEach(b => b.style.width = b.style.width), 50);
}

function closeCompare(e) {
  if (!e || e.target === document.getElementById('compare-modal')) {
    document.getElementById('compare-modal').classList.remove('open');
  }
}

function showDetail(id) {
  const c = candidates.find(x => x.id === id);
  document.getElementById('list-section').style.display = 'none';
  const detailSec = document.getElementById('detail-section');
  detailSec.style.display = 'block';

  const aiHtml = c.aiFlag
    ? `<div class="ai-flag ai-flag-bad">⚠ Высокий риск использования генеративного ИИ — рекомендуется живое интервью</div>`
    : `<div class="ai-flag ai-flag-ok">✓ Эссе соответствует признакам аутентичного авторского текста</div>`;

  const dimBars = dimensions.map(d => `
    <div class="dim-row">
      <div class="dim-header">
        <span class="dim-name">${d.label} <span style="font-size:11px;color:var(--text-3);">· вес ${d.weight}%</span></span>
        <span class="dim-score">${c.dims[d.key]}</span>
      </div>
      <div class="bar-track"><div class="bar-fill" data-target="${c.dims[d.key]}" style="background:${d.color};width:0%;"></div></div>
    </div>
  `).join('');

  const radarHtml = buildRadar(c);

  document.getElementById('detail-content').innerHTML = `
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;align-items:start;">
      <div>
        <div class="card" style="margin-bottom:1.25rem;animation:page-in 0.4s both;">
          <div class="card-body">
            <div class="detail-header">
              <div class="avatar detail-avatar" style="background:${c.avBg};color:${c.avColor};">${c.initials}</div>
              <div style="flex:1;">
                <div style="font-family:'DM Serif Display',serif;font-size:22px;">${c.name}</div>
                <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${c.school}</div>
                <div style="margin-top:8px;">${c.tags.map(t=>`<span class="tag ${t.c}">${t.l}</span>`).join('')}</div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div class="detail-score-big ${c.score>=80?'score-hi':c.score>=70?'score-md':'score-lo'}">${c.score}</div>
                <div style="font-size:12px;color:var(--text-3);">итоговый балл</div>
              </div>
            </div>
            ${aiHtml}
          </div>
        </div>

        <div class="card" style="margin-bottom:1.25rem;animation:page-in 0.4s 0.05s both;">
          <div class="card-header"><div class="card-title">Объяснение оценки</div></div>
          <div class="card-body">
            <div class="explain-box">${c.explain}</div>
            <div class="explain-box accent">${c.growth}</div>
          </div>
        </div>

        <div class="card" style="animation:page-in 0.4s 0.1s both;">
          <div class="card-header"><div class="card-title">Рекомендуемые вопросы для интервью</div></div>
          <div class="card-body">
            ${c.iq.map(q => `<div class="iq-item"><span style="color:var(--accent-mid);flex-shrink:0;">→</span>"${q}"</div>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:1.25rem;animation:page-in 0.4s 0.05s both;">
          <div class="card-header"><div class="card-title">Радар потенциала</div></div>
          <div class="card-body">
            <div class="radar-wrap">${radarHtml}</div>
          </div>
        </div>

        <div class="card" style="margin-bottom:1.25rem;animation:page-in 0.4s 0.1s both;">
          <div class="card-header"><div class="card-title">Оценка по измерениям</div></div>
          <div class="card-body">${dimBars}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;animation:page-in 0.4s 0.15s both;">
          <button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="approveCandidate('${c.name}')">✓ Одобрить для интервью</button>
          <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="showToast('📋','Заявка отправлена на доп. проверку')">Запросить доп. проверку</button>
          <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="exportCandidate('${c.name}')">↓ Экспорт профиля</button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.querySelectorAll('#detail-content .bar-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  }, 100);
}

function buildRadar(c) {
  const keys = ['leadership','motivation','growth','authenticity','experience'];
  const labels = ['Лидерство','Мотивация','Рост','Аутентичность','Опыт'];
  const n = keys.length;
  const cx = 100, cy = 100, r = 75;
  const angles = keys.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);

  const getPoint = (angle, val) => {
    const rr = (val / 100) * r;
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)];
  };

  const gridPolygons = [20, 40, 60, 80, 100].map(pct => {
    const pts = angles.map(a => getPoint(a, pct).join(',')).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>`;
  }).join('');

  const axisLines = angles.map(a => {
    const [x, y] = getPoint(a, 100);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>`;
  }).join('');

  const dataPoints = angles.map((a, i) => getPoint(a, c.dims[keys[i]]));
  const polygon = `<polygon points="${dataPoints.map(p => p.join(',')).join(' ')}" fill="rgba(45,122,95,0.15)" stroke="#2D7A5F" stroke-width="2" stroke-linejoin="round"/>`;
  const dots = dataPoints.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#2D7A5F" stroke="white" stroke-width="2"/>`).join('');

  const labelItems = angles.map((a, i) => {
    const [x, y] = getPoint(a, 118);
    return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="rgba(0,0,0,0.4)" font-family="DM Sans,sans-serif">${labels[i]}</text>`;
  }).join('');

  return `<svg width="200" height="200" viewBox="0 0 200 200">${gridPolygons}${axisLines}${polygon}${dots}${labelItems}</svg>`;
}

function showListSection() {
  document.getElementById('list-section').style.display = 'block';
  document.getElementById('detail-section').style.display = 'none';
  document.getElementById('detail-content').innerHTML = '';
  renderCandidates();
}

function approveCandidate(name) {
  showToast('✓', `${name} одобрена для интервью!`);
  incrementStat('stat-approved');
}

function exportCandidate(name) {
  showToast('↓', `Профиль ${name} подготовлен к экспорту`);
}

function showToast(icon, text, duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${text}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function updateFormProgress() {
  const fields = ['inp-name','inp-school','inp-essay','inp-achievements'];
  const filled = fields.filter(id => document.getElementById(id).value.trim().length > 0).length;
  const pct = Math.round((filled / fields.length) * 100);
  const circumference = 88;
  const offset = circumference - (pct / 100) * circumference;
  document.getElementById('form-progress-circle').style.strokeDashoffset = offset;
  document.getElementById('form-progress-label').textContent = pct + '%';
}

function updateCharCount(el, counterId, max) {
  const len = el.value.length;
  const counter = document.getElementById(counterId);
  counter.textContent = len + ' / ' + max;
  counter.className = 'char-counter' + (len > max * 0.9 ? ' danger' : len > max * 0.75 ? ' warn' : '');
}

function renderWeightBars() {
  document.getElementById('weight-bars').innerHTML = dimensions.map(d => `
    <div class="weight-row">
      <div class="weight-header"><span style="color:var(--text-2);">${d.label}</span><span style="font-weight:500;">${d.weight}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${d.weight * 3.2}%;background:${d.color};"></div></div>
    </div>
  `).join('');
}

function renderWeightSliders() {
  document.getElementById('weight-sliders').innerHTML = dimensions.map(d => `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <label style="font-size:13px;color:var(--text-2);">${d.label}</label>
        <span style="font-size:13px;font-weight:500;color:${d.color};" id="wval-${d.key}">${customWeights[d.key]}%</span>
      </div>
      <input type="range" min="5" max="60" step="5" value="${customWeights[d.key]}"
        style="width:100%;accent-color:${d.color};"
        oninput="updateWeight('${d.key}', this.value)">
    </div>
  `).join('');
}

function updateWeight(key, val) {
  customWeights[key] = parseInt(val);
  document.getElementById('wval-' + key).textContent = val + '%';
  const total = Object.values(customWeights).reduce((a,b) => a+b, 0);
  const tag = document.getElementById('weights-sum-tag');
  tag.textContent = 'Сумма: ' + total + '%';
  tag.className = 'tag ' + (total === 100 ? 'tag-green' : 'tag-red');
}

const feedEvents = [
  {icon:'✓', color:'#2D7A5F', text:'<strong>Айгерим Сейткали</strong> одобрена для интервью', time:'2 мин назад'},
  {icon:'🔍', color:'#378ADD', text:'Поступила новая заявка от <strong>Бекзат Нурланов</strong>', time:'15 мин назад'},
  {icon:'⚠', color:'#B8860B', text:'AI-флаг поднят: <strong>Тимур Касымов</strong> — требуется доп. проверка', time:'34 мин назад'},
  {icon:'📊', color:'#7F77DD', text:'Анализ заявки <strong>Данара Омарова</strong> завершён — балл 79', time:'1 ч назад'},
  {icon:'👥', color:'#1A4D3E', text:'Комиссия просмотрела <strong>12 заявок</strong> за сегодня', time:'2 ч назад'},
];

function renderActivityPage() {
  const feed = document.getElementById('activity-feed');
  feed.innerHTML = feedEvents.map((e, i) => `
    <div class="feed-item" style="animation-delay:${i * 0.08}s;">
      <div class="feed-dot" style="background:${e.color};"></div>
      <div>
        <div class="feed-text">${e.text}</div>
        <div class="feed-time">${e.time}</div>
      </div>
    </div>
  `).join('');

  const online = [
    {name:'Комиссар Ержан А.', status:'Просматривает шортлист', active:true},
    {name:'Модератор Айна С.', status:'Проверяет AI-флаги', active:true},
    {name:'Ассистент Мейрам Т.', status:'Не активен', active:false},
  ];
  document.getElementById('online-list').innerHTML = online.map(u => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
      <div style="width:8px;height:8px;border-radius:50%;background:${u.active?'#2D7A5F':'var(--text-3)'};flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:500;">${u.name}</div>
        <div style="font-size:11px;color:var(--text-3);">${u.status}</div>
      </div>
    </div>
  `).join('');
}

let feedCount = 0;
const newEvents = [
  {icon:'📋', color:'#1A3E6E', text:'<strong>Мадина Ержанова</strong> добавлена в очередь на рассмотрение', time:'Только что'},
  {icon:'✓', color:'#2D7A5F', text:'Экспорт профиля <strong>Бекзат Нурланов</strong> завершён', time:'Только что'},
  {icon:'🔔', color:'#B8860B', text:'Напоминание: 3 заявки истекают через 24 часа', time:'Только что'},
];
function addFeedItem() {
  const e = newEvents[feedCount % newEvents.length];
  feedCount++;
  const feed = document.getElementById('activity-feed');
  const item = document.createElement('div');
  item.className = 'feed-item';
  item.style.animationDelay = '0s';
  item.innerHTML = `<div class="feed-dot" style="background:${e.color};"></div><div><div class="feed-text">${e.text}</div><div class="feed-time">${e.time}</div></div>`;
  feed.insertBefore(item, feed.firstChild);
  incrementStat('stat-analyzed');
  showToast('🔔', 'Новое событие добавлено в ленту');
}

function incrementStat(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = parseInt(el.textContent) + 1;
}

function clearForm() {
  ['inp-name','inp-school','inp-essay','inp-achievements'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('analyze-result').innerHTML = `
    <div class="card" style="height:100%;display:flex;align-items:center;justify-content:center;min-height:300px;">
      <div style="text-align:center;color:var(--text-3);">
        <div style="font-size:40px;margin-bottom:12px;">🔍</div>
        <div style="font-size:14px;">Заполните форму и нажмите<br>«Анализировать» для получения оценки</div>
      </div>
    </div>`;
  updateFormProgress();
}

const sampleCandidates = [
  {name:'Нурсултан Аймагамбетов', school:'Колледж, г. Кызылорда', essay:'Я вырос в семье учителей в Кызылорде. Видя, как родители работают без современных инструментов, я создал школьное приложение для управления домашними заданиями. За 6 месяцев его установили 200 учеников. Это научило меня, что технологии должны решать реальные проблемы, а не быть показухой.', achievements:'Разработал мобильное приложение, призёр хакатона Qazaqstan'},
  {name:'Зарина Байжанова', school:'НИШ, г. Шымкент', essay:'В 16 лет я организовала клуб дебатов в своей школе, когда узнала, что многие одноклассники боятся публично говорить. Через год у нас было 40 участников и первое место на городском турнире. Я убеждена: лидерство — это не должность, а привычка помогать другим раскрыться.', achievements:'Чемпион области по дебатам, ментор для 15 школьников'}
];
let sampleIdx = 0;
function loadSampleCandidate() {
  const s = sampleCandidates[sampleIdx % sampleCandidates.length];
  sampleIdx++;
  document.getElementById('inp-name').value = s.name;
  document.getElementById('inp-school').value = s.school;
  document.getElementById('inp-essay').value = s.essay;
  document.getElementById('inp-achievements').value = s.achievements;
  updateFormProgress();
  updateCharCount(document.getElementById('inp-essay'), 'essay-counter', 2000);
  showToast('📋', 'Пример кандидата загружен');
}

async function analyzeCandidate() {
  const name = document.getElementById('inp-name').value.trim();
  const school = document.getElementById('inp-school').value.trim();
  const essay = document.getElementById('inp-essay').value.trim();
  const achievements = document.getElementById('inp-achievements').value.trim();
  const grades = document.getElementById('inp-grades').value;

  if (!name || !essay) { showToast('⚠', 'Введите имя и эссе кандидата'); return; }

  const btn = document.getElementById('analyze-btn');
  btn.disabled = true;
  btn.innerHTML = `Анализирую <span class="dots"><span></span><span></span><span></span></span>`;

  document.getElementById('analyze-result').innerHTML = `
    <div class="card" style="height:100%;display:flex;align-items:center;justify-content:center;min-height:300px;">
      <div style="text-align:center;color:var(--text-3);">
        <div style="font-size:32px;margin-bottom:12px;">🤖</div>
        <div style="font-size:14px;margin-bottom:8px;">Claude AI анализирует заявку...</div>
        <div class="dots" style="justify-content:center;"><span></span><span></span><span></span></div>
      </div>
    </div>`;

  const prompt = `Ты — система поддержки отбора кандидатов в inVision U (инновационный университет с 100% грантами в Казахстане). Верни ТОЛЬКО валидный JSON без Markdown.

Кандидат:
- Имя: ${name}
- Школа: ${school||'не указано'}
- Успеваемость: ${grades}
- Достижения: ${achievements||'не указаны'}
- Эссе: ${essay}

Оцени (0-100): leadership (вес 30%), motivation (25%), growth (20%), authenticity (15%), experience (10%).
Также: ai_risk ("низкий"|"средний"|"высокий"), recommendation ("рекомендован"|"на рассмотрение"|"не рекомендован"), key_strengths (2-3 строки на русском), concerns (1-2 строки), explain (2-3 предложения на русском), interview_questions (2 вопроса на русском).

JSON формат:
{"leadership":0,"motivation":0,"growth":0,"authenticity":0,"experience":0,"ai_risk":"низкий","recommendation":"рекомендован","key_strengths":[""],"concerns":[""],"explain":"","interview_questions":["",""]}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{role:'user', content:prompt}]
      })
    });
    const data = await res.json();
    const text = data.content.map(i => i.text||'').join('');
    const r = JSON.parse(text.replace(/```json|```/g,'').trim());

    const total = Math.round(r.leadership*0.3 + r.motivation*0.25 + r.growth*0.2 + r.authenticity*0.15 + r.experience*0.1);
    const scoreClass = total>=80?'score-hi':total>=65?'score-md':'score-lo';
    const recTag = r.recommendation==='рекомендован'?'tag-green':r.recommendation==='на рассмотрение'?'tag-amber':'tag-red';
    const aiCls = r.ai_risk==='высокий'?'ai-flag-bad':r.ai_risk==='средний'?'ai-flag-warn':'ai-flag-ok';
    const aiIcon = r.ai_risk==='высокий'?'⚠':r.ai_risk==='средний'?'~':'✓';

    const dimCols = ['#2D7A5F','#378ADD','#7F77DD','#B8860B','#D85A30'];
    const dimKeys = ['leadership','motivation','growth','authenticity','experience'];
    const dimShort = ['Лидерство','Мотивация','Рост','Аутентичность','Опыт'];

    const radarC = {dims:{leadership:r.leadership,motivation:r.motivation,growth:r.growth,authenticity:r.authenticity,experience:r.experience}};
    const radarSvg = buildRadar(radarC);

    document.getElementById('analyze-result').innerHTML = `
      <div class="result-box" style="animation:page-in 0.4s both;">
        <div class="result-header">
          <div>
            <div style="font-family:'DM Serif Display',serif;font-size:22px;">${name}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px;">${school||'—'} · ${grades}</div>
            <div style="margin-top:10px;"><span class="tag ${recTag}" style="font-size:12px;">${r.recommendation}</span></div>
          </div>
          <div style="text-align:right;">
            <div class="result-score-num">${total}</div>
            <div style="font-size:13px;opacity:0.6;">/100 итоговый балл</div>
          </div>
        </div>
        <div class="result-body">
          <div class="ai-flag ${aiCls}" style="margin-bottom:1.25rem;">${aiIcon} AI-риск в эссе: ${r.ai_risk}</div>

          <div class="dim-mini-grid">
            ${dimKeys.map((k,i) => `
              <div class="dim-mini">
                <div class="dim-mini-score" style="color:${dimCols[i]}">${r[k]}</div>
                <div class="dim-mini-label">${dimShort[i]}</div>
              </div>`).join('')}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;align-items:start;">
            <div>
              <div class="section-heading">Объяснение</div>
              <div class="explain-box">${r.explain}</div>
            </div>
            <div>
              <div class="section-heading">Радар потенциала</div>
              <div style="display:flex;justify-content:center;">${radarSvg}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <div>
              <div class="section-heading">Сильные стороны</div>
              ${r.key_strengths.map(s=>`<span class="tag tag-green" style="margin:2px;display:inline-flex;">${s}</span>`).join('')}
            </div>
            <div>
              <div class="section-heading">Опасения</div>
              ${r.concerns.map(s=>`<span class="tag tag-amber" style="margin:2px;display:inline-flex;">${s}</span>`).join('')}
            </div>
          </div>

          <div style="margin-bottom:1.25rem;">
            <div class="section-heading">Вопросы для интервью</div>
            ${r.interview_questions.map(q=>`<div class="iq-item"><span style="color:var(--accent-mid);">→</span>"${q}"</div>`).join('')}
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="showToast('✓','${name} добавлен в шортлист для рассмотрения комиссией!')">Добавить в шортлист</button>
            <button class="btn btn-ghost" onclick="showToast('↓','Профиль ${name} подготовлен к экспорту')">Экспорт</button>
          </div>
        </div>
      </div>`;

    incrementStat('stat-analyzed');
    showToast('✓', 'Анализ завершён!');
  } catch(e) {
    document.getElementById('analyze-result').innerHTML = `
      <div class="card"><div class="card-body"><div class="explain-box" style="color:var(--danger);">Ошибка анализа: ${e.message}</div></div></div>`;
    showToast('⚠', 'Ошибка при анализе');
  }

  btn.disabled = false;
  btn.innerHTML = 'Анализировать';
}

renderCandidates();
renderWeightBars();
renderWeightSliders();
updateFormProgress();
updateCharCount(document.getElementById('inp-essay'), 'essay-counter', 2000);
setTimeout(() => {
  document.querySelectorAll('.bar-fill').forEach(el => {
    if (el.dataset.target) el.style.width = el.dataset.target + '%';
  });
  document.querySelectorAll('#weight-bars .bar-fill').forEach(el => {
    el.style.width = el.style.width;
  });
}, 200);