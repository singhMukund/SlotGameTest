import {Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";

export class BackgroundView extends Container{
    private bg !: Sprite;
    constructor(){
        super();
        this.intializeBg();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private intializeBg() :void{
       this.bg = new Sprite(Assets.get("background"));
       this.bg.y = -60;
    }

    private resizeApp() :void{
        let scaleX: number = 0;
        let scaleY: number = 0;
        this.width = 1921;
        this.height = 1022;
        if (window.innerHeight > window.innerWidth && this) {
            scaleX = window.innerWidth / this.width;
            scaleY = window.innerHeight / this.height;
            this.scale.set(scaleX, scaleY);
        } else {
            scaleX = window.innerWidth / this.width;
            this.scale.set(scaleX);
        }
        this.position.set((window.innerWidth - this.width) / 2, (window.innerHeight - this.height) / 2);
    }

    private addContainerToStage() {
        this.addChild(this.bg);
    }

}


