import { render, header, esc, playersScreen, deck, vibrate } from '../core.js';
import { nemAPatoLoser } from '../logic.js';
import facts from '../data/nem-a-pato.js';

const TITLE = 'Nem a Pato';
const draw = deck(facts);
const num = (n) => n.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
// Valor com unidade. Ano sai sem ponto de milhar e sem a palavra "ano" (1994, não 1.994 ano).
const val = (fact, n) => (fact.unit === 'ano' ? String(n) : `${num(n)} ${fact.unit}`);

function start(el, exit) {
  playersScreen(el, {
    title: TITLE, min: 2, exit,
    extra: `
      <div class="card">
        <label>Modo
          <select id="mode"><option value="">Sem mestre (todo mundo joga junto)</option><option value="1">Com mestre (alguém só cuida do celular)</option></select>
        </label>
        <p class="muted">Sem mestre, o app só confere o chute quando alguém grita. Com mestre: o mestre não joga e fica com o celular. Ele vê a pergunta e a resposta, e só marca quem foi eliminado. Os jogadores adicionados aqui são só quem chuta.</p>
      </div>
      <div class="card">
        <p>O app faz uma pergunta com resposta em número. Cada um, na sua vez, fala em voz alta um chute <strong>maior</strong> que o anterior.</p>
        <p>Achou que o último chute passou da resposta? Grite <strong>“Nem a pato!”</strong> e marque no app quem gritou e o chute. Se o chute passou mesmo, sai quem chutou. Se não passou, sai quem gritou.</p>
        <p class="muted">Último que sobrar vence.</p>
      </div>`,
    onStart: (players) => {
      const g = { master: !!el.querySelector('#mode').value, players, alive: players.map(() => true) };
      question(el, exit, g);
    },
  });
}

function question(el, exit, g) {
  const fact = draw();
  const alive = () => g.players.map((p, i) => ({ p, i })).filter(({ i }) => g.alive[i]);
  const buttons = (list, on) => list.map(({ p, i }) => `<button class="btn ghost" data-on="${on}" data-i="${i}">${esc(p)}</button>`).join('');

  const ask = () => render(el, `
    ${header(TITLE)}
    <div class="card">
      <span class="tag">Pergunta</span>
      <p class="story"><strong>${esc(fact.q)}</strong></p>
      <p class="muted">${fact.unit === 'ano' ? 'Respondam com o ano' : `Resposta em ${esc(fact.unit)}`}. Chutem em voz alta, cada chute maior que o anterior.</p>
    </div>
    <div class="grow"></div>
    <button class="btn danger" data-on="duck">🦆 Alguém gritou "Nem a pato!"</button>
  `, { exit, duck: whoCalled });

  function whoCalled() {
    render(el, `
      ${header(TITLE)}
      <p class="center" style="font-size:64px" aria-hidden="true">🦆</p>
      <p class="name">Quem gritou?</p>
      <div class="grow"></div>
      ${buttons(alive(), 'pick')}
      <button class="btn ghost" data-on="back">Cancelar</button>
    `, { exit, back: ask, pick: (_, n) => whoGuessed(+n.dataset.i) });
  }

  function whoGuessed(caller) {
    render(el, `
      ${header(TITLE)}
      <p class="name">De quem era o chute?</p>
      <div class="grow"></div>
      ${buttons(alive().filter(({ i }) => i !== caller), 'pick')}
      <button class="btn ghost" data-on="back">Voltar</button>
    `, { exit, back: whoCalled, pick: (_, n) => guessValue(caller, +n.dataset.i) });
  }

  function guessValue(caller, who) {
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <div class="card">
        <label>Chute de ${esc(g.players[who])}
          <input type="number" id="guess" inputmode="decimal" step="any" min="0" placeholder="Valor do chute">
        </label>
        <p class="alert" id="err" hidden></p>
        <button class="btn ok" data-on="ok">Conferir</button>
      </div>
      <button class="btn ghost" data-on="back">Voltar</button>
    `, {
      exit,
      back: () => whoGuessed(caller),
      ok: () => {
        const value = el.querySelector('#guess').valueAsNumber;
        if (!Number.isFinite(value) || value < 0) {
          const err = el.querySelector('#err'); err.textContent = 'Digite um número.'; err.hidden = false; return;
        }
        out(nemAPatoLoser(fact.a, value) === 'guesser' ? who : caller, { who, value });
      },
    });
  }

  function out(loser, last) {
    g.alive[loser] = false;
    vibrate(200);
    const left = g.players.filter((_, i) => g.alive[i]);
    const over = left.length === 1;
    render(el, `
      ${header(TITLE)}
      <div class="grow"></div>
      <div class="card center">
        <p class="muted">A resposta é</p>
        <p class="big"><span class="mark">${esc(val(fact, fact.a))}</span></p>
        ${fact.note ? `<p class="muted">${esc(fact.note)}</p>` : ''}
        ${last ? `<p>O chute de ${esc(g.players[last.who])} (${esc(val(fact, last.value))}) ${last.value > fact.a ? '' : 'não '}passou.</p>` : ''}
      </div>
      ${over
        ? `<p class="center" style="font-size:64px" aria-hidden="true">🏆</p><p class="name">${esc(left[0])} venceu!</p>`
        : `<p class="name">${esc(g.players[loser])} está fora!</p><div class="chips" style="justify-content:center">${g.players.map((p, i) => `<span class="chip plain ${g.alive[i] ? '' : 'out'}">${esc(p)}</span>`).join('')}</div>`}
      <div class="grow"></div>
      ${over
        ? `<button class="btn" data-on="again">Jogar de novo</button><button class="btn ghost" data-on="exit">Voltar ao início</button>`
        : `<button class="btn" data-on="next">Próxima pergunta</button>`}
    `, {
      exit,
      next: () => question(el, exit, g),
      again: () => question(el, exit, { master: g.master, players: g.players, alive: g.players.map(() => true) }),
    });
  }

  const masterScreen = () => render(el, `
    ${header(TITLE)}
    <div class="card">
      <span class="tag">Pergunta</span>
      <p class="story"><strong>${esc(fact.q)}</strong></p>
    </div>
    <div class="card"><span class="tag">Resposta (só o mestre vê)</span><p><strong>${esc(val(fact, fact.a))}</strong></p></div>
    <div class="grow"></div>
    <p class="center muted">Quem foi eliminado?</p>
    ${g.players.map((p, i) => g.alive[i] ? `<button class="btn ghost" data-on="out" data-i="${i}">${esc(p)}</button>` : '').join('')}
  `, { exit, out: (_, n) => out(+n.dataset.i) });

  g.master ? masterScreen() : ask();
}

export default { id: 'nem-a-pato', name: TITLE, emoji: '🦆', desc: 'Cada um chuta um número maior. Quem exagerar, sai.', who: '2 ou mais', start };
