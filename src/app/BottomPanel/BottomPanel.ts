import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { SpinButton } from "../Button/SpinButton";
import { HomeButton } from "../Button/HomeButton";
import { SettingButton } from "../Button/SettingButton";
import { WinMeter } from "../Meter/WinMeter";
import { Spine } from "@esotericsoftware/spine-pixi-v8";


export class BottomPanel extends Container {
    private bg !: Sprite;
    private spinBtn !: SpinButton;
    private homeButton !: HomeButton;
    private settingButton !: SettingButton;
    private winMeter !: WinMeter;
    private aspectRatio : number =1 ;
    constructor() {
        super();
        this.init();
        this.initButton();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private initButton(): void {
        this.spinBtn = new SpinButton();
        this.settingButton = new SettingButton();
        this.homeButton = new HomeButton();
        this.winMeter = new WinMeter();
    }

    private addContainerToStage() {
        this.addChild(this.spinBtn);
        this.addChild(this.settingButton);
        this.addChild(this.homeButton);
        this.addChild(this.winMeter);
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
        if (window.innerWidth > window.innerHeight) {
            this.spinBtn.position.set(window.innerWidth - (this.spinBtn.width * 1.5), (window.innerHeight - this.spinBtn.height)/2);
            this.settingButton.position.set(window.innerWidth - (this.settingButton.width * 2), this.bg.y - (this.settingButton.height * 1.2));
            this.homeButton.position.set(this.homeButton.width, this.settingButton.y);
        }
    }
}