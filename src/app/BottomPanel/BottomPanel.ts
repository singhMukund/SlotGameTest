import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { SpinButton } from "../Button/SpinButton";
import { HomeButton } from "../Button/HomeButton";
import { SettingButton } from "../Button/SettingButton";
import { WinMeter } from "../Meter/WinMeter";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { BetMeter } from "../Meter/BetMeter";
import { PlusButton } from "../Button/PlusButton";
import { MinusButton } from "../Button/MinusButton";
import { CommonConfig } from "@/Common/CommonConfig";
import { BalanceMeter } from "../Meter/BalanceMeter";
import { AutoplayBtn } from "../Button/AutoplayBtn";


export class BottomPanel extends Container {
    private bg !: Sprite;
    private spinBtn !: SpinButton;
    private homeButton !: HomeButton;
    private settingButton !: SettingButton;
    private winMeter !: WinMeter;
    private betMeter !: BetMeter;
    private aspectRatio : number =1;
    private minusButton !: MinusButton;
    private plusButton !: PlusButton;
    private balanceMeter !: BalanceMeter;
    private autoplayBtn !: AutoplayBtn;

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
        this.homeButton = new HomeButton();
        this.winMeter = new WinMeter();
        this.betMeter = new BetMeter();
        this.minusButton = new MinusButton();
        this.plusButton = new PlusButton();
        this.balanceMeter = new BalanceMeter();
        this.autoplayBtn = new AutoplayBtn();
    }

    private addContainerToStage() {
        this.addChild(this.spinBtn);
        this.addChild(this.settingButton);
        this.addChild(this.homeButton);
        this.addChild(this.winMeter);
        this.addChild(this.betMeter);
        this.addChild(this.minusButton);
        this.addChild(this.plusButton);
        this.addChild(this.balanceMeter);
        this.addChild(this.autoplayBtn);
    }


    private init(): void {
        this.bg = new Sprite(Assets.get('bottomPanelBg'));
        this.addChild(this.bg);
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
        this.homeButton.scale.set(scale);
        this.minusButton.scale.set(scale);
        this.plusButton.scale.set(scale);
        this.autoplayBtn.scale.set(scale);
        if (window.innerWidth > window.innerHeight) {
            this.spinBtn.position.set(window.innerWidth - (this.spinBtn.width * 1.5), (window.innerHeight - this.spinBtn.height)/2);
            this.settingButton.position.set(window.innerWidth - (this.settingButton.width * 2), this.bg.y - (this.settingButton.height * 1.2));
            this.homeButton.position.set(this.homeButton.width, this.settingButton.y);
        }
        this.minusButton.position.set(this.minusButton.width + 50, this.bg.y + (this.bg.height - this.minusButton.height)/2);
        this.betMeter.position.set(this.minusButton.x + this.minusButton.width,this.bg.y + (this.bg.height - this.winMeter.height)/2);
        this.plusButton.position.set(this.betMeter.x + this.betMeter.width,this.bg.y + (this.bg.height - this.plusButton.height)/2);
        this.balanceMeter.position.set(window.innerWidth - this.balanceMeter.width - 100,this.bg.y + (this.bg.height - this.balanceMeter.height)/2);
        this.autoplayBtn.position.set(this.settingButton.x - this.autoplayBtn.width - 10, this.bg.y - (this.autoplayBtn.height * 1.2));
    }
}