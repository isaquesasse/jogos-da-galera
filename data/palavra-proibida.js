// Formato: "Palavra: proibida1, proibida2, ..."
const raw = `
Praia: mar, areia, sol, onda, biquíni
Pizza: queijo, massa, italiana, fatia, forno
Futebol: bola, gol, time, jogador, campo
Natal: Papai Noel, presente, dezembro, árvore, ceia
Celular: telefone, ligar, tela, aplicativo, bateria
Cachorro: latir, animal, osso, au au, pet
Café: preto, xícara, manhã, cafeína, açúcar
Dentista: dente, boca, cárie, médico, broca
Chuva: água, nuvem, guarda-chuva, molhado, céu
Carnaval: festa, fantasia, samba, bloco, fevereiro
Cerveja: bebida, gelada, álcool, bar, copo
Escola: aluno, professor, aula, sala, estudar
Avião: voar, aeroporto, piloto, asa, viagem
Casamento: noiva, noivo, igreja, aliança, festa
Ressaca: bebida, dor de cabeça, manhã, álcool, festa
Geladeira: frio, cozinha, gelo, comida, eletrodoméstico
Aniversário: bolo, parabéns, vela, presente, idade
Hospital: médico, doente, enfermeira, remédio, cirurgia
Vampiro: sangue, dente, morcego, Drácula, noite
Pipoca: milho, cinema, estourar, panela, manteiga
Sorvete: gelado, casquinha, sabor, derreter, doce
Banho: chuveiro, água, sabonete, toalha, limpar
Ônibus: transporte, motorista, ponto, passageiro, linha
Dinheiro: real, nota, moeda, pagar, banco
Bebê: criança, fralda, chorar, mamar, nenê
Polícia: ladrão, prender, viatura, delegado, crime
Espelho: reflexo, vidro, olhar, imagem, banheiro
Fantasma: assombração, morto, branco, lençol, susto
Academia: malhar, peso, exercício, músculo, treino
Motel: casal, quarto, sexo, cama, hotel
Ciúme: namorado, desconfiar, sentimento, traição, inveja
Tatuagem: pele, desenho, agulha, tinta, braço
Chocolate: cacau, doce, barra, Páscoa, marrom
Montanha-russa: parque, brinquedo, frio na barriga, carrinho, descida
Fofoca: falar, vizinha, segredo, contar, vida alheia
Selfie: foto, celular, câmera, rosto, Instagram
Sono: dormir, cama, cansaço, bocejar, noite
Pão de queijo: Minas, queijo, polvilho, café, bolinha
Bombeiro: fogo, incêndio, mangueira, resgate, caminhão
Abacaxi: fruta, coroa, amarelo, espinho, azedo
Zumbi: morto-vivo, cérebro, apocalipse, andar, mordida
Pijama: dormir, roupa, noite, cama, conforto
Uber: carro, motorista, aplicativo, corrida, táxi
Sushi: japonês, peixe, arroz, hashi, cru
Novela: televisão, capítulo, Globo, ator, noite
WhatsApp: mensagem, celular, aplicativo, zap, grupo
Despertador: acordar, relógio, manhã, alarme, tocar
Paraquedas: pular, avião, céu, cair, abrir
Bigode: pelo, homem, rosto, boca, barba
Camisinha: sexo, proteção, preservativo, gravidez, farmácia
Pastel: feira, frito, massa, caldo de cana, recheio
Mentira: verdade, enganar, nariz, Pinóquio, falso
Terremoto: chão, tremer, desastre, Japão, prédio
Ex: namoro, terminar, antigo, relacionamento, voltar
Vizinho: casa, ao lado, barulho, prédio, morar
Gato: miau, felino, bichano, rato, animal
Karaokê: cantar, música, microfone, letra, desafinado
Palhaço: circo, nariz, rir, maquiagem, engraçado
Biquíni: praia, roupa, mulher, piscina, sunga
Chinelo: pé, Havaianas, calçado, sandália, dedo
Vela: fogo, luz, aniversário, cera, apagar
Churrasco: carne, picanha, fogo, domingo, espeto
Piscina: água, nadar, mergulhar, cloro, verão
Galinha: ovo, pintinho, frango, cocoricó, ave
Avó: neto, velha, família, mãe, vovó
Lua: noite, céu, cheia, astronauta, satélite
Cemitério: morto, túmulo, enterro, velório, caixão
Calcinha: roupa íntima, mulher, cueca, sutiã, gaveta
Microondas: esquentar, cozinha, pipoca, aparelho, girar
Mosquito: picar, dengue, zumbido, inseto, repelente
Pirata: navio, tesouro, olho, papagaio, mar
Arroz e feijão: comida, prato, brasileiro, almoço, panela
Batom: boca, lábio, maquiagem, vermelho, beijo
Show: banda, música, palco, ingresso, cantor
Bolsa de valores: ação, dinheiro, investir, mercado, economia
Peido: gás, cheiro, barulho, bunda, pum
Netflix: série, filme, assistir, streaming, maratona
Unha: dedo, mão, manicure, esmalte, cortar
Fila: esperar, pessoas, banco, vez, linha
Tinder: aplicativo, namoro, match, encontro, deslizar
Churrasqueira: carne, fogo, brasa, assar, quintal
Cinema: filme, tela, pipoca, ingresso, sala
Praça: banco, parque, árvore, crianças, cidade
Elevador: andar, subir, descer, botão, prédio
Supermercado: comprar, carrinho, compras, caixa, mercado
Padaria: pão, padeiro, manhã, café, forno
Barbeiro: cabelo, barba, cortar, tesoura, navalha
Sorveteria: sorvete, gelado, casquinha, sabor, picolé
Salão de beleza: cabelo, cortar, unha, cabeleireira, tintura
Feijoada: feijão, preto, sábado, carne, linguiça
Coxinha: frango, salgado, massa, frito, festa
Brigadeiro: chocolate, doce, festa, leite condensado, bolinha
Hambúrguer: pão, carne, lanche, queijo, fast food
Cachorro-quente: salsicha, pão, lanche, molho, rua
Açaí: roxo, fruta, tigela, granola, Amazônia
Tapioca: goma, mandioca, recheio, coco, nordeste
Pudim: doce, caramelo, leite condensado, sobremesa, flan
Macarrão: massa, espaguete, molho, italiano, panela
Miojo: macarrão, instantâneo, temperinho, água quente, pacote
Bolo: aniversário, forno, massa, fatia, confeitaria
Pão de açúcar: bondinho, Rio de Janeiro, morro, ponto turístico, cartão-postal
Cristo Redentor: Rio de Janeiro, braços, estátua, corcovado, monumento
Amazônia: floresta, rio, norte, árvore, selva
Cataratas: água, queda, Foz do Iguaçu, cachoeira, Paraná
Sertão: seca, nordeste, calor, cacto, sol
Futebol americano: bola, touchdown, Estados Unidos, capacete, NFL
Basquete: cesta, bola, quadra, NBA, arremessar
Vôlei: rede, bola, saque, quadra, cortada
Natação: piscina, água, nadar, nadador, braçada
Boxe: luta, soco, ringue, luva, nocaute
Skate: rodinha, manobra, prancha, rampa, pista
Surfe: onda, prancha, mar, praia, surfista
Bicicleta: pedal, roda, pedalar, guidão, ciclista
Moto: motoqueiro, capacete, duas rodas, motor, acelerar
Carro: dirigir, motor, volante, quatro rodas, automóvel
Trânsito: carro, engarrafamento, semáforo, rua, parado
Semáforo: vermelho, verde, amarelo, trânsito, farol
Multa: trânsito, pagar, guarda, infração, radar
Motorista: dirigir, carro, ônibus, volante, Uber
Táxi: carro, corrida, taxímetro, passageiro, amarelo
Trem: trilho, estação, vagão, locomotiva, metrô
Metrô: trem, estação, subterrâneo, bilhete, linha
Helicóptero: hélice, voar, asa, heliponto, aeronave
Foguete: espaço, lançamento, astronauta, NASA, Lua
Astronauta: espaço, nave, Lua, NASA, foguete
Sol: calor, dia, estrela, luz, céu
Estrela: céu, noite, brilhar, astro, constelação
Raio: trovão, chuva, tempestade, céu, relâmpago
Vento: ar, soprar, brisa, ventania, folha
Neve: frio, branco, gelo, boneco, inverno
Gelo: frio, água, congelar, cubo, gelado
Fogo: queimar, chama, quente, bombeiro, fogueira
Vulcão: lava, erupção, montanha, cratera, fogo
Tsunami: onda, mar, gigante, desastre, Japão
Floresta: árvore, mato, selva, animais, verde
Deserto: areia, calor, camelo, seco, oásis
Ilha: mar, cercada, praia, água, deserta
Rio: água, correr, ponte, peixe, margem
Lago: água, peixe, pescar, barco, represa
Cachoeira: água, queda, rio, banho, trilha
Montanha: alta, subir, escalar, pico, neve
Caverna: gruta, escura, morcego, pedra, entrada
Ponte: rio, atravessar, passar, carro, estrutura
Castelo: rei, rainha, príncipe, torre, medieval
Rei: coroa, rainha, reino, trono, majestade
Princesa: príncipe, castelo, conto de fadas, coroa, vestido
Bruxa: vassoura, feitiço, chapéu, magia, caldeirão
Mágico: mágica, truque, cartola, coelho, show
Dragão: fogo, asa, medieval, cavaleiro, réptil
Cowboy: cavalo, chapéu, faroeste, pistola, Texas
Ninja: Japão, luta, preto, escondido, espada
Robô: máquina, metal, tecnologia, inteligência artificial, andróide
Extraterrestre: alienígena, espaço, nave, ET, planeta
Super-herói: poder, capa, salvar, vilão, máscara
Batman: morcego, Gotham, Coringa, máscara, herói
Homem-Aranha: teia, aranha, Nova York, herói, máscara
Harry Potter: bruxo, varinha, Hogwarts, cicatriz, óculos
Chaves: Vila, barril, México, Quico, Seu Madruga
Bob Esponja: fundo do mar, amarelo, Lula Molusco, hambúrguer, Patrick
Pikachu: Pokémon, amarelo, elétrico, rato, Ash
Super Mario: encanador, bigode, Luigi, vídeo game, Nintendo
Videogame: jogar, console, controle, tela, Playstation
Computador: teclado, mouse, tela, internet, notebook
Internet: rede, Wi-Fi, navegar, site, conectar
Wi-Fi: internet, senha, roteador, sinal, conectar
Senha: acesso, login, segredo, esquecer, conta
Redes sociais: Instagram, curtir, seguidor, post, internet
Influencer: seguidores, Instagram, publi, celebridade, rede social
Youtuber: vídeo, canal, inscrever, internet, gravar
TikTok: vídeo, dança, rede social, curto, algoritmo
Foto: câmera, imagem, tirar, selfie, retrato
Câmera: foto, filmar, lente, imagem, gravar
Música: som, cantar, ouvir, canção, instrumento
Violão: corda, instrumento, tocar, música, acordes
Guitarra: corda, rock, elétrica, banda, tocar
Bateria: instrumento, baquetas, tambor, banda, tocar
Piano: teclas, instrumento, tocar, música, preto e branco
Cantor: música, cantar, show, voz, microfone
Sertanejo: música, Goiás, violão, boteco, modão
Funk: baile, música, favela, batida, dançar
Samba: Carnaval, escola, ritmo, pandeiro, Rio de Janeiro
Forró: nordeste, sanfona, festa junina, dança, zabumba
Festa junina: quadrilha, fogueira, caipira, junho, milho
Páscoa: ovo, coelho, chocolate, domingo, ressurreição
Réveillon: ano novo, fogos, virada, champanhe, branco
Halloween: abóbora, fantasia, doce ou travessura, bruxa, terror
Fogos de artifício: explosão, céu, ano novo, barulho, luz
Presente: embrulho, aniversário, ganhar, dar, laço
Beijo: boca, lábios, namorado, amor, selinho
Namorado: amor, casal, namorar, relacionamento, par
Ficante: namorar, relacionamento, beijar, casual, sair
Divórcio: casamento, separar, advogado, ex, acabar
Sogra: mãe, marido, nora, genro, casamento
Padrinho: casamento, batizado, afilhado, igreja, escolha
Bêbado: bebida, álcool, cambalear, cachaça, tropeçar
Cachaça: bebida, álcool, Brasil, cana, pinga
Caipirinha: limão, cachaça, açúcar, gelo, drink
Vinho: uva, taça, tinto, garrafa, bebida
Whisky: bebida, destilada, gelo, escocês, copo
Champanhe: espumante, brinde, festa, rolha, borbulhas
Bar: bebida, cerveja, garçom, mesa, boteco
Garçom: restaurante, bandeja, pedido, servir, mesa
Restaurante: comida, garçom, cardápio, mesa, almoço
Cozinheiro: cozinha, comida, chef, panela, fogão
Fogão: cozinha, panela, fogo, cozinhar, gás
Panela: cozinha, fogão, tampa, cabo, cozinhar
Faca: cortar, afiada, cozinha, talher, lâmina
Colher: talher, sopa, mexer, comer, cabo
Garfo: talher, comer, ponta, prato, espetar
Prato: comida, louça, comer, mesa, talher
Copo: beber, vidro, água, taça, plástico
Garrafa: vidro, bebida, rolha, água, líquido
Sabonete: banho, espuma, limpar, cheiro, pia
Shampoo: cabelo, lavar, espuma, banho, condicionador
Escova de dentes: pasta, dente, boca, escovar, cerdas
Perfume: cheiro, borrifar, fragrância, frasco, aroma
Maquiagem: batom, rosto, pintar, base, rímel
Óculos: lente, ver, armação, sol, grau
Relógio: horas, pulso, ponteiro, tempo, alarme
Chapéu: cabeça, aba, sol, usar, cowboy
Sapato: pé, calçar, salto, cadarço, calçado
Meia: pé, calçar, par, tecido, sapato
Camiseta: roupa, manga, algodão, estampa, vestir
Cama: dormir, colchão, travesseiro, lençol, quarto
Travesseiro: cabeça, cama, dormir, almofada, fronha
Sonho: dormir, noite, pesadelo, cama, imaginação
Pesadelo: sonho, medo, dormir, monstro, noite
Insônia: dormir, noite, acordado, sono, cama
Preguiça: moleza, cansaço, sofá, fazer, animal
Cansaço: exausto, sono, esgotado, descansar, trabalhar
Fome: comer, vazio, barriga, estômago, almoço
Sede: beber, água, seca, garganta, calor
Dor de barriga: banheiro, estômago, cólica, remédio, diarreia
Espirro: nariz, atchim, gripe, alergia, ar
Gripe: resfriado, febre, nariz, tosse, doença
Febre: temperatura, doença, termômetro, quente, gripe
Remédio: farmácia, doença, comprimido, tomar, médico
Vacina: injeção, agulha, proteger, vírus, imunizar
Máscara: rosto, proteger, esconder, carnaval, covid
Dentadura: dente, vovô, boca, falso, idoso
Careca: cabelo, cabeça, calvície, pelado, calvo
Barriga: estômago, cerveja, gordo, abdômen, pança
Pé: chulé, sapato, dedo, andar, chinelo
Mão: dedo, palma, braço, cumprimentar, luva
Dedo: mão, anel, unha, apontar, polegar
Língua: boca, falar, saliva, gosto, lamber
Nariz: cheiro, respirar, cara, narina, espirro
Olho: ver, visão, cílios, pupila, cegueira
Orelha: ouvir, brinco, cabeça, ouvido, lado
Cabelo: fio, pente, cabeleireiro, cortar, cabeça
Coração: bater, sangue, amor, órgão, peito
Cérebro: pensar, cabeça, inteligência, mente, órgão
Esqueleto: osso, morto, caveira, corpo, Halloween
Múmia: Egito, faixa, morto, pirâmide, sarcófago
Pirâmide: Egito, faraó, deserto, múmia, triângulo
Dinossauro: extinto, réptil, gigante, T-Rex, fóssil
Tubarão: mar, dente, peixe, nadadeira, ataque
Baleia: mar, gigante, mamífero, jorrar, azul
Golfinho: mar, mamífero, inteligente, nadar, Flipper
Pinguim: gelo, frio, Antártida, preto e branco, ave
Macaco: banana, árvore, primata, pular, bicho
Elefante: tromba, grande, orelha, África, bicho
Girafa: pescoço, alta, África, manchas, bicho
Leão: rei da selva, juba, felino, rugir, selva
Urso: pelo, mel, floresta, hibernar, grande
Cobra: veneno, rastejar, réptil, picada, serpente
Aranha: teia, oito, inseto, veneno, pata
Abelha: mel, ferrão, zumbido, colmeia, flor
Formiga: formigueiro, inseto, pequena, trabalhar, rainha
Borboleta: asa, inseto, lagarta, colorida, voar
Pássaro: voar, asa, ninho, ave, bico
Papagaio: falar, ave, verde, colorido, repetir
Porco: bacon, lama, chiqueiro, rosa, bicho
Vaca: leite, boi, pasto, mugir, fazenda
Cavalo: montar, galope, crina, fazenda, bicho
Rato: queijo, roedor, gato, esgoto, bicho
Peixe: nadar, mar, água, anzol, escama
Aquário: peixe, água, vidro, animais, mar
Pescaria: peixe, anzol, vara, rio, isca
`;

export default raw.trim().split('\n').map((line) => {
  const [word, rest] = line.split(':');
  return { word: word.trim(), taboo: rest.split(',').map((s) => s.trim()) };
});
