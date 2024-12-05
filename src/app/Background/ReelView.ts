import { Assets, Container, Sprite } from "pixi.js";

export class ReelView extends Container{
    private reelBg! : Sprite;
    private logo !: Sprite;

    constructor(){
        super();
        this.initialiZeReelView();
        this.addContainerToStage();
        this.setPosition();
    }

    private initialiZeReelView() : void{
       this.reelBg = new Sprite(Assets.get("reelFrameImage")); 
       this.reelBg.scale.set(1.36,1.36);
    }

    private setPosition() :void{
    }

    private addContainerToStage() {
        this.addChild(this.reelBg);
    }
}