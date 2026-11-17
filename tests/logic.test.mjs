// Rodar: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { pickIndexes, maxImpostors, nemAPatoLoser, nextAlive } from '../logic.js';
import facts from '../data/nem-a-pato.js';
import cards from '../data/palavra-proibida.js';

test('Nem a Pato: chute acima da resposta elimina quem chutou', () => {
  assert.equal(nemAPatoLoser(190000, 200000), 'guesser');
});

test('Nem a Pato: chute abaixo ou igual elimina quem gritou', () => {
  assert.equal(nemAPatoLoser(190000, 10), 'challenger');
  assert.equal(nemAPatoLoser(190000, 190000), 'challenger');
});

test('nextAlive pula eliminados e dá a volta', () => {
  assert.equal(nextAlive([true, false, true], 0), 2);
  assert.equal(nextAlive([true, false, true], 2), 0);
  assert.equal(nextAlive([false, true, false], 1), 1);
});

test('pickIndexes sorteia índices distintos dentro do limite', () => {
  for (let k = 0; k < 50; k++) {
    const s = pickIndexes(6, 2);
    assert.equal(s.size, 2);
    for (const i of s) assert.ok(i >= 0 && i < 6);
  }
});

test('maxImpostors mantém inocentes em maioria', () => {
  assert.equal(maxImpostors(3), 1);
  assert.equal(maxImpostors(5), 2);
  assert.equal(maxImpostors(7), 3);
});

test('conteúdo: perguntas têm número e unidade, cartas têm 5 proibidas', () => {
  for (const f of facts) assert.ok(Number.isFinite(f.a) && f.unit, f.q);
  for (const c of cards) assert.equal(c.taboo.length, 5, c.word);
});
