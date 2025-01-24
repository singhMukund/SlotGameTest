import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class SpinButton extends Container{
    private buttton !: Sprite;
    constructor(){
        super();
        this.initializeButton();
        this.addEvent();
        this.subscribeEvent();
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_ALL_BUTTON, this.enable, this);
    }

    private initializeButton() :void{
        this.buttton = new Sprite(Assets.get("spinBtn"));
        this.addChild(this.buttton);
        this.buttton.scale.set(0.3);
    }

    private addEvent() :void{
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);
        document.body.onkeyup = (e)=> {
            if (e.key == " " ||
                e.code == "Space" ||      
                e.keyCode == 32      
            ) {
                if(this.interactive){
                    this.onButtonUp();
                }
            }
          }
    }

    private onButtonDown() : void{
    }

    private onButtonUp() :void{
        Game.the.app.stage.emit(CommonConfig.START_SPIN);
        this.disable();
    }

    private onButtonOver() :void{
    }

    private onButtonOut() :void{
    }

    disable() :void{
        this.interactive = false;
    }

    enable() :void{
        this.interactive = true;
    }
    
}