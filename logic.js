// Regras puras (sem tela), testadas em tests/logic.test.mjs.

// Sorteia `count` índices distintos entre 0 e n-1.
export function pickIndexes(n, count, rand = Math.random) {
  const idx = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return new Set(idx.slice(0, count));
}

// Máximo de impostores para o jogo continuar justo: sempre mais inocentes que impostores.
export const maxImpostors = (n) => Math.max(1, Math.floor((n - 1) / 2));

// Nem a Pato: quem sai quando alguém desafia o último chute?
// O chute "passou" se for maior que a resposta real -> sai quem chutou. Senão sai quem desafiou.
export function nemAPatoLoser(answer, lastGuess) {
  return lastGuess > answer ? 'guesser' : 'challenger';
}

// Próximo jogador vivo depois de `from` (em ordem circular).
export function nextAlive(alive, from) {
  const n = alive.length;
  for (let k = 1; k <= n; k++) {
    const i = (from + k) % n;
    if (alive[i]) return i;
  }
  return -1;
}
