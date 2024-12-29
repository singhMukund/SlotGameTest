import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class MinusButton extends Container{
    private buttton !: Sprite;
    private buttonTexture !: Spritesheet;
    private state : string;
    constructor(state : string){
        super();
        this.state = state;
        this.buttonTexture = Assets.get("ui_button");
        this.initializeButton();
        this.addEvent();
        Game.the.app.stage.on(CommonConfig.ENABLE_DISABLE_MINUS_BTN,this.onEnableDisableBtn, this);
        if (this.state === CommonConfig.BASE_GAME) {
            this.subscribeEvent();
        } else {
            this.subscibeFGEvent();
        }
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.disable, this);
        Game.the.app.stage.on(CommonConfig.DISABLE_ALL_BUTTON, this.disable, this);
    }

    private subscibeFGEvent(): void {
        Game.the.app.stage.on(CommonConfig.FG_START_SPIN, this.disable, this);
        Game.the.app.stage.on(CommonConfig.FG_DISABLE_ALL_BUTTON, this.disable, this);
    }

    private initializeButton() :void{
        this.buttton = new Sprite(this.buttonTexture.textures['button_minus.png']);
        this.addChild(this.buttton);
        this.buttton.scale.set(0.9);
    }

    private addEvent() :void{
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown, this)
              .on('pointerup', this.onButtonUp, this)
              .on('pointerover', this.onButtonOver, this)
              .on('pointerout', this.onButtonOut , this);
        Game.the.app.stage.on(CommonConfig.FG_DISABLE_ALL_BUTTON, this.disable, this);
    }

    private onButtonDown() : void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_minus.png'];
    }

    private onButtonUp() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_minus.png'];
        Game.the.app.stage.emit(CommonConfig.UPDATE_BET_METER, -1);
        // Game.the.app.stage.emit(CommonConfig.START_SPIN);
        // this.disable();
    }

    private onButtonOver() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_minus.png'];
    }

    private onButtonOut() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_minus.png'];
    }

    private disable() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_minus.png'];
        this.interactive = false;
        this.alpha = 0.65;
    }

    private enable() :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_minus.png'];
        this.interactive = true;
        this.alpha = 1;
    }

    private onEnableDisableBtn(value : boolean) :void{
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        value ? this.enable() : this.disable()
    }
    
}