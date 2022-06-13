// Gravidade do Jogo
const gravity = 0.7;

// Velocidade do Jogo
let gameSpeed = 1.5;

// Assets
const numAssets = 4;
let numAssetsLoaded = 0;

let fighter;
let boss;

// Enemies
// Skeleton
let skeletonTime = 0;
let skeletonLimit = 0;
let skeletonSpawnTime = 150;
let skeletons = [];

// Minotaur
let minotaurTime = 0;
let minotaurLimit = 0;
let minotaurSpawnTime = 400;
let minotaurs = [];


// Fps
const fps = 10;
const timeBetweenUpdateDraw = 1000 / fps;
let acumulatedTimeBetweenFrames = 0;
let timeLastFrame;

// Colisões
let enemyCollision = false;
let fighterTime = true;

// Background Layers
let layer1 = new Image();
layer1.src = "./assets/DarkForest/Layer_1.png";
let layer2 = new Image();
layer2.src = "./assets/DarkForest/Layer_2.png";
let layer3 = new Image();
layer3.src = "./assets/DarkForest/Layer_3.png";
let layer4 = new Image();
layer4.src = "./assets/DarkForest/Layer_4.png";
let layer5 = new Image();
layer5.src = "./assets/DarkForest/Layer_5.png";
let layer6 = new Image();
layer6.src = "./assets/DarkForest/Layer_6.png";
let layer7 = new Image();
layer7.src = "./assets/DarkForest/Layer_7.png";
let layer8 = new Image();
layer8.src = "./assets/DarkForest/Layer_8.png";
let layer9 = new Image();
layer9.src = "./assets/DarkForest/Layer_9.png";
let layer10 = new Image();
layer10.src = "./assets/DarkForest/Layer_10.png";
let layer11 = new Image();
layer11.src = "./assets/DarkForest/Layer_11.png";
let layer12 = new Image();
layer12.src = "./assets/DarkForest/Layer_12.png";

let backgroundLayer1;
let backgroundLayer2;
let backgroundLayer3;
let backgroundLayer4;
let backgroundLayer5;
let backgroundLayer6;
let backgroundLayer7;
let backgroundLayer8;
let backgroundLayer9;
let backgroundLayer10;
let backgroundLayer11;
let backgroundLayer12;

//Vidas
let livesImage;

// Objeto para guardar o estado das teclas associadas ao movimento do Player e do Enemy (se as teclas estão a ser pressionadas ou não)
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  s: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

//**********************************************************************************************************************
//-----------------------------------------------------Classes----------------------------------------------------------
//**********************************************************************************************************************

// Classe do Player Base
//Objetivo: Criar classes para todos os Players do jogo a partir desta classe
class Player extends AnimatedSprite {
  constructor(position, velocity, width, height, offset) {
    super(position, width, height)
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.lastKey;
    this.isAttacking;
    this.groundHeight = canvas.height - 230;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
  }
  draw() {
    super.draw();
    // Desenho do Player e do Enemy
    /*
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

     */

    // Desenho da AttackBox
    /*
    if(this.isAttacking){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }

     */
  }
  update() {
    super.update();
    this.draw();

/*tentativa de fazer o fighter não andar para a esquerda

    if((this.position.x <= 95) && keys.a.pressed && fighter.lastKey === "a") {
      this.velocity.x === 0;
    }*/


    this.attackBox.position.x = this.position.x - (this.attackBox.offset.x);
    //this.attackBox.position.y = this.position.y;
    this.attackBox.position.y = this.position.y - (this.attackBox.offset.y);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;


    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
      // Para ajustar a posição do Player ao iniciar o jogo
      if (this.position.y >= this.groundHeight) {
        this.velocity.y = 0;
      }
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

//Classe Lives
class Lives extends Sprite {
  constructor(position, width, height, lives) {
    super(position, width, height);
    this.position = position;
    this.width = width;
    this.height = height;
    this.lives = 10;
  }
  draw() {
    //super.draw();

    //Número de vidas que o lutador irá ter
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(this.constructor.imagem, 25 * i + 20, 30, 30, 25); //width da imagem * o numero de vidas + o espaçamento que queremos dar left margin esquerda
    }

  }
  update() {
    super.update();
  }
}

// Classe do Lutador
class Fighter extends Player {
  constructor(position, velocity, width, height, offset) {
    super(position, velocity, width, height, offset);
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.lastKey;
    this.isAttacking;
    this.groundHeight = canvas.height - 230;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }

