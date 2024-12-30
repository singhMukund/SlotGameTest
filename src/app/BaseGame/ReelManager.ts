import { Assets, Container, Graphics, Sprite, Spritesheet } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "../Symbol/SymbolPool";
import { Game } from "../game";
import gsap from "gsap";
import { Reel } from "./Reel";
import { Pos } from "./Pos";
import { WinframeReelContainer } from "../Winframe/WinframeReelContainer";

interface winframeData {
    reelId: number;
    rowId: number;
    direction: number[]
}
export class ReelManager extends Container {
    private static _the: ReelManager;
    private reel1 !: Reel;
    private reel2 !: Reel;
    private reel3 !: Reel;
    private reel4 !: Reel;
    private reel5 !: Reel;

    private winframeReel1 !: WinframeReelContainer;
    private winframeReel2 !: WinframeReelContainer;
    private winframeReel3 !: WinframeReelContainer;
    private winframeReel4 !: WinframeReelContainer;
    private winframeReel5 !: WinframeReelContainer;

    private maskContainer !: Graphics;
    private reelsContainer !: Container;
    private winframeContainer !: Container;
    private symboldWinIds: number[] = [];
    private currentIndexSymbolWinIds: number = 0;
    private winframeData: winframeData[] = [];

    constructor() {
        super();
        this.initializeReelContainer();
        // this.initializeWinframeContainer();
        this.initGraphics();
        this.subscribeEvent();
        let randomWild: number[][] = [
            [0, 4, 0, 6, 3],
            [0, 6, 0, 0, 3],
            [4, 0, 3, 3, 0],
            [0, 3, 3, 4, 0],
            [0, 0, 0, 3, 4]
        ];
        this.updateView(randomWild);
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.SET_RESPONSE_AT_REEL, this.setSymbolAtReel, this);
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.spinTheReels, this);
        Game.the.app.stage.on(CommonConfig.PLAY_ANIMATED_WIN_SYMBOL, this.onPlayWinSymbol, this);
        Game.the.app.stage.on(CommonConfig.UPDATE_VIEW_ON_REEL, this.updateView, this);
    }

    private initGraphics(): void {
        this.maskContainer = new Graphics();
        this.maskContainer.beginFill(0xffa500);
        this.maskContainer.drawRect(-85, -90, 850, 840);
        this.maskContainer.endFill();
        // this.maskContainer.alpha = 0.5;
        this.addChild(this.maskContainer);
        this.mask = this.maskContainer;
    }

    // [
    //     {
    //         "value": [
    //             "1,4",
    //             "2,4",
    //             "3,4",
    //             "4,4",
    //             "4,3",
    //             "3,3"
    //         ]
    //     },
    //     {
    //         "value": [
    //             "2,1",
    //             "2,2",
    //             "3,2",
    //             "4,2",
    //             "2,3"
    //         ]
    //     }
    // ]
    private onPlayWinSymbol(): void {
        let winGrid: Map<number, Set<string>> = CommonConfig.the.getWinGrid();
        this.symboldWinIds = [];
        this.currentIndexSymbolWinIds = 0;
        for (const symbol of winGrid.keys()) {
            this.symboldWinIds.push(symbol);
        }
        this.playAnimatons()
    }

    // private createWinFrame(): void {
    //     let winGrid: Map<number, Set<string>> = CommonConfig.the.getWinGrid();
    //     let winReelData: { [key: number]: number[] } = {};
    //     let winData: Set<string> = winGrid.get(this.symboldWinIds[this.currentIndexSymbolWinIds])!;
    //     for (let [key, value] of winGrid) {
    //         value = this.sortArray(value);
    //         value.forEach(position => {
    //             let reelRow: string[] = position.split(",");

    //             if (winReelData.hasOwnProperty(Number(reelRow[0]))) {
    //                 winReelData[Number(reelRow[0])].push(Number(reelRow[1]));
    //             } else {
    //                 winReelData[Number(reelRow[0])] = [Number(reelRow[1])];
    //             }
    //         });
    //     }
    //     winData.forEach(position => {
    //         position = this.sortArray(position)
    //         let reelRow: string[] = position.split(",");
    //         // console.log(reelRow);
    //         if (winReelData.hasOwnProperty(Number(reelRow[0]))) {
    //             winReelData[Number(reelRow[0])].push(Number(reelRow[1]));
    //         } else {
    //             winReelData[Number(reelRow[0])] = [Number(reelRow[1])];
    //         }
    //     });
    // }

    private sortArray(arr: Set<string>): Set<string> {
        const newArr =  Array.from(arr).sort((a, b) => {
            const [reelA, rowA] = a.split(',').map(Number);
            const [reelB, rowB] = b.split(',').map(Number);
          
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
        let winGrid: Map<number, Set<string>> = CommonConfig.the.getWinGrid();
        let winReelData: { [key: number]: number[] } = {};
        let winData: Set<string> = winGrid.get(this.symboldWinIds[this.currentIndexSymbolWinIds])!;
        winData.forEach(position => {
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
        Object.keys(winReelData).forEach(key => {
            const reelKey = parseInt(key, 10);
            (this.reelsContainer.children[reelKey] as Reel).playWinAnim(winReelData[reelKey].sort())
        });
        let reelX: number = Number(Object.keys(winReelData).sort()[0]);
        let rowY: number = winReelData[reelX].sort()[0];
        CommonConfig.the.setTotalWinSymbolCount(CommonConfig.the.getTotalWinSymbolCount() + winData.size);
        let cascadeWinAmount: number = CommonConfig.the.getWinAmount(this.symboldWinIds[this.currentIndexSymbolWinIds], winData.size);
        cascadeWinAmount = Number(cascadeWinAmount.toFixed(2));
        CommonConfig.the.setCurrentWinAmount(CommonConfig.the.getCurrentWinAmount() + cascadeWinAmount);
        // console.log("Update --------"+ CommonConfig.the.getTotalWinSymbolCount());
        CommonConfig.the.setLineWinAmount(cascadeWinAmount);
        Game.the.app.stage.emit(CommonConfig.UPDATE_LINE_WIN_METER, [reelX, rowY]);
        Game.the.app.stage.emit(CommonConfig.UPDATE_WIN_METER);
        gsap.delayedCall(1, () => {
            Game.the.app.stage.emit(CommonConfig.UPDATE_PENTAGONAL_METER);
            this.currentIndexSymbolWinIds++;
            if (this.currentIndexSymbolWinIds >= this.symboldWinIds.length) {
                this.shuffleAndCascadeReel();
            } else {
                this.playAnimatons()
            }
        })
    }



    private shuffleAndCascadeReel(): void {
        let winGrid: Map<number, Set<string>> = CommonConfig.the.getWinGrid();
        let winGridSet: Set<string> = new Set();
        let winReelData: { [key: number]: number[] } = {};
        for (let i: number = 0; i < this.symboldWinIds.length; i++) {
            let winData: Set<string> = winGrid.get(this.symboldWinIds[i])!;
            winData.forEach(position => {
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
        Object.keys(winReelData).forEach(key => {
            const reelKey = parseInt(key, 10);
            winReelids.push(reelKey);
            (this.reelsContainer.children[reelKey] as Reel).playAfterHideCurrentSymbol(winReelData[reelKey].sort())
        });
        CommonConfig.the.setWinReelIds(winReelids);
        let response: number[][] = CommonConfig.the.cascade(CommonConfig.the.getView(), winGridSet);
        this.updateView(response);
        Game.the.app.stage.emit(CommonConfig.PLAY_DROP_REEL);
        gsap.delayedCall(1, () => {
            // CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }

    private initializeReelContainer(): void {
        this.reelsContainer = new Container();
        this.addChild(this.reelsContainer);
        this.reel1 = new Reel(0);
        this.reelsContainer.addChild(this.reel1);
        this.reel1.position.set(CommonConfig.reelWidth * 0, 0);
        this.reel2 = new Reel(1);
        this.reelsContainer.addChild(this.reel2);
        this.reel2.position.set(CommonConfig.reelWidth * 1, 0);
        this.reel3 = new Reel(2);
        this.reelsContainer.addChild(this.reel3);
        this.reel3.position.set(CommonConfig.reelWidth * 2, 0);
        this.reel4 = new Reel(3);
        this.reelsContainer.addChild(this.reel4);
        this.reel4.position.set(CommonConfig.reelWidth * 3, 0);
        this.reel5 = new Reel(4);
        this.reel5.position.set(CommonConfig.reelWidth * 4, 0);
        this.reelsContainer.addChild(this.reel5);
    }

    private initializeWinframeContainer(): void {
        this.winframeContainer = new Container();
        this.addChild(this.winframeContainer);
        this.winframeReel1 = new WinframeReelContainer(0);
        this.winframeContainer.addChild(this.winframeReel1);
        this.winframeReel1.position.set(CommonConfig.reelWidth * 0, 0);
        this.winframeReel2 = new WinframeReelContainer(1);
        this.winframeContainer.addChild(this.winframeReel2);
        this.winframeReel2.position.set(CommonConfig.reelWidth * 1, 0);
        this.winframeReel3 = new WinframeReelContainer(2);
        this.winframeContainer.addChild(this.winframeReel3);
        this.winframeReel3.position.set(CommonConfig.reelWidth * 2, 0);
        this.winframeReel4 = new WinframeReelContainer(3);
        this.winframeContainer.addChild(this.winframeReel4);
        this.winframeReel4.position.set(CommonConfig.reelWidth * 3, 0);
        this.winframeReel5 = new WinframeReelContainer(4);
        this.winframeReel5.position.set(CommonConfig.reelWidth * 4, 0);
        this.winframeContainer.addChild(this.winframeReel5);
    }

    private updateView(response: number[][]): void {
        CommonConfig.the.setView(response);
        this.reelsContainer.children.forEach((value, index) => {
            (value as Reel).children.forEach((pos, posindex) => {
                let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][posindex])]);
                (pos as Pos).getSymContainer().removeChildren();
                (pos as Pos).updatePosWithSym(symbol);
            })
        })
    }

    private setSymbolAtReel(): void {
        let response: number[][] = CommonConfig.the.generateRandomView();
        CommonConfig.the.setView(response);
        this.reelsContainer.children.forEach((reel, index) => {
            (reel as Reel).children.forEach((pos, posindex) => {
                let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][posindex])]);
                (pos as Pos).getSymContainer().removeChildren();
                (pos as Pos).updatePosWithSym(symbol);
            })
        })
    }


    spinTheReels(): void {
        this.reelsContainer.children.forEach((reel, index) => {
            (reel as Reel).spinTheReel();
        })
    }

}