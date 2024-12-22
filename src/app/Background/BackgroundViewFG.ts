import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../game";
import { GlowFilter } from "pixi-filters";

export class BackgroundViewFG extends Container {
    private bg !: Sprite;
    constructor() {
        super();
        this.intializeBg();
        this.addContainerToStage();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private intializeBg(): void {
        this.bg = new Sprite(Assets.get("freegamebackground"));
        this.bg.y = -60;


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

        // const line = new Graphics();
        // line.rect(0,window.innerHeight/2,0,100);
        // line.fillStyle = 0x000000;
        const line = new Graphics();
        line.beginFill(0x00FFFF);
        line.drawRect(60, 800, 300, 10);
        line.endFill();
        this.addChild(line);

        // Create and configure the GlowFilter
        const glowFilter = new GlowFilter({
            color: 0x00FFFF,      // Green glow color
            distance: 10,         // Spread of the glow
            outerStrength: 4,     // Glow outside the shape
            innerStrength: 1,     // Glow inside the shape
            quality: 0.3          // Quality of the glow (affects performance)
        });

        // Apply the GlowFilter to the line
        line.filters = [glowFilter];
    }

}