  attack() {
    super.attack();
  }
}

//----------------------------------------------Enemies-----------------------------------------------------------------

// Classe dos Inimigos
// Objetivo: Criar outras classes de cada Inimigo a partir desta classe
class Enemy extends Player {
  constructor(position, velocity, width, height, offset, speed) {
    super(position, velocity, width, height, offset);
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.lastKey;
    this.isAttacking;
    this.groundHeight = canvas.height - 360;
    this.speed = speed;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }

  attack() {
    super.attack();
  }
}

// Classe do Boss
class Boss extends Enemy {
  constructor(position, velocity, width, height, offset, speed) {
    super(position, velocity, width, height, offset, speed);
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.lastKey;
    this.isAttacking;
    this.groundHeight = canvas.height - 360;
    this.speed = speed;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 15,
      height: 50
    }
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
    //this.position.x -= 2;
  }

  attack() {
    super.attack();
  }
}

// Classe do Esqueleto
class Skeleton extends Enemy {
  constructor(position, velocity, width, height, offset, speed) {
    super(position, velocity, width, height, offset, speed);
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.lastKey;
    this.isAttacking;
    this.groundHeight = canvas.height - 272;
    this.speed = speed;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
    this.position.x -= this.speed;
  }

  attack() {
    super.attack();
  }
}

// Classe do Minotauro
class Minotaur extends Enemy {
  constructor(position, velocity, width, height, offset, speed) {
    super(position, velocity, width, height, offset, speed);
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.lastKey;
    this.isAttacking;
    this.groundHeight = canvas.height - 50;
    this.speed = speed;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
    this.position.x -= this.speed;
  }

  attack() {
    super.attack();
  }
}

//------------------------------------------------Background------------------------------------------------------------
// Classe do Background
class Background {
  constructor(image, x, y, width, height, speedModifier) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = this.x - this.speed;


  }
}

//**********************************************************************************************************************
//------------------------------------------------Assets a Carregar-----------------------------------------------------
//**********************************************************************************************************************

Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6); //frames e frames por linha
Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
Skeleton.load("./assets/SkeletonSS/SkeletonWalk.png", 6, 6);
Minotaur.load("./assets/Minotauro/Run Mino.png", 8, 8);
Lives.load("./assets/pixel_heart.png");
//**********************************************************************************************************************
//----------------------------------------------------Eventos-----------------------------------------------------------
//**********************************************************************************************************************

window.addEventListener("assetLoad", (e) => {
  console.log("Asset Loaded", e.detail);

  numAssetsLoaded++;

  if (numAssetsLoaded == numAssets) {
    startGame();
  }
});

// Evento para quando as teclas do teclado são pressionadas
// Objetivo: Fornecer movimento ao Fighter
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    // Movimento do Player
    case 'd':
      Fighter.load("./assets/Player1/NewHero_Run.png", 12, 12);
      keys.d.pressed = true;
      fighter.lastKey = "d";
      break;
    case 'w':
      fighter.velocity.y = -6;
      Fighter.load("./assets/Player1/NewHero_Jump.png", 14, 14);
      break;
    case 's':
      break;
    case 'a':
      Fighter.load("./assets/Player1/NewHero_Run.png", 12, 12);
      keys.a.pressed = true;
      fighter.lastKey = "a";
      break;
    case ' ':
      if (fighterTime) {
        Fighter.load("./assets/Player1/NewHero_Attack.png", 7, 7);
        fighterTime = false;
        fighter.attack();
      }
      //Para que o Fighter tenha que esperar 500ms para poder efetuar o ataque novamente
      setTimeout(() => {
        fighterTime = true;
      }, 500);
      break;
    case 'Control':
      Fighter.load("./assets/Player1/NewHero_Shield.png", 2, 2);
      break;
  }
});

