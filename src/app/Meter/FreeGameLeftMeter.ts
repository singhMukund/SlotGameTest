import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class FreeGameLeftMeter extends Container {
    private freeGameLeftMeterText !: Text;
    private freeSpinsLeftValue: number = 0;

    constructor() {
        super();
        this.init();
        this.updateWinAmount();
        this.addToStage();
        Game.the.app.stage.on(CommonConfig.UPDATE_FREEGAME_LEFT_METER, this.updateWinAmount, this);
    }

    private init(): void {
        const buttonStyle2 = new TextStyle({
            fill: "#ffffff",
            fontSize: 24,
            fontWeight: "bold"
        });
        this.freeGameLeftMeterText = new Text({
            text: `${this.freeSpinsLeftValue} FREE SPINS LEFT`,
            style: buttonStyle2
        })
    }

    private addToStage(): void {
        this.addChild(this.freeGameLeftMeterText);
    }

    private updateWinAmount(): void {
        this.freeSpinsLeftValue = CommonConfig.the.getFreeSpinsLeftValue();
        this.freeGameLeftMeterText.text = `${this.freeSpinsLeftValue} FREE SPINS LEFT`;
    }
}