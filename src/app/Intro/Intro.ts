import { Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../game";
import { IntroContinueBtn } from "../Button/IntroContinueBtn";

export class Intro extends Container{
    private bgGraphics !: Graphics;

    private logo !: Sprite;
    private continueBtn !: IntroContinueBtn;
    constructor() {
        super();
        this.init();
        Game.the.app.stage.on("HIDE_INTRO_SCREEN", this.hide, this);
    }

    private hide() :void{
        this.visible = false;
    }

    private init(): void {
        this.bgGraphics = new Graphics();
        this.bgGraphics.beginFill(0x000000,0.65);
        this.bgGraphics.drawRect(0, 0, 4000, 4000);
        this.bgGraphics.endFill();
        this.addChild(this.bgGraphics);
        this.bgGraphics.interactive = true;
        this.logo = new Sprite(Game.the.app.loader.resources['main_logo'].texture);
        this.logo.position.set((window.innerWidth - this.logo.width)/2,(window.innerHeight - this.logo.height)/2 - 60);
        this.continueBtn = new IntroContinueBtn();
        this.continueBtn.position.set((window.innerWidth - this.continueBtn.width)/2,this.logo.y + this.logo.height - 100);
        this.addChild(this.logo);
        this.addChild(this.continueBtn);
    }
}