/* Um objecto de jogo tem:
    - coordenadas x e y
    - um tamanho width e height

    - método update
    - método draw

    - a capacidade de emitir eventos
*/

"use strict"

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class GameObject extends EventTarget {

    constructor(position, width, height) {
        super();
        this.position = position;
        this.width = width;
        this.height = height;
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        // a redefinir nas classes derivadas

    }
}

// Um Sprite é um GameObject que tem associado uma imagem
class Sprite extends GameObject {

    static imagem;

    constructor(position, width, height) {
        super(position, width, height);
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        ctx.drawImage(this.constructor.imagem, this.position.x, this.position.y, this.width, this.height);
    }

    static load(urlImagem) {
        this.imagem = new Image();

        this.imagem.addEventListener("load", () => {
            window.dispatchEvent(new CustomEvent('assetLoad', { detail: this }))
        });

        this.imagem.src = urlImagem;
    }
}

// Um AnimatedSprite é um Sprite com a capacidade de Animação
class AnimatedSprite extends Sprite {

    static numberFrames;
    static numberFramesPerRow;
    static slice;

    constructor(position, width, height) {
        super(position, width, height);

        this.currentFrame = 1;

        this.sx = 0;
        this.sy = 0;
    }

    update() {
        this.currentFrame++;

        if (this.currentFrame > this.constructor.numberFrames)
            this.currentFrame = 1;

        let deltaX = (this.currentFrame - 1) % this.constructor.numberFramesPerRow;
        let deltaY = Math.floor((this.currentFrame - 1) / this.constructor.numberFramesPerRow);

        this.sx = deltaX * this.constructor.slice.width;
        this.sy = deltaY * this.constructor.slice.height;
    }


    draw() {
        ctx.drawImage(this.constructor.imagem, this.sx, this.sy, this.constructor.slice.width, this.constructor.slice.height,
            this.position.x, this.position.y, this.width, this.height);

    }

    static load(urlImagem, numberFrames, numberFramesPerRow) {

        this.imagem = new Image();

        this.imagem.src = urlImagem;

        this.imagem.addEventListener('load', () => {

            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice = {};
            this.slice.width = this.imagem.width / numberFramesPerRow;

            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = this.imagem.height / numberRows;

            window.dispatchEvent(new CustomEvent('assetLoad', { detail: this }));

        });

    }
}