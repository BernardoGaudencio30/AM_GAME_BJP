//Gravidade do Jogo
const gravity = 1;

class Player extends AnimatedSprite{
    constructor(position, velocity, width, height, offset) {
        super(position, width, height)
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.lastKey;
        this.isAttacking;
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
        //super.draw();

        //Desenho do Player e do Enemy
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        //Desenho da AttackBox
        if(this.isAttacking){
            ctx.fillStyle = "blue";
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update() {
        //super.update();
        this.draw();

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

}

Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6); //frames e frames por linha

const numAssets = 1;

let numAssetsLoaded = 0;

let player;
let enemy;

const fps = 13;
const timeBetweenUpdateDraw = 1000 / fps;
let acumulatedTimeBetweenFrames = 0;
let timeLastFrame;

window.addEventListener("assetLoad", (e) => {
    console.log("Asset Loaded", e.detail);

    numAssetsLoaded++;

    if(numAssetsLoaded == numAssets){
        startGame();
    }
});

function startGame(){
    player = new Player({x: 100, y: 100}, { x: 0, y: 0}, 50, 150, {x: 0, y: 0});
    enemy = new Player({x: 400, y: 100}, { x: 0, y: 0}, 50, 150, {x: 50, y:0});

    player.draw();
    enemy.draw();

    timeLastFrame = performance.now();
    animate(performance.now());
}

//Objeto para guardar o estado das teclas associadas ao movimento do Player e do Enemy (se as teclas estão a ser pressionadas ou não)
const keys = {
    //Movimento Player
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
    //Movimento Enimigo
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

//Função que recebe dois parâmetros (cada parâmetro está associado a um retângulo) e que verifica a colisão entre esses dois retângulos
function rectangleCollision(rectangle1, rectangle2){
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}


function animate(time){
    requestAnimationFrame(animate);

    acumulatedTimeBetweenFrames += time - timeLastFrame;
    timeLastFrame = time;

    if(acumulatedTimeBetweenFrames > timeBetweenUpdateDraw){
        ctx.clearRect(0,0, canvas.width, canvas.height);

        player.update();
        enemy.update();

        //Para que o Player e o Enemy não estejam sempre em movimento
        player.velocity.x = 0;
        enemy.velocity.x = 0;

        // Movimento do Player
        if(keys.a.pressed && player.lastKey === "a"){
            player.velocity.x = -5
        } else if(keys.d.pressed && player.lastKey === "d"){
            player.velocity.x = 5
        }

        // Movimento do Enemy
        if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
            enemy.velocity.x = -5
        } else if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
            enemy.velocity.x = 5
        }

        //Deteção de colisões
        //Deteção de colisão entre o Player e o Enemy
        if(rectangleCollision(player, enemy)
            && player.isAttacking
        ){
            player.isAttacking = false;
            console.log("Player Attack");
        }

        //Deteção de colisão entre o Enemy e o Player
        if(rectangleCollision(enemy, player)
            && enemy.isAttacking
        ){
            enemy.isAttacking = false;
            console.log("Enemy Attack");
        }

        acumulatedTimeBetweenFrames = 0;
    }
}

//Evento para quando as teclas do teclado são pressionadas
//Objetivo: Fornecer movimento ao Player e ao Enemy
window.addEventListener('keydown', (event) => {
    switch(event.key){
        //Movimento do Player
        case 'd':
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case 'w':
            player.velocity.y = -13;
            break;
        case 's':
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case ' ':
            player.attack();
            break;

        //Movimento do Enemy
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
    }
});

//Evento para quando as teclas do teclado são soltas
//Objetivo: Parar de fornecer movimento ao Player e ao Enemy
window.addEventListener('keyup', (event) => {
    switch(event.key){
        //Movimento do Player
        case 'd':
            keys.d.pressed = false;
            break;
        case 's':
            break;
        case 'a':
            keys.a.pressed = false;
            break;

        //Movimento do Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

    }
});