import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class Intro extends Container{
    private bgGraphics !: Graphics;
    private bg !: Sprite;
    private logo !: Sprite;
    private page1 !: Container;
    private page2 !: Container;
    private continueBtn !: Container;
    constructor() {
        super();
        Game.the.app.stage.on(CommonConfig.SHOW_INTRO_PAGE, this.init, this);
    }

    private hide() :void{
        this.visible = false;
    }

    private init(): void {
        this.bgGraphics = new Graphics();
        this.bgGraphics.beginFill(0x000000,0.65);
        this.bgGraphics.drawRect(0, 0, 4000, 4000);
        this.bgGraphics.endFill();
        // this.addChild(this.bgGraphics);
        // this.bgGraphics.interactive = true;
        this.bg = new Sprite(Assets.get("intro_background"));
        this.addChild(this.bg);
    }

    private addToStage() :void{

    }
}