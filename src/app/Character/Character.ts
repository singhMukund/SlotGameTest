import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";

export class Character extends Container{
    private image !: Sprite;
    constructor(){
        super();
        this.init();
        // this.resizeApp();
        // Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private init() :void{
        this.image = new Sprite(Assets.get("characterImage"));
        this.addChild(this.image);
    }

    
}