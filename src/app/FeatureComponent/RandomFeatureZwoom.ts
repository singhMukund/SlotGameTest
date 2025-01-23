import { Assets, Container, Graphics, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class RandomFeaturePopup extends Container {
    private featureTexture !: Spritesheet;
    private featureImage !: Sprite;
    private state: string;
    private bg !: Graphics; 
    private pistole !: Spine;
    private zwoom !: Spine;
    private crapazaone !: Spine;
    featureContainer !: Container;
    constructor(state: string) {
        super();
        this.state = state;
        this.featureContainer = new Container();
        this.bg = new Graphics().rect(0,0,4000,4000).fill(0x000000);
        this.bg.alpha = 0.75;             
        this.initAnimations();
        this.addToStage();
        this.visible = false;
        // this.pistole.visible = true;
        if (this.state === CommonConfig.BASE_GAME) {
            this.subscribeEvent();
        } else {
            this.subscribeFGEvent();
        }
    }

    private initAnimations() :void{
        this.pistole = Spine.from({ skeleton: "Pistol_Animation_spine_data", atlas: "Pistol_Animation_spine_atlas" });
        this.zwoom = Spine.from({ skeleton: "Zwoom_Animation_spine_data", atlas: "Zwoom_Animation_spine_atlas" });
        this.crapazaone = Spine.from({ skeleton: "creapazione_spine_data", atlas: "creapazione_spine_atlas" });
        this.pistole.pivot.set(this.pistole.width/2, this.pistole.height/2);
        this.zwoom.pivot.set(this.zwoom.width/2, this.zwoom.height/2);
        this.zwoom.position.set(-35,-50);
        this.pistole.position.set(-35,-50);
        this.crapazaone.scale.set(0.8);
        this.crapazaone.pivot.set(this.crapazaone.width/2, this.crapazaone.height/2);
        this.crapazaone.position.set(-75,0);
    }

    private addToStage(): void {
        this.addChild(this.bg);
        this.addChild(this.featureContainer);
        this.featureContainer.addChild(this.pistole);
        this.featureContainer.addChild(this.zwoom);
        this.featureContainer.addChild(this.crapazaone);
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.SHOW_RANDOM_FEATURE_POPUP, this.onStartZwoomFeature, this);
    }

    private subscribeFGEvent(): void {
        Game.the.app.stage.on(CommonConfig.FG_SHOW_RANDOM_FEATURE_POPUP, this.onStartZwoomFeature, this);
    }

    private onStartZwoomFeature(feature: string, callback: any): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.hideAnimation();
        this.visible = true;
        if (feature === CommonConfig.RANDOM_FEATURE_ZWOOM) {
            this.playZwoom(callback);
        } else if (feature === CommonConfig.RANDOM_FEATURE_PISTOLE) {
            this.playPistole(callback);
        } else {
            this.playCripizione(callback);
        }
    }

    private playPistole(callback: any) :void{
        this.zwoom.visible = true;
        this.zwoom.state.setAnimation(0, 'animation', false).listener = {
            complete : () =>{
                this.visible = false;
                this.zwoom.visible = false;
                callback();
                this.zwoom.state.clearListeners();
            }
        }
    }

    private playZwoom(callback: any) :void{
        this.pistole.visible = true;
        this.pistole.state.setAnimation(0, 'animation', false).listener = {
            complete : () =>{
                this.pistole.visible = false;
                this.visible = false;
                callback();
                this.pistole.state.clearListeners();
            }
        }
    }

    private playCripizione(callback: any) :void{
        this.crapazaone.visible = true;
        this.crapazaone.state.setAnimation(0, 'animation', false).listener = {
            complete : () =>{
                this.crapazaone.visible = false;
                this.visible = false;
                callback();
                this.crapazaone.state.clearListeners();
            }
        }
    }

    private hideAnimation() :void{
        this.pistole.visible = false;
        this.zwoom.visible = false;
        this.crapazaone.visible = false;
    }
}