import { Container, Sprite } from "pixi.js";
import { Game } from "../game";
import { ReelManager } from "../Symbol/ReelManager";
import { CommonConfig } from "../../Common/CommonConfig";

export class SpinButton extends Container{
    private normalSpinButtton !: Sprite;
    private pressedSpinButton !: Sprite;
    private hoverSpinButton !: Sprite;
    private disabledSpinButton !: Sprite;

    constructor(){
        super();
        this.initializeButton();
        this.addEvent();
    }

    private initializeButton() :void{
        this.normalSpinButtton = new Sprite(Game.the.app.loader.resources['Spin_Idle'].texture);
        this.addChild(this.normalSpinButtton);
    }

    private addEvent() :void{
        this.interactive = true;
        this.buttonMode = true; // Show hand cursor

        // Add event listeners
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);

        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.enable, this);
    }

    private onButtonDown() : void{
        // @ts-ignore
        this.normalSpinButtton.texture = Game.the.app.loader.resources['Spin_Pressed'].texture
    }

    private onButtonUp() :void{
        // @ts-ignore
        this.normalSpinButtton.texture = Game.the.app.loader.resources['Spin_Idle'].texture;
        Game.the.app.stage.emit(CommonConfig.START_SPIN);
        this.disable();
    }

    private onButtonOver() :void{
        // @ts-ignore
        this.normalSpinButtton.texture = Game.the.app.loader.resources['Spin_Hover'].texture
    }

    private onButtonOut() :void{
        // @ts-ignore
        this.normalSpinButtton.texture = Game.the.app.loader.resources['Spin_Idle'].texture
    }

    disable() :void{
        // @ts-ignore
        this.normalSpinButtton.texture = Game.the.app.loader.resources['Spin_Disabled'].texture;
        this.interactive = false;
        this.buttonMode = false;
    }

    enable() :void{
        // @ts-ignore
        this.normalSpinButtton.texture = Game.the.app.loader.resources['Spin_Idle'].texture;
        this.interactive = true;
        this.buttonMode = true;
    }
    
}