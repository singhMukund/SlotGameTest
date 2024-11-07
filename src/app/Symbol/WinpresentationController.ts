import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import { Container } from "pixi.js";

export class WinpresentationController {
    constructor() {
        this.subscribe();
    }

    private subscribe(): void {
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.onShowNextWinPresentation, this);
        Game.the.app.stage.on(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION, this.onShowNextWinPresentation, this);
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
            case CommonConfig.CREATE_AND_UPDATE_CASCADE_VIEW:
                break;
            case CommonConfig.PLAY_CASCADE_REEL_DROP_ANIMATION:
                break;
            case CommonConfig.RECHECK_CASCADE_WIN:

                break;
        }
    }

    private onCheckWin(): void {
        const win: Set<string> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        console.log(win);
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
            CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        } else {
            CommonConfig.the.getWinGrid().clear()
            Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
        }
        Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
    }

    private onAnimateWinSymbol(): void {
        Game.the.app.stage.emit(CommonConfig.PLAY_ANIMATED_WIN_SYMBOL);
    }

    private onCreateAndUpdateCascadeView(): void {

    }

    private onRecheckCascadeWin(): void {
        const win = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
        console.log(win);

    }
}