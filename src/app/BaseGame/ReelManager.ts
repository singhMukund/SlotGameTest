import { Assets, Container, Graphics, Sprite, Spritesheet } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "../Symbol/SymbolPool";
import { Game } from "../game";
import gsap from "gsap";
import { Reel } from "./Reel";


export class ReelManager extends Container {
    private static _the: ReelManager;
    private reel1 !: Reel;
    private reel2 !: Reel;
    private reel3 !: Reel;
    private reel4 !: Reel;
    private reel5 !: Reel;
    private maskContainer !: Graphics;
    private reelsContainer !: Container;
    private symboldWinIds: number[] = [];
    private currentIndexSymbolWinIds: number = 0;
    private borderTexture !: Spritesheet;
    private borderContainer !: Container;   

    constructor() {
        super();
        this.initializeReelContainer();
        this.initGraphics();
        this.subscribeEvent();
        let randomWild: number[][] = [
            [4, 4, 5, 6, 3],
            [0, 6, 0, 0, 3],
            [4, 0, 3, 3, 0],
            [0, 3, 3, 4, 0],
            [0, 0, 0, 3, 4]
        ];
        this.updateView(randomWild);
        this.createBorder();
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
        let reelX :number =  Number(Object.keys(winReelData).sort()[0]);
        let rowY : number =  winReelData[reelX].sort()[0];
        CommonConfig.the.setTotalWinSymbolCount(CommonConfig.the.getTotalWinSymbolCount() + winData.size);
        let cascadeWinAmount : number = CommonConfig.the.getWinAmount(this.symboldWinIds[this.currentIndexSymbolWinIds], winData.size);
        cascadeWinAmount = Number(cascadeWinAmount.toFixed(2));
        CommonConfig.the.setCurrentWinAmount(CommonConfig.the.getCurrentWinAmount() + cascadeWinAmount);
        // console.log("Update --------"+ CommonConfig.the.getTotalWinSymbolCount());
        CommonConfig.the.setLineWinAmount(cascadeWinAmount);
        Game.the.app.stage.emit(CommonConfig.UPDATE_LINE_WIN_METER,[reelX,rowY]);
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

    private createBorder(): void {
        this.borderContainer = new Container();
        this.borderTexture = Assets.get("borderStick")
        let borderGlow = new Sprite(this.borderTexture.textures[`Border_glow_v1.png`]);
        let borderStick = new Sprite(this.borderTexture.textures[`Border_normal_v1.png`]);
        this.borderContainer.addChild(borderGlow);
        this.borderContainer.addChild(borderStick);
        this.borderContainer.scale.set(1,0.6);
        this.borderContainer.position.set(90, 75);
        this.addChild(this.borderContainer);

        this.borderContainer = new Container();
        this.borderTexture = Assets.get("borderStick")
        let borderGlow2 = new Sprite(this.borderTexture.textures[`Border_glow_v1.png`]);
        let borderStick2 = new Sprite(this.borderTexture.textures[`Border_normal_v1.png`]);
        this.borderContainer.addChild(borderGlow2);
        this.borderContainer.addChild(borderStick2);
        this.borderContainer.scale.set(1,0.6);
        this.borderContainer.position.set(90, 75);
        this.addChild(this.borderContainer);

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
        this.insertReel1();
        this.insertReel2();
        this.insertReel3();
        this.insertReel4();
        this.insertReel5();
    }

    private updateView(response: number[][]): void {
        CommonConfig.the.setView(response);
        this.reelsContainer.children.forEach((value, index) => {
            (value as Reel).children.forEach((pos, posindex) => {
                let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][posindex])]);
                pos.removeChildren();
                if (pos.name === 'pos_00') {
                    (value as Reel).updatePos_00WithSym(symbol);
                } else if (pos.name === 'pos_01') {
                    (value as Reel).updatePos_01WithSym(symbol);
                } else if (pos.name === 'pos_02') {
                    (value as Reel).updatePos_02WithSym(symbol);
                } else if (pos.name === 'pos_03') {
                    (value as Reel).updatePos_03WithSym(symbol);
                } else {
                    (value as Reel).updatePos_04WithSym(symbol);
                }

            })
            // let symbol1 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][0])]);
            // let symbol2 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][1])]);
            // let symbol3 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][2])]);
            // (value as Reel).children.forEach((value) => {
            //     value.removeChildren();
            // });
            // (value as Reel).updatePos_00WithSym(symbol1);
            // (value as Reel).updatePos_01WithSym(symbol2);
            // (value as Reel).updatePos_02WithSym(symbol3);
        })
    }

    private setSymbolAtReel(): void {
        let response: number[][] = CommonConfig.the.generateRandomView();
        CommonConfig.the.setView(response);
        this.reelsContainer.children.forEach((value, index) => {
            (value as Reel).children.forEach((pos, posindex) => {
                let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][posindex])]);
                pos.removeChildren();
                if (pos.name === 'pos_00') {
                    (value as Reel).updatePos_00WithSym(symbol);
                } else if (pos.name === 'pos_01') {
                    (value as Reel).updatePos_01WithSym(symbol);
                } else if (pos.name === 'pos_02') {
                    (value as Reel).updatePos_02WithSym(symbol);
                } else if (pos.name === 'pos_03') {
                    (value as Reel).updatePos_03WithSym(symbol);
                } else {
                    (value as Reel).updatePos_04WithSym(symbol);
                }

            })
            // let symbol1 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][0])]);
            // let symbol2 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][1])]);
            // let symbol3 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][2])]);
            // (value as Reel).children.forEach((value) => {
            //     value.removeChildren();
            // });
            // (value as Reel).updatePos_00WithSym(symbol1);
            // (value as Reel).updatePos_01WithSym(symbol2);
            // (value as Reel).updatePos_02WithSym(symbol3);
        })
    }


    spinTheReels(): void {
        // this.takeInputFromSymbol()
        this.reel1.spinTheReel();
        this.reel2.spinTheReel();
        this.reel3.spinTheReel();
        this.reel4.spinTheReel();
        this.reel5.spinTheReel();
        // gsap.delayedCall(3,()=>);
    }

    private takeInputFromSymbol(): void {
        let value = prompt("Set the symbol id which you want to see its win animation\n Note: Symbol id should be from 1 to 12");
        CommonConfig.the.setwinningSymbolIdFromUser(Number(value));
        CommonConfig.the.setwinningSymbolIds(Number(value));
    }

    private insertReel1(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel1.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel1.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel1.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel1.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel1.updatePos_04WithSym(symbol);

        // for(let i : number = 0;i< CommonConfig.symbolsPerReel; i++){
        //     let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        //     symbol.position.set(0,CommonConfig.symbolHeight *  i);
        //     this.reel1.addChild(symbol);
        // }
    }

    private insertReel2(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[5]);
        this.reel2.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[5]);
        this.reel2.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[6]);
        this.reel2.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[7]);
        this.reel2.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel2.updatePos_04WithSym(symbol);
    }

    private insertReel3(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel3.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel3.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel3.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[5]);
        this.reel3.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[6]);
        this.reel3.updatePos_04WithSym(symbol);
    }

    private insertReel4(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel4.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[7]);
        this.reel4.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[7]);
        this.reel4.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[8]);
        this.reel4.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel4.updatePos_04WithSym(symbol);
    }

    private insertReel5(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel5.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel5.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel5.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel5.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel5.updatePos_04WithSym(symbol);
    }


}