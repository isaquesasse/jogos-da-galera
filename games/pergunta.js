import { render, header, esc, playersScreen, passReveal, countdown, pick, deck } from '../core.js';
import { pickIndexes, maxImpostors } from '../logic.js';
import pairs from '../data/pergunta.js';

const TITLE = 'Pergunta Parecida';
const draw = deck(pairs);

function start(el, exit) {
  playersScreen(el, {
    title: TITLE, min: 3, exit,
    extra: `
      <div class="card">
        <label>Impostores
          <select id="imp"><option>1</option><option>2</option></select>
        </label>
        <label>Tempo de discussão
          <select id="time"><option value="120">2 min</option><option value="180" selected>3 min</option><option value="300">5 min</option></select>
        </label>
        <p class="muted">Todos recebem a mesma pergunta, menos o impostor, que recebe uma parecida e não sabe disso. Cada um responde em voz alta. Depois, descubram quem respondeu outra pergunta.</p>
      </div>`,
    onStart: (players) => round(el, exit, players, {
      imp: Math.min(+el.querySelector('#imp').value, maxImpostors(players.length)),
      time: +el.querySelector('#time').value,
    }),
  });
}

function round(el, exit, players, cfg) {
  const pair = draw();
  const impostors = pickIndexes(players.length, cfg.imp);

  passReveal(el, {
    title: TITLE, players, exit,
    secret: (i) => `<p class="muted">Sua pergunta</p><p class="big"><span class="mark">${esc(impostors.has(i) ? pair.f : pair.q)}</span></p><p class="muted">Guarde a resposta. Não mostre a tela.</p>`,
    onDone: answer,
  });

  function answer() {
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <p class="clock" id="clock"></p>
      <div class="card center">
        <p class="muted">Quem responde primeiro</p>
        <p class="big">${esc(pick(players))}</p>
        <p>Cada um responde em voz alta, sem repetir a pergunta. Depois discutam e votem em quem recebeu uma pergunta diferente.</p>
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
        <p class="muted">Pergunta da galera</p>
        <p><strong class="mark">${esc(pair.q)}</strong></p>
        <p class="muted">Pergunta do impostor</p>
        <p><strong>${esc(pair.f)}</strong></p>
      </div>
      <div class="grow"></div>
      <button class="btn" data-on="again">Nova rodada</button>
      <button class="btn ghost" data-on="exit">Voltar ao início</button>
    `, { exit, again: () => round(el, exit, players, cfg) });
  }
}

export default { id: 'pergunta', name: TITLE, emoji: '❓', desc: 'Todos respondem a mesma pergunta. Menos um, que recebeu uma parecida.', who: '3 ou mais', start };
