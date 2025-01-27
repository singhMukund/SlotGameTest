import { Container } from "pixi.js";
import { BaseGame } from "./Basegame";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class StateManagement extends Container{
    private baseGame !: BaseGame;
    constructor(){
        super();
        this.init();
        this.addContainerToStage();
        this.hideShowState(true);
        Game.the.app.stage.on(CommonConfig.SHOW_HIDE_BASEGAME, this.hideShowState, this);
    }

    private init(){
        this.baseGame = new BaseGame();
    }

    private addContainerToStage(){
        this.addChild(this.baseGame);
    }

    private hideShowState(isBaseGame : boolean) :void{
        this.showBaseGame();
    }

    private showBaseGame() :void{
        this.baseGame.visible = true;
        CommonConfig.the.setCurrentState(CommonConfig.BASE_GAME);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE_TEXT);
        Game.the.app.stage.emit(CommonConfig.INIT_BASEGAME);
    }

}