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
    private currentLargeWinSeq: number = 0;
    private checkWinMultiplier: number = 20;
    private currentBet: number = 1;
    private currentTitle: string = "WIN";
    private winString: string[] = ["WIN", "BIG WIN", "MEGA WIN", "TOP WIN", "OVER THE TOP WIN"];
    private winMeterTextScale: number = 1;
    private state : string;
    private isHidden : boolean = false;
    constructor(state:string) {
        super();
        this.state = state;
        this.init();
        this.addToStage();
        this.setToPosition();
        if(this.state === CommonConfig.BASE_GAME){
            this.subscribeEvent();
        }else{
            this.subscribeEventFreeGame();
        }
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on("RESIZE_THE_APP", this.setToPosition, this);
        Game.the.app.stage.on(CommonConfig.PLAY_BIG_WIN, this.show, this);
        this.on('pointerup', this.stageClick, this);
        Game.the.app.stage.on(CommonConfig.SET_RESIZE_WITH_REELS, this.resizeBigWinWithReels, this);
    }

    private subscribeEventFreeGame(): void {
        Game.the.app.stage.on(CommonConfig.PLAY_FG_BIG_WIN, this.show, this);
        Game.the.app.stage.on("RESIZE_THE_APP", this.setToPosition, this);
        this.on('pointerup', this.stageClick, this);
        Game.the.app.stage.on(CommonConfig.FG_SET_RESIZE_WITH_REELS, this.resizeBigWinWithReels, this);
    }

    private unsubscrbeEvents(): void {
        Game.the.app.stage.off(CommonConfig.PLAY_FG_BIG_WIN, this.show, this);
        Game.the.app.stage.off("RESIZE_THE_APP", this.setToPosition, this);
        Game.the.app.stage.off(CommonConfig.PLAY_BIG_WIN, this.show, this);
        this.off('pointerup', this.stageClick, this);
        Game.the.app.stage.off(CommonConfig.SET_RESIZE_WITH_REELS, this.resizeBigWinWithReels, this);
        Game.the.app.stage.off(CommonConfig.FG_SET_RESIZE_WITH_REELS, this.resizeBigWinWithReels, this);
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
        this.winMeter.anchor.set(0.5, 0.5);
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
        let height: number = this.bigWinSpine.height;
        let currentHeightPanel = height / 999 * window.innerHeight;
        let scale: number = currentHeightPanel / height;
        this.bigWinSpine.scale.set(scale);
        let assumedWidthMobile: number = window.innerWidth * (this.bigWinSpine.width / 360);
        this.bigWinSpine.pivot.set(-this.bigWinSpine.width / 2, -this.bigWinSpine.height / 2);
        this.bigWinSpine.position.set((window.innerWidth - this.bigWinSpine.width) / 2, (window.innerHeight - this.bigWinSpine.height) / 2);
        this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
        this.winMeter.position.set((window.innerWidth - this.winMeter.width) / 1.55, (window.innerHeight - this.winMeter.height) / 1.8);
        if (window.innerWidth < window.innerHeight) {
            this.bigWinSpine.scale.set(1.5);
            let width = this.bigWinSpine.width;
            scale = assumedWidthMobile / width;
            this.bigWinSpine.scale.set(scale * 0.5);
            this.titleText.scale.set(scale * 0.5);
            this.winMeter.scale.set(scale * 0.5);
            this.winMeterTextScale = scale * 0.5;
            this.bigWinSpine.position.set((window.innerWidth - this.bigWinSpine.width) / 2, (window.innerHeight - this.bigWinSpine.height) / 2);
            this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
            this.winMeter.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.winMeter.width) / 1.55, this.bigWinSpine.y + (this.bigWinSpine.height - this.winMeter.height) / 1.8);
        }
    }

    private resizeBigWinWithReels(data: number[]): void {
        this.bigWinSpine.position.set((window.innerWidth - this.bigWinSpine.width) / 2 + 10, data[3] + (data[1] - this.bigWinSpine.height) / 2);
        this.titleText.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.titleText.width) / 2, this.bigWinSpine.y - this.titleText.height);
        this.winMeter.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.winMeter.width) / 1.55, this.bigWinSpine.y + (this.bigWinSpine.height - this.winMeter.height) / 1.8);
    }

    playIncrementAnimation() {
        const duration = 0.4;
        this.speed = CommonConfig.the.getCurrentWinAmount() / 1200;
        this.currentBet = CommonConfig.the.getBet();
        this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
        if (window.innerWidth < window.innerHeight) {
            this.titleText.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.titleText.width) / 2, this.bigWinSpine.y - this.titleText.height);
        }
        this.winMeterGsapTween = gsap.to(this.winMeter, {
            ease: 'power1.out',
            repeat: -1,
            onUpdate: () => {
                this.currentvalue += this.speed;
                this.currentvalue = Number(this.currentvalue.toFixed(3));
                this.winMeter.text = `$ ${this.currentvalue.toFixed(3)}`;
                this.checkStopTween();
                this.currentLargeWinSeq = Math.round(this.currentvalue / (this.checkWinMultiplier * this.currentBet));
                if (this.currentLargeWinSeq > this.winString.length - 1) {
                    this.currentLargeWinSeq = this.winString.length - 1;
                }
                if (this.currentTitle !== this.winString[this.currentLargeWinSeq] && (this.currentvalue >= (this.checkWinMultiplier * this.currentBet * this.currentLargeWinSeq))
                    && ((this.currentvalue < (this.checkWinMultiplier * this.currentBet * this.currentLargeWinSeq + 1))) && (this.currentLargeWinSeq > 0 && this.currentLargeWinSeq < this.winString.length)) {
                    this.updateWinSequence();
                    // this.currentLargeWinSeq++;
                }
            },
        });
        this.winMeterGsapTween.play();
    }

    private checkStopTween(): void {
        if (this.currentvalue >= CommonConfig.the.getCurrentWinAmount()) {
            this.winMeter.text = `$ ${CommonConfig.the.getCurrentWinAmount().toFixed(2)}`;
            this.winMeterGsapTween.kill();
            this.lastScaleTween();
            gsap.delayedCall(0.75, () => this.hide());
        }
    }

    private stageClick(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        this.winMeterGsapTween.kill();
        this.currentLargeWinSeq++;
        // if(this.currentLargeWinSeq > this.winString.length - 1){
        //     this.currentLargeWinSeq = this.winString.length -1;
        // }
        if (this.currentLargeWinSeq === this.winString.length) {
            this.winMeter.text = `$ ${CommonConfig.the.getCurrentWinAmount().toFixed(2)}`;
            this.winMeterGsapTween.kill();
            this.lastScaleTween();
            gsap.delayedCall(0.75, () => this.hide());
        } else {
            this.updateWinSequence();
            this.currentvalue = this.checkWinMultiplier * this.currentBet * this.currentLargeWinSeq;
            this.winMeter.text = `$ ${this.currentvalue.toFixed(2)}`;
            this.lastScaleTween();
            gsap.delayedCall(0.75, () => {
                this.playIncrementAnimation();
                this.scaleTween()
            });
        }
    }

    private lastScaleTween(): void {
        let finalScale: number = 2;
        let currentScale: number = 1;
        if (window.innerWidth < window.innerHeight) {
            finalScale = this.winMeterTextScale * 2;
            currentScale = this.winMeterTextScale;
        }
        this.winMeterScaleTween = gsap.to(this.winMeter.scale, {
            ease: 'power1.out',
            duration: 0.2,
            x: finalScale,
            y: finalScale,
            onComplete: () => {
                this.winMeterScaleTween = gsap.to(this.winMeter.scale, {
                    ease: 'power1.out',
                    duration: 0.2,
                    x: currentScale,
                    y: currentScale
                });
            }
        });
        this.winMeterScaleTween.play()
    }

    private scaleTween(): void {
        let finalScale: number = 1.2;
        let currentScale: number = 1;
        if (window.innerWidth < window.innerHeight) {
            finalScale = this.winMeterTextScale * 1.2;
            currentScale = this.winMeterTextScale;
        }
        this.winMeterScaleTween = gsap.to(this.winMeter.scale, {
            ease: 'power1.out',
            repeat: -1,
            yoyo: true,
            x: finalScale,
            y: finalScale
        });
        this.winMeterScaleTween.play()
    }

    private show(): void {
        this.isHidden = false;
        this.titleText.text = this.winString[0];
        this.currentTitle = this.winString[0];
        this.winMeter.text = `$ ${0}`;
        this.currentLargeWinSeq = 0;
        this.currentvalue = 0;
        this.winMeter.text = '0';
        this.playAnimation();
        this.playIncrementAnimation();
        this.scaleTween();
        this.interactive = true;
        gsap.to(this, {
            duration: 0.45,
            alpha: 1,
        })
    }

    private hide(): void {
        if(this.isHidden) return;
        this.isHidden = true;
        this.winMeterScaleTween!.kill()
        gsap.to(this, {
            duration: 0.45,
            alpha: 0,
            onComplete: () => {
                this.titleText.text = this.winString[0];
                this.winMeter.text = `$ ${0}`;
                this.currentLargeWinSeq = 1;
                if (CommonConfig.the.getCurrentState() == CommonConfig.BASE_GAME) {
                    Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
                } else {
                    Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
                }
                this.interactive = false;
                this.killTweens();
            }
        })
    }

    private killTweens(): void {
        gsap.killTweensOf(this);
        gsap.killTweensOf(this.titleText);
        gsap.killTweensOf(this.winMeter);
    }

    private updateWinSequence(): void {
        this.currentTitle = this.winString[this.currentLargeWinSeq];
        gsap.to(this.titleText, {
            duration: 0.1,
            alpha: 0,
            onComplete: () => {
                this.titleText.text = this.winString[this.currentLargeWinSeq];
                this.titleText.position.set((window.innerWidth - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
                if (window.innerWidth < window.innerHeight) {
                    this.titleText.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.titleText.width) / 2, this.bigWinSpine.y - this.titleText.height);
                }
                gsap.to(this.titleText, {
                    duration: 0.45,
                    alpha: 1
                })
            }
        })
    }

}