import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";

export class WinMeter extends Container {
    private winMeterLabelText !: Text;
    private winMeterText !: Text;
    private winValue: number = 0;
    private winCurrency: string = '$';
    private gap: number = 5;

    constructor() {
        super();
        this.init();
        this.updateWinAmount();
        this.addToStage();
        this.subscribeEvent();
    }

    private subscribeEvent() :void{
        Game.the.app.stage.on(CommonConfig.UPDATE_WIN_METER, this.updateWinAmount, this);
        Game.the.app.stage.on(CommonConfig.RESET_WIN_METER, this.resetWinAmount, this);
    }

    private init(): void {
        const buttonStyle = new TextStyle({
            fill: "#b6b6b6",
            fontSize: 24,
            fontWeight: "bold"
        });
        const buttonStyle2 = new TextStyle({
            fill: "#ffcd33",
            fontSize: 24,
            fontWeight: "bold"
        });
        this.winMeterLabelText = new Text({
            text: `WIN : ${this.winCurrency}`,
            style: buttonStyle
        });
        this.winMeterText = new Text({
            text: `${this.winValue}`,
            style: buttonStyle2
        })
    }

    private addToStage(): void {
        this.addChild(this.winMeterLabelText);
        this.addChild(this.winMeterText);
    }

    private updateWinAmount(): void {
        this.playIncrementAnimation(this.winMeterText, CommonConfig.the.getCurrentWinAmount());
        this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
    }

    private resetWinAmount(): void {
        this.winValue = CommonConfig.the.getCurrentWinAmount();
        this.winMeterText.text = `${this.winValue}`;
        this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
    }

    playIncrementAnimation(textObj: Text,targetValue: number) {
        const startValue = parseFloat(textObj.text);
        const duration = 0.4; // Fixed duration of 0.4 seconds

        gsap.to({ value: startValue }, {
            value: targetValue,
            duration: duration,
            ease: 'power1.out',
            onUpdate: function () {
                textObj.text = `${this.targets()[0].value.toFixed(2)}`;
                // textObj.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
            },
        });
    }
}