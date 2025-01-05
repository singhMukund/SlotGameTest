import { Assets, Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "../../Common/CommonConfig";

export class AutoplayBtn extends Container {
    private buttton !: Sprite;
    private autoPlayOffBtn !: Sprite;
    private buttonTexture !: Spritesheet;
    private state: string;
    constructor(state: string) {
        super();
        this.state = state;
        this.buttonTexture = Assets.get("ui_button");
        this.initializeButton();
        this.addEvent();
        if (this.state === CommonConfig.BASE_GAME) {
            this.subscribeEvent();
        } else {
            this.subscibeFGEvent();
        }
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.onStartSpin, this);
        Game.the.app.stage.on(CommonConfig.DISABLE_AUTOPLAY_BUTTON, this.disableOffBtn, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_AUTOPLAY_BUTTON, this.enableOffBtn, this);
        Game.the.app.stage.on(CommonConfig.DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_ALL_BUTTON, this.enable, this);
    }

    private subscibeFGEvent(): void {
        Game.the.app.stage.on(CommonConfig.FG_START_SPIN, this.onStartSpin, this);
        Game.the.app.stage.on(CommonConfig.FG_DISABLE_ALL_BUTTON, this.disable, this);
        Game.the.app.stage.on(CommonConfig.FG_ENABLE_ALL_BUTTON, this.enable, this);
    }

    private initializeButton(): void {
        this.buttton = new Sprite(this.buttonTexture.textures['button_autoplay.png']);
        this.autoPlayOffBtn = new Sprite(this.buttonTexture.textures['button_autoplay.png']);
        this.addChild(this.buttton);
        this.addChild(this.autoPlayOffBtn);
        this.buttton.scale.set(0.9);
        this.autoPlayOffBtn.scale.set(0.9);
        this.autoPlayOffBtn.visible = false;
        this.buttton.visible = true;
    }

    private addEvent(): void {
        this.buttton.interactive = true;
        this.autoPlayOffBtn.interactive = true;
        this.buttton.on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerover', this.onButtonOver, this)
            .on('pointerout', this.onButtonOut, this);

        this.autoPlayOffBtn.on('pointerdown', this.onButtonDownOffBtn, this)
            .on('pointerup', this.onButtonUpOffBtn, this)
            .on('pointerover', this.onButtonOverOffBtn, this)
            .on('pointerout', this.onButtonOutOffBtn, this);
    }

    private onStartSpin(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.disable();
        this.disableOffBtn();
    }

    private onButtonDown(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_autoplay.png'];
    }

    private onButtonDownOffBtn(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.autoPlayOffBtn.texture = this.buttonTexture.textures['button_autoplay.png'];
    }

    private onButtonUp(): void {
        if(this.state !== CommonConfig.the.getCurrentState() || this.state === CommonConfig.FREE_Game){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_autoplay.png'];
        Game.the.app.stage.emit(CommonConfig.START_AUTOPLAY, true);
        this.autoPlayOffBtn.visible = true;
        this.buttton.visible = false;
    }

    private onButtonUpOffBtn(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.autoPlayOffBtn.texture = this.buttonTexture.textures['button_autoplay.png'];
        Game.the.app.stage.emit(CommonConfig.START_AUTOPLAY, false);
        this.autoPlayOffBtn.visible = false;
        this.buttton.visible = true;
    }

    private onButtonOver(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_autoplay.png'];
    }

    private onButtonOverOffBtn(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.autoPlayOffBtn.texture = this.buttonTexture.textures['button_autoplay.png'];
    }

    private onButtonOut(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_autoplay.png'];
    }

    private onButtonOutOffBtn(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.autoPlayOffBtn.texture = this.buttonTexture.textures['button_autoplay.png'];
    }

    private disable(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_autoplay.png'];
        this.buttton.interactive = false;
        this.buttton.alpha = 0.65;
    }

    private enable(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.buttton.texture = this.buttonTexture.textures['button_autoplay.png'];
        this.buttton.interactive = true;
        this.buttton.alpha = 1;
    }

    private disableOffBtn(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.autoPlayOffBtn.texture = this.buttonTexture.textures['button_autoplay.png'];
        this.autoPlayOffBtn.interactive = false;
        this.autoPlayOffBtn.alpha = 0.65;
    }

    private enableOffBtn(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.autoPlayOffBtn.texture = this.buttonTexture.textures['button_autoplay.png'];
        this.autoPlayOffBtn.interactive = true;
        this.autoPlayOffBtn.alpha = 1;
    }

}