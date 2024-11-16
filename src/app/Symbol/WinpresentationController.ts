import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import { Container } from "pixi.js";

export class WinpresentationController {
    constructor() {
        this.subscribe();
    }

    private subscribe(): void {
        Game.the.app.stage.on(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION, this.onShowNextWinPresentation, this);
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.resetsOnSpinClick, this);
        Game.the.app.stage.on(CommonConfig.UPDATE_BALANCE, this.updateBalance, this);
    }

    private resetsOnSpinClick(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(0);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.setCurrentWinAmount(0);
        CommonConfig.the.setLineWinAmount(0);
        Game.the.app.stage.emit(CommonConfig.RESET_WIN_METER);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE,-CommonConfig.the.getBet());
        Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, false);
        // console.clear();
    }

    private onShowNextWinPresentation(): void {
        // const win = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        // console.log(win);
        // const totalWins = CommonConfig.the.calculateCascadingWins(CommonConfig.the.getView());
        // console.log("Total Wins:", totalWins);

        switch (CommonConfig.the.getCurrentWinAnimationIndex()) {
            case CommonConfig.CHECK_WIN:
                this.onCheckWin();
                break;
            case CommonConfig.ANIMATE_WIN_SYMBOL:
                this.onAnimateWinSymbol();
                break;
            // case CommonConfig.CREATE_AND_UPDATE_CASCADE_VIEW:
            //     break;
            // case CommonConfig.PLAY_CASCADE_REEL_DROP_ANIMATION:
            //     break;
            case CommonConfig.RECHECK_CASCADE_WIN:
                this.recheckWin();
                break;
            case CommonConfig.BIG_WIN:
                this.playBigWin();
                break;
            case CommonConfig.ENABLE_BUTTON_PLAY:
                this.enableButton();
                break;
        }
    }

    private playBigWin(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getCurrentWinAmount() >= 20 * CommonConfig.the.getBet()) {
            Game.the.app.stage.emit(CommonConfig.PLAY_BIG_WIN);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private enableButton(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.SetCurrentWinAnimationIndex(0);
        Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE,CommonConfig.the.getCurrentWinAmount());
        Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, true);
    }

    private recheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        //  win = new Set(['0,0', '0,2']);
        // console.log(win);
        // win.forEach(position => {
        //   console.log(position);
        // })
        if (win.size) {
            CommonConfig.the.SetCurrentWinAnimationIndex(0)
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onCheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        //  win = new Set(['0,0', '0,2']);
        // console.log(win);
        // win.forEach(position => {
        //     console.log(position);
        // })
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
            // CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
        // console.log(CommonConfig.the.getWinGrid());
    }

    private onAnimateWinSymbol(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if(CommonConfig.the.getWinGrid().size){
            Game.the.app.stage.emit(CommonConfig.PLAY_ANIMATED_WIN_SYMBOL);
        }else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onCreateAndUpdateCascadeView(): void {

    }

    private onRecheckCascadeWin(): void {
        const win = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        console.log(win);

    }

    private updateBalance(value : number) :void{
        let balance : number = CommonConfig.the.getBalance() + value;
        balance = Number(balance.toFixed(2));
        CommonConfig.the.setBalance(balance);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE_TEXT);
    }
}