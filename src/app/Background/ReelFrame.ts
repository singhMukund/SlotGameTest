import { Assets, Container, Sprite } from "pixi.js";

export class ReelFrame extends Container{
    private reelFrame! : Sprite;
    private logo !: Sprite;

    constructor(){
        super();
        this.initialiZeReelView();
        this.addContainerToStage();
        this.setPosition();
    }

    private initialiZeReelView() : void{
       this.reelFrame = new Sprite(Assets.get("reelBgImage"));
       this.reelFrame.scale.set(0.6); 
    }

    private setPosition() :void{
    }

    private addContainerToStage() {
        this.addChild(this.reelFrame);
    }
}