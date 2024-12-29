import { Assets, Container, Graphics, Sprite, Spritesheet, } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import { PentagonalMeter } from "../Meter/PentagonalMeter";
import gsap from "gsap";


export class PentagonalUpdateFeature extends Container {

    private pentagonalBackContainer !: Container;
    private pentagonalTopContainer !: Container;
    private filledPentagonalContainer !: Container;
    private feature_Texture !: Spritesheet;
    private pentagon_fill_image !: Sprite;
    private pentagon_center_frame !: Sprite;
    private maskContainer !: Container;
    private maskGraphics !: Graphics;
    private counterMeter !: PentagonalMeter;
    private pentagon_front_frame!: Sprite;
    private currentpercemtage: number = 0;
    private randomFeatureIndicatorContainer !: Container;
    private state : string;

    constructor(state:string) {
        super();
        this.state = state;
        this.feature_Texture = Assets.get("pentagon_assets");
        this.init();
        this.addToStage();
        this.initRandomFeatureContainer();
        if(this.state === CommonConfig.BASE_GAME){
            this.subscribeEvent();
        }else{
            this.subscribeFGEvent();
        }
        this.resetsOnSpinClick();
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.UPDATE_PENTAGONAL_METER, this.updatePentagonalMeter, this);
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.resetsOnSpinClick, this);
    }

    private subscribeFGEvent(): void {
        Game.the.app.stage.on(CommonConfig.FG_UPDATE_PENTAGONAL_METER, this.updatePentagonalMeter, this);
        Game.the.app.stage.on(CommonConfig.FG_START_SPIN, this.resetsOnSpinClick, this);
    }

    private resetsOnSpinClick(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }     
        this.currentpercemtage = 0;
        for (let i: number = 0; i < 5; i++) {
            this.randomFeatureIndicatorContainer.children[i].alpha = 0;
        }
    }

    private init(): void {
        this.pentagonalBackContainer = new Container();
        this.pentagonalTopContainer = new Container();
        this.filledPentagonalContainer = new Container();
        this.maskContainer = new Container();

        let pentagon_back_black_bg: Sprite = new Sprite(this.feature_Texture.textures['pentagon_back_black.png']);
        let pentagon_frame: Sprite = new Sprite(this.feature_Texture.textures['pentagon_back.png']);
        this.pentagon_fill_image = new Sprite(this.feature_Texture.textures['pentagon_fill_5.png']);
        this.pentagon_front_frame = new Sprite(this.feature_Texture.textures['pentagon_front.png']);
        this.pentagon_center_frame = new Sprite(this.feature_Texture.textures['pentagon_middle_icon.png']);
        this.pentagonalBackContainer.addChild(pentagon_back_black_bg);
        this.filledPentagonalContainer.addChild(this.pentagon_fill_image);
        this.pentagonalTopContainer.addChild(pentagon_frame);
        this.pentagonalTopContainer.addChild(this.pentagon_front_frame);
        this.pentagonalTopContainer.addChild(this.pentagon_center_frame);
        this.pentagon_center_frame.position.set((pentagon_back_black_bg.width - this.pentagon_center_frame.width) / 2, (this.pentagon_front_frame.height - this.pentagon_center_frame.height) / 2 + 5);

        this.maskGraphics = new Graphics();
        this.maskGraphics.position.set(this.pentagon_front_frame.x + this.pentagon_front_frame.width / 2, this.pentagon_front_frame.y + this.pentagon_front_frame.height / 2);

        this.counterMeter = new PentagonalMeter();
        this.counterMeter.position.set(this.pentagon_center_frame.x + (this.pentagon_center_frame.width - this.counterMeter.width) / 2, this.pentagon_center_frame.y + (this.pentagon_center_frame.height - this.counterMeter.height) / 2);
        this.maskContainer.addChild(this.maskGraphics);
        this.filledPentagonalContainer.mask = this.maskGraphics;
    }

    private initRandomFeatureContainer(): void {
        this.randomFeatureIndicatorContainer = new Container();
        let indicator_Texture: Spritesheet = Assets.get("feature_popup");

        let randomFeatureIndiator5: Sprite = new Sprite(indicator_Texture.textures['pentagone_partialglow.png']);
        this.randomFeatureIndicatorContainer.addChild(randomFeatureIndiator5);
        randomFeatureIndiator5.anchor.set(0.5, 0.5);
        randomFeatureIndiator5.angle = 0;
        randomFeatureIndiator5.position.set(168, 42);
        this.addChild(this.randomFeatureIndicatorContainer);
        
        let randomFeatureIndiator1: Sprite = new Sprite(indicator_Texture.textures['pentagone_partialglow.png']);
        this.randomFeatureIndicatorContainer.addChild(randomFeatureIndiator1);
        randomFeatureIndiator1.anchor.set(0.5, 0.5);
        randomFeatureIndiator1.angle = 70.5;
        randomFeatureIndiator1.position.set(285, 119.5);

        let randomFeatureIndiator2: Sprite = new Sprite(indicator_Texture.textures['pentagone_partialglow.png']);
        this.randomFeatureIndicatorContainer.addChild(randomFeatureIndiator2);
        randomFeatureIndiator2.anchor.set(0.5, 0.5);
        randomFeatureIndiator2.angle = 152.5;
        randomFeatureIndiator2.position.set(240.5, 259);


        let randomFeatureIndiator3: Sprite = new Sprite(indicator_Texture.textures['pentagone_partialglow.png']);
        this.randomFeatureIndicatorContainer.addChild(randomFeatureIndiator3);
        randomFeatureIndiator3.anchor.set(0.5, 0.5);
        randomFeatureIndiator3.angle = 206.5;
        randomFeatureIndiator3.position.set(100, 260);


        let randomFeatureIndiator4: Sprite = new Sprite(indicator_Texture.textures['pentagone_partialglow.png']);
        this.randomFeatureIndicatorContainer.addChild(randomFeatureIndiator4);
        randomFeatureIndiator4.anchor.set(0.5, 0.5);
        randomFeatureIndiator4.angle = 286;
        randomFeatureIndiator4.position.set(51, 127);
    }

    private createMaskImages(currentPercent: number): void {
        const myObject = { percent: this.currentpercemtage };
        if (currentPercent <= 0) {
            this.maskGraphics.clear();
            return;
        }
        gsap.to(myObject, {
            percent: currentPercent,
            duration: 0.5,
            onUpdate: () => {
                this.updateMask(myObject.percent);
            },
            onComplete: () => {
                this.currentpercemtage = currentPercent;
            },
            ease: "power1.inOut", // Smooth animation easing
        });
    }

    private showRandomFeatureIndicator(newIndicator: Sprite, isShow: boolean): void {
        const finalAlpha = isShow ? 1 : 0
        gsap.to(newIndicator, {
            ease: 'power1.out',
            duration: 0.5,
            alpha: finalAlpha
        }
        )
    }

    updateMask(percentage: number) {
        const radius = this.pentagon_center_frame.width; // Adjust radius based on pentagon size
        const angle = (percentage / 100) * Math.PI * 2; // Convert percentage to radians

        this.maskGraphics.clear();
        this.maskGraphics.beginFill(0xffffff);
        this.maskGraphics.moveTo(0, 0);
        this.maskGraphics.arc(0, 0, radius, -Math.PI / 2, angle - Math.PI / 2); // Arc grows based on percentage
        this.maskGraphics.lineTo(0, 0); // Close the shape
        this.maskGraphics.endFill();
    }

    private returnRandomFeature(): string {
        return CommonConfig.RANDOM_FEATURES_LIST[Math.floor(Math.random() * 3)]
    }


    private addToStage(): void {
        this.addChild(this.pentagonalBackContainer);
        this.addChild(this.filledPentagonalContainer);
        this.addChild(this.pentagonalTopContainer);
        this.addChild(this.maskContainer);
        this.addChild(this.counterMeter);
    }



    private updatePentagonalMeter(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        if (CommonConfig.the.getIsRandomFeatureState() || CommonConfig.the.getIsFGRandomFeatureState()) {
            return;
        }
        this.pushRandomFeature();
        this.createMaskImages(this.calculateCurrentFilledPercentage());
        this.counterMeter.updatePentagonalCount(CommonConfig.the.getTotalWinSymbolCount());
        this.counterMeter.position.set(this.pentagon_center_frame.x + (this.pentagon_center_frame.width - this.counterMeter.width) / 2, this.pentagon_center_frame.y + (this.pentagon_center_frame.height - this.counterMeter.height) / 2);
    }

    private pushRandomFeature(): void {
        if(CommonConfig.the.getCurrentState() === CommonConfig.BASE_GAME){
            this.pushRandomFeatureBaseGame();
        }else{
            this.pushRandomFeatureFreeGame();
        }
        
    }

    private pushRandomFeatureFreeGame(): void {
        let currentTotalRandomFeature: number = Math.floor(CommonConfig.the.getTotalWinSymbolCount() / 10);
        const newTotaleRandomFeature: number = currentTotalRandomFeature - CommonConfig.the.getCurrentFGRadomFeatureList().length;
        for (let i: number = 0; i < newTotaleRandomFeature; i++) {
            CommonConfig.the.getCurrentFGRadomFeatureList().push(this.returnRandomFeature());
        }

        for (let i: number = 0; i < CommonConfig.the.getCurrentFGRadomFeatureList().length; i++) {
            i < 5 && this.showRandomFeatureIndicator(this.randomFeatureIndicatorContainer.children[i] as Sprite,true);
        }
    }

    private pushRandomFeatureBaseGame(): void {
        let currentTotalRandomFeature: number = Math.floor(CommonConfig.the.getTotalWinSymbolCount() / 10);
        const newTotaleRandomFeature: number = currentTotalRandomFeature - CommonConfig.the.getCurrentRadomFeatureList().length;
        for (let i: number = 0; i < newTotaleRandomFeature; i++) {
            CommonConfig.the.getCurrentRadomFeatureList().push(this.returnRandomFeature());
        }

        for (let i: number = 0; i < CommonConfig.the.getCurrentRadomFeatureList().length; i++) {
            i < 5 && this.showRandomFeatureIndicator(this.randomFeatureIndicatorContainer.children[i] as Sprite,true);
        }
    }

    private calculateCurrentFilledPercentage(): number {
        let currentCount: number = CommonConfig.the.getTotalWinSymbolCount();
        let totalWinSymbolCount: number = 50;
        return (currentCount / totalWinSymbolCount) * 100;
    }

    private getFilledTextureIndex(input: number) {
        let value: number = input / 10
        return Math.ceil(value);
    }

}