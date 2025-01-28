import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";

export class WinpresentationController {
    constructor() {
        this.subscribe();
    }

    private subscribe(): void {
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.resetsOnSpinClick, this);
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.onSpinStopped, this);
    }

    private onSpinStopped(): void {
        this.enableButtonInNoWin();
    }

    private resetsOnSpinClick(): void {
    }

    private enableButtonInNoWin(): void {
        Game.the.app.stage.emit(CommonConfig.ENABLE_ALL_BUTTON);
    }

}