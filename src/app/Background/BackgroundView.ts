import { Application, Assets, Container, Sprite } from "pixi.js";
import { CommonConfig } from "@/Common/CommonConfig";

export class BackgroundView extends Container {
    private bg !: Sprite;


    constructor(private app: Application) {
        super();
        this.intializeBg();
        this.addContainerToStage();
        this.resizeApp();
        this.playBgSound();
        this.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private intializeBg(): void {
        this.bg = new Sprite(Assets.get("background"));
        this.bg.y = -60;
    }

    private playBgSound() :void{
        this.app.stage.emit(CommonConfig.PLAY_BACKGROUND_SOUND,"background");
    }

    private resizeApp(): void {
        let scaleX: number = 0;
        let scaleY: number = 0;
        this.width = 1560;
        this.height = 3376;
        if (window.innerHeight > window.innerWidth && this) { 
            scaleX = window.innerWidth >= 1080 ? 1 : window.innerWidth / this.width;
            scaleY = window.innerHeight >= 1920 ? 1 : window.innerHeight / this.height;
            this.scale.set(scaleX, scaleY);
        } else {
            scaleX = window.innerWidth >= 1080 ? 1 : window.innerWidth / this.width;
            scaleY = window.innerHeight >= 1920 ? 1 : window.innerHeight / this.height;
            this.scale.set(scaleX);
        }
        this.position.set((window.innerWidth - this.width) / 2, (window.innerHeight - this.height) / 2);
    }

    private addContainerToStage() {
        this.addChild(this.bg);
    }

}


