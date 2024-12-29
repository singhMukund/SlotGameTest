import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";

export class BalanceMeter extends Container {
    private winMeterLabelText !: Text;
    private winMeterText !: Text;
    private betValue: number = 0;
    private winCurrency: string = '$';
    private gap: number = 5;
    private state : string;
    constructor(state : string) {
        super();
        this.state = state;
        this.init();
        this.updateBalance();
        this.addToStage();
        if(this.state === CommonConfig.BASE_GAME){
            this.subscribeEvent();
        }else{
            this.subscribeEventFreeGame();
        }
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.UPDATE_BALANCE_TEXT, this.updateBalance, this);
    }

    private subscribeEventFreeGame(): void {
        Game.the.app.stage.on(CommonConfig.FG_UPDATE_BALANCE_TEXT, this.updateBalance, this);
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
            text: `CREDITS : `,
            style: buttonStyle
        });
        this.winMeterText = new Text({
            text: `${this.winCurrency} ${this.betValue}`,
            style: buttonStyle2
        })
    }

    private addToStage(): void {
        this.addChild(this.winMeterLabelText);
        this.addChild(this.winMeterText);
    }

    private updateBalance(): void {
        if(this.state !== CommonConfig.the.getCurrentState()){
            return;
        }
        let balance : number = CommonConfig.the.getBalance();
        this.winMeterText.text = `${this.winCurrency} ${balance}`;
        this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
    }

}