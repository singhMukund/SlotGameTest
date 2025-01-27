import { Container, Graphics, Ticker, } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "../Symbol/SymbolPool";
import { Game } from "../game";
import gsap from "gsap";
import { Reel } from "./Reel";
import { Pos } from "./Pos";
import { ISingleWinDetails } from "../Interface/GameInterface";
import { StaticSymbol } from "../Symbol/StaticSymbol";


interface winframeData {
  reelId: number;
  rowId: number;
  direction: number[];
}
export class ReelManager extends Container {
  private maskContainer!: Graphics;
  private reelsContainer!: Container;
  private reelManagerContainer !: Container;
  private ticker: Ticker;

  constructor() {
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
    Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.onSpinStopped, this);
  }

  private onSpinStopped(): void {
    this.ticker.stop();
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).toBeStopped = false;
      (reel as Reel).updateFinalPosition();
    })

  }

  private update(): void {
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).spinTheReel();
    });
  }

  private subscribeEvent(): void {
    Game.the.app.stage.on(
      CommonConfig.SET_RESPONSE_AT_REEL,
      this.setSymbolAtReel,
      this
    );
    Game.the.app.stage.on(CommonConfig.START_SPIN, this.spinTheReels, this);
    Game.the.app.stage.on(
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
      const reel: Reel = new Reel(i);
      reel.position.set(CommonConfig.reelWidth * i, 0);
      this.reelsContainer.addChild(reel);
    }
  }

  private updateView(response: number[][]): void {
    CommonConfig.the.setView(response);
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
    let response: number[][] = CommonConfig.the.generateRandomView();
    CommonConfig.the.setView(response);
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

  spinTheReels(): void {
    gsap.delayedCall(5 , () => {
      let response: number[][] = CommonConfig.the.generateRandomView();
      this.updateView(response);
      console.log("--------------stopped");
      this.reelsContainer.children.forEach((reel, index) => {
        (reel as Reel).toBeStopped = true;
        (reel as Reel).updatePosition();
      })
    })
    this.ticker.start();
  }
}