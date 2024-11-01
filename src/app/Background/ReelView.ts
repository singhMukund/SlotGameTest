import { Container, Loader, Sprite } from "pixi.js";
import { Game } from "../game";

export class ReelView extends Container{
    private reelBg! : Sprite;
    private logo !: Sprite;

    constructor(){
        super();
        this.initialiZeReelView();
    }

    private initialiZeReelView() : void{
       this.reelBg = new Sprite(Game.the.app.loader.resources['reelFrame'].texture); 
       this.addChild(this.reelBg);
       this.position.set((1920 - this.reelBg.width)/2,(1080 - this.reelBg.height)/2 - 100);

       this.logo = new Sprite(Game.the.app.loader.resources['logo'].texture);
       this.addChild(this.logo);
       this.logo.position.set((1920 - this.logo.width)/2 - 120, 10);
    }
}