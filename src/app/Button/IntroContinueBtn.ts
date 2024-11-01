import { Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class IntroContinueBtn extends Container{
    private normalButtton !: Sprite;

    constructor(){
        super();
        this.initializeButton();
        this.addEvent();
    }

    private initializeButton() :void{
        this.normalButtton = new Sprite(Game.the.app.loader.resources['Continue_Button_Idle'].texture);
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
        this.normalButtton.texture = Game.the.app.loader.resources['Continue_Button_Idle'].texture
    }

    private onButtonUp() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Continue_Button_Pressed'].texture;
        Game.the.app.stage.emit("HIDE_INTRO_SCREEN");
    }

    private onButtonOver() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Continue_Button_Hover'].texture
    }

    private onButtonOut() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Continue_Button_Idle'].texture
    }

    disable() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Continue_Button_Disabled'].texture;
        this.interactive = false;
        this.buttonMode = false;
    }

    enable() :void{
        // @ts-ignore
        this.normalButtton.texture = Game.the.app.loader.resources['Continue_Button_Idle'].texture;
        this.interactive = true;
        this.buttonMode = true;
    }
    
}