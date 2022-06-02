const gravity = 0.5;

class Player extends AnimatedSprite{
    constructor(x, y, width, height, velocityX, velocityY) {
        super(x, y, width, height);
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.lastKey;
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

Player.load("assets/Player1/NewHero_Run.png", 12, 12);

const numAssets = 1;

let numAssetsLoaded = 0;

let player;

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
    player = new Player(canvas.width/2, canvas.height/2, 128, 80, 0, 0);

    player.draw();

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