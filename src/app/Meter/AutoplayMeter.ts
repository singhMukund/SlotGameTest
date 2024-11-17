import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";

export class AutoplayMeter extends Container {
    private autoplayCount !: Text;
    private autoplayCountValue: number = 0;

    constructor() {
        super();
        this.init();
        this.addToStage();
        Game.the.app.stage.on(CommonConfig.UPDATE_AUTOPLAY_METER, this.updateAutoplayValue, this);
        Game.the.app.stage.on(CommonConfig.RESET_AUTOPLAY_METER, this.resetAutoplayValue, this);
        Game.the.app.stage.on(CommonConfig.ENABLE_AUTOPLAY_METER_VIEW, this.onEnableView, this);
    }

    private init(): void {
        const buttonStyle2 = new TextStyle({
            fill: "#ffcd33",
            fontSize: 30,
            fontWeight: "bold"
        });
        this.autoplayCount = new Text({
            text: `${25}`,
            style: buttonStyle2
        });
        this.visible = false;
    }

    private addToStage(): void {
        this.addChild(this.autoplayCount);
    }

    private updateAutoplayValue(): void {
        this.autoplayCountValue = CommonConfig.the.getAutoplayCount();
        this.autoplayCount.text = `${this.autoplayCountValue}`;
    }

    private resetAutoplayValue(): void {
        CommonConfig.the.setAutoplayCount(25);
        this.autoplayCountValue = CommonConfig.the.getAutoplayCount();
        this.autoplayCount.text = `${this.autoplayCountValue}`;
    }

    private onEnableView(value : boolean) :void{
        this.visible = value;
        this.updateAutoplayValue();
    }
}