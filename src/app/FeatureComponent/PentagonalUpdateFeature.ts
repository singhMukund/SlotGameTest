import { Assets, Circle, Container, Graphics, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class PentagonalUpdateFeature extends Container{
    
    private pentagonalBackContainer !: Container;
    private pentagonalTopContainer !: Container;
    private filledPentagonalContainer !: Container;
    private feature_Texture !: Spritesheet;
    private pentagon_fill_image !: Sprite;
    private maskContainer !: Container;
    private maskGraphics !: Graphics;
    private filledtextureArray : string[] = ['pentagon_fill_1','pentagon_fill_2','pentagon_fill_3','pentagon_fill_4','pentagon_fill_5'];

    constructor() {
        super();
        this.feature_Texture = Assets.get("pentagon_assets");
        this.init();
        this.addToStage();
        this.resizeApp();
        this.subscribeEvent();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private subscribeEvent() :void{
        Game.the.app.stage.on(CommonConfig.UPDATE_PENTAGONAL_METER, this.updatePentagonalMeter, this);
    }

    private init() :void{
        this.pentagonalBackContainer = new Container();
        this.pentagonalTopContainer = new Container();
        this.filledPentagonalContainer = new Container();
        this.maskContainer = new Container();
        
        let pentagon_back_black_bg : Sprite = new Sprite(this.feature_Texture.textures['pentagon_back_black.png']); 
        let pentagon_frame : Sprite = new Sprite(this.feature_Texture.textures['pentagon_back.png']);
        this.pentagon_fill_image = new Sprite(this.feature_Texture.textures['pentagon_fill_5.png']);
        let pentagon_front_frame : Sprite = new Sprite(this.feature_Texture.textures['pentagon_front.png']);
        let pentagon_center_frame : Sprite = new Sprite(this.feature_Texture.textures['pentagon_middle_icon.png']);
        this.pentagonalBackContainer.addChild(pentagon_back_black_bg);
        this.filledPentagonalContainer.addChild(this.pentagon_fill_image);
        this.pentagonalTopContainer.addChild(pentagon_frame);
        this.pentagonalTopContainer.addChild(pentagon_front_frame);
        this.pentagonalTopContainer.addChild(pentagon_center_frame);
        pentagon_center_frame.position.set((pentagon_back_black_bg.width - pentagon_center_frame.width)/2,(pentagon_front_frame.height - pentagon_center_frame.height)/2 + 5);

        this.maskGraphics = new Graphics()
                                .arc(0,0,pentagon_back_black_bg.width/2,0,this.returnRadian(180))
                                .fill("0xffffff");
        this.maskGraphics.position.set(this.maskGraphics.width/2,this.maskGraphics.height/2);
        // this.maskContainer.addChild(this.maskGraphics);

        // this.filledPentagonalContainer.mask = this.maskContainer;
        
    }

    private returnRadian(degree : number){
        return degree * (Math.PI/180);
    }

    private addToStage() :void{
        this.addChild(this.pentagonalBackContainer);
        this.addChild(this.filledPentagonalContainer);
        this.addChild(this.pentagonalTopContainer);
        this.addChild(this.maskContainer);
    }

    private resizeApp() :void{
        let height : number = this.height;
        let currentHeightPanel = height/999 * window.innerHeight ;
        let scale : number = currentHeightPanel / height;
        this.scale.set(scale * 0.9);
        this.position.set(50, (window.innerHeight - this.height)/2)
    }

    private updatePentagonalMeter() :void{
        let index : number = this.getFilledTextureIndex(CommonConfig.the.getTotalWinSymbolCount());
        this.pentagon_fill_image.texture = this.feature_Texture.textures[`${this.filledtextureArray[index - 1]}.png`]
    }

    private getFilledTextureIndex(input : number) {
        let value : number = input / 10
        return Math.ceil(value);
    }
}