import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import SoundManager from "../Sound/SoundManager";
import { CommonConfig } from "@/Common/CommonConfig";

export class BackgroundView extends Container {
    private bg !: Sprite;
    private soundManager !: SoundManager;


    constructor() {
        super();
        this.soundManager = SoundManager.getInstance();
        this.intializeBg();
        this.addContainerToStage();
        this.resizeApp();
        this.playBgSound();
        Game.the.app.stage.on(CommonConfig.PLAY_BG_SOUND, this.playBgSound, this);
        Game.the.app.stage.on(CommonConfig.STOP_BG_SOUND, this.stopBgSound, this);
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private intializeBg(): void {
        this.bg = new Sprite(Assets.get("background"));
        this.bg.y = -60;
        // this.bigWinSpine = Spine.from({ skeleton: "Crepazione_Animation_spine_data", atlas: "Crepazione_Animation_spine_atlas" });
        //         this.bigWinSpine2 = Spine.from({ skeleton: "Basculo_chained_for_spine_data", atlas: "Basculo_chained_for_spine_atlas" });
    }

    private playBgSound() :void{
        this.soundManager.play('background');
    }

    private stopBgSound() :void{
        this.soundManager.stop('background');
    }

    private resizeApp(): void {
        let scaleX: number = 0;
        let scaleY: number = 0;
        this.width = 1920;
        this.height = 1080;
        if (window.innerHeight > window.innerWidth && this) {
            scaleX = window.innerWidth / this.width;
            scaleY = window.innerHeight / this.height;
            this.scale.set(scaleX, scaleY);
        } else {
            scaleX = window.innerWidth / this.width;
            this.scale.set(scaleX);
        }
        this.position.set((window.innerWidth - this.width) / 2, (window.innerHeight - this.height) / 2);
    }

    private addContainerToStage() {
        this.addChild(this.bg);
    }

}


