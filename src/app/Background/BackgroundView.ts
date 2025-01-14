import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import SoundManager from "../Sound/SoundManager";
import { CommonConfig } from "@/Common/CommonConfig";

export class BackgroundView extends Container {
    private bg !: Sprite;
    private soundManager !: SoundManager;
    // private bigWinSpine !: Spine;

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
        // this.bigWinSpine = Spine.from({ skeleton: "music_notes_key_1_spine_data", atlas: "music_notes_key_1_spine_atlas" });
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
        // this.addChild(this.bigWinSpine);
        // this.bigWinSpine.pivot.set(this.bigWinSpine.width/2,this.bigWinSpine.height/2);
        // this.bigWinSpine.position.set(500,500);
        // this.bigWinSpine.state.setAnimation(0, 'animation', true);
    }

}


