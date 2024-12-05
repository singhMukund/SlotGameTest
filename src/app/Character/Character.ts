import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";

export class Character extends Container{
    private image !: Sprite;
    constructor(){
        super();
        this.init();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private init() :void{
        this.image = new Sprite(Assets.get("characterImage"));
        this.addChild(this.image);
    }

    private resizeApp():void{
        let height : number = this.image.height;
        let currentHeightPanel = height/999 * window.innerHeight ;
        let scale : number = currentHeightPanel / height;
        this.scale.set(scale);

        this.position.set(window.innerWidth - (this.width * 1.4), (window.innerHeight - this.height)/2)
    }
}