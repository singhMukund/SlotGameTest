import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import gsap from "gsap";
import { ISingleWinDetails } from "../Interface/GameInterface";

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
            this.enableButtonInNoWin();
        }
        Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_BUTTON);
    }

    private isWin(reseponse: number[][]): void {

    }

    private resetsOnSpinClick(): void {
        CommonConfig.the.set3x3WildGridIds([]);
        CommonConfig.the.setInitial3x3WildGridId([]);
        CommonConfig.the.setTotalWinSymbolCount(0);
        CommonConfig.the.SetCurrentWinAnimationIndex(0);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.setCurrentWinAmount(0);
        CommonConfig.the.setLineWinAmount(0);
        CommonConfig.the.setCurrentRandomWinAnimationIndex(0);
        CommonConfig.the.setCurrentRadomFeatureList([]);
        CommonConfig.the.setIsRandomFeatureState(false);
        CommonConfig.the.setIsBonusRewarded(false);
        Game.the.app.stage.emit(CommonConfig.RESET_WIN_METER);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, -CommonConfig.the.getBet());
        Game.the.app.stage.emit(CommonConfig.DISABLE_ALL_BUTTON);

        // console.clear();
    }

    private onShowNextWinPresentation(): void {
        // console.log("onShowNextWinPresentation--------------"+CommonConfig.the.getCurrentWinAnimationIndex());
        if (CommonConfig.the.getCurrentWinAnimationIndex() > 1) {
            return;
        }
        switch (CommonConfig.the.getCurrentWinAnimationIndex()) {
            case CommonConfig.ENABLE_BUTTON_PLAY:
                this.enableButton();
                break;
        }
    }

    private enableButtonInNoWin(): void {
        Game.the.app.stage.emit(CommonConfig.ENABLE_ALL_BUTTON);
    }

    private enableButton(): void {
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (!CommonConfig.the.getIsAutoplay()) {
            Game.the.app.stage.emit(CommonConfig.ENABLE_ALL_BUTTON);
            Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE, CommonConfig.the.getCurrentWinAmount());
        }
    }

    private onCheckWin(): void {
        let win: Map<number, ISingleWinDetails> = new Map();
        CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
        } else {
            CommonConfig.the.setWinGrid(new Map());
        }
    }

    private updateBalance(value: number): void {
        if(CommonConfig.the.getCurrentState() !== CommonConfig.BASE_GAME){
            return;
        }
        let balance: number = CommonConfig.the.getBalance() + value;
        balance = Number(balance.toFixed(2));
        CommonConfig.the.setBalance(balance);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE_TEXT);
    }
}