# AM_GAME_BJP
Trabalho Aplicações Multimédia 2º ano, 2022


Trabalho Realizado por: Bernardo Gaudêncio, João Pedro Santos e Pedro Silvestre



06/06/2022:

Alterações feitas no ficheiro gameObjects.js:
-os atributos x e y foram incluídos como propriedades num objeto position.

Alterações feitas no ficheiro Player.js:
-os atributos x e y foram incluídos como propriedades num objeto position, tal como foi criado um objeto velocity contendo as propriedades x e y.
-adição de um objeto offset com as propriedades x e y.
-resolvido o problema na caixa de ataque.
-adição de movimento ao enemy.
-adição de deteção de colisões entre 2 retângulos.


08/06/2022:

Criação do efeito parallax no background


09/06/2022:

Implementação dos sprites, dos seus estados, e das suas respetivas colisões.
Aperfeiçoamento e organização de partes do código.

13/06/2022:

Organização do código e respetivas modificações necessárias:
-Criação da classe Fighter.
-Criação da classe Skeleton.
-Criação da classe Minotaur.

Adição de um novo atributo denominado speed à classe Enemy.

Adição de novas variáveis, tanto para a sua utilização nas funções de gerar inimigos como para a deteção de colisões.

Função para gerar um número aleatório entre 2 valores.
Funções para gerar os inimigos (uma para os esqueletos e outra para os minotauros).
Função para remover os objetos do jogo quando estes saem do campo de jogo.

Deteção de colisões entre o player e o boss, e vice versa.
Deteção de colisões entre o player e o skeleton, e vice versa (ainda por melhorar).
Deteção de colisões entre o player e o minotaur.