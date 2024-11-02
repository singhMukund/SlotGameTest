import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class SpinButton extends Container{
    private buttton !: Sprite;
    private buttonTexture !: Spritesheet;

    constructor(){
        super();
        this.buttonTexture = Assets.get("spin_button")
        this.initializeButton();
        this.addEvent();
    }

    private initializeButton() :void{
        this.buttton = new Sprite(this.buttonTexture.textures['Spin_Idle.png']);
        this.addChild(this.buttton);
    }

    private addEvent() :void{
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);

        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.enable, this);
    }

    private onButtonDown() : void{
        this.buttton.texture = this.buttonTexture.textures['Spin_Pressed.png'];
    }

    private onButtonUp() :void{
        this.buttton.texture = this.buttonTexture.textures['Spin_Idle.png'];
        Game.the.app.stage.emit(CommonConfig.START_SPIN);
        this.disable();
    }

    private onButtonOver() :void{
        this.buttton.texture = this.buttonTexture.textures['Spin_Hover.png'];
    }

    private onButtonOut() :void{
        this.buttton.texture = this.buttonTexture.textures['Spin_Idle.png'];
    }

    disable() :void{
        this.buttton.texture = this.buttonTexture.textures['Spin_Disabled.png'];
        this.interactive = false;
    }

    enable() :void{
        this.buttton.texture = this.buttonTexture.textures['Spin_Idle.png'];
        this.interactive = true;
    }
    
}