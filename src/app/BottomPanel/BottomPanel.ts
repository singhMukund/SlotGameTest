import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { SpinButton } from "../Button/SpinButton";
import { WinMeter } from "../Meter/WinMeter";
import { CommonConfig } from "@/Common/CommonConfig";
import { BalanceMeter } from "../Meter/BalanceMeter";


export class BottomPanel extends Container {
    private bg !: Sprite;
    private spinBtn !: SpinButton;
    private winMeter !: WinMeter;
    private aspectRatio : number =1;
    private balanceMeter !: BalanceMeter;
    private gap : number = 30;


    constructor(state : string) {
        super();
        this.init();
        this.initButton();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
        Game.the.app.stage.emit(CommonConfig.CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN);
    }

    private initButton(): void {
        this.spinBtn = new SpinButton();
        this.winMeter = new WinMeter();
        this.balanceMeter = new BalanceMeter();
    }

    private addContainerToStage() {
        this.addChild(this.spinBtn);
    }


    private init(): void {
        this.bg = new Sprite(Assets.get('bottomPanelBg'));
        // this.addChild(this.bg);
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