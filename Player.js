const gravity = 0.7;

class Player extends AnimatedSprite{
    constructor(x, y, width, height, velocityX, velocityY) {
        super(x, y, width, height);
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.lastKey;
        this.attackBox = {
            x: this.x,
            y: this.y,
            width: 100,
            height: 50
        }
    }
    draw(){
        super.draw();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "blue";
        ctx.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height);
    }
    update() {
        super.update();
        this.draw();
        this.x += this.velocityX;
        this.y += this.velocityY;
        if(this.y + this.height + this.velocityY >= canvas.height){
            this.velocityY = 0;
        } else {
            this.velocityY += gravity;
        }
    }
    
}

//Player.load("./assets/Player1/NewHero_IdleSword.png", 6, 6); //frames e frames por linha

const numAssets = 0;

let numAssetsLoaded = 0;

let player;
let player1;

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
    player = new Player(canvas.width/2, canvas.height/2, 50, 150, 0, 0);
    player1 = new Player(canvas.width/2 + 200, canvas.height/2, 50, 150, 0, 0);

    player.draw();
    player1.draw();

    timeLastFrame = performance.now();
    animate(performance.now());
}

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
    }
}


function animate(time){
    requestAnimationFrame(animate);

    acumulatedTimeBetweenFrames += time - timeLastFrame;
    timeLastFrame = time;

    if(acumulatedTimeBetweenFrames > timeBetweenUpdateDraw){
        ctx.clearRect(0,0, canvas.width, canvas.height);

        player.update();
        player1.update();

        player.velocityX = 0;
        
        // Player Movement
        if(keys.a.pressed && player.lastKey === "a"){
            player.velocityX = -2
        } else if(keys.d.pressed && player.lastKey === "d"){
            player.velocityX = 2
        }

        acumulatedTimeBetweenFrames = 0;
    }
}

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case 'w':
            player.velocityY = -13;
            break;
        case 's':
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            console.log('keys.d.pressed = ' + keys.d.pressed )
            break;
        case 's':
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }  
});