//Evento para quando as teclas do teclado são soltas
//Objetivo: Parar de fornecer movimento ao Fighter
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // Movimento do Player
    case 'd':
      keys.d.pressed = false;
      Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
      break;
    case 's':
      break;
    case 'w':
      keys.w.pressed = false;
      setTimeout(() => {
        Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
      }, 500);
      break;
    case 'a':
      keys.a.pressed = false;
      Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
      break;
    case ' ':
      setTimeout(() => {
        Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
      }, 500);
      break;
    case 'Control':
      setTimeout(() => {
        Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
      }, 100);
      break;
  }
});

//**********************************************************************************************************************
//-----------------------------------------------------Funções----------------------------------------------------------
//**********************************************************************************************************************

// Função que recebe dois parâmetros (cada parâmetro está associado a um retângulo) e que verifica a colisão entre esses dois parâmetros
// Com AttackBox
function rectangleCollision(rectangle1, rectangle2) {
  return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}

// Função que recebe dois parâmetros (cada parâmetro está associado a um retângulo) e que verifica a colisão entre esses dois parâmetros
// Sem AttackBox
function retangleCollision1(rectangle1, rectangle2) {
  return (rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.y < rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height > rectangle2.position.y);
}

// Função para gerar um número aleatório entre 2 valores
function randomNumberGenerator(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Função para gerar esqueletos
function spawnSkeleton() {
  if (skeletonLimit < randomNumberGenerator(20, 40)) {
    if (skeletonTime > skeletonSpawnTime) {
      skeletons.push(new Skeleton({
        x: canvas.width + 100,
        y: 0
      }, {
        x: 0,
        y: 0
      }, 150, 200, {
        x: 50,
        y: 0
      }, randomNumberGenerator(1, 3)));
      skeletonLimit++;
      skeletonTime = 0;
    }
  }
}

// Função para gerar minotauros
function spawnMinotaur() {
  if (minotaurLimit < randomNumberGenerator(20, 40)) {
    if (minotaurTime > minotaurSpawnTime) {
      minotaurs.push(new Minotaur({
        x: canvas.width + 100,
        y: 0
      }, {
        x: 0,
        y: 0
      }, 150, 200, {
        x: 50,
        y: 0
      }, randomNumberGenerator(1, 3)));
      minotaurLimit++;
      minotaurTime = 0;
    }
  }
}

// Função para remover os objetos do jogo quando estes saem do campo de jogo
// Apenas utilizado no lado esquerdo do jogo, pois os inimigos são gerados no lado direito fora do campo de jogo
function outGame(objects) {
  objects.forEach((object, objectIndex) => {
    if (object.position.x < 0 - object.width) {
      objects.splice(objectIndex, 1);
    }
  });
}

//**********************************************************************************************************************
//----------------------------------------------Inicialização do Jogo---------------------------------------------------
//**********************************************************************************************************************

function startGame() {
  backgroundLayer12 = new Background(layer12, 0, -200, 1000, 700, 0.2);
  backgroundLayer11 = new Background(layer11, 0, -200, 1000, 700, 0.4);
  backgroundLayer10 = new Background(layer10, 0, -210, 1000, 700, 0.6);
  backgroundLayer9 = new Background(layer9, 0, -210, 1000, 700, 0.8);
  backgroundLayer8 = new Background(layer8, 0, -300, 1000, 700, 1);
  backgroundLayer7 = new Background(layer7, 0, -210, 1000, 700, 1.2);
  backgroundLayer6 = new Background(layer6, 0, -210, 1000, 700, 1.4);
  backgroundLayer5 = new Background(layer5, 0, -300, 1000, 700, 1.6);
  backgroundLayer4 = new Background(layer4, 0, -210, 1000, 700, 1.8);
  backgroundLayer3 = new Background(layer3, 0, -190, 1000, 700, 2);
  backgroundLayer2 = new Background(layer2, 0, -210, 1000, 700, 2.2);
  backgroundLayer1 = new Background(layer1, 0, -200, 1000, 700, 2.4);

  fighter = new Fighter({
    x: 100,
    y: 100
  }, {
    x: 0,
    y: 0
  }, 150, 200, {
    x: 0,
    y: 0
  });
  boss = new Boss({
    x: 400,
    y: 0
  }, {
    x: 0,
    y: 0
  }, 250, 300, {
    x: -130,
    y: -100
  }, 0);

  backgroundLayer1.draw();
  fighter.draw();
  boss.draw();

  //Vidas
  livesImage = new Lives({
    x: 30,
    y: 20
  }, 30, 25, 5);

  //  livesImage.draw();

  timeLastFrame = performance.now();
  animate(performance.now());
}

//**********************************************************************************************************************
//---------------------------------------------------Animate------------------------------------------------------------
//**********************************************************************************************************************

function animate(time) {
  requestAnimationFrame(animate);

  acumulatedTimeBetweenFrames += time - timeLastFrame;
  timeLastFrame = time;

  if (acumulatedTimeBetweenFrames > timeBetweenUpdateDraw) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cada vez que a função animate é chamada, o valor do skeletonTime é incrementado
    skeletonTime++;
    //console.log(enemyTime);

    // Cada vez que a função animate é chamada, o valor do minotaurTime é incrementado
    minotaurTime++;

    // Background
    backgroundLayer12.update();
    backgroundLayer12.draw();

    backgroundLayer11.update();
    backgroundLayer11.draw();

    backgroundLayer10.update();
    backgroundLayer10.draw();

    backgroundLayer9.update();
    backgroundLayer9.draw();

    backgroundLayer8.update();
    backgroundLayer8.draw();

    backgroundLayer7.update();
    backgroundLayer7.draw();

    backgroundLayer6.update();
    backgroundLayer6.draw();

    backgroundLayer5.update();
    backgroundLayer5.draw();

    backgroundLayer4.update();
    backgroundLayer4.draw();

    backgroundLayer3.update();
    backgroundLayer3.draw();

    backgroundLayer2.update();
    backgroundLayer2.draw();

    backgroundLayer1.update();
    backgroundLayer1.draw();

    livesImage.update();
    livesImage.draw();

    fighter.update();

    boss.update();

    // Geração dos inimigos
    spawnSkeleton();
    spawnMinotaur();

    skeletons.forEach(skeleton => {
      skeleton.update();
    });

    minotaurs.forEach(minotaur => {
      minotaur.update();
    });

    outGame(skeletons);
    outGame(minotaurs);
    console.log("Tamanho do array dos esqueletos: " + skeletons.length);
    console.log("Tamanho do array dos minotauros: " + minotaurs.length);

    // Para que o player e o enemy não estejam sempre em movimento
    fighter.velocity.x = 0;
    boss.velocity.x = 0;

    // Movimento do Player
    if (keys.a.pressed && fighter.lastKey === "a") {
      fighter.velocity.x = -5
      gameSpeed = 0;
      // Quando a condição é true, o background ganha movimento
      if (fighter.position.x < 100) {
        gameSpeed = -1.5;
      }
    } else if (keys.d.pressed && fighter.lastKey === "d") {
      fighter.velocity.x = 5
      gameSpeed = 0;
      // Quando a condição é true, o background ganha movimento
      if (fighter.position.x > 400) {
        gameSpeed = 1.5;
      }
    } else {
      gameSpeed = 0;
    }

    //**************************************************************************************************************
    //----------------------------------------Deteção de Colisões---------------------------------------------------
    //**************************************************************************************************************

    //------------------------------------------Player vs Enemies---------------------------------------------------
    // Deteção de colisão entre o Fighter e o Boss
    // O Fighter ataca e o Boss leva hit
    if (rectangleCollision(fighter, boss) && fighter.isAttacking && enemyCollision == false) {
      Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/04_demon_take_hit.png", 5, 5);

      fighter.isAttacking = false;

      setTimeout(() => {
        Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
      }, 500);

      console.log("Player Attack");
    }

    // Deteção de colisão entre o Fighter e o Skeleton
    // O Fighter ataca e o Skeleton leva hit
    skeletons.forEach((skeleton, skeletonIndex) => {
      if (rectangleCollision(fighter, skeleton) && fighter.isAttacking && enemyCollision == false) {
        Skeleton.load("./assets/SkeletonSS/SkeletonDead.png", 4, 4);

        // Para remover o skeleton do array skeletons
        skeletons.splice(skeletonIndex, 1);

        fighter.isAttacking = false;

        console.log("Player Attack");
      }
    });

    // Deteção de colisão entre o Fighter e o Minotaur
    // O Fighter ataca e o Minotaur leva hit
    minotaurs.forEach((minotaur, minotaurIndex) => {
      if (rectangleCollision(fighter, minotaur) && fighter.isAttacking && enemyCollision == false) {
        Minotaur.load("./assets/Minotauro/Dead Mino.png", 6, 6);

        // Para remover o minotaur do array minotaurs
        minotaurs.splice(minotaurIndex, 1);

        fighter.isAttacking = false;

        console.log("Player Attack");
      }
    });

    //------------------------------------------Enemies vs Player---------------------------------------------------
    // Deteção de colisão entre o Boss e o Player
    // Objetivo: Quando o Boss chegar perto do Player, o Boss vais atacá-lo
    if (retangleCollision1(boss, fighter)) {
      //Para ativar o método attack do Boss
      boss.attack();

      enemyCollision = true;

      // Ao ser ativo o método attack do Boss, este vai atribuir o valor de true ao atributo isAttacking pertencente ao Boss
      // A condição é executada caso o atributo isAttacking pertencente ao Boss e a variável bossCollision tenham como valor true
      if (boss.isAttacking && enemyCollision) {
        // Utilizado setTimeout para resolver o problema: o Enemy começava a atacar antes de chegar perto do Player
        setTimeout(() => {
          Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/03_demon_cleave.png", 15, 15);
          if (rectangleCollision(boss, fighter)) {
            // Para o tempo bater certo, isto é, para que quando a faca do Boss acertar no Fighter, este tenha a animação de ter sido acertado
            setTimeout(() => {
              Fighter.load("./assets/Player1/NewHero_HitSword.png", 8, 8);
              // Dano no player
              // Tirar vida aqui
            }, 650);
          }
          // Código repetido para que exista a animação do Fighter a dar acertar no Boss
          if (rectangleCollision(fighter, boss) && fighter.isAttacking && enemyCollision == false) {
            Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/04_demon_take_hit.png", 5, 5);

            fighter.isAttacking = false;

            setTimeout(() => {
              Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
            }, 500);

            //bossCollision=true;

            console.log("Player Attack");
          }
        }, 2500);

        boss.isAttacking = false;

        enemyCollision = false;
      }
    } else {
      // Assim que o Boss deixa de ficar perto do Player, o Boss volta ao estado idle
      Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
      Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
    }

    // Deteção de colisão entre o Skeleton e o Player
    // Objetivo: Quando o Skeleton chegar perto do Player, o Skeleton vais atacá-lo
    skeletons.forEach(skeleton => {
      if (retangleCollision1(skeleton, fighter)) {
        skeleton.speed = 0;
        //Para ativar o método attack do Skeleton
        skeleton.attack();

        enemyCollision = true;

        // Ao ser ativo o método attack do Skeleton, este vai atribuir o valor de true ao atributo isAttacking pertencente ao Skeleton
        // A condição é executada caso o atributo isAttacking pertencente ao Skeleton e a variável bossCollision tenham como valor true
        if (skeleton.isAttacking && enemyCollision) {
          // Utilizado setTimeout para resolver o problema: o Skeleton começava a atacar antes de chegar perto do Fighter
          setTimeout(() => {
            Skeleton.load("./assets/SkeletonSS/SkeletonAttack.png", 8, 8);
            if (rectangleCollision(skeleton, fighter)) {
              // Para o tempo bater certo, isto é, para que quando a faca do Skeleton acertar no Fighter, este tenha a animação de ter sido acertado
              setTimeout(() => {
                Fighter.load("./assets/Player1/NewHero_HitSword.png", 8, 8);
                // Dano no player
                // Tirar vida aqui
              }, 650);
            }
            // Código repetido para que exista a animação do Fighter a dar acertar no Skeleton
            if (rectangleCollision(fighter, skeleton) && fighter.isAttacking && enemyCollision == false) {
              Skeleton.load("./assets/SkeletonSS/SkeletonDead.png", 4, 4);

              skeletons.splice(skeletonIndex, 1);

              fighter.isAttacking = false;

              fighterCollsion = true;

              console.log("Player Attack");
            }
          }, 2500);

          skeleton.isAttacking = false;

          enemyCollision = false;
        }
      } else {
        // Assim que o Skeleton deixa de ficar perto do Player, o Skeleton volta ao estado idle
        Skeleton.load("./assets/SkeletonSS/SkeletonWalk.png", 6, 6);
        Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
      }
    })

    acumulatedTimeBetweenFrames = 0;
  }
}
