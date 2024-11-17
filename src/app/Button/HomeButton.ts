import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class HomeButton extends Container{
    private buttton !: Sprite;
    private buttonTexture !: Spritesheet;

    constructor(){
        super();
        this.buttonTexture = Assets.get("ui_button")
        this.initializeButton();
        this.addEvent();
    }

    private initializeButton() :void{
        this.buttton = new Sprite(this.buttonTexture.textures['btn_home.png']);
        this.addChild(this.buttton);
        this.buttton.scale.set(0.9);
    }

    private addEvent() :void{
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);

        Game.the.app.stage.on(CommonConfig.DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_ALL_BUTTON, this.enable, this);
    }

    private onButtonDown() : void{
        this.buttton.texture = this.buttonTexture.textures['btn_home.png'];
    }

    private onButtonUp() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_home.png'];
        // Game.the.app.stage.emit(CommonConfig.START_SPIN);
        // this.disable();
    }

    private onButtonOver() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_home.png'];
    }

    private onButtonOut() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_home.png'];
    }

    disable() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_home.png'];
        this.interactive = false;
    }

    enable() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_home.png'];
        this.interactive = true;
    }
    
}