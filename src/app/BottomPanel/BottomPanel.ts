import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { SpinButton } from "../Button/SpinButton";
import { CommonConfig } from "@/Common/CommonConfig";


export class BottomPanel extends Container {
    private spinBtn !: SpinButton;

    constructor() {
        super();
        this.initButton();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private initButton(): void {
        this.spinBtn = new SpinButton();
    }

    private addContainerToStage() {
        this.addChild(this.spinBtn);
    }

    private resizeApp() :void{
        this.spinBtn.scale.set(1);
        let height : number = this.spinBtn.height;
        let currentHeightPanel = height/999 * window.innerHeight ;
        let scale : number = currentHeightPanel / height;
        this.spinBtn.scale.set(scale);
        if(window.innerWidth < window.innerHeight){
            this.resizeInMoble();
        }else{
            this.spinBtn.position.set((this.width - this.spinBtn.width)/2, 0);
        }
    }

    private resizeInMoble():void{
        this.spinBtn.scale.set(1.5);
        let height : number = this.spinBtn.height;
        let currentHeightPanel = height/720 * window.innerHeight ;
        let scale : number = currentHeightPanel / height;
        this.spinBtn.scale.set(scale * 0.6);
        this.spinBtn.position.set((this.width - this.spinBtn.width)/2, 0);
    }
}