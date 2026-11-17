import { render, header, esc, playersScreen, passReveal, countdown, pick, deck, shuffle } from '../core.js';
import { pickIndexes } from '../logic.js';
import places from '../data/espiao.js';

const TITLE = 'Espião';
const drawPlace = deck(places);

function start(el, exit) {
  playersScreen(el, {
    title: TITLE, min: 3, exit,
    extra: `
      <div class="card">
        <label>Tempo da rodada
          <select id="time"><option value="300">5 min</option><option value="480" selected>8 min</option><option value="600">10 min</option></select>
        </label>
        <p class="muted">Todos sabem o local, menos o espião. Façam perguntas uns aos outros. O espião vence se não for descoberto ou se adivinhar o local.</p>
      </div>`,
    onStart: (players) => round(el, exit, players, +el.querySelector('#time').value),
  });
}

function round(el, exit, players, time) {
  const place = drawPlace();
  const spy = [...pickIndexes(players.length, 1)][0];
  const roles = shuffle(place.roles);

  passReveal(el, {
    title: TITLE, players, exit,
    secret: (i) => i === spy
      ? `<p style="font-size:56px" aria-hidden="true">🕶️</p><p class="big alert">Você é o espião</p><p class="muted">Descubra o local sem se entregar.</p>`
      : `<p class="muted">Local</p><p class="big"><span class="mark">${esc(place.name)}</span></p><p>Seu papel: <strong>${esc(roles[i % roles.length])}</strong></p>`,
    onDone: play,
  });

  function play() {
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <p class="clock" id="clock"></p>
      <div class="card center">
        <p class="muted">Quem faz a primeira pergunta</p>
        <p class="big">${esc(pick(players))}</p>
      </div>
      <details class="card"><summary>Locais possíveis (ajuda o espião)</summary><div class="chips">${places.map((p) => `<span class="chip plain">${esc(p.name)}</span>`).join('')}</div></details>
      <div class="grow"></div>
      <button class="btn danger" data-on="reveal">Revelar espião</button>
    `, { exit, reveal });
    countdown(el.querySelector('#clock'), time);
  }

  function reveal() {
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <div class="playcard front">
        <p class="muted">O espião era</p>
        <p class="big alert">${esc(players[spy])}</p>
        <p>O local era <strong class="mark">${esc(place.name)}</strong></p>
      </div>
      <div class="grow"></div>
      <button class="btn" data-on="again">Nova rodada</button>
      <button class="btn ghost" data-on="exit">Voltar ao início</button>
    `, { exit, again: () => round(el, exit, players, time) });
  }
}

export default { id: 'espiao', name: TITLE, emoji: '📍', desc: 'Todo mundo sabe onde está. O espião precisa descobrir.', who: '3 ou mais', start };
