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
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.onSpinStopped, this);
        Game.the.app.stage.on(CommonConfig.UPDATE_BALANCE, this.updateBalance, this);
    }

    private onSpinStopped() :void{
        this.onShowNextWinPresentation();
        Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_BUTTON);
    }

    private resetsOnSpinClick(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(0);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.setCurrentWinAmount(0);
        CommonConfig.the.setLineWinAmount(0);
        Game.the.app.stage.emit(CommonConfig.RESET_WIN_METER);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, -CommonConfig.the.getBet());
        Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, false);
        Game.the.app.stage.emit(CommonConfig.DISABLE_ALL_BUTTON);
        // console.clear();
    }

    private onShowNextWinPresentation(): void {
        switch (CommonConfig.the.getCurrentWinAnimationIndex()) {
            case CommonConfig.CHECK_AUTOPLAY_COUNT:
                this.onCheckAutoplayCount();
                break;
            case CommonConfig.CHECK_WIN:
                this.onCheckWin();
                break;
            case CommonConfig.ANIMATE_WIN_SYMBOL:
                this.onAnimateWinSymbol();
                break;
            case CommonConfig.RECHECK_CASCADE_WIN:
                this.recheckWin();
                break;
            case CommonConfig.BIG_WIN:
                this.playBigWin();
                break;
            case CommonConfig.CHECK_AUTOPLAY:
                this.onCheckAutoplay();
                break;
            case CommonConfig.ENABLE_BUTTON_PLAY:
                this.enableButton();
                break;
        }
    }

    private onCheckAutoplayCount() :void{
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if(CommonConfig.the.getIsAutoplay()){
            let autoplayCount = CommonConfig.the.getAutoplayCount() - 1;
            if(autoplayCount === 0){
                CommonConfig.the.setIsAutoplay(false);
                Game.the.app.stage.emit(CommonConfig.RESET_AUTOPLAY_METER);
                Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_METER_VIEW, false);
                Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
            }else{
                Game.the.app.stage.emit(CommonConfig.UPDATE_AUTOPLAY_METER);
                CommonConfig.the.setAutoplayCount(autoplayCount);
                Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
            }
        }else{
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
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
        if (!CommonConfig.the.getIsAutoplay()) {
            CommonConfig.the.setWinGrid(new Map());
            CommonConfig.the.SetCurrentWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.ENABLE_ALL_BUTTON);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN);
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, true);
        }
    }

    private onCheckAutoplay(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getIsAutoplay()) {
            CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            CommonConfig.the.setWinGrid(new Map());
            CommonConfig.the.SetCurrentWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.START_AUTOPLAY, true);
        }else{
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private recheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
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
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onAnimateWinSymbol(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getWinGrid().size) {
            Game.the.app.stage.emit(CommonConfig.PLAY_ANIMATED_WIN_SYMBOL);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
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
}