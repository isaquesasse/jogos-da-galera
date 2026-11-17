# Jogos da Galera

Jogos para jogar com os amigos num celular só: Impostor, Espião, Palavra Proibida, Pergunta Parecida, Nem a Pato e Mistérios +18.
HTML, CSS e JavaScript puro, sem build. Funciona offline e pode ser instalado como app.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie esta pasta:
   ```
   git init
   git add .
   git commit -m "Primeira versão"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/jogos-da-galera.git
   git push -u origin main
   ```
2. No repositório: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
3. Em 1 ou 2 minutos o site fica em `https://SEU-USUARIO.github.io/jogos-da-galera/`.

## Instalar no celular

- **Android (Chrome):** abra o site → menu ⋮ → **Instalar app**.
- **iPhone (Safari):** abra o site → Compartilhar → **Adicionar à Tela de Início**.

## Rodar no computador

Qualquer servidor estático serve, por exemplo `npx serve .`, e abra o endereço que ele mostrar.
Abrir o `index.html` direto (file://) não funciona, porque os módulos JS precisam de servidor.

Testes das regras: `npm test` (Node 20+).

## Onde mexer

| O quê | Arquivo |
|---|---|
| Palavras do Impostor | `data/impostor.js` |
| Locais e papéis do Espião | `data/espiao.js` |
| Cartas da Palavra Proibida | `data/palavra-proibida.js` (uma linha por carta) |
| Perguntas do Nem a Pato | `data/nem-a-pato.js` |
| Histórias dos Mistérios | `data/misterios.js` |
| Pares de perguntas da Pergunta Parecida | `data/pergunta.js` |
| Telas de cada jogo | `games/*.js` |
| Peças comuns (jogadores, passar o celular, timer) | `core.js` |

Ao **criar um arquivo novo**, adicione-o na lista `FILES` do `sw.js` e aumente `VERSION`, para ele funcionar offline.
