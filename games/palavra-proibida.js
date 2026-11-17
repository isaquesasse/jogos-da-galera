import { render, header, esc, countdown, deck, vibrate } from '../core.js';
import cards from '../data/palavra-proibida.js';

const TITLE = 'Palavra Proibida';
const draw = deck(cards);

function start(el, exit) {
  render(el, `
    ${header(TITLE)}
    <div class="card">
      <p>Dois times. Na sua vez, alguém do time explica a palavra sem dizer nenhuma das proibidas. O time adivinha. O outro time fiscaliza.</p>
    </div>
    <div class="card">
      <label>Nome do time 1 <input type="text" id="t0" value="Time 1" maxlength="16"></label>
      <label>Nome do time 2 <input type="text" id="t1" value="Time 2" maxlength="16"></label>
      <label>Tempo por vez
        <select id="time"><option value="45">45 s</option><option value="60" selected>60 s</option><option value="90">90 s</option></select>
      </label>
      <label>Rodadas (cada time joga uma vez por rodada)
        <select id="rounds"><option>3</option><option selected>5</option><option>8</option></select>
      </label>
    </div>
    <div class="grow"></div>
    <button class="btn" data-on="go">Começar</button>
  `, {
    exit,
    go: () => {
      const g = {
        teams: [el.querySelector('#t0').value.trim() || 'Time 1', el.querySelector('#t1').value.trim() || 'Time 2'],
        score: [0, 0],
        time: +el.querySelector('#time').value,
        turns: +el.querySelector('#rounds').value * 2,
        turn: 0,
      };
      ready(el, exit, g);
    },
  });
}

const scoreboard = (g) => `
  <div class="card score">
    ${g.teams.map((t, i) => `<div><span class="muted">${esc(t)}</span><strong>${g.score[i]}</strong></div>`).join('')}
  </div>`;

function ready(el, exit, g) {
  if (g.turn >= g.turns) return final(el, exit, g);
  const team = g.turn % 2;
  render(el, `
    ${header(TITLE)}
    ${scoreboard(g)}
    <div class="grow"></div>
    <p class="center muted">Rodada ${Math.floor(g.turn / 2) + 1} de ${g.turns / 2}</p>
    <p class="name">Vez do ${esc(g.teams[team])}</p>
    <p class="center">Passe o celular para quem vai explicar.</p>
    <div class="grow"></div>
    <button class="btn" data-on="go">Valendo!</button>
  `, { exit, go: () => turn(el, exit, g, team) });
}

function turn(el, exit, g, team) {
  let card = draw();
  let points = 0;
  let over = false;

  const draw_ = () => {
    el.querySelector('#word').textContent = card.word;
    el.querySelector('#taboo').innerHTML = card.taboo.map((t) => `<li>${esc(t)}</li>`).join('');
    el.querySelector('#pts').textContent = points;
  };
  const next = (delta) => {
    if (over) return;
    points += delta;
    if (delta < 0) vibrate(150);
    card = draw();
    draw_();
  };

  render(el, `
    <div class="top" style="justify-content:space-between"><p class="clock small" id="clock"></p><p class="big">Pontos: <span id="pts">0</span></p></div>
    <div class="card">
      <p class="taboo-word" id="word"></p>
      <ul class="taboo-list" id="taboo"></ul>
    </div>
    <div class="grow"></div>
    <button class="btn ok" data-on="hit">Acertou +1</button>
    <div class="row">
      <button class="btn ghost" data-on="skip">Pular</button>
      <button class="btn danger" data-on="foul">Proibida −1</button>
    </div>
  `, { hit: () => next(1), skip: () => next(0), foul: () => next(-1) });
  draw_();

  countdown(el.querySelector('#clock'), g.time, () => {
    over = true;
    g.score[team] += points;
    g.turn++;
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <p class="name">Tempo!</p>
      <p class="center" style="font-size:20px">${esc(g.teams[team])} fez <strong>${points}</strong> ${Math.abs(points) === 1 ? 'ponto' : 'pontos'}.</p>
      ${scoreboard(g)}
      <div class="grow"></div>
      <button class="btn" data-on="go">Próxima vez</button>
    `, { exit, go: () => ready(el, exit, g) });
  });
}

function final(el, exit, g) {
  const [a, b] = g.score;
  const result = a === b ? 'Empate!' : `${esc(g.teams[a > b ? 0 : 1])} venceu!`;
  render(el, `
    ${header(TITLE)}
    <div class="grow"></div>
    <p style="font-size:64px" class="center" aria-hidden="true">🏆</p>
    <p class="name">${result}</p>
    ${scoreboard(g)}
    <div class="grow"></div>
    <button class="btn" data-on="again">Jogar de novo</button>
    <button class="btn ghost" data-on="exit">Voltar ao início</button>
  `, { exit, again: () => start(el, exit) });
}

export default { id: 'palavra-proibida', name: TITLE, emoji: '🤐', desc: 'Faça seu time adivinhar sem falar as palavras vetadas.', who: '2 times', start };
