import { Application, Container, Graphics, Ticker, } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "../Symbol/SymbolPool";
import gsap from "gsap";
import { Reel } from "./Reel";
import { Pos } from "./Pos";
import { StaticSymbol } from "../Symbol/StaticSymbol";


export class ReelManager extends Container {
  private maskContainer!: Graphics;
  private reelsContainer!: Container;
  private reelManagerContainer !: Container;
  private ticker: Ticker;
  private spinStopCalled : boolean = false;
  private normalStopSpinDelayCall !: gsap.core.Tween

  constructor(private app: Application,private config: CommonConfig) {
    super();
    this.reelManagerContainer = new Container();
    this.addChild(this.reelManagerContainer);
    this.initializeReelContainer();
    this.initGraphics();
    this.subscribeEvent();
    let randomWild: number[][] = [
      [1, 4, 5, 0, 1],
      [0, 2, 3, 2, 1],
      [4, 0, 4, 3, 4]
    ];
    this.updateView(randomWild);
    this.ticker = new Ticker();
    this.ticker.add(this.update, this);
    this.app.stage.on(CommonConfig.SPIN_STOPPED, this.onSpinStopped, this);
  }

  private onSpinStopped(): void {
    this.ticker.stop();
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).toBeStopped = false;
      (reel as Reel).updateFinalPosition();
    })
    this.spinStopCalled = false;
    this.app.stage.emit(CommonConfig.CHANGE_BUTTON_STATE, CommonConfig.BUTTON_STATE_SPIN);
  }

  private update(): void {
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).spinTheReel();
    });
  }

  private subscribeEvent(): void {
    this.app.stage.on(
      CommonConfig.SET_RESPONSE_AT_REEL,
      this.setSymbolAtReel,
      this
    );
    this.app.stage.on(CommonConfig.START_SPIN, this.spinTheReels, this);
    this.app.stage.on(CommonConfig.STOP_SPIN, this.stopSpin, this);
    this.app.stage.on(
      CommonConfig.UPDATE_VIEW_ON_REEL,
      this.updateView,
      this
    );
  }

  private initGraphics(): void {
    this.maskContainer = new Graphics();
    this.maskContainer.beginFill(0xffa500);
    this.maskContainer.drawRect(-49, -20.5, 800, 560);
    this.maskContainer.endFill();
    this.maskContainer.position.set(-91, -60.5);
    // this.maskContainer.alpha = 0.5;
    this.reelManagerContainer.addChild(this.maskContainer);
    this.mask = this.maskContainer;
  }

  private initializeReelContainer(): void {
    this.reelsContainer = new Container();
    this.reelManagerContainer.addChild(this.reelsContainer);
    for (let i: number = 0; i < CommonConfig.totalReel; i++) {
      const reel: Reel = new Reel(i,this.app,this.config);
      reel.position.set(CommonConfig.reelWidth * i, 0);
      this.reelsContainer.addChild(reel);
    }
  }

  private updateView(response: number[][]): void {
    this.config.setView(response);
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).posContainer.children.forEach((pos, posindex) => {
        let symbol = SymbolPool.the.getSymbol(
          CommonConfig.symbolIds[Number(response[index][posindex])]
        );
        (pos as Pos).getSymContainer().removeChildren();
        (pos as Pos).updatePosWithSym(symbol as StaticSymbol);
      });
    });
  }

  private setSymbolAtReel(): void {
    let response: number[][] = this.config.generateRandomView();
    this.config.setView(response);
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).posContainer.children.forEach((pos, posindex) => {
        let symbol = SymbolPool.the.getSymbol(
          CommonConfig.symbolIds[Number(response[index][posindex])]
        );
        (pos as Pos).getSymContainer().removeChildren();
        (pos as Pos).updatePosWithSym(symbol as StaticSymbol);
      });
    });
  }

  private stopSpin() :void{
    this.spinStopCalled = true;
    this.normalStopSpinDelayCall.kill();
    let response: number[][] = this.config.generateRandomView();
    this.updateView(response);
    console.log("--------------stopFromButton");
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).toBeStopped = true;
      (reel as Reel).updatePosition();
    })
  }

  spinTheReels(): void {
    this.normalStopSpinDelayCall = gsap.delayedCall(5, () => {
      if(!this.spinStopCalled){
        let response: number[][] = this.config.generateRandomView();
        this.updateView(response);
        console.log("--------------stopped");
        this.reelsContainer.children.forEach((reel, index) => {
          (reel as Reel).toBeStopped = true;
          (reel as Reel).updatePosition();
        })
      }
    });
    this.normalStopSpinDelayCall.play();
    gsap.delayedCall(2 , () => {
       //This delay is for response, if I get response from server this delay code will be removed, button state will change after response from server
       this.app.stage.emit(CommonConfig.CHANGE_BUTTON_STATE, CommonConfig.BUTTON_STATE_STOP);
    })
    this.ticker.start();
  }
}