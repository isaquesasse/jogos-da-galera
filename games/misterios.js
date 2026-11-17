import { render, header, esc, deck, store } from '../core.js';
import stories from '../data/misterios.js';

const TITLE = 'Mistérios +18';
const draw = deck(stories);

function start(el, exit) {
  if (!store.get('adult-ok', false)) return gate(el, exit);
  rules(el, exit);
}

function gate(el, exit) {
  render(el, `
    ${header(TITLE)}
    <div class="grow"></div>
    <p class="center" style="font-size:72px" aria-hidden="true">🔞</p>
    <div class="card center">
      <p>Este jogo tem histórias com morte, sexo, bebida e humor pesado.</p>
      <p class="muted">Só para maiores de 18 anos.</p>
    </div>
    <div class="grow"></div>
    <button class="btn" data-on="ok">Tenho 18 anos ou mais</button>
    <button class="btn ghost" data-on="exit">Voltar</button>
  `, { exit, ok: () => { store.set('adult-ok', true); rules(el, exit); } });
}

function rules(el, exit) {
  render(el, `
    ${header(TITLE)}
    <div class="card">
      <p>Uma pessoa é o <strong>narrador</strong> e fica com o celular.</p>
      <p>Ela lê o mistério em voz alta. O resto do grupo faz perguntas que se respondem com <strong>sim</strong>, <strong>não</strong> ou <strong>não importa</strong>, até descobrir o que aconteceu.</p>
      <p class="muted">Só o narrador olha a resposta.</p>
    </div>
    <div class="grow"></div>
    <button class="btn" data-on="go">Sortear mistério</button>
  `, { exit, go: () => card(el, exit) });
}

function card(el, exit) {
  const s = draw();
  const show = (answer) => render(el, `
    ${header(TITLE)}
    <div class="card">
      <h3>${esc(s.title)}</h3>
      <p class="story">${esc(s.q)}</p>
    </div>
    ${answer
      ? `<div class="card"><span class="tag">Resposta</span><p>${esc(s.a)}</p></div>`
      : `<p class="center muted">Leia em voz alta. Esconda a resposta do grupo.</p>`}
    <div class="grow"></div>
    ${answer ? '' : '<button class="btn danger" data-on="reveal">Ver resposta (só o narrador)</button>'}
    <button class="btn ${answer ? '' : 'ghost'}" data-on="next">Próximo mistério</button>
  `, { exit, reveal: () => show(true), next: () => card(el, exit) });
  show(false);
}

export default { id: 'misterios', name: TITLE, emoji: '💀', desc: 'Histórias absurdas. Descubra o que houve só com perguntas de sim ou não.', who: '2 ou mais, só +18', start };
