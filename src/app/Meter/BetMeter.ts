import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";

export class BetMeter extends Container {
    private winMeterLabelText !: Text;
    private winMeterText !: Text;
    private betValue: number = 0;
    private winCurrency: string = '$';
    private gap: number = 5;

    constructor() {
        super();
        this.init();
        this.updateBetAmount(0);
        this.addToStage();
        Game.the.app.stage.on(CommonConfig.UPDATE_BET_METER, this.updateBetAmount, this);
        Game.the.app.stage.on(CommonConfig.CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN, this.checkEnableDisableBtn, this);
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.checkEnableDisableBtn, this);

        // this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
        // Game.the.app.stage.on(CommonConfig.RESET_WIN_METER, this.resetWinAmount, this);
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
            text: `BET : `,
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

    private checkEnableDisableBtn() :void{
        if(CommonConfig.the.getCurrentBetIndex() === 0){
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_MINUS_BTN,false);
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_PLUS_BTN,true);
        }else if(CommonConfig.the.getCurrentBetIndex() === (CommonConfig.BET_ARRAY.length - 1)){
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_MINUS_BTN,true);
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_PLUS_BTN,false);
        }else{
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_MINUS_BTN,true);
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_PLUS_BTN,true);
        }
    }

    private updateBetAmount(value : number): void {
        let currentIndex : number = CommonConfig.the.getCurrentBetIndex() + value;
        CommonConfig.the.setCurrentBetIndex(currentIndex);
        this.checkEnableDisableBtn();
        this.betValue = CommonConfig.BET_ARRAY[currentIndex];
        // this.winValue = CommonConfig.the.getCurrentWinAmount();
        this.winMeterText.text = `${this.winCurrency} ${this.betValue}`;
        this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
        CommonConfig.the.setBet(this.betValue);
    }

    private resetWinAmount(): void {
        this.betValue = CommonConfig.the.getCurrentWinAmount();
        this.winMeterText.text = `${this.betValue}`;
        this.winMeterText.x = this.winMeterLabelText.x + this.winMeterLabelText.width + this.gap;
    }

}