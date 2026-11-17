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

// Instalar como app: Chrome/Android abre o aviso nativo; no iPhone (e onde não há aviso) mostramos o passo a passo.
let installEvent;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvent = e; if (!location.hash) home(); });
const installed = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

async function install(_, btn) {
  if (installEvent) {
    installEvent.prompt();
    await installEvent.userChoice;
    installEvent = null;
    return home();
  }
  btn.outerHTML = `<div class="card"><p>${isIos()
    ? 'No iPhone: toque em <strong>Compartilhar</strong> (quadrado com seta) e depois em <strong>Adicionar à Tela de Início</strong>.'
    : 'Abra o menu <strong>⋮</strong> do navegador e toque em <strong>Instalar app</strong> (ou <strong>Adicionar à tela inicial</strong>).'}</p></div>`;
}

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
    ${installed() ? '' : '<button class="btn ghost" data-on="install">📲 Instalar como app</button>'}
  `, { install, open: (_, n) => { location.hash = n.dataset.id; } });
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
