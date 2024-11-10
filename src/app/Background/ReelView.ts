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
       this.reelBg.scale.set(1,1.65);
    }

    private setPosition() :void{
    }

    private addContainerToStage() {
        this.addChild(this.reelBg);
    }
}