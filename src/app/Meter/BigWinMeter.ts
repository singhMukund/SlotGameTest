import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import gsap from "gsap";

export class BigWinMeter extends Container {
    private darkBg !: Graphics;
    private bigWinSpine !: Spine;
    private titleText !: Text;
    private winMeter !: Text;
    private winMeterGsapTween !: gsap.core.Tween;
    private winMeterScaleTween !: gsap.core.Tween;
    private currentvalue: number = 0;
    private speed: number = 0.1;
    constructor() {
        super();
        this.init();
        this.addToStage();
        this.setToPosition();
        this.playAnimation();
        this.playIncrementAnimation();
        this.scaleTween();
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
            text: `$ 100`,
            style: buttonStyle2
        })
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
        this.titleText.position.set(this.bigWinSpine.x + (this.bigWinSpine.width - this.titleText.width) / 2, (window.innerHeight - this.titleText.height) / 3);
        this.winMeter.position.set(this.titleText.x + (this.titleText.width - this.winMeter.width) / 2, (window.innerHeight - this.titleText.height) / 2.1);
    }

    playIncrementAnimation() {
        // const startValue = parseFloat(textObj.text);
        const duration = 0.4; // Fixed duration of 0.4 seconds
        this.currentvalue = 0;
        this.winMeter.text = '0';
        this.winMeterGsapTween = gsap.to(this.winMeter, {
            ease: 'power1.out',
            repeat: -1,
            onUpdate: () => {
                this.currentvalue += this.speed;
                this.currentvalue = Number(this.currentvalue.toFixed(2));
                this.winMeter.text = this.currentvalue.toString();
                this.winMeter.position.set(this.titleText.x + (this.titleText.width - this.winMeter.width) / 2, (window.innerHeight - this.titleText.height) / 2.1);
                // textObj.text = Math.round(this.targets()[0].value).toString();
                this.checkStopTween();
                // textObj.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
            },
        });
        this.winMeterGsapTween.play();
    }

    private checkStopTween(): void {
        if (this.currentvalue >= 100) {
            this.winMeterGsapTween.kill();
        }
    }

    private scaleTween(): void {
        this.winMeterScaleTween = gsap.to(this.winMeter.scale, {
            ease: 'power1.out',
            repeat: -1,
            yoyo : true,
            x: 1.2,
            y: 1.2
        });
        this.winMeterScaleTween.play()
    }

}