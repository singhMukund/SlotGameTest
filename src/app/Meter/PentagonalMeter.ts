import { Container, Text, TextStyle } from "pixi.js";

export class PentagonalMeter extends Container {
    private pentagonalCountText !: Text;

    constructor() {
        super();
        this.init();
        this.addToStage();
    }

    private init(): void {
        const buttonStyle2 = new TextStyle({
            fill: "#ffffff",
            fontSize: 48,
            fontWeight: "bold"
        });
        this.pentagonalCountText = new Text({
            text: `0/50`,
            style: buttonStyle2
        });
    }

    private addToStage(): void {
        this.addChild(this.pentagonalCountText);
    }

    updatePentagonalCount(value : number): void {
        this.pentagonalCountText.text = `${value}/50`;
    }

    resetWinAmount(): void {
        this.pentagonalCountText.text = `${0}/50`;
    }

}