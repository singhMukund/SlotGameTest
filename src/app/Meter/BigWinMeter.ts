import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import gsap from "gsap";
import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";

enum LARGE_WIN_SEQ {
    BIG_WIN = 1,
    MEGA_WIN = 2,
    TOP_WIN = 3,
    OVER_TOP_WIN = 4
}

// enum LARGE_WIN_SEQ {
//     BIG_WIN = 1,
//     MEGA_WIN = 2,
//     TOP_WIN = 3,
//     OVER_TOP_WIN = 4
// }

export class BigWinMeter extends Container {
    private darkBg !: Graphics;
    private bigWinSpine !: Spine;
    private titleText !: Text;
    private winMeter !: Text;
    private winMeterGsapTween !: gsap.core.Tween;
    private winMeterScaleTween !: gsap.core.Tween;
    private currentvalue: number = 0;
    private speed: number = 0.1;
    private currentLargeWinSeq: number = 1;
    private checkWnMultiplier: number = 20;
    private currentBet: number = 1;
    private winString: string[] = ["BIG WIN", "MEGA WIN", "TOP WIN", "OVER THE TOP WIN"]
    constructor() {
        super();
        this.init();
        this.addToStage();
        this.setToPosition();
        // this.playAnimation();
        // this.playIncrementAnimation();
        // this.scaleTween();
        Game.the.app.stage.on("RESIZE_THE_APP", this.setToPosition, this);
        Game.the.app.stage.on(CommonConfig.PLAY_BIG_WIN, this.show, this);
        // this.updateWinSequence();
    }

    private init() {
        const buttonStyle = new TextStyle({
            fill: "#FF0000",
            fontSize: 96,
            fontWeight: "bold"
        });
        const buttonStyle2 = new TextStyle({
            fill: "#ffcd33",
            fontSize: 116,
            fontWeight: "bold"
        });
        this.darkBg = new Graphics().rect(0, 0, 5000, 4000).fill("#000000");
        this.darkBg.alpha = 0.65;
        this.bigWinSpine = Spine.from({ skeleton: "Bigwin_data", atlas: "Bigwin_atlas" });
        this.titleText = new Text({
            text: `BIG WIN`,
            style: buttonStyle
        });
        this.winMeter = new Text({
            text: `$ 100.00`,
            style: buttonStyle2
        });
        this.winMeter.pivot.set(0.5, 0.5);
        this.alpha = 0;
        this.winMeter.anchor.set(0.5,0.5);
        // this.winMeter.updateTick()
    }

    private addToStage(): void {
        this.addChild(this.darkBg);
        this.addChild(this.bigWinSpine);
        this.addChild(this.titleText);
        this.addChild(this.winMeter);
    }

    private playAnimation(): void {
        this.bigWinSpine.state.setAnimation(0, 'BigWinMegaWin', true);
    }

    private setToPosition(): void {
        this.bigWinSpine.pivot.set(-this.bigWinSpine.width / 2, -this.bigWinSpine.height / 2);
        this.bigWinSpine.position.set((window.innerWidth - this.bigWinSpine.width) / 2, (window.innerHeight - this.bigWinSpine.height) / 2);
        this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
        // this.titleText.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
        this.winMeter.position.set((window.innerWidth - this.winMeter.width) / 1.55, (window.innerHeight - this.winMeter.height) / 1.8);
    }

    playIncrementAnimation() {
        // CommonConfig.the.setCurrentWinAmount(100);
        // const startValue = parseFloat(textObj.text);
        const duration = 0.4; // Fixed duration of 0.4 seconds
        this.currentvalue = 0;
        this.winMeter.text = '0';
        this.speed = CommonConfig.the.getCurrentWinAmount() / 1200;
        this.currentBet = CommonConfig.the.getBet();
        this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
        this.winMeterGsapTween = gsap.to(this.winMeter, {
            ease: 'power1.out',
            repeat: -1,
            onUpdate: () => {
                this.currentvalue += this.speed;
                this.currentvalue = Number(this.currentvalue.toFixed(2));
                this.winMeter.text = `$ ${this.currentvalue.toFixed(2)}`;
                // this.winMeter.position.set(this.titleText.x + (this.titleText.width - this.winMeter.width) / 2, (window.innerHeight - this.titleText.height) / 2.1);
                // textObj.text = Math.round(this.targets()[0].value).toString();
                this.checkStopTween();
                if (this.currentvalue > (20 * this.currentBet) && this.currentvalue <= (40 * this.currentBet) && this.currentLargeWinSeq < 2) {
                    this.currentLargeWinSeq++;
                    this.updateWinSequence()
                } else if (this.currentvalue > (40 * this.currentBet) && this.currentvalue <= (60 * this.currentBet) && this.currentLargeWinSeq < 3) {
                    this.currentLargeWinSeq++;
                    this.updateWinSequence()
                } else if (this.currentvalue > (60 * this.currentBet) && this.currentvalue <= (80 * this.currentBet) && this.currentLargeWinSeq < 4) {
                    this.currentLargeWinSeq++;
                    this.updateWinSequence()
                }
                // textObj.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
            },
        });
        this.winMeterGsapTween.play();
    }

    private checkStopTween(): void {
        if (this.currentvalue >= CommonConfig.the.getCurrentWinAmount()) {
            this.winMeter.text = `$ ${CommonConfig.the.getCurrentWinAmount()}`;
            this.winMeterGsapTween.kill();
            gsap.delayedCall(0.5,()=>this.hide());
        }
    }

    private scaleTween(): void {
        this.winMeterScaleTween = gsap.to(this.winMeter.scale, {
            ease: 'power1.out',
            repeat: -1,
            yoyo: true,
            x: 1.2,
            y: 1.2
        });
        this.winMeterScaleTween.play()
    }

    resizeTextToFit() {
        let fontSize = this.titleText.style.fontSize;
        while (this.titleText.width > 400 && fontSize > 30) {
            fontSize--;
            this.titleText.style.fontSize = fontSize;
            // this.titleText.updateText(true);
        }
    }

    private show(): void {
        this.titleText.text = this.winString[0];
        this.winMeter.text = `$ ${0}`;
        this.currentLargeWinSeq = 1;
        this.playAnimation();
        this.playIncrementAnimation();
        this.scaleTween();
        gsap.to(this, {
            duration: 0.45,
            alpha: 1,
        })
    }

    private hide(): void {
        this.winMeterScaleTween!.kill()
        gsap.to(this, {
            duration: 0.45,
            alpha: 0,
            onComplete: () => {
                this.titleText.text = this.winString[0];
                this.winMeter.text = `$ ${0}`;
                this.currentLargeWinSeq = 1;
                Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
            }
        })
    }

    private updateWinSequence(): void {
        gsap.to(this.titleText, {
            duration: 0.1,
            alpha: 0,
            onComplete: () => {
                this.titleText.text = this.winString[this.currentLargeWinSeq - 1];
                // this.resizeTextToFit();
                this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
                // this.titleText.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
                // this.winMeter.position.set(this.titleText.x + (this.titleText.width - this.winMeter.width) / 2, (window.innerHeight - this.titleText.height) / 2.1);
                gsap.to(this.titleText, {
                    duration: 0.45,
                    alpha: 1
                })
            }
        })
    }

}