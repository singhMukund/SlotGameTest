import { Assets, Container, Sprite } from "pixi.js";

export class ReelViewFG extends Container{
    private reelBg! : Sprite;
    private logo !: Sprite;

    constructor(){
        super();
        this.initialiZeReelView();
        this.addContainerToStage();
        this.setPosition();
    }

    private initialiZeReelView() : void{
        this.reelBg = new Sprite(Assets.get("freegamereelBgImage")); 
       this.reelBg.scale.set(0.98,0.98);
       this.reelBg.position.set(41.5,36);
    }

    private setPosition() :void{
    }

    private addContainerToStage() {
        this.addChild(this.reelBg);
    }
}