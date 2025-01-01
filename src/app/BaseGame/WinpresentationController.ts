import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import gsap from "gsap";

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

    private onSpinStopped(): void {
        this.onCheckWin();
        if (CommonConfig.the.getWinGrid().size) {
            console.log("Win Grid : " + CommonConfig.the.getWinGrid());
            this.onShowNextWinPresentation();
        } else {
            this.enableButton();
        }
        Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_BUTTON);
    }

    private isWin(reseponse: number[][]): void {

    }

    private resetsOnSpinClick(): void {
        CommonConfig.the.setTotalWinSymbolCount(0);
        CommonConfig.the.SetCurrentWinAnimationIndex(0);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.setCurrentWinAmount(0);
        CommonConfig.the.setLineWinAmount(0);
        CommonConfig.the.setCurrentRandomWinAnimationIndex(0);
        CommonConfig.the.setCurrentRadomFeatureList([]);
        CommonConfig.the.setIsRandomFeatureState(false);
        CommonConfig.the.setIsBonusRewarded(false);
        Game.the.app.stage.emit(CommonConfig.UPDATE_PENTAGONAL_METER);
        Game.the.app.stage.emit(CommonConfig.RESET_WIN_METER);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, -CommonConfig.the.getBet());
        Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, false);
        Game.the.app.stage.emit(CommonConfig.DISABLE_ALL_BUTTON);

        // console.clear();
    }

    private onShowNextWinPresentation(): void {
        // console.log("onShowNextWinPresentation--------------"+CommonConfig.the.getCurrentWinAnimationIndex());
        if (CommonConfig.the.getCurrentWinAnimationIndex() > 9) {
            return;
        }
        switch (CommonConfig.the.getCurrentWinAnimationIndex()) {
            case CommonConfig.CHECK_AUTOPLAY_COUNT:
                this.onCheckAutoplayCount();
                break;
            case CommonConfig.ANIMATE_WIN_SYMBOL:
                this.onAnimateWinSymbol();
                break;
            case CommonConfig.RECHECK_CASCADE_WIN:
                this.recheckWin();
                break;
            case CommonConfig.CHECK_PLAY_RANDOM_FEATURE:
                this.onStartRandomFeature();
                break;
            case CommonConfig.RECHECK_WIN:
                this.recheckAnimateWinSymbol();
                break;
            case CommonConfig.RECHECK_RANDOM_FEATURE:
                this.onRecheckRandomFeaturePresentation();
                break;
            case CommonConfig.BIG_WIN:
                this.playBigWin();
                break;
            case CommonConfig.CHECK_AND_START_BONUS:
                this.onStartBonusIfRewarded();
                break;
            case CommonConfig.CHECK_AUTOPLAY:
                this.onCheckAutoplay();
                break;
            case CommonConfig.ENABLE_BUTTON_PLAY:
                this.enableButton();
                break;
        }
    }

    private onStartBonusIfRewarded(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getIsBonusRewarded() && CommonConfig.the.getCurrentState() === CommonConfig.BASE_GAME) {
            Game.the.app.stage.emit(CommonConfig.START_BONUS);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onStartRandomFeature(): void {
        CommonConfig.the.setIsRandomFeatureState(true);
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getCurrentRadomFeatureList().length) {
            if (CommonConfig.the.getCurrentRadomFeatureList()[CommonConfig.the.getCurrentRandomWinAnimationIndex()] === CommonConfig.RANDOM_FEATURE_ZWOOM) {
                this.onStartZwoomFeature();
            } else if (CommonConfig.the.getCurrentRadomFeatureList()[CommonConfig.the.getCurrentRandomWinAnimationIndex()] === CommonConfig.RANDOM_FEATURE_PISTOLE) {
                this.onStartPistole();
            } else if (CommonConfig.the.getCurrentRadomFeatureList()[CommonConfig.the.getCurrentRandomWinAnimationIndex()] === CommonConfig.RANDOM_FEATURE_CRIPAZIONE) {
                this.onStartCrepazione();
            }
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private onRecheckRandomFeaturePresentation(): void {
        CommonConfig.the.setCurrentRandomWinAnimationIndex(CommonConfig.the.getCurrentRandomWinAnimationIndex() + 1);
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getCurrentRandomWinAnimationIndex() >= CommonConfig.the.getCurrentRadomFeatureList().length) {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
            return;
        } else {
            CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.CHECK_PLAY_RANDOM_FEATURE);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }

    }

    private onCheckAutoplayCount(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getIsAutoplay()) {
            let autoplayCount = CommonConfig.the.getAutoplayCount() - 1;
            if (autoplayCount === 0) {
                CommonConfig.the.setIsAutoplay(false);
                Game.the.app.stage.emit(CommonConfig.RESET_AUTOPLAY_METER);
                Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_METER_VIEW, false);
                Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
            } else {
                Game.the.app.stage.emit(CommonConfig.UPDATE_AUTOPLAY_METER);
                CommonConfig.the.setAutoplayCount(autoplayCount);
                Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
            }
        } else {
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
            // CommonConfig.the.setWinGrid(new Map());
            // CommonConfig.the.SetCurrentWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.ENABLE_ALL_BUTTON);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN);
            Game.the.app.stage.emit(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, true);
        }
    }

    private onCheckAutoplay(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getIsAutoplay()) {
            // CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            CommonConfig.the.setWinGrid(new Map());
            // CommonConfig.the.SetCurrentWinAnimationIndex(0);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
            Game.the.app.stage.emit(CommonConfig.START_AUTOPLAY, true);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private recheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (win.size) {
            CommonConfig.the.SetCurrentWinAnimationIndex(0);
            CommonConfig.the.setWinGrid(win);
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
        } else {
            CommonConfig.the.setWinGrid(new Map());
        }
    }

    private onPlayCascadeDropAnimation(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        Game.the.app.stage.emit(CommonConfig.PLAY_CASCADE_DROP_ANIMATION);
        gsap.delayedCall(1, () => {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }

    private onAnimateWinSymbol(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (CommonConfig.the.getWinGrid().size) {
            Game.the.app.stage.emit(CommonConfig.PLAY_ANIMATED_WIN_SYMBOL);
        } else {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }
    }

    private recheckAnimateWinSymbol(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
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
        if (CommonConfig.the.getCurrentState() === CommonConfig.BASE_GAME) {
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE_TEXT);
        } else {
            Game.the.app.stage.emit(CommonConfig.FG_UPDATE_BALANCE_TEXT);
        }
    }

    // subscribeEvent() :void{
    // }

    private onStartZwoomFeature(): void {
        Game.the.app.stage.emit(CommonConfig.SHOW_RANDOM_FEATURE_POPUP, CommonConfig.RANDOM_FEATURE_ZWOOM, this.updateViewForZoomFeature);
    }

    private updateViewForZoomFeature(): void {
        let randomWild: number[][] = [
            [4, 4, 5, 6, 3],
            [1, 6, 1, 1, 4],
            [4, 1, 3, 3, 1],
            [1, 3, 3, 4, 1],
            [1, 1, 1, 3, 4]
        ];
        //outpout 

        CommonConfig.the.setView(randomWild);
        Game.the.app.stage.emit(CommonConfig.UPDATE_VIEW_ON_REEL, CommonConfig.the.getView());

        gsap.delayedCall(0.25, () => {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }

    private onStartCrepazione(): void {
        Game.the.app.stage.emit(CommonConfig.SHOW_RANDOM_FEATURE_POPUP, CommonConfig.RANDOM_FEATURE_CRIPAZIONE, this.updateViewForCrepazione);
    }

    private updateViewForCrepazione(): void {
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
        Game.the.app.stage.emit(CommonConfig.UPDATE_VIEW_ON_REEL, CommonConfig.the.getView());

        gsap.delayedCall(0.25, () => {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }

    private onStartPistole(): void {
        Game.the.app.stage.emit(CommonConfig.SHOW_RANDOM_FEATURE_POPUP, CommonConfig.RANDOM_FEATURE_PISTOLE, this.updateViewForPistole);
    }

    private updateViewForPistole(): void {
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
        Game.the.app.stage.emit(CommonConfig.UPDATE_VIEW_ON_REEL, CommonConfig.the.getView());

        gsap.delayedCall(0.25, () => {
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        })
    }
}