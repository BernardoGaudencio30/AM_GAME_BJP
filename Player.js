class Player extends AnimatedSprite{
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    update() {
        super.update();
        this.draw();
    }
}

function startGame(){
    player = new Player(canvas.width/2, canvas.height/2, 275, 275);

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