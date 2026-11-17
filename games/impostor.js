import { render, header, esc, playersScreen, passReveal, countdown, pick } from '../core.js';
import { pickIndexes, maxImpostors } from '../logic.js';
import categories from '../data/impostor.js';

const TITLE = 'Impostor';

function start(el, exit) {
  const names = Object.keys(categories);
  playersScreen(el, {
    title: TITLE, min: 3, exit,
    extra: `
      <div class="card">
        <label>Categoria
          <select id="cat"><option value="">Todas misturadas</option>${names.map((n) => `<option>${esc(n)}</option>`).join('')}</select>
        </label>
        <label>Impostores
          <select id="imp"><option>1</option><option>2</option><option>3</option></select>
        </label>
        <label>Tempo de discussão
          <select id="time"><option value="120">2 min</option><option value="180" selected>3 min</option><option value="300">5 min</option></select>
        </label>
        <label class="check"><input type="checkbox" id="hint" checked> Impostor vê a categoria</label>
      </div>`,
    onStart: (players) => {
      const cfg = {
        cat: el.querySelector('#cat').value,
        imp: Math.min(+el.querySelector('#imp').value, maxImpostors(players.length)),
        time: +el.querySelector('#time').value,
        hint: el.querySelector('#hint').checked,
      };
      round(el, exit, players, cfg);
    },
  });
}

function round(el, exit, players, cfg) {
  const cat = cfg.cat || pick(names());
  const word = pick(categories[cat]);
  const impostors = pickIndexes(players.length, cfg.imp);

  passReveal(el, {
    title: TITLE, players, exit,
    secret: (i) => impostors.has(i)
      ? `<p style="font-size:56px" aria-hidden="true">🤫</p><p class="big alert">Você é o impostor</p>${cfg.hint ? `<p>Categoria: <strong>${esc(cat)}</strong></p>` : ''}<p class="muted">Finja que sabe a palavra.</p>`
      : `<p class="muted">A palavra é</p><p class="big"><span class="mark">${esc(word)}</span></p><p class="muted">Categoria: ${esc(cat)}</p>`,
    onDone: () => discuss(),
  });

  function discuss() {
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <p class="clock" id="clock"></p>
      <div class="card center">
        <p class="muted">Quem começa a dar dica</p>
        <p class="big">${esc(pick(players))}</p>
        <p>Cada um fala uma palavra ligada ao tema. No fim, votem em quem é o impostor.</p>
      </div>
      <div class="grow"></div>
      <button class="btn danger" data-on="reveal">Revelar impostor</button>
    `, { exit, reveal });
    countdown(el.querySelector('#clock'), cfg.time);
  }

  function reveal() {
    const who = players.filter((_, i) => impostors.has(i));
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <div class="playcard front">
        <p class="muted">${who.length > 1 ? 'Os impostores eram' : 'O impostor era'}</p>
        <p class="big alert">${who.map(esc).join(' e ')}</p>
        <p>A palavra era <strong class="mark">${esc(word)}</strong></p>
      </div>
      <div class="grow"></div>
      <button class="btn" data-on="again">Nova rodada</button>
      <button class="btn ghost" data-on="exit">Voltar ao início</button>
    `, { exit, again: () => round(el, exit, players, cfg) });
  }
}

const names = () => Object.keys(categories);

export default { id: 'impostor', name: TITLE, emoji: '🕵️', desc: 'Todo mundo sabe a palavra secreta. Menos um.', who: '3 ou mais', start };
