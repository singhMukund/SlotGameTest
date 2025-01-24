import { Container, Graphics, } from "pixi.js";
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
  private winframeContainer!: Container;
  private symboldWinIds: number[] = [];
  private currentIndexSymbolWinIds: number = 0;
  private winframeData: winframeData[] = [];
  private musicalNoteContainer! : Container;
  private reelManagerContainer !: Container;

  constructor() {
    super();
    this.reelManagerContainer = new Container();
    this.addChild(this.reelManagerContainer);
    this.initializeReelContainer();
    this.initGraphics();
    this.subscribeEvent();
    let randomWild: number[][] = [
      [1, 4, 5],
      [0, 2, 3],
      [4, 0, 4]
    ];
    this.updateView(randomWild);
  }

  private subscribeEvent(): void {
    Game.the.app.stage.on(
      CommonConfig.SET_RESPONSE_AT_REEL,
      this.setSymbolAtReel,
      this
    );
    Game.the.app.stage.on(CommonConfig.START_SPIN, this.spinTheReels, this);
    Game.the.app.stage.on(
      CommonConfig.PLAY_ANIMATED_WIN_SYMBOL,
      this.onPlayWinSymbol,
      this
    );
    Game.the.app.stage.on(
      CommonConfig.UPDATE_VIEW_ON_REEL,
      this.updateView,
      this
    );
    Game.the.app.stage.on(
      CommonConfig.PLAY_CASCADE_DROP_ANIMATION,
      this.shuffleAndCascadeReel,
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

  private onPlayWinSymbol(): void {
    let winGrid: Map<number, ISingleWinDetails> = CommonConfig.the.getWinGrid();
    this.symboldWinIds = [];
    this.currentIndexSymbolWinIds = 0;
    for (const symbol of winGrid.keys()) {
        this.symboldWinIds.push(winGrid.get(symbol)!.id);
    }
    this.playAnimatons();
  }

  private sortArray(arr: Set<string>): Set<string> {
    const newArr = Array.from(arr).sort((a, b) => {
      const [reelA, rowA] = a.split(",").map(Number);
      const [reelB, rowB] = b.split(",").map(Number);

      if (reelA !== reelB) {
        return reelA - reelB; // Sort by reel first
      } else {
        return rowA - rowB; // If reel is the same, sort by row
      }
    });
    const sortedSet = new Set(newArr);
    return sortedSet;
  }

  private playAnimatons(): void {
    let winGrid: Map<number, ISingleWinDetails> = CommonConfig.the.getWinGrid();
    let winReelData: { [key: number]: number[] } = {};
    let winData: Set<string> = winGrid.get(
      this.symboldWinIds[this.currentIndexSymbolWinIds]
    )!.index_set;
    this.createWinFrame(winData);
    gsap.delayedCall(0.5, () => {
      Game.the.app.stage.emit(CommonConfig.HIDE_WINFRAME_ANIMATION);
    });
    winData.forEach((position) => {
      let reelRow: string[] = position.split(",");
      // console.log(reelRow);
      if (winReelData.hasOwnProperty(Number(reelRow[0]))) {
        winReelData[Number(reelRow[0])].push(Number(reelRow[1]));
      } else {
        winReelData[Number(reelRow[0])] = [Number(reelRow[1])];
      }
    });
    CommonConfig.the.setWinReelIds([]);
    CommonConfig.the.setLineWinAmount(0);
    Object.keys(winReelData).forEach((key) => {
      const reelKey = parseInt(key, 10);
      (this.reelsContainer.children[reelKey] as Reel).playWinAnim(
        winReelData[reelKey].sort()
      );
    });
    let reelX: number = Number(Object.keys(winReelData).sort()[0]);
    let rowY: number = winReelData[reelX].sort()[0];
    CommonConfig.the.setTotalWinSymbolCount(
      CommonConfig.the.getTotalWinSymbolCount() + winData.size
    );
    let cascadeWinAmount: number = CommonConfig.the.getWinAmount(
      this.symboldWinIds[this.currentIndexSymbolWinIds],
      winData.size
    );
    cascadeWinAmount = Number(cascadeWinAmount.toFixed(2));
    CommonConfig.the.setCurrentWinAmount(
      CommonConfig.the.getCurrentWinAmount() + cascadeWinAmount
    );
    // console.log("Update --------"+ CommonConfig.the.getTotalWinSymbolCount());
    CommonConfig.the.setLineWinAmount(cascadeWinAmount);
    Game.the.app.stage.emit(CommonConfig.UPDATE_LINE_WIN_METER, [reelX, rowY]);
    Game.the.app.stage.emit(CommonConfig.UPDATE_WIN_METER);
    gsap.delayedCall(1, () => {
      Game.the.app.stage.emit(CommonConfig.UPDATE_PENTAGONAL_METER);
      this.currentIndexSymbolWinIds++;
      if (this.currentIndexSymbolWinIds >= this.symboldWinIds.length) {
        this.hideSymbol();
        // Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
      } else {
        this.playAnimatons();
      }
    });
  }

  private hideSymbol(): void {
    let winGrid: Map<number, ISingleWinDetails> = CommonConfig.the.getWinGrid();
    for(const [key,value] of winGrid){
      let winData: Set<string> = (value as ISingleWinDetails).index_set;
      winData.forEach((position) => {
        let reelRow: string[] = position.split(",");
        (this.reelsContainer.children[Number(reelRow[0])] as Reel).hideSymbolAnim(Number(reelRow[1]));
      });
    }
    gsap.delayedCall(0.4, () => {
      this.shuffleAndCascadeReel();
    });
  }

  private createWinFrame(winData: Set<string>): void {
    this.winframeData = [];
    winData = this.sortArray(winData);
    winData.forEach((position) => {
      let reelRow: string[] = position.split(",");
      let direction: number[] = [];
      let leftN: string = [Number(reelRow[0]) - 1, Number(reelRow[1])].join(
        ","
      );
      winData.has(leftN) ? direction.push(-1) : direction.push(1);
      let rightN: string = [Number(reelRow[0]) + 1, Number(reelRow[1])].join(
        ","
      );
      winData.has(rightN) ? direction.push(-1) : direction.push(1);
      let topN: string = [Number(reelRow[0]), Number(reelRow[1]) - 1].join(",");
      winData.has(topN) ? direction.push(-1) : direction.push(1);
      let botttomN: string = [Number(reelRow[0]), Number(reelRow[1]) + 1].join(
        ","
      );
      winData.has(botttomN) ? direction.push(-1) : direction.push(1);
      let winFrameData: winframeData = {
        reelId: Number(reelRow[0]),
        rowId: Number(reelRow[1]),
        direction: direction,
      };
      this.winframeData.push(winFrameData);
    });
  }

  private shuffleAndCascadeReel(): void {
    let winGrid: Map<number, ISingleWinDetails> = CommonConfig.the.getWinGrid();
    let winGridSet: Set<string> = new Set();
    let winReelData: { [key: number]: number[] } = {};
    for (let i: number = 0; i < this.symboldWinIds.length; i++) {
      let winData: Set<string> = winGrid.get(this.symboldWinIds[i])!.index_set;
      winData.forEach((position) => {
        let reelRow: string[] = position.split(",");
        winGridSet.add(position);
        // console.log(reelRow);
        if (winReelData.hasOwnProperty(Number(reelRow[0]))) {
          winReelData[Number(reelRow[0])].push(Number(reelRow[1]));
        } else {
          winReelData[Number(reelRow[0])] = [Number(reelRow[1])];
        }
      });
    }
    let winReelids: number[] = [];
    Object.keys(winReelData).forEach((key) => {
      const reelKey = parseInt(key, 10);
      winReelids.push(reelKey);
      (
        this.reelsContainer.children[reelKey] as Reel
      ).playAfterHideCurrentSymbol(winReelData[reelKey].sort());
    });
    CommonConfig.the.setWinReelIds(winReelids);
    let response: number[][] = CommonConfig.the.cascade(
      CommonConfig.the.getView(),
      winGridSet
    );
    this.updateView(response);
    Game.the.app.stage.emit(CommonConfig.PLAY_DROP_REEL);
    gsap.delayedCall(1, () => {
      // CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
      Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
    });
  }

  private initializeReelContainer(): void {
    this.reelsContainer = new Container();
    this.reelManagerContainer.addChild(this.reelsContainer);
    for(let i : number = 0; i< CommonConfig.totalReel;i++){
      const reel : Reel = new Reel(i);
      reel.position.set(CommonConfig.reelWidth * i, 0);
      this.reelsContainer.addChild(reel);
    }
  }

  private updateView(response: number[][]): void {
    CommonConfig.the.setView(response);
    this.reelsContainer.children.forEach((value, index) => {
      (value as Reel).children.forEach((pos, posindex) => {
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
      (reel as Reel).children.forEach((pos, posindex) => {
        let symbol = SymbolPool.the.getSymbol(
          CommonConfig.symbolIds[Number(response[index][posindex])]
        );
        (pos as Pos).getSymContainer().removeChildren();
        (pos as Pos).updatePosWithSym(symbol as StaticSymbol);
      });
    });
  }

  spinTheReels(): void {
    this.reelsContainer.children.forEach((reel, index) => {
      (reel as Reel).spinTheReel();
    });
  }
}