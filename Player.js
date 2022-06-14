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
let skeletonTime = 150;// Para iniciar o jogo logo com um Skeleton
let skeletonLimit = 0;
let skeletonSpawnTime = 150;
let skeletonsNumber = 1;
let skeletons = [];

// Minotaur
let minotaurTime = 400;// Para iniciar o jogo logo com um Minotaur
let minotaurLimit = 0;
let minotaurSpawnTime = 400;
let minotaursNumber = 1;
let minotaurs = [];

// Boss
let bossTime = false;
let deadBoss = false;
let deleteBoss = false;


// Fps
const fps = 10;
const timeBetweenUpdateDraw = 1000 / fps;
let acumulatedTimeBetweenFrames = 0;
let timeLastFrame;

// Colisões
let enemyCollision = false;
let fighterTime = true;

// Vidas
let livesFighter;
let livesBoss;

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

// Objeto para guardar o estado das teclas associadas ao movimento do Player e do Enemy (se as teclas estão a ser pressionadas ou não)
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    s:{
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
class Player extends AnimatedSprite{
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
    draw(){
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
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
    update() {
        super.update();
        this.draw();

        this.attackBox.position.x = this.position.x - (this.attackBox.offset.x);
        //this.attackBox.position.y = this.position.y;
        this.attackBox.position.y = this.position.y - (this.attackBox.offset.y);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
            // Para ajustar a posição do Player ao iniciar o jogo
            if(this.position.y >= this.groundHeight){
                this.velocity.y = 0;
            }
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

}

// Classe do Lutador
class Fighter extends Player{
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
            width: 40,
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

//----------------------------------------------Enemies (Boss)----------------------------------------------------------

// Classe dos Inimigos
class Enemy extends Player{
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
class Boss extends Enemy{
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
    }

    attack() {
        super.attack();
    }
}

//-------------------------------------Enemies (Esqueletos e Minotauros)------------------------------------------------

// Classe do Base Enemy
// Objetivo: Criar classes para todos os Enemies (esqueletos e minotauros) do jogo a partir desta classe
class baseEnemy {
    constructor(imageSrc, position, velocity, width, height, offset, speed, framesMax = 1) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.lastKey;
        this.isAttacking;
        this.groundHeight = canvas.height - 271;
        this.speed = speed;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
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

    draw(){
        ctx.drawImage(this.image, this.framesCurrent * (this.image.width / this.framesMax), 0, this.image.width / this.framesMax, this.image.height, this.position.x, this.position.y, this.width, this.height);
        ctx.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        ctx.strokeStyle = "blue";
    }

    update(){
        this.draw();
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++;
            }else{
                this.framesCurrent = 0;
            }
        }

        this.attackBox.position.x = this.position.x - (this.attackBox.offset.x);
        //this.attackBox.position.y = this.position.y;
        this.attackBox.position.y = this.position.y - (this.attackBox.offset.y);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
            // Para ajustar a posição do Enemy ao iniciar o jogo
            if(this.position.y >= this.groundHeight){
                this.velocity.y = 0;
            }
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
// Classe do Skeleton
class Skeleton extends baseEnemy{
    constructor(imageSrc, position, velocity, width, height, offset, speed, framesMax = 1) {
        super(imageSrc, position, velocity, width, height, offset, speed, framesMax = 1);
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.lastKey;
        this.isAttacking;
        this.groundHeight = canvas.height - 271;
        this.speed = speed;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 30,
            height: 50
        }
    }

    draw() {
        super.draw();
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeStyle = "red";
    }

    update() {
        super.update();
        this.position.x -= this.speed;
    }

    attack() {
        super.attack();
    }
}

// Classe do Minotaur
class Minotaur extends baseEnemy{
    constructor(imageSrc, position, velocity, width, height, offset, speed, framesMax = 1) {
        super(imageSrc, position, velocity, width, height, offset, speed, framesMax = 1);
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.lastKey;
        this.isAttacking;
        this.groundHeight = canvas.height;
        this.speed = speed;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 30,
            height: 50
        }
    }

    draw() {
        super.draw();
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeStyle = "red";
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

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }
}

//-------------------------------------------------------Vidas----------------------------------------------------------

//Classe das Vidas
class Lives extends Sprite {
    constructor(position, width, height, lives) {
        super(position, width, height);
        this.position = position;
        this.width = width;
        this.height = height;
        this.lives = lives;
    }

    draw() {
        //Número de vidas que o lutador irá ter
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(this.constructor.imagem, this.width * i + 20, this.position.y, this.width, this.height); //width da imagem * o número de vidas + o espaçamento que queremos dar left margin esquerda
        }

    }

    update() {
        super.update();
        this.draw();
    }
}
// Classe das Vidas do Fighter
class fighterLives extends Lives{
    constructor(position, width, height, lives) {
        super(position, width, height, lives);
        this.position = position;
        this.width = width;
        this.height = height;
        this.lives = lives;
    }

    draw() {
        super.draw();
    }

    update() {
        super.update();
    }
}

// Classe das Vidas do Boss
class bossLives extends Lives{
    constructor(position, width, height, lives) {
        super(position, width, height, lives);
        this.position = position;
        this.width = width;
        this.height = height;
        this.lives = lives;
    }

    draw() {
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(this.constructor.imagem, (canvas.width -20) - (this.width * i + 20), this.position.y, this.width, this.height); //(largura do canvas -20) - (width da imagem * o número de vidas + o espaçamento que queremos dar left margin esquerda)
        }
    }

    update() {
        super.update();
    }
}

