import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import { Container } from "pixi.js";

export class WinpresentationController {
    constructor() {
        this.subscribe();
    }

    private subscribe(): void {
        Game.the.app.stage.on(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION, this.onShowNextWinPresentation, this);
        Game.the.app.stage.on(CommonConfig.PLAY_STOP_SPIN, this.resetsOnSpinClick, this);
    }

    private resetsOnSpinClick() :void{
        CommonConfig.the.SetCurrentWinAnimationIndex(0);
        CommonConfig.the.setWinGrid(new Map());
        CommonConfig.the.setCurrentWinAmount(0);
        Game.the.app.stage.emit(CommonConfig.RESET_WIN_METER);
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
        }
    }

    private recheckWin() :void{
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
       
        //  win = new Set(['0,0', '0,2']);
        // console.log(win);
        // win.forEach(position => {
        //   console.log(position);
        // })
        if (win.size) {
            CommonConfig.the.SetCurrentWinAnimationIndex(0)
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        }else{
            CommonConfig.the.setWinGrid(new Map());
            Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
        }
    }

    private onCheckWin(): void {
        let win: Map<number, Set<string>> = CommonConfig.the.findWinningGroups(CommonConfig.the.getView());
      
        //  win = new Set(['0,0', '0,2']);
        // console.log(win);
        // win.forEach(position => {
        //     console.log(position);
        // })
        if (win.size) {
            CommonConfig.the.setWinGrid(win);
            CommonConfig.the.SetCurrentWinAnimationIndex(CommonConfig.the.getCurrentWinAnimationIndex() + 1);
            Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
        } else {
            CommonConfig.the.setWinGrid(new Map());
            Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
        }
        console.log(CommonConfig.the.getWinGrid());
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