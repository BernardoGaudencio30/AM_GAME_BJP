const gravity = 0.5;

class Player extends AnimatedSprite{
    constructor(x, y, width, height, velocityX, velocityY) {
        super(x, y, width, height);
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    update() {
        super.update();
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocityY;
        if(this.y + this.height + this.velocityY >= canvas.height){
            this.velocityY = 0;
        } else {
            console.log(this.y);
            this.velocityY += gravity;
        }
    }
}

Player.load("./assets/Player/Run.png", 8, 2);

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
    player = new Player(canvas.width/2, canvas.height/2, 128, 80);

    player.draw();

    timeLastFrame = performance.now();
    animate(performance.now());
}

function animate(time){
    requestAnimationFrame(animate);

    acumulatedTimeBetweenFrames += time - timeLastFrame;
    timeLastFrame = time;

    if(acumulatedTimeBetweenFrames > timeBetweenUpdateDraw){
        ctx.clearRect(0,0, canvas.width, canvas.height);

        player.update();

        acumulatedTimeBetweenFrames = 0;
    }
}

window.addEventListerner('keydown', (event) => {
switch(event.key){
    case 'd':
    player.velocity.x = 2;    
    break
    case 'w':
    player.velocity.y = -2;    
    break
    case 's':
    player.velocity.y = 2;    
    break
    case 'a':
    player.velocity.x = -2;    
    break
}

});

window.addEventListerner('keyup', (event) => {
    switch(event.key){
        case 'd':
        player.velocity.x = 0;    
        break
        case 'w':
        player.velocity.y = 0;    
        break
        case 's':
        player.velocity.y = 0;    
        break
        case 'a':
        player.velocity.x = 0;    
        break
        }
    
    });