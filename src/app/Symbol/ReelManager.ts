import { Container, Graphics } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "./SymbolPool";
import { Reel } from "./Reel";
import { Game } from "../game";
import gsap from "gsap";


export class ReelManager extends Container {
    private static _the: ReelManager;
    private reel1 !: Reel;
    private reel2 !: Reel;
    private reel3 !: Reel;
    private reel4 !: Reel;
    private reel5 !: Reel;
    private maskContainer !: Graphics;
    private symbolPool !: SymbolPool;
    private reelsContainer !: Container;

    constructor() {
        super();
        this.symbolPool = new SymbolPool();
        this.initializeReelContainer();
        this.initGraphics();
        this.subscribeEvent();
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.SET_RESPONSE_AT_REEL, this.setSymbolAtReel, this);
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.spinTheReels, this);
        Game.the.app.stage.on(CommonConfig.PLAY_ANIMATED_WIN_SYMBOL, this.onPlayWinSymbol, this);
    }

    private initGraphics(): void {
        this.maskContainer = new Graphics();
        this.maskContainer.beginFill(0xffa500);
        this.maskContainer.drawRect(-210, -104, 1300, 1060);
        this.maskContainer.endFill();
        this.addChild(this.maskContainer);
        this.mask = this.maskContainer;
    }

    private onPlayWinSymbol() :void{
        let winGrid : Set<string> = CommonConfig.the.getWinGrid();
        // winGrid = new Set(['0,0', '0,2']);
        // CommonConfig.the.setWinGrid(winGrid);
        let winReelData : { [key: number]: number[] } = { };
        winGrid.forEach(position => {
            let reelRow : string[] = position.split(",");
            console.log(reelRow);
            if(winReelData.hasOwnProperty(Number(reelRow[0]))){
                winReelData[Number(reelRow[0])].push(Number(reelRow[1]));
            }else{
                winReelData[Number(reelRow[0])] = [Number(reelRow[1])] ;  
            }
            // (this.reelsContainer.children[Number(reelRow[0])] as Reel).playWinAnim([Number(reelRow[1])])
            // console.log(position); // Outputs each coordinate, e.g., "0,2", "1,2", etc.
        });
        CommonConfig.the.setWinReelIds([]);
        let winReelids: number[] = [];
        Object.keys(winReelData).forEach(key => {
            const reelKey = parseInt(key, 10);
            winReelids.push(reelKey);
            (this.reelsContainer.children[reelKey] as Reel).playWinAnim(winReelData[reelKey].sort())
        });
        CommonConfig.the.setWinReelIds(winReelids);

        console.log(winReelData);

        gsap.delayedCall(0.6, () => {
          let response : number[][] = CommonConfig.the.cascade(CommonConfig.the.getView(),winGrid);
          this.updateView(response);
          Game.the.app.stage.emit(CommonConfig.PLAY_DROP_REEL);
          gsap.delayedCall(2, () => {
            CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
          })
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

    private updateView(response : number[][]) : void {
        CommonConfig.the.setView(response);
        this.reelsContainer.children.forEach((value, index) => {
            (value as Reel).children.forEach((pos,posindex)=>{
                let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][posindex])]);
                pos.removeChildren();
                if(pos.name === 'pos_00'){
                    (value as Reel).updatePos_00WithSym(symbol);
                }else if(pos.name === 'pos_01'){
                    (value as Reel).updatePos_01WithSym(symbol);
                }else if(pos.name === 'pos_02'){
                    (value as Reel).updatePos_02WithSym(symbol);
                }else if(pos.name === 'pos_03'){
                    (value as Reel).updatePos_03WithSym(symbol);
                }else{
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
            (value as Reel).children.forEach((pos,posindex)=>{
                let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[index][posindex])]);
                pos.removeChildren();
                if(pos.name === 'pos_00'){
                    (value as Reel).updatePos_00WithSym(symbol);
                }else if(pos.name === 'pos_01'){
                    (value as Reel).updatePos_01WithSym(symbol);
                }else if(pos.name === 'pos_02'){
                    (value as Reel).updatePos_02WithSym(symbol);
                }else if(pos.name === 'pos_03'){
                    (value as Reel).updatePos_03WithSym(symbol);
                }else{
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
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel2.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel2.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel2.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel2.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel2.updatePos_04WithSym(symbol);
    }

    private insertReel3(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel3.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel3.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel3.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel3.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel3.updatePos_04WithSym(symbol);
    }

    private insertReel4(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel4.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel4.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel4.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel4.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel4.updatePos_04WithSym(symbol);
    }

    private insertReel5(): void {
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel5.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel5.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel5.updatePos_02WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[3]);
        this.reel5.updatePos_03WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[4]);
        this.reel5.updatePos_04WithSym(symbol);
    }


}