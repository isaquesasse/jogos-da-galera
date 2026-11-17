import { render, esc } from './core.js';
import impostor from './games/impostor.js';
import espiao from './games/espiao.js';
import palavraProibida from './games/palavra-proibida.js';
import misterios from './games/misterios.js';
import nemAPato from './games/nem-a-pato.js';
import pergunta from './games/pergunta.js';

const games = [impostor, espiao, pergunta, palavraProibida, nemAPato, misterios];
const el = document.getElementById('app');
const themeMeta = document.querySelector('meta[name=theme-color]');

function home() {
  render(el, `
    <h1 class="logo" aria-label="Jogos da Galera"><span class="l1">Jogos</span><span class="l2">da</span><span class="l3">Galera</span></h1>
    <p class="tagline">Um celular, a galera toda. Escolha o jogo e vá passando.</p>
    <div class="tiles">
      ${games.map((g) => `
        <button class="tile" data-on="open" data-id="${g.id}" style="--c:var(--g-${g.id})${g.id === 'misterios' ? ';--tc:var(--paper)' : ''}">
          <span class="sticker" aria-hidden="true">${g.emoji}</span>
          <span><strong>${esc(g.name)}</strong><span class="desc">${esc(g.desc)}</span><span class="who">${esc(g.who)}</span></span>
        </button>`).join('')}
    </div>
  `, { open: (_, n) => { location.hash = n.dataset.id; } });
}

function route() {
  const game = games.find((g) => g.id === location.hash.slice(1));
  document.body.dataset.game = game?.id ?? '';
  themeMeta.content = getComputedStyle(document.body).backgroundColor;
  if (game) game.start(el, () => { location.hash = ''; });
  else home();
}

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
