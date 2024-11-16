import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class AutoplayBtn extends Container{
    private buttton !: Sprite;
    private buttonTexture !: Spritesheet;

    constructor(){
        super();
        this.buttonTexture = Assets.get("ui_button");
        this.initializeButton();
        this.addEvent();
        Game.the.app.stage.on(CommonConfig.ENABLE_DISABLE_MINUS_BTN,this.onEnableDisableBtn, this);
    }

    private initializeButton() :void{
        this.buttton = new Sprite(this.buttonTexture.textures['Autoplay_btn.png']);
        this.addChild(this.buttton);
        this.buttton.scale.set(0.9);
    }

    private addEvent() :void{
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);

        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.enable, this);
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.disable, this);
    }

    private onButtonDown() : void{
        this.buttton.texture = this.buttonTexture.textures['Autoplay_btn.png'];
    }

    private onButtonUp() :void{
        this.buttton.texture = this.buttonTexture.textures['Autoplay_btn.png'];
        Game.the.app.stage.emit(CommonConfig.START_AUTOPLAY);
        // Game.the.app.stage.emit(CommonConfig.START_SPIN);
        // this.disable();
    }

    private onButtonOver() :void{
        this.buttton.texture = this.buttonTexture.textures['Autoplay_btn.png'];
    }

    private onButtonOut() :void{
        this.buttton.texture = this.buttonTexture.textures['Autoplay_btn.png'];
    }

    private disable() :void{
        this.buttton.texture = this.buttonTexture.textures['Autoplay_btn.png'];
        this.interactive = false;
        this.alpha = 0.65;
    }

    private enable() :void{
        this.buttton.texture = this.buttonTexture.textures['Autoplay_btn.png'];
        this.interactive = true;
        this.alpha = 1;
    }

    private onEnableDisableBtn(value : boolean) :void{
        value ? this.enable() : this.disable()
    }
    
}