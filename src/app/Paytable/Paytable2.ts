import { Container, Sprite } from "pixi.js";
import { Game } from "../game";

export class Paytable2 extends Container{
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
        this.reel = new Sprite(Game.the.app.loader.resources['symbols_and_value'].texture); 
        this.addChild(this.reel);
        this.reel.scale.set(0.56);
        this.reel.position.set((this.bg.width - this.reel.width)/2 - 16,this.bg.y + (this.reel.height*0.75) - 70);
        this.headingText = new Sprite(Game.the.app.loader.resources['SYMBOLS_Heading_text'].texture); 
        this.addChild(this.headingText);
        this.headingText.scale.set(0.6);
        this.headingText.position.set((this.bg.width - this.headingText.width)/2,this.bg.y + 100);
        this.subHeaderText = new Sprite(Game.the.app.loader.resources['wild_description_text'].texture); 
        this.addChild(this.subHeaderText);
        this.subHeaderText.scale.set(0.5)
        this.subHeaderText.position.set((this.bg.width - this.subHeaderText.width) * 0.2,(this.bg.height + this.reel.height)/2 - 70);
        this.descriptionText = new Sprite(Game.the.app.loader.resources['Description_text_page2'].texture); 
        this.addChild(this.descriptionText);
        this.descriptionText.scale.set(0.5)
        this.descriptionText.position.set((this.bg.width - this.descriptionText.width) * 0.7 ,(this.bg.height + this.reel.height)/2 - 70);
    }
}