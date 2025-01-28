import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class SpinButton extends Container{
    private buttton !: Sprite;
    private stateBtn : string = CommonConfig.BUTTON_STATE_SPIN;
    constructor(){
        super();
        this.initializeButton();
        this.addEvent();
        this.subscribeEvent();
        Game.the.app.stage.on(CommonConfig.CHANGE_BUTTON_STATE, this.changeButtonState, this);
    }

    private changeButtonState(state : string) : void{
        state.length && this.enable();
        this.stateBtn = state;
        CommonConfig.the.setCurrentButtonState(state);
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_ALL_BUTTON, this.enable, this);
    }

    private initializeButton() :void{
        this.buttton = new Sprite(Assets.get("spinBtn"));
        this.addChild(this.buttton);
        this.buttton.anchor.set(0.5);
        this.buttton.scale.set(0.3);
        this.buttton.position.set(this.buttton.width/2,this.buttton.height/2);
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
        this.buttton.scale.set(0.25);
    }

    private onButtonUp() :void{
        this.buttton.scale.set(0.3);
        if(this.stateBtn === CommonConfig.BUTTON_STATE_SPIN){
            Game.the.app.stage.emit(CommonConfig.START_SPIN);
        }else if(this.stateBtn === CommonConfig.BUTTON_STATE_STOP){
            Game.the.app.stage.emit(CommonConfig.STOP_SPIN);
        }else{
            return;
        }
        this.disable();
    }

    private onButtonOver() :void{
    }

    private onButtonOut() :void{
    }

    disable() :void{
        this.interactive = false;
        this.alpha = 0.65;
        this.changeButtonState("");
    }

    enable() :void{
        this.alpha = 1;
        this.interactive = true;
    }
    
}