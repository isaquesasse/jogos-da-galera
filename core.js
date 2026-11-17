// Peças compartilhadas por todos os jogos.

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Baralho que não repete carta até acabar tudo, depois embaralha de novo.
export function deck(items) {
  let pile = [];
  return () => {
    if (!pile.length) pile = shuffle(items);
    return pile.pop();
  };
}

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* modo privado: segue sem salvar */ }
  },
};
export { store };

export const vibrate = (ms) => navigator.vibrate?.(ms);

// Monta o HTML na tela e liga os botões com data-on="nome" aos handlers.
export function render(el, html, handlers = {}) {
  el.innerHTML = html;
  el.querySelectorAll('[data-on]').forEach((node) => {
    const fn = handlers[node.dataset.on];
    if (fn) node.addEventListener('click', (e) => fn(e, node));
  });
  window.scrollTo(0, 0);
}

export const header = (title) => `
  <div class="top">
    <button class="icon" data-on="exit" aria-label="Voltar ao início">←</button>
    <h2>${esc(title)}</h2>
  </div>`;

// Tela de jogadores, reaproveitada por todos os jogos. Salva a lista entre partidas.
export function playersScreen(el, { title, min, exit, extra = '', onStart }) {
  let players = store.get('players', []);

  const draw = () => {
    render(el, `
      ${header(title)}
      <div class="card">
        <label>Jogadores (mínimo ${min})
          <div class="row">
            <input type="text" id="name" placeholder="Nome" maxlength="20" autocomplete="off" enterkeyhint="done">
            <button class="btn add" data-on="add" aria-label="Adicionar jogador">+</button>
          </div>
        </label>
        <div class="chips">
          ${players.map((p, i) => `<span class="chip">${esc(p)}<button data-on="del" data-i="${i}" aria-label="Remover ${esc(p)}">×</button></span>`).join('') || '<span class="muted">Adicione quem vai jogar.</span>'}
        </div>
      </div>
      ${extra}
      <div class="grow"></div>
      <button class="btn" data-on="start" ${players.length < min ? 'disabled' : ''}>Começar</button>
    `, {
      exit,
      add: () => addName(),
      del: (_, n) => { players.splice(+n.dataset.i, 1); save(); draw(); },
      start: () => onStart([...players], el),
    });
    const input = el.querySelector('#name');
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addName(); });
  };

  const save = () => store.set('players', players);
  const addName = () => {
    const input = el.querySelector('#name');
    const name = input.value.trim();
    if (name && !players.includes(name)) { players.push(name); save(); }
    draw();
    el.querySelector('#name').focus();
  };

  draw();
}

// "Passe o celular para X" -> toca para ver -> esconde -> próximo.
export function passReveal(el, { title, players, secret, exit, onDone }) {
  let i = 0;
  const hidden = () => render(el, `
    ${header(title)}
    <div class="grow"></div>
    <div>
      <p class="center muted">Passe o celular para</p>
      <p class="name">${esc(players[i])}</p>
    </div>
    <button class="playcard back" data-on="show"><span>Ver meu papel</span></button>
    <p class="center muted">Só ${esc(players[i])} pode olhar.</p>
    <div class="grow"></div>
  `, { exit, show: shown });

  const shown = () => render(el, `
    ${header(title)}
    <div class="grow"></div>
    <div class="playcard front">${secret(i)}</div>
    <div class="grow"></div>
    <button class="btn" data-on="next">Esconder e passar</button>
  `, {
    exit,
    next: () => { i++; i < players.length ? hidden() : onDone(); },
  });

  hidden();
}

// Contador regressivo dentro de um elemento. Devolve stop().
export function countdown(node, seconds, onEnd) {
  const end = Date.now() + seconds * 1000;
  const tick = () => {
    if (!node.isConnected) return stop(); // saiu da tela: para sozinho
    const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
    node.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
    if (left <= 0) { stop(); vibrate([300, 100, 300]); onEnd?.(); }
  };
  const id = setInterval(tick, 250);
  const stop = () => clearInterval(id);
  tick();
  return stop;
}
