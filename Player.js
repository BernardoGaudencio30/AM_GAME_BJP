// Gravidade do Jogo
const gravity = 0.7;

// Velocidade do Jogo
let gameSpeed = 1.5;

// Assets
const numAssets = 2;
let numAssetsLoaded = 0;

let player;
let enemy;

// Fps
const fps = 10;
const timeBetweenUpdateDraw = 1000 / fps;
let acumulatedTimeBetweenFrames = 0;
let timeLastFrame;

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

//----------------------------------------------------------------------------------------------------------------------
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
        if(this.isAttacking){
            ctx.fillStyle = "blue";
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }
    update() {
        super.update();
        this.draw();

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

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

class Enemy extends Player{
    constructor(position, velocity, width, height, offset) {
        super(position, velocity, width, height, offset);
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.lastKey;
        this.isAttacking;
        this.groundHeight = canvas.height - 360;
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
        //this.position.x -= 2;
    }
}

//-----------------------------------------------------------------------------------------------------------------------------
Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6); //frames e frames por linha
Enemy.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);

//-----------------------------------------------------------------------------------------------------------------------------
window.addEventListener("assetLoad", (e) => {
    console.log("Asset Loaded", e.detail);

    numAssetsLoaded++;

    if(numAssetsLoaded == numAssets){
        startGame();
    }
});

// Evento para quando as teclas do teclado são pressionadas
// Objetivo: Fornecer movimento ao player e ao enemy
window.addEventListener('keydown', (event) => {
    switch(event.key){
        // Movimento do Player
        case 'd':
            Player.load("./assets/Player1/NewHero_Run.png", 12, 12);
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case 'w':
            player.velocity.y = -6;
            Player.load("./assets/Player1/NewHero_Jump.png", 14, 14);
            break;
        case 's':
            break;
        case 'a':
            Player.load("./assets/Player1/NewHero_Run.png", 12, 12);
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case ' ':
            Player.load("./assets/Player1/NewHero_Attack.png", 7, 7);
            player.attack();
            break;
        case 'Control':
            Player.load("./assets/Player1/NewHero_Shield.png", 2, 2);
            break;

        // Movimento do Enemy
        /*
    case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
    case 'ArrowUp':
        enemy.velocity.y = -13;
        break;
    case 'ArrowDown':
        enemy.attack();
        break;
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;

         */
    }
});

//Evento para quando as teclas do teclado são soltas
//Objetivo: Parar de fornecer movimento ao player e ao enemy
window.addEventListener('keyup', (event) => {
    switch(event.key){
        // Movimento do Player
        case 'd':
            keys.d.pressed = false;
            Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            break;
        case 's':
            break;
        case 'w':
            keys.w.pressed = false;
            setTimeout(() => {
                Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            }, 500);
            break;
        case 'a':
            keys.a.pressed = false;
            Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            break;
        case ' ':
            setTimeout(() => {
                Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            }, 500);
            break;
        case 'Control':
            setTimeout(() => {
                Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6);
            }, 100);
            break;

        /*
    // Movimento do Enemy
    case 'ArrowRight':
        keys.ArrowRight.pressed = false;
        break;
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false;
        break;

         */

    }
});

//----------------------------------------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------------------------------------
function startGame(){
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

    player = new Player({x: 100, y: 100}, { x: 0, y: 0}, 150, 200, {x: 0, y: 0});
    enemy = new Enemy({x: 400, y: 0}, { x: 0, y: 0}, 250, 300, {x: 50, y:0});

    backgroundLayer1.draw();
    player.draw();
    enemy.draw();

    timeLastFrame = performance.now();
    animate(performance.now());
}

//----------------------------------------------------------------------------------------------------------------------
function animate(time){
    requestAnimationFrame(animate);

    acumulatedTimeBetweenFrames += time - timeLastFrame;
    timeLastFrame = time;

    if(acumulatedTimeBetweenFrames > timeBetweenUpdateDraw){
        ctx.clearRect(0,0, canvas.width, canvas.height);

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

        player.update();

        enemy.update();

        // Para que o player e o enemy não estejam sempre em movimento
        player.velocity.x = 0;
        enemy.velocity.x = 0;

        // Movimento do Player
        if(keys.a.pressed && player.lastKey === "a"){
            player.velocity.x = -5
            gameSpeed = 0;
            // Quando a condição é true, o background ganha movimento
            if(player.position.x < 100){
                gameSpeed = 1.5;
            }
        } else if(keys.d.pressed && player.lastKey === "d"){
            player.velocity.x = 5
            gameSpeed = 0;
            // Quando a condição é true, o background ganha movimento
            if(player.position.x > 400){
                gameSpeed = 1.5;
            }
        }else{
            gameSpeed = 0;
        }

        // Movimento do Enemy
        /*
        if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
            enemy.velocity.x = -4
        } else if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
            enemy.velocity.x = 4
        }

         */

        // Deteção de colisões
        // Deteção de colisão entre o player e o enemy

        if(rectangleCollision(player, enemy)
            && player.isAttacking
        ){
            player.isAttacking = false;
            Enemy.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/04_demon_take_hit.png", 5, 5);
            setTimeout(() => {
                Enemy.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
            }, 500);
            console.log("Player Attack");
        }


        // Deteção de colisão entre o enemy e o player
        /*
        if(rectangleCollision(enemy, player)
            && enemy.isAttacking
        ){
            enemy.isAttacking = false;
            console.log("Enemy Attack");
        }

         */

        // Deteção de colisão entre o Enemy e o Player
        // Objetivo: Quando o Enemy chegar perto do Player, o Enemy vais atacá-lo
        if(retangleCollision1(enemy, player)){
            // Utilizado setTimeout para resolver o problema: o Enemy começava a atacar antes de chegar perto do Player
            setTimeout(() => {
                Enemy.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/03_demon_cleave.png", 15, 15);
                enemy.attack();
                // Tirar vida aqui
            }, 2500);
        } else {
            // Assim que o Enemy deixa de ficar perto do Player, o Enemy volta ao estado idle
            Enemy.load("./assets/boss_demon_slime_FREE_v1.0/spritesheets/01_demon_idle.png", 6, 6);
        }

        acumulatedTimeBetweenFrames = 0;
    }
}