import { Assets, Container, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class Character extends Container{
    // private image !: Sprite;
    private imageBase !: Sprite;
    private imageBaseTexture !: Spritesheet;
    private characterSpine !: Spine;
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
        // this.image = new Sprite(Assets.get("characterImage"));
        this.imageBase = new Sprite(this.imageBaseTexture.textures['characterPlatform.png']);
        this.addChild(this.imageBase);
        // this.addChild(this.image);
        this.characterSpine = Spine.from({ skeleton: "Basculo_chained_for_spine_data", atlas: "Basculo_chained_for_spine_atlas" });
        this.addChild(this.characterSpine);
        // this.characterSpine.pivot.set(this.characterSpine.width/2,this.characterSpine.height/2);
        this.characterSpine.scale.set(0.6);
        this.characterSpine.position.set(165,393);
        this.characterSpine.state.setAnimation(0, '1_idle', true);
        this.imageBase.position.set(-10,this.characterSpine.height * 0.9 - 10);

    }

    
}