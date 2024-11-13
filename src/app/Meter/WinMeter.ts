import { Container, Text, TextStyle } from "pixi.js";

export class WinMeter extends Container{
    private winMeterLabelText !: Text;
    private winMeterText !: Text;
    private winValue : number = 0;
    private winCurrency : string = '$';
    private gap : number = 5;

    constructor(){
        super();
        this.init();
        this.updateWinAmount();
        this.addToStage();
    }

    private init() :void{
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
            text:`win amount :`,
            style: buttonStyle
        });
        this.winMeterText = new Text({
            text:`${this.winCurrency} ${this.winValue}`,
            style: buttonStyle2
        })
    }

    private addToStage() :void{
        this.addChild(this.winMeterLabelText);
        this.addChild(this.winMeterText);
    }

    private updateWinAmount() : void{
        this.winMeterText.text = `${this.winCurrency} ${this.winValue}`;
        this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
    }
}