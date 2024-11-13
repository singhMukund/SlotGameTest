import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class SettingButton extends Container{
    private buttton !: Sprite;
    private buttonTexture !: Spritesheet;

    constructor(){
        super();
        this.buttonTexture = Assets.get("ui_button")
        this.initializeButton();
        this.addEvent();
    }

    private initializeButton() :void{
        this.buttton = new Sprite(this.buttonTexture.textures['btn_menu.png']);
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
    }

    private onButtonDown() : void{
        this.buttton.texture = this.buttonTexture.textures['btn_menu.png'];
    }

    private onButtonUp() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_menu.png'];
        // Game.the.app.stage.emit(CommonConfig.START_SPIN);
        // this.disable();
    }

    private onButtonOver() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_menu.png'];
    }

    private onButtonOut() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_menu.png'];
    }

    disable() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_menu.png'];
        this.interactive = false;
    }

    enable() :void{
        this.buttton.texture = this.buttonTexture.textures['btn_menu.png'];
        this.interactive = true;
    }
    
}