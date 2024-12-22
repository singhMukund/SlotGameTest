import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import gsap from "gsap";

export class WinpresentationControllerFG {
    constructor() {
        this.subscribe();
    }

    private subscribe(): void {
        Game.the.app.stage.on(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION, this.onShowNextWinPresentation, this);
        Game.the.app.stage.on(CommonConfig.FG_START_SPIN, this.resetsOnSpinClick, this);
        Game.the.app.stage.on(CommonConfig.FG_SPIN_STOPPED, this.onSpinStopped, this);
        Game.the.app.stage.on(CommonConfig.UPDATE_BALANCE, this.updateBalance, this);
    }

    private onSpinStopped(): void {
        this.onCheckWin();
        if (CommonConfig.the.getWinGrid().size) {
            console.log("Win Grid : " + CommonConfig.the.getWinGrid());
            this.onShowNextWinPresentation();
        } else {
            this.checkFreeGameInCaseNoWin();
        }
    }

    private isWin(reseponse: number[][]): void {

    }

    private resetsOnSpinClick(): void {
        CommonConfig.the.setTotalWinSymbolCount(0);
        CommonConfig.the.setCurrentFGWinAnimationIndex(0);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.setCurrentWinAmount(0);
        CommonConfig.the.setLineWinAmount(0);
        Game.the.app.stage.emit(CommonConfig.FG_UPDATE_PENTAGONAL_METER);
        Game.the.app.stage.emit(CommonConfig.FG_RESET_WIN_METER);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, -CommonConfig.the.getBet());
        Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, false);
        Game.the.app.stage.emit(CommonConfig.FG_DISABLE_ALL_BUTTON);
        // console.clear();
    }

    private onShowNextWinPresentation(): void {
        // console.log("onShowNextWinPresentation--------------"+CommonConfig.the.getCurrentFGWinAnimationIndex());
        switch (CommonConfig.the.getCurrentFGWinAnimationIndex()) {
            case CommonConfig.FG_ANIMATE_WIN_SYMBOL:
                this.onAnimateWinSymbol();
                break;
            case CommonConfig.FG_RECHECK_CASCADE_WIN:
                this.recheckWin();
                break;
            case CommonConfig.FG_CHECK_PLAY_RANDOM_FEATURE_ZWOOM:
                this.onStartPistole();
                break;
            case CommonConfig.FG_RECHECK_WIN:
                this.recheckAnimateWinSymbol();
                break;
            case CommonConfig.FG_BIG_WIN:
                this.playBigWin();
                break;
            case CommonConfig.FG_DO_NEXT_SPIN_IF_REQUIRED:
                this.onCheckFreegamemeter();
                break;
            case CommonConfig.FG_HIDE_FREEGAME_VIEW_AND_SHOW_BASEGAME_VIEW:
                this.disableCurrentViewEnableBaseGameView();
                break;
        }
    }

    private checkFreeGameInCaseNoWin(): void {
        CommonConfig.the.setFreeSpinsLeftValue(CommonConfig.the.getFreeSpinsLeftValue() - 1);
        if(CommonConfig.the.getFreeSpinsLeftValue() <= 0){
            CommonConfig.the.setFreeSpinsLeftValue(0);
        }
        if (CommonConfig.the.getFreeSpinsLeftValue()) {
            CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
            CommonConfig.the.setWinGrid(new Map());
            CommonConfig.the.setCurrentFGWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.UPDATE_FREEGAME_LEFT_METER);
            Game.the.app.stage.emit(CommonConfig.FG_START_SPIN);
            Game.the.app.stage.emit(CommonConfig.FG_DISABLE_ALL_BUTTON);
        } else {
            this.disableCurrentViewEnableBaseGameView();
        }
    }

    private playBigWin(): void {
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        if (CommonConfig.the.getCurrentWinAmount() >= 20 * CommonConfig.the.getBet()) {
            Game.the.app.stage.emit(CommonConfig.PLAY_BIG_WIN);
        } else {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private disableCurrentViewEnableBaseGameView(): void {
        if (!CommonConfig.the.getFreeSpinsLeftValue()) {
            CommonConfig.the.setWinGrid(new Map());
            CommonConfig.the.setCurrentFGWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.FG_ENABLE_ALL_BUTTON);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, true);
            CommonConfig.the.setFreeSpinsLeftValue(10);
            Game.the.app.stage.emit(CommonConfig.SHOW_HIDE_BASEGAME, true);
            Game.the.app.stage.emit(CommonConfig.UPDATE_FREEGAME_LEFT_METER);
        }
    }

    private onCheckFreegamemeter(): void {
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        CommonConfig.the.setFreeSpinsLeftValue(CommonConfig.the.getFreeSpinsLeftValue() - 1);
        if(CommonConfig.the.getFreeSpinsLeftValue() <= 0){
            CommonConfig.the.setFreeSpinsLeftValue(0);
        }
        if (CommonConfig.the.getFreeSpinsLeftValue()) {
            CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
            CommonConfig.the.setWinGrid(new Map());
            CommonConfig.the.setCurrentFGWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.UPDATE_FREEGAME_LEFT_METER);
            Game.the.app.stage.emit(CommonConfig.FG_START_SPIN);
            Game.the.app.stage.emit(CommonConfig.FG_DISABLE_ALL_BUTTON);
        } else {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private recheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        if (win.size) {
            CommonConfig.the.setCurrentFGWinAnimationIndex(0);
            CommonConfig.the.setWinGrid(win);
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        } else {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onCheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
        } else {
            CommonConfig.the.setWinGrid(new Map());
        }
    }

    private onAnimateWinSymbol(): void {
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        if (CommonConfig.the.getWinGrid().size) {
            Game.the.app.stage.emit(CommonConfig.FG_PLAY_ANIMATED_WIN_SYMBOL);
        } else {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private recheckAnimateWinSymbol(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
            Game.the.app.stage.emit(CommonConfig.FG_PLAY_ANIMATED_WIN_SYMBOL);
        } else {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onCreateAndUpdateCascadeView(): void {

    }

    private onRecheckCascadeWin(): void {
        const win = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        // console.log(win);

    }

    private updateBalance(value: number): void {
        let balance: number = CommonConfig.the.getBalance() + value;
        balance = Number(balance.toFixed(2));
        CommonConfig.the.setBalance(balance);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE_TEXT);
    }

    // subscribeEvent() :void{
    // }

    private onStartZwoomFeature(): void {
        console.log("onShowNextWinPresentation--------------");
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        let randomWild: number[][] = [
            [4, 4, 5, 6, 3],
            [1, 6, 1, 1, 4],
            [4, 1, 3, 3, 1],
            [1, 3, 3, 4, 1],
            [1, 1, 1, 3, 4]
        ];
        //outpout 

        CommonConfig.the.setView(randomWild);
        Game.the.app.stage.emit(CommonConfig.FG_UPDATE_VIEW_ON_REEL, CommonConfig.the.getView());
        gsap.delayedCall(0.25, () => {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }

    private onStartCrepazione(): void {
        console.log("onShowNextWinPresentation--------------");
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        let view: number[][] = CommonConfig.the.getView();
        const replacedSymbol = CommonConfig.highValueSymbolIds[Math.floor(Math.random() * CommonConfig.highValueSymbolIds.length)];
        for (let row = 0; row < view.length; row++) {
            for (let col = 0; col < view[row].length; col++) {
                if (CommonConfig.lowValueSymbolIds.includes(view[row][col])) {
                    view[row][col] = replacedSymbol;
                }
            }
        }
        CommonConfig.the.setView(view);
        Game.the.app.stage.emit(CommonConfig.FG_UPDATE_VIEW_ON_REEL, CommonConfig.the.getView());
        gsap.delayedCall(0.25, () => {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }

    private onStartPistole(): void {
        CommonConfig.the.setCurrentFGWinAnimationIndex(CommonConfig.the.getCurrentFGWinAnimationIndex() + 1);
        let view: number[][] = CommonConfig.the.getView();
        const replacedSymbol = CommonConfig.highValueSymbolIds[Math.floor(Math.random() * CommonConfig.highValueSymbolIds.length)];
        for (let row = 0; row < view.length; row++) {
                for (let col = 0; col < view[row].length; col++) {
                    if (col === 2) {
                        view[row][col] = replacedSymbol;
                    }
                }
        }
        CommonConfig.the.setView(view);
        Game.the.app.stage.emit(CommonConfig.FG_UPDATE_VIEW_ON_REEL, CommonConfig.the.getView());
        gsap.delayedCall(0.25, () => {
            Game.the.app.stage.emit(CommonConfig.FG_ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }
}