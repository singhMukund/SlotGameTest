import { Container } from "pixi.js";
import { StaticSymbol } from "../Symbol/StaticSymbol";
import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import { SingleWinLineFG } from "./SingleWinLineFG";

export class WinframeContainerFG extends Container {
    winLineContainer !: Container;
    private winlineAnimTop !: SingleWinLineFG;
    private winlineAnimBottom !: SingleWinLineFG;
    private winlineAnimLeft !: SingleWinLineFG;
    private winlineAnimRight !: SingleWinLineFG;

    constructor() {
        super();
        this.init();
        this.playWinLineAnim();
        this.addChildren();
        this.setWinLinePosition();
        Game.the.app.stage.on(CommonConfig.FG_START_SPIN, this.hideWinlineAnimation,this);
        Game.the.app.stage.on(CommonConfig.FG_HIDE_WINFRAME_ANIMATION, this.hideWinlineAnimation,this);
    }

    private hideWinlineAnimation() :void{
        for(let i : number = 0;i< this.winLineContainer.children.length;i++){
            this.winLineContainer.children[i].visible = false;
        }
    }

    private init(): void {
        this.winLineContainer = new Container();
        this.winlineAnimTop = new SingleWinLineFG();
        this.winlineAnimTop.visible = false;
        this.winlineAnimBottom = new SingleWinLineFG();
        this.winlineAnimBottom.visible = false;
        this.winlineAnimLeft = new SingleWinLineFG();
        this.winlineAnimLeft.visible = false;
        this.winlineAnimRight = new SingleWinLineFG();
        this.winlineAnimRight.visible = false;
    }

    private addChildren(): void {
        this.addChild(this.winLineContainer);
        this.winLineContainer.position.set(-2,-4);
        this.winLineContainer.addChild(this.winlineAnimLeft);
        this.winLineContainer.addChild(this.winlineAnimRight);
        this.winLineContainer.addChild(this.winlineAnimTop);
        this.winLineContainer.addChild(this.winlineAnimBottom);
    }

    private playWinLineAnim(): void {
        this.winlineAnimTop.playAnimation();   
        this.winlineAnimBottom.playAnimation();
        this.winlineAnimLeft.playAnimation();
        this.winlineAnimRight.playAnimation();
    }

    private setWinLinePosition(): void {
        this.winlineAnimTop.angle = 90;
        this.winlineAnimTop.position.set(0,-CommonConfig.symbolHeight/2 - 8);
        this.winlineAnimBottom.angle = 90;
        this.winlineAnimBottom.position.set(0,CommonConfig.symbolHeight/2 - 8);
        this.winlineAnimLeft.position.set(-CommonConfig.symbolHeight/2 - 8,0);
        this.winlineAnimRight.position.set(CommonConfig.symbolHeight/2 - 8,0);
    }

    updatePosWithSym(sym: StaticSymbol): void {
       
    }

}