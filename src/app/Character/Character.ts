import { Assets, Container, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";

export class Character extends Container{
    private image !: Sprite;
    private imageBase !: Sprite;
    private imageBaseTexture !: Spritesheet
    private state : string
    constructor(state : string){
        super();
        this.state = state;
        this.imageBaseTexture = Assets.get("feature_popup");
        this.init();
        // this.resizeApp();
        // Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private init() :void{
        this.image = new Sprite(Assets.get("characterImage"));
        this.imageBase = new Sprite(this.imageBaseTexture.textures['characterPlatform.png']);
        this.addChild(this.imageBase);
        this.addChild(this.image);
        this.imageBase.position.set(-10,this.image.height * 0.9 - 10);
    }

    
}