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
        // Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE,0);
    }

    private initButton(): void {
        this.spinBtn = new SpinButton();
        this.winMeter = new WinMeter();
        this.balanceMeter = new BalanceMeter();
    }

    private addContainerToStage() {
        this.addChild(this.spinBtn);
        this.addChild(this.winMeter);
        this.addChild(this.balanceMeter);
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
        this.bg.position.set(0,window.innerHeight - this.bg.height);
        this.winMeter.position.set((window.innerWidth - this.winMeter.width)/2,this.bg.y + (this.bg.height - this.winMeter.height)/2);
        this.spinBtn.scale.set(scale);
        if(window.innerWidth < window.innerHeight){
            this.resizeInMoble();
        }
    }

    private resizeInMoble():void{
        this.spinBtn.scale.set(1.5);
        let height : number = this.spinBtn.height;
        let currentHeightPanel = height/720 * window.innerHeight ;
        let scale : number = currentHeightPanel / height;

        this.bg.position.set(0,window.innerHeight - this.bg.height);
        this.winMeter.scale.set(scale * 0.6);
        this.balanceMeter.scale.set(scale * 0.6);
        this.winMeter.position.set((window.innerWidth - this.winMeter.width)/2,this.bg.y + (this.bg.height - this.winMeter.height)/2);
        this.spinBtn.scale.set(scale * 0.6);
        this.balanceMeter.position.set(window.innerWidth - (this.balanceMeter.width * 1.1), window.innerHeight - (this.balanceMeter.height));
        this.spinBtn.position.set((window.innerWidth - this.spinBtn.width)/2, 0);
    }
}