import { Assets, Container, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";

export class RandomFeaturePopup extends Container {
    private featureTexture !: Spritesheet;
    private featureImage !: Sprite;
    private state: string;
    constructor(state: string) {
        super();
        this.state = state;
        this.featureTexture = Assets.get("feature_popup");
        this.featureImage = new Sprite(this.featureTexture.textures['randowFeaturePopup_creazione.png']);
        this.addToStage();
        this.featureImage.alpha = 0;
        if (this.state === CommonConfig.BASE_GAME) {
            this.subscribeEvent();
        } else {
            this.subscribeFGEvent();
        }
    }

    private addToStage(): void {
        this.addChild(this.featureImage);
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
        if (feature === CommonConfig.RANDOM_FEATURE_CRIPAZIONE) {
            this.featureImage.texture = this.featureTexture.textures['randowFeaturePopup_creazione.png'];
        } else if (feature === CommonConfig.RANDOM_FEATURE_PISTOLE) {
            this.featureImage.texture = this.featureTexture.textures['randowFeaturePopup_pistole.png'];
        } else {
            this.featureImage.texture = this.featureTexture.textures['randowFeaturePopup_pistole.png'];
        }
        this.featureImage.alpha = 0;
        this.featureImage.visible = true;
        gsap.to(this.featureImage, {
            ease: 'power1.out',
            duration: 0.5,
            alpha: 1,
            onComplete: () => {
                gsap.to(this.featureImage, {
                    ease: 'power1.out',
                    duration: 0.5,
                    alpha: 0,
                    delay: 0.2,
                    onComplete: () => {
                        callback();
                        this.featureImage.visible = false;
                    }
                }
                )
            }
        }
        )
    }
}