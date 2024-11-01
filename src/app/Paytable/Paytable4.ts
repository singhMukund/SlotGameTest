import { Container, Sprite } from "pixi.js";
import { Game } from "../game";

export class Paytable4 extends Container{
    private bg !: Sprite;
    private reel !: Sprite;
    private headingText !: Sprite;
    private subHeaderText !: Sprite;
    private descriptionText !: Sprite;
    constructor(){
        super();
        this.init();
    }

    private init() :void{
        this.bg = new Sprite(Game.the.app.loader.resources['PaytableReel'].texture); 
        this.addChild(this.bg);
        this.reel = new Sprite(Game.the.app.loader.resources['desktop_payline'].texture); 
        this.addChild(this.reel);
        this.reel.scale.set(0.6);
        this.reel.position.set((this.bg.width - this.reel.width)/2 - 24,(this.bg.height - this.reel.height)*0.45);
        this.headingText = new Sprite(Game.the.app.loader.resources['PAYLINES_Text'].texture); 
        this.addChild(this.headingText);
        this.headingText.scale.set(1);
        this.headingText.position.set((this.bg.width - this.headingText.width)/2,this.bg.y + 100);
    }
}