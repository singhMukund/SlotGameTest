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

    constructor() {
        super();
        this.init();
        this.initButton();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
        Game.the.app.stage.emit(CommonConfig.CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE,0);
    }

    private initButton(): void {
        this.spinBtn = new SpinButton();
        this.settingButton = new SettingButton();
        this.thunderButton = new ThunderButton();
        this.winMeter = new WinMeter();
        this.betMeter = new BetMeter();
        this.minusButton = new MinusButton();
        this.plusButton = new PlusButton();
        this.balanceMeter = new BalanceMeter();
        this.autoplayBtn = new AutoplayBtn();
        this.autoplayMeter = new AutoplayMeter();
        this.soundButton = new SoundButton();
        new AutoplayController();
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
        if (window.innerWidth > window.innerHeight) {
        }
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
    }
}