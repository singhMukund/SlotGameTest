import { Assets, Container, Sprite } from "pixi.js";

export class ReelFrameFG extends Container{
    private logo !: Sprite;
    private reelFrame! : Sprite;

    constructor(){
        super();
        this.initialiZeReelView();
        this.addContainerToStage();
        this.setPosition();
    }

    private initialiZeReelView() : void{
       this.reelFrame = new Sprite(Assets.get("freegamereelFrameImage")); 
       this.reelFrame.position.set(-38,-30);
    }

    private setPosition() :void{
    }

    private addContainerToStage() {
        this.addChild(this.reelFrame);
    }
}