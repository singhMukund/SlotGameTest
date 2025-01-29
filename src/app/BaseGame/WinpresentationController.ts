import { CommonConfig } from "@/Common/CommonConfig";
import { Application } from "pixi.js";

export class WinpresentationController {
    constructor(private app: Application,private config: CommonConfig) {
        this.subscribe();
    }

    private subscribe(): void {
        this.app.stage.on(CommonConfig.START_SPIN, this.resetsOnSpinClick, this);
        this.app.stage.on(CommonConfig.SPIN_STOPPED, this.onSpinStopped, this);
    }

    private onSpinStopped(): void {
        this.enableButtonInNoWin();
    }

    private resetsOnSpinClick(): void {
    }

    private enableButtonInNoWin(): void {
        this.app.stage.emit(CommonConfig.ENABLE_ALL_BUTTON);
    }

}