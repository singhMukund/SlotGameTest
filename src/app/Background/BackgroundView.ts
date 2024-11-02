import {Assets, Container, Sprite } from "pixi.js";

export class BackgroundView extends Container{
    private bg !: Sprite;
    constructor(){
        super();
        this.intializeBg();
        this.addContainerToStage();
    }

    private intializeBg() :void{
       this.bg = new Sprite(Assets.get("background"));
       
    }

    private addContainerToStage() {
        this.addChild(this.bg);
    }

}


