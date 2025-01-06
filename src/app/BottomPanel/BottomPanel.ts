import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { SpinButton } from "../Button/SpinButton";
import { ThunderButton } from "../Button/ThunderButton";
import { SettingButton } from "../Button/SettingButton";
import { WinMeter } from "../Meter/WinMeter";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { BetMeter } from "../Meter/BetMeter";
import { PlusButton } from "../Button/PlusButton";
import { MinusButton } from "../Button/MinusButton";
import { CommonConfig } from "@/Common/CommonConfig";
import { BalanceMeter } from "../Meter/BalanceMeter";
import { AutoplayBtn } from "../Button/AutoplayBtn";
import { AutoplayController } from "../Symbol/AutoplayController";
import { AutoplayMeter } from "../Meter/AutoplayMeter";
import { SoundButton } from "../Button/SoundButton";
import { FreeGameLeftMeter } from "../Meter/FreeGameLeftMeter";
import { SettingPage } from "../Button/SettingPage";


export class BottomPanel extends Container {
    private bg !: Sprite;
    private spinBtn !: SpinButton;
    private thunderButton !: ThunderButton;
    private settingButton !: SettingButton;
    private soundButton !: SoundButton;
    private winMeter !: WinMeter;
    private betMeter !: BetMeter;
    private aspectRatio : number =1;
    private minusButton !: MinusButton;
    private plusButton !: PlusButton;
    private balanceMeter !: BalanceMeter;
    private autoplayBtn !: AutoplayBtn;
    private autoplayMeter !: AutoplayMeter;
    private gap : number = 30;
    private state : string;
    private settingPage !: SettingPage;


    constructor(state : string) {
        super();
        this.state = state;
        this.init();
        this.initButton();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
        Game.the.app.stage.emit(CommonConfig.CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN);
        // Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE,0);
    }

    private initButton(): void {
        this.spinBtn = new SpinButton(this.state);
        this.settingButton = new SettingButton(this.state);
        this.thunderButton = new ThunderButton(this.state);
        this.winMeter = new WinMeter(this.state);
        this.betMeter = new BetMeter(this.state);
        this.minusButton = new MinusButton(this.state);
        this.plusButton = new PlusButton(this.state);
        this.balanceMeter = new BalanceMeter(this.state);
        this.autoplayBtn = new AutoplayBtn(this.state);
        this.autoplayMeter = new AutoplayMeter();
        this.soundButton = new SoundButton(this.state);
        if(this.state === CommonConfig.BASE_GAME){
            new AutoplayController();
            this.initSettingPageObj();
        }
    }

    private addContainerToStage() {
        this.addChild(this.spinBtn);
        this.addChild(this.settingButton);
        this.addChild(this.thunderButton);
        this.addChild(this.winMeter);
        this.addChild(this.betMeter);
        this.addChild(this.minusButton);
        this.addChild(this.plusButton);
        this.addChild(this.balanceMeter);
        this.addChild(this.autoplayBtn);
        this.addChild(this.autoplayMeter);
        this.addChild(this.soundButton);
    }

    private initSettingPageObj() :void{
        this.settingPage = new SettingPage();
        this.addChild(this.settingPage);
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
        this.settingButton.scale.set(scale);
        this.thunderButton.scale.set(scale);
        this.minusButton.scale.set(scale);
        this.plusButton.scale.set(scale);
        this.soundButton.scale.set(scale);
        this.autoplayBtn.scale.set(scale * 1.2);
        this.thunderButton.position.set(window.innerWidth - (this.thunderButton.width *  2), window.innerHeight - (this.thunderButton.height  *  1.2));
        this.settingButton.position.set(this.settingButton.width, window.innerHeight -  (this.settingButton.height * 1.2));
        this.soundButton.position.set(this.settingButton.x + this.settingButton.width + (this.soundButton.width/2), window.innerHeight -  (this.settingButton.height * 1.2));
        this.balanceMeter.position.set(this.soundButton.x + this.soundButton.width + this.gap, window.innerHeight - (this.balanceMeter.height * 1.2));
        this.betMeter.position.set(this.balanceMeter.x + (this.balanceMeter.width - this.betMeter.width)/2,this.balanceMeter.y - this.winMeter.height);
        this.autoplayBtn.position.set(this.thunderButton.x - (this.autoplayBtn.width * 1.5), window.innerHeight - (this.autoplayBtn.height * 1.2));
        this.autoplayMeter.position.set(this.autoplayBtn.x + (this.autoplayBtn.width - this.autoplayMeter.width)/2, this.autoplayBtn.y - this.autoplayMeter.height);
        this.spinBtn.position.set(this.autoplayMeter.x - (this.spinBtn.width * 1.5), window.innerHeight - this.spinBtn.height);
        this.minusButton.position.set(this.spinBtn.x - this.minusButton.width, window.innerHeight - this.minusButton.height);
        this.plusButton.position.set(this.minusButton.x,this.minusButton.y - this.plusButton.height);
        this.settingPage && (this.settingPage.scale.set(scale));
        this.settingPage && (this.settingPage.position.set(this.settingButton.x + (this.settingButton.width - this.settingPage.width)/2,  this.settingButton.y - this.settingPage.height))

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
        this.betMeter.scale.set(scale * 0.6);
        this.winMeter.position.set((window.innerWidth - this.winMeter.width)/2,this.bg.y + (this.bg.height - this.winMeter.height)/2);
        this.spinBtn.scale.set(scale * 0.6);
        this.settingButton.scale.set(scale * 0.6);
        this.thunderButton.scale.set(scale * 0.6);
        this.minusButton.scale.set(scale * 0.6);
        this.plusButton.scale.set(scale * 0.6);
        this.soundButton.scale.set(scale * 0.6);
        this.autoplayBtn.scale.set(scale * 0.8);
        this.balanceMeter.position.set(window.innerWidth - (this.balanceMeter.width * 1.1), window.innerHeight - (this.balanceMeter.height));
        this.betMeter.position.set(10,window.innerHeight - this.winMeter.height);
        this.settingButton.position.set(0, this.betMeter.y -  this.settingButton.height);
        this.soundButton.position.set(0 , this.settingButton.y -  this.settingButton.height);
        this.spinBtn.position.set((window.innerWidth - this.spinBtn.width)/2, this.soundButton.y - this.spinBtn.height);
        this.minusButton.position.set(this.spinBtn.x - this.minusButton.width, this.spinBtn.y + (this.spinBtn.height * 0.7));
        this.plusButton.position.set(this.spinBtn.x + this.spinBtn.width, this.minusButton.y);
        this.thunderButton.position.set(0, this.soundButton.y - this.thunderButton.height);
        this.autoplayBtn.position.set(window.innerWidth - (this.autoplayBtn.width * 1.5), this.soundButton.y);
        this.autoplayMeter.position.set(this.autoplayBtn.x + (this.autoplayBtn.width - this.autoplayMeter.width)/2, this.autoplayBtn.y - this.autoplayMeter.height);
    }
}