//**********************************************************************************************************************
//------------------------------------------------Assets a Carregar-----------------------------------------------------
//**********************************************************************************************************************

Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6); //frames e frames por linha
Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
fighterLives.load("./assets/pixel_heart.png");
bossLives.load("./assets/pixel_heart.png");

//**********************************************************************************************************************
//----------------------------------------------------Eventos-----------------------------------------------------------
//**********************************************************************************************************************

window.addEventListener("assetLoad", (e) => {
    console.log("Asset Loaded", e.detail);

    numAssetsLoaded++;

    if(numAssetsLoaded == numAssets){
        startGame();
    }
});

// Evento para quando as teclas do teclado são pressionadas
// Objetivo: Fornecer movimento ao Fighter
window.addEventListener('keydown', (event) => {
    switch(event.key){
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
            if(fighterTime){
                Fighter.load("./assets/Player1/NewHero_Attack.png", 7, 7);
                fighterTime = false;
                fighter.attack();
            }
            //Para que o Fighter tenha que esperar 500ms para poder efetuar o ataque novamente
            setTimeout(()=>{
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
    switch(event.key){
        // Movimento do Player
        case 'd':
            keys.d.pressed = false;
            Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            break;
        case 's':
            break;
        case 'w':
            keys.w.pressed = false;
            /*
            setTimeout(() => {
                Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            }, 500);

             */
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
function rectangleCollision(rectangle1, rectangle2){
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}

// Função que recebe dois parâmetros (cada parâmetro está associado a um retângulo) e que verifica a colisão entre esses dois parâmetros
// Sem AttackBox
function retangleCollision1(rectangle1, rectangle2){
    return (rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
        rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
        rectangle1.position.y < rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height > rectangle2.position.y);
}

// Função para gerar um número aleatório entre 2 valores
function randomNumberGenerator(min, max){
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Função para gerar esqueletos
function spawnSkeleton(){
    //skeletonLimit < randomNumberGenerator(20, 40)
    if (skeletonLimit < skeletonsNumber){
        if(skeletonTime > skeletonSpawnTime){
            //skeletons.push(new Skeleton({x: canvas.width + 100, y: 0}, {x: 0, y: 0}, 150, 200, {x:50, y:0}, randomNumberGenerator(1,3)));
            skeletons.push(new Skeleton("./assets/SkeletonSS/SkeletonWalk.png",{x: canvas.width + 50, y: 0}, { x: 0, y: 0}, 150, 200, {x: -110, y: -65}, randomNumberGenerator(1,3), 6));
            skeletonLimit++;
            skeletonTime = 0;
        }
    }
}

// Função para gerar minotauros
function spawnMinotaur(){
    //minotaurLimit < randomNumberGenerator(20, 40)
    if (minotaurLimit < minotaursNumber){
        if(minotaurTime > minotaurSpawnTime){
            //minotaurs.push(new Minotaur({x: canvas.width + 100, y: 0}, {x: 0, y: 0}, 150, 200, {x:50, y:0}, randomNumberGenerator(1,3)));
            minotaurs.push(new Minotaur("./assets/Minotauro/New_RunMino.png",{x: canvas.width + 350, y: 0}, { x: 0, y: 0}, 150, 200, {x: -110, y: -40}, randomNumberGenerator(1,3), 8));
            minotaurLimit++;
            minotaurTime = 0;
        }
    }
}

// Função para remover os objetos do jogo quando estes saem do campo de jogo
// Apenas utilizado no lado esquerdo do jogo, pois os inimigos são gerados no lado direito fora do campo de jogo
function outGame(objects){
    objects.forEach((object, objectIndex) => {
        if(object.position.x < 0 - object.width){
                objects.splice(objectIndex, 1);
        }
    });
}

// Função para gerar o Boss
function spawnBoss(){
    // Para que o Boss só seja criado uma vez
    if(bossTime == false){
        // As vidas do Boss só aparecem quando este for gerado
        livesBoss = new bossLives({x: 400, y: 30}, 30, 25, 6);
        boss = new Boss({x: 400, y: 0}, { x: 0, y: 0}, 250, 300, {x: -130, y:-100}, 0);
        bossTime = true;
    }
}

// Função para escrever o texto das vidas do Fighter
function fighterLivesText(){
    ctx.font =  "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Fighter Lives:", 20, 22);
}

// Função para escrever o texto das vidas do Boss
function bossLivesText(){
    ctx.font =  "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Boss Lives:", 810, 22);
}

// Função de Fim do Jogo
function gameOver(){
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText('You Lost All Your Lives!', canvas.width / 2 - 210, canvas.height / 2 - 70);
}

// Função para quando o Fighter ganha o jogo
function gameWin(){
    ctx.fillStyle = "white";
    ctx.font = "40px Helvetica";
    ctx.fillText('You Won the Game!', canvas.width / 2 - 185, canvas.height / 2 - 85);
    ctx.font = "30px Helvetica";
    ctx.fillText("You have shown no mercy towards the DEMON!!", canvas.width / 2 - 330, canvas.height / 2 - 40);
}

//**********************************************************************************************************************
//----------------------------------------------Inicialização do Jogo---------------------------------------------------
//**********************************************************************************************************************

function startGame(){
    // Backgrounds
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

    // Lutador
    fighter = new Fighter({x: 300, y: 100}, { x: 0, y: 0}, 150, 200, {x: 0, y: -40});

    // Vidas
    livesFighter = new fighterLives({x: 25, y: 30}, 30, 25, 5);

    backgroundLayer1.draw();
    fighter.draw();
    livesFighter.draw();

    timeLastFrame = performance.now();
    animate(performance.now());
}

//**********************************************************************************************************************
//---------------------------------------------------Animate------------------------------------------------------------
//**********************************************************************************************************************

function animate(time){
    requestAnimationFrame(animate);

    acumulatedTimeBetweenFrames += time - timeLastFrame;
    timeLastFrame = time;

    if(acumulatedTimeBetweenFrames > timeBetweenUpdateDraw){
        ctx.clearRect(0,0, canvas.width, canvas.height);

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

        fighter.update();

        fighterLivesText();

        livesFighter.update();

        // Geração dos inimigos
        spawnSkeleton();
        spawnMinotaur();

        skeletons.forEach(skeleton => {
            skeleton.update();
        });

        minotaurs.forEach(minotaur => {
            minotaur.update();
        });

        // Remoção dos inimigos que saem do campo de jogo
        outGame(skeletons);
        outGame(minotaurs);

        console.log("Tamanho do array dos esqueletos: " + skeletons.length);
        console.log("Tamanho do array dos minotauros: " + minotaurs.length);



        // Assim que todos os inimigos sejam eliminados, o Boss é gerado
        if(skeletons.length == 0 && minotaurs.length == 0 && skeletonLimit >= skeletonsNumber && minotaurLimit >= minotaursNumber && deleteBoss == false){
            spawnBoss();
            boss.update();
            boss.position.y = 140;
            // Só desenha o texto e as vidas do Boss se este não tiver sido morto
            if(deadBoss == false){
                bossLivesText();
                livesBoss.update();
            }
        }


        // Caso o Boss morra o Fighter ganha o Jogo
        if(deadBoss == true){
            gameWin();
            Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/05_demon_death.png", 22, 22);
            Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            setTimeout(() => {
                deleteBoss = true;
                bossTime = false;
                // Para deixar de mostrar o Boss
                boss = undefined;
            }, 3000);
        }

        // Para que o Fighter não esteja sempre em movimento
        fighter.velocity.x = 0;

        // Movimento do Fighter
        if(keys.a.pressed && fighter.lastKey === "a"){
            fighter.velocity.x = -5
            gameSpeed = 0;
            // Quando a condição é true, o background ganha movimento
            if(fighter.position.x < 100){
                gameSpeed = 1.5;
                // Quando o Fighter sair do campo de jogo, este deixa de ter movimento para a esquerda
                if(fighter.position.x < 0 - fighter.width){
                    fighter.velocity.x = 0;
                    gameSpeed = 0;
                }
            }
        } else if(keys.d.pressed && fighter.lastKey === "d"){
            fighter.velocity.x = 5
            gameSpeed = 0;
            // Quando a condição é true, o background ganha movimento
            if(fighter.position.x > 400){
                gameSpeed = 1.5;
            }
        }else{
            gameSpeed = 0;
        }

        //**************************************************************************************************************
        //----------------------------------------Deteção de Colisões---------------------------------------------------
        //**************************************************************************************************************

        //------------------------------------------Fighter vs Boss (e vice versa)---------------------------------------
        // A deteção de colisões entre o Fighter e o Boss (e vice versa), só é ativa assim que o Boss seja criado
        if(bossTime == true){
            // Deteção de colisão entre o Fighter e o Boss
            // O Fighter ataca e o Boss leva hit
            if(rectangleCollision(fighter, boss) && fighter.isAttacking && enemyCollision==false){
                Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/04_demon_take_hit.png", 5, 5);

                fighter.isAttacking = false;

                setTimeout(() => {
                    Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
                }, 500);

                livesBoss.lives--;

                if(bossTime == true && livesBoss.lives == 0){
                    Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/05_demon_death.png", 22, 22);
                    bossTime=false;
                    deadBoss = true;
                }

                console.log("Player Attack");
            }

            // Deteção de colisão entre o Boss e o Fighter
            // Objetivo: Quando o Boss chegar perto do Fighter, o Boss vai atacá-lo
            if(deadBoss == false){
                if(retangleCollision1(boss, fighter)){
                    //Para ativar o método attack do Boss
                    boss.attack();

                    enemyCollision=true;

                    // Ao ser ativo o método attack do Boss, este vai atribuir o valor de true ao atributo isAttacking pertencente ao Boss
                    // A condição é executada caso o atributo isAttacking pertencente ao Boss e a variável enemyCollision tenham como valor true
                    if(boss.isAttacking && enemyCollision){
                        // Utilizado setTimeout para resolver o problema: o Enemy começava a atacar antes de chegar perto do Player
                        setTimeout(() => {
                            Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/03_demon_cleave.png", 15, 15);
                            if(rectangleCollision(boss, fighter)){
                                // Para o tempo bater certo, isto é, para que quando a faca do Boss acertar no Fighter, este tenha a animação de ter sido atingido
                                setTimeout(() => {
                                    Fighter.load("./assets/Player1/NewHero_HitSword.png", 8, 8);
                                    // Dano no player
                                    // Tirar vida aqui
                                    livesFighter.lives--;
                                }, 650);
                            }
                            // Código repetido para que exista a animação do Fighter a acertar no Boss
                            if(rectangleCollision(fighter, boss) && fighter.isAttacking && enemyCollision==false){
                                Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/04_demon_take_hit.png", 5, 5);

                                fighter.isAttacking = false;

                                setTimeout(() => {
                                    Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
                                }, 500);

                                console.log("Player Attack");
                            }
                        }, 2500);

                        boss.isAttacking = false;

                        enemyCollision=false;
                    }
                } else {
                    // Assim que o Boss deixa de ficar perto do Player, o Boss volta ao estado idle
                    Boss.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
                    Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
                }
            }
        }

        //--------------------------------Fighter vs Enemies (esqueletos e minotauros)-----------------------------------

        // Deteção de colisão entre o Fighter e o Skeleton
        // O Fighter ataca e o Skeleton leva hit
        skeletons.forEach((skeleton, skeletonIndex) => {
            if(rectangleCollision(fighter, skeleton) && fighter.isAttacking && enemyCollision==false){
                //Skeleton.load("./assets/SkeletonSS/SkeletonDead.png", 4, 4);

                skeleton.velocity.x = 0;
                skeleton.framesMax = 4;
                skeleton.image.src = "./assets/SkeletonSS/SkeletonDead.png";

                setTimeout(() => {
                    // Para remover o skeleton do array skeletons
                    skeletons.splice(skeletonIndex, 1);
                },1000);

                fighter.isAttacking = false;

                console.log("Player Attack");
            }
        });

        // Deteção de colisão entre o Fighter e o Minotaur
        // O Fighter ataca e o Minotaur leva hit
        minotaurs.forEach((minotaur, minotaurIndex) => {
            if(rectangleCollision(fighter, minotaur) && fighter.isAttacking && enemyCollision==false){
                //Minotaur.load("./assets/Minotauro/Dead Mino.png", 6, 6);

                minotaur.velocity.x = 0;
                minotaur.framesMax = 6;
                minotaur.image.src = "./assets/Minotauro/New_DeadMino.png";

                setTimeout(() => {
                    // Para remover o minotaur do array minotaurs
                    minotaurs.splice(minotaurIndex, 1);
                },1000);

                fighter.isAttacking = false;

                console.log("Player Attack");
            }
        });

        //-------------------------------Enemies (esqueletos e minotauros) vs Fighter------------------------------------

        // Deteção de colisão entre o Skeleton e o Fighter
        // Objetivo: Quando o Skeleton chegar perto do Fighter, o Skeleton vai atacá-lo
        skeletons.forEach((skeleton, skeletonIndex) => {
            if(retangleCollision1(skeleton, fighter)){
                if(skeleton.position.x == fighter.position.x + 30) {
                    // Para parar de fornecer movimento ao Skeleton
                    skeleton.speed = 0;

                    //Para ativar o método attack do Skeleton
                    skeleton.attack();

                    enemyCollision=true;

                    // Ao ser ativo o método attack do Skeleton, este vai atribuir o valor de true ao atributo isAttacking pertencente ao Skeleton
                    // A condição é executada caso o atributo isAttacking pertencente ao Skeleton e a variável enemyCollision tenham como valor true
                    if(skeleton.isAttacking && enemyCollision){
                        // Utilizado setTimeout para resolver o problema: o Skeleton começava a atacar antes de chegar perto do Fighter
                        setTimeout(() => {
                            //Skeleton.load("./assets/SkeletonSS/SkeletonAttack.png", 8, 8);

                            skeleton.framesMax = 8;
                            skeleton.image.src = "./assets/SkeletonSS/SkeletonAttack.png";

                            if(rectangleCollision(skeleton, fighter)){
                                // Para o tempo bater certo, isto é, para que quando a espada do Skeleton acertar no Fighter, este tenha a animação de ter sido atingido
                                setTimeout(() => {
                                    Fighter.load("./assets/Player1/NewHero_HitSword.png", 8, 8);
                                    setTimeout(() => {
                                        Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
                                    },200);
                                    // Dano no player
                                    // Tirar vida aqui
                                }, 650);
                            }
                            // Código repetido para que exista a animação do Fighter a acertar no Skeleton
                            if(rectangleCollision(fighter, skeleton) && fighter.isAttacking && enemyCollision==false){
                                //Skeleton.load("./assets/SkeletonSS/SkeletonDead.png", 4, 4);

                                skeleton.velocity.x = 0;
                                skeleton.framesMax = 4;
                                skeleton.image.src = "./assets/SkeletonSS/SkeletonDead.png";

                                setTimeout(() => {
                                    // Para remover o skeleton do array skeletons
                                    skeletons.splice(skeletonIndex, 1);
                                },1000);

                                fighter.isAttacking = false;

                                console.log("Player Attack");
                            }
                        }, 1500);

                        skeleton.isAttacking = false;

                        enemyCollision=false;
                    }
                }
            } else {
                // Assim que o Skeleton deixa de ficar perto do Fighter, o Skeleton volta ao estado walk
                // Para fornecer movimento ao Skeleton
                skeleton.speed = 2;

                //Skeleton.load("./assets/SkeletonSS/SkeletonWalk.png", 6, 6);

                skeleton.framesMax = 6;
                skeleton.image.src = "./assets/SkeletonSS/SkeletonWalk.png";

                Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            }
        });

        // Deteção de colisão entre o Minotaur e o Fighter
        // Objetivo: Quando o Minotaur chegar perto do Fighter, o Minotaur vai atacá-lo
        minotaurs.forEach((minotaur, minotaurIndex) => {
            if(retangleCollision1(minotaur, fighter)){
                console.log("Passou");
                if(minotaur.position.x == (fighter.position.x + 30)) {
                    console.log("Colide");
                    // Para parar de fornecer movimento ao Minotaur
                    minotaur.speed = 0;

                    //Para ativar o método attack do Minotaur
                    minotaur.attack();

                    enemyCollision=true;

                    // Ao ser ativo o método attack do Minotaur, este vai atribuir o valor de true ao atributo isAttacking pertencente ao Minotaur
                    // A condição é executada caso o atributo isAttacking pertencente ao Minotaur e a variável enemyCollision tenham como valor true
                    if(minotaur.isAttacking && enemyCollision){
                        // Utilizado setTimeout para resolver o problema: o Minotaur começava a atacar antes de chegar perto do Fighter
                        setTimeout(() => {

                            minotaur.framesMax = 9;
                            minotaur.image.src = "./assets/Minotauro/New_AttackMino.png";

                            if(rectangleCollision(minotaur, fighter)){
                                // Para o tempo bater certo, isto é, para que quando o machado do Minotaur acertar no Fighter, este tenha a animação de ter sido atingido
                                setTimeout(() => {
                                    Fighter.load("./assets/Player1/NewHero_HitSword.png", 8, 8);
                                    setTimeout(() => {
                                        Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
                                    },200);
                                    // Dano no player
                                    // Tirar vida aqui
                                }, 650);
                            }
                            // Código repetido para que exista a animação do Fighter a acertar no Minotaur
                            if(rectangleCollision(fighter, minotaur) && fighter.isAttacking && enemyCollision==false){

                                minotaur.velocity.x = 0;
                                minotaur.framesMax = 6;
                                minotaur.image.src = "./assets/Minotauro/New_DeadMino.png";

                                setTimeout(() => {
                                    // Para remover o Minotaur do array minotaurs
                                    minotaurs.splice(minotaurIndex, 1);
                                },1000);

                                fighter.isAttacking = false;

                                console.log("Player Attack");
                            }
                        }, 1500);

                        minotaur.isAttacking = false;

                        enemyCollision=false;
                    }
                }
            } else {
                // Assim que o Minotaur deixa de ficar perto do Fighter, o Minotaur volta ao estado run
                // Para fornecer movimento ao Minotaur
                minotaur.speed = 2;

                minotaur.framesMax = 8;
                minotaur.image.src = "./assets/Minotauro/New_RunMino.png";

                Fighter.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            }
        });

        acumulatedTimeBetweenFrames = 0;
    }
}