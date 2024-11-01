import { Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class InfoButton extends Container{
    private normalButtton !: Sprite;

    constructor(){
        super();
        this.initializeButton();
        this.addEvent();
        Game.the.app.stage.on(CommonConfig.ENABLE_INFO_BUTTON, this.enable, this);
    }

    private initializeButton() :void{
        this.normalButtton = new Sprite(Game.the.app.loader.resources['Info_Idle'].texture);
        this.addChild(this.normalButtton);
    }

    private addEvent() :void{
        this.interactive = true;
        this.buttonMode = true; // Show hand cursor

        // Add event listeners
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);
    }

    private onButtonDown() : void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Info_Pressed'].texture
    }

    private onButtonUp() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Info_Idle'].texture;
        Game.the.app.stage.emit(CommonConfig.INFO_BTN_CLICKED);
        this.disable();
    }

    private onButtonOver() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Info_Hover'].texture
    }

    private onButtonOut() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Info_Idle'].texture
    }

    disable() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Info_Disabled'].texture;
        this.interactive = false;
        this.buttonMode = false;
    }

    enable() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Info_Idle'].texture;
        this.interactive = true;
        this.buttonMode = true;
    }
    
}