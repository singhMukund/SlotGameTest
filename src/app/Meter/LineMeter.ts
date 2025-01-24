import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";

export class LineMeter extends Container {
    private winMeterText !: Text;
    private winValue: number = 0;

    constructor() {
        super();
        this.init();
        this.addToStage();
        this.subscribeEvent();
    }

    private subscribeEvent() :void{
        Game.the.app.stage.on(CommonConfig.UPDATE_LINE_WIN_METER, this.updateWinAmount, this);
        Game.the.app.stage.on(CommonConfig.RESET_WIN_METER, this.resetWinAmount, this);
    }

    private init(): void {
        const buttonStyle2 = new TextStyle({
            fill: "#ffcd33",
            fontSize: 60,
            fontWeight: "bold"
        });
        this.winMeterText = new Text({
            text: `$ ${this.winValue}`,
            style: buttonStyle2
        });
        this.alpha = 0;
    }

    private addToStage(): void {
        this.addChild(this.winMeterText);
    }

    private updateWinAmount(value : number[]): void {
        this.winValue = CommonConfig.the.getLineWinAmount();
        this.winValue = Number(this.winValue.toFixed(2));
        this.winMeterText.text = `$ ${this.winValue}`;
        this.winMeterText.position.set(value[0] * CommonConfig.reelWidth,value[1] * CommonConfig.symbolHeight);
        this.playUpAnimation();
    }

    private resetWinAmount(): void {
        this.winValue = CommonConfig.the.getLineWinAmount();
        this.winMeterText.text = `${this.winValue}`;
    }

    private playUpAnimation(): void {
        const duration = 0.4; // Fixed duration of 0.4 seconds
        let y = this.winMeterText.y;
        this.alpha = 1;
        gsap.to(this.winMeterText, {
            y: y - 60,
            duration: duration,
            ease: 'power1.out',
            onComplete: () => {
                this.winMeterText.y = y;
            },
        });
        gsap.to(this, {
            alpha: 0,
            delay: 0.3,
            duration: 0.1,
            ease: 'power1.out',
        });
    }
}