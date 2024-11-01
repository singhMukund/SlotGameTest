import { Container, Sprite } from "pixi.js";
import { Game } from "../game";

export class Paytable1 extends Container{
    private bg !: Sprite;
    private reel !: Sprite;
    private headingText !: Sprite;
    private subHeaderText !: Sprite;
    private descriptionText !: Sprite;
    private scatterSymImg !: Sprite;
    constructor(){
        super();
        this.init();
    }

    private init() :void{
        this.bg = new Sprite(Game.the.app.loader.resources['PaytableReel'].texture); 
        this.addChild(this.bg);
        this.reel = new Sprite(Game.the.app.loader.resources['Page_1_reel'].texture); 
        this.addChild(this.reel);
        this.reel.scale.set(0.6);
        this.reel.position.set((this.bg.width)/2 - 320,(this.bg.height - this.reel.height)/2);
        this.headingText = new Sprite(Game.the.app.loader.resources['Page_1_FreeSpinsText'].texture); 
        this.addChild(this.headingText);
        this.headingText.scale.set(0.6);
        this.headingText.position.set((this.bg.width - this.headingText.width)/2,this.bg.y + 100);
        this.subHeaderText = new Sprite(Game.the.app.loader.resources['Page_1_text_2'].texture); 
        this.addChild(this.subHeaderText);
        this.subHeaderText.position.set((this.bg.width - this.subHeaderText.width)/2,this.reel.y - 20);
        this.descriptionText = new Sprite(Game.the.app.loader.resources['Page_1_text_1'].texture); 
        this.addChild(this.descriptionText);
        this.descriptionText.scale.set(0.8)
        this.descriptionText.position.set((this.bg.width - this.descriptionText.width)/2,this.reel.y + this.reel.height - 70);
        this.scatterSymImg = new Sprite(Game.the.app.loader.resources['Page_1_Scatter_symbol'].texture); 
        this.addChild(this.scatterSymImg);
        this.scatterSymImg.scale.set(0.5);
        this.scatterSymImg.position.set(280,(this.bg.height - this.scatterSymImg.height)/2);
    }
}