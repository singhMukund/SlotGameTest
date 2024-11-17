import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";

export class AutoplayController{
    
    constructor(){
      this.subscribeEvents();
    }

    private subscribeEvents() :void{
       Game.the.app.stage.on(CommonConfig.START_AUTOPLAY, this.onStartAutoplay, this);
    }

    private onStartAutoplay(value : boolean) :void{
        CommonConfig.the.setIsAutoplay(value);
        if(value){
            Game.the.app.stage.emit(CommonConfig.START_SPIN);
            Game.the.app.stage.emit(CommonConfig.DISABLE_ALL_BUTTON);
            Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_METER_VIEW, true);
        }else{
            Game.the.app.stage.emit(CommonConfig.ENABLE_AUTOPLAY_METER_VIEW, false);
            Game.the.app.stage.emit(CommonConfig.RESET_AUTOPLAY_METER, false);
        }
    }
}