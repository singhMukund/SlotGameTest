import { Container, Graphics } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "./SymbolPool";
import { Reel } from "./Reel";
import { Game } from "../game";
import gsap from "gsap";


export class ReelManager extends Container{
    private static _the: ReelManager;
    private reel1 !: Reel;
    private reel2 !: Reel;
    private reel3 !: Reel;
    private reel4 !: Reel;
    private reel5 !: Reel;
    private maskContainer !: Graphics;
    private symbolPool !: SymbolPool;
    static get the(): ReelManager {
        if (!ReelManager._the) {
            ReelManager._the = new ReelManager();
        }

        return ReelManager._the;
    }

    constructor(){
        super();
        this.symbolPool = new SymbolPool();
        this.initializeReelContainer();
        if (ReelManager._the == null) ReelManager._the = this;
        else throw 'SymbolPool is a Singleton!';
        this.initGraphics();
        this.subscribeEvent();
    }

    private subscribeEvent() :void{
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.spinTheReels, this);
    }

    private initGraphics() :void{
        this.maskContainer = new Graphics();
        this.maskContainer.beginFill(0xffa500);
        this.maskContainer.drawRect(-210, -110, 1300, 639);
        this.maskContainer.endFill();
        this.addChild(this.maskContainer);
        this.mask = this.maskContainer;
    }

    private initializeReelContainer() :void{
        this.reel1 = new Reel(0);
        this.addChild(this.reel1);
        this.reel1.position.set(CommonConfig.reelWidth * 0, 0);
        this.reel2 = new Reel(1);
        this.addChild(this.reel2);
        this.reel2.position.set(CommonConfig.reelWidth * 1, 0);
        this.reel3 = new Reel(2);
        this.addChild(this.reel3);
        this.reel3.position.set(CommonConfig.reelWidth * 2, 0);
        this.reel4 = new Reel(3);
        this.addChild(this.reel4);
        this.reel4.position.set(CommonConfig.reelWidth * 3, 0);
        this.reel5 = new Reel(4);
        this.reel5.position.set(CommonConfig.reelWidth * 4, 0);
        this.addChild(this.reel5);
        this.insertReel1();
        this.insertReel2();
        this.insertReel3();
        this.insertReel4();
        this.insertReel5();
    }

    spinTheReels() :void{
        this.takeInputFromSymbol()
        this.reel1.spinTheReel();
        this.reel2.spinTheReel();
        this.reel3.spinTheReel();
        this.reel4.spinTheReel();
        this.reel5.spinTheReel();
        // gsap.delayedCall(3,()=>);
    }

    private takeInputFromSymbol() :void{
       let value = prompt("Set the symbol id which you want to see its win animation\n Note: Symbol id should be from 1 to 12");
       CommonConfig.the.setwinningSymbolIdFromUser(Number(value));
       CommonConfig.the.setwinningSymbolIds(Number(value));
    }

    private insertReel1() :void{
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel1.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel1.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel1.updatePos_02WithSym(symbol);

        // for(let i : number = 0;i< CommonConfig.symbolsPerReel; i++){
        //     let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        //     symbol.position.set(0,CommonConfig.symbolHeight *  i);
        //     this.reel1.addChild(symbol);
        // }
    }

    private insertReel2() :void{
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel2.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel2.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel2.updatePos_02WithSym(symbol);
    }

    private insertReel3() :void{
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel3.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel3.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel3.updatePos_02WithSym(symbol);
    }

    private insertReel4() :void{
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel4.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel4.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel4.updatePos_02WithSym(symbol);
    }

    private insertReel5() :void{
        let symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[0]);
        this.reel5.updatePos_00WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[1]);
        this.reel5.updatePos_01WithSym(symbol);
        symbol = SymbolPool.the.getSymbol(CommonConfig.symbolIds[2]);
        this.reel5.updatePos_02WithSym(symbol);
    }


}