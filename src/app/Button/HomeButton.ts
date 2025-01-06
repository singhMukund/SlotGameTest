import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class HomeButton extends Container{
    private buttton !: Sprite;
    private buttonTexture !: Spritesheet;
    private state : string;
    constructor(state : string){
        super();
        this.state = state;
        this.buttonTexture = Assets.get("ui_button")
        this.initializeButton();
        this.addEvent();
        if (this.state === CommonConfig.BASE_GAME) {
            this.subscribeEvent();
        } else {
            this.subscibeFGEvent();
        }
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_ALL_BUTTON, this.enable, this);
    }

    private subscibeFGEvent(): void {
        Game.the.app.stage.on(CommonConfig.FG_DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.FG_ENABLE_ALL_BUTTON, this.enable, this);
    }

    private initializeButton() :void{
        this.buttton = new Sprite(this.buttonTexture.textures['home_regular.png']);
        this.addChild(this.buttton);
        this.buttton.scale.set(0.9);
    }

    private addEvent() :void{
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);
    }

    private onButtonDown() : void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['home_pressed.png'];
    }

    private onButtonUp() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['home_regular.png'];
        // Game.the.app.stage.emit(CommonConfig.START_SPIN);
        // this.disable();
    }

    private onButtonOver() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['home_regular.png'];
    }

    private onButtonOut() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['home_regular.png'];
    }

    disable() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['home_disabled.png'];
        this.interactive = false;
    }

    enable() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['home_regular.png'];
        this.interactive = true;
    }
    
}