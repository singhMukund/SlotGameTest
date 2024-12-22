import { Assets, Container, Graphics,Sprite, Spritesheet, } from "pixi.js";
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

    constructor() {
        super();
        this.feature_Texture = Assets.get("pentagon_assets");
        this.init();
        this.addToStage();
        this.resizeApp();
        this.subscribeEvent();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.UPDATE_PENTAGONAL_METER, this.updatePentagonalMeter, this);
        Game.the.app.stage.on(CommonConfig.FG_UPDATE_PENTAGONAL_METER, this.updatePentagonalMeter, this);
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

    private createMaskImages(currentPercent : number): void {
        const myObject = { percent: 1 };
        if(currentPercent <=0){
            this.maskGraphics.clear();
            return;
        }
        gsap.to(myObject, {
            percent: currentPercent,
            duration: 0.5,
            onUpdate: () => {
                this.updateMask(myObject.percent);
            },
            ease: "power1.inOut", // Smooth animation easing
        });
    }

    updateMask(percentage: number) {
        const radius = this.pentagon_center_frame.width; // Adjust radius based on pentagon size
        const angle = (percentage / 100) * Math.PI * 2; // Convert percentage to radians
    
        this.maskGraphics.clear();
        this.maskGraphics.beginFill(0xffffff);
        this.maskGraphics.moveTo(0, 0);
        this.maskGraphics.arc(0 ,0, radius, -Math.PI / 2, angle - Math.PI / 2); // Arc grows based on percentage
        this.maskGraphics.lineTo(0, 0); // Close the shape
        this.maskGraphics.endFill();
    }


    private addToStage(): void {
        this.addChild(this.pentagonalBackContainer);
        this.addChild(this.filledPentagonalContainer);
        this.addChild(this.pentagonalTopContainer);
        this.addChild(this.maskContainer);
        this.addChild(this.counterMeter);
    }

    private resizeApp(): void {
        let height: number = this.height;
        let currentHeightPanel = height / 999 * window.innerHeight;
        let scale: number = currentHeightPanel / height;
        this.scale.set(scale * 0.9);
        this.position.set(50, (window.innerHeight - this.height) / 2);
    }

    private updatePentagonalMeter(): void {
        let index: number = this.getFilledTextureIndex(CommonConfig.the.getTotalWinSymbolCount());
        this.createMaskImages(this.calculateCurrentFilledPercentage());
        this.counterMeter.updatePentagonalCount(CommonConfig.the.getTotalWinSymbolCount());
        this.counterMeter.position.set(this.pentagon_center_frame.x + (this.pentagon_center_frame.width - this.counterMeter.width) / 2, this.pentagon_center_frame.y + (this.pentagon_center_frame.height - this.counterMeter.height) / 2);
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