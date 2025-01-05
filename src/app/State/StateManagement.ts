import { Container } from "pixi.js";
import { BaseGame } from "./Basegame";
import { FreeGame } from "./Freegame";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class StateManagement extends Container{
    private baseGame !: BaseGame;
    private freeGame !: FreeGame
    constructor(){
        super();
        this.init();
        this.addContainerToStage();
        this.hideShowState(true);
        Game.the.app.stage.on(CommonConfig.SHOW_HIDE_BASEGAME, this.hideShowState, this);
        Game.the.app.stage.on(CommonConfig.START_BONUS, this.startBonus, this);
        Game.the.app.stage.on(CommonConfig.HIDE_BONUS, this.hideBonus, this);
    }

    private hideBonus() :void{
        CommonConfig.the.setIsRandomFeatureState(false);
        CommonConfig.the.setIsFGRandomFeatureState(false);
        Game.the.app.stage.emit(CommonConfig.RESET_CHEAT_PANEL);
        this.hideShowState(true);
        Game.the.app.stage.emit(CommonConfig.ON_SHOW_NEXT_WIN_PRESENTAION);
    }

    private startBonus() :void{
        CommonConfig.the.setIsRandomFeatureState(false);
        Game.the.app.stage.emit(CommonConfig.RESET_CHEAT_PANEL);
        this.hideShowState(false);
    }

    private init(){
        this.baseGame = new BaseGame();
        this.freeGame = new FreeGame();
    }

    private addContainerToStage(){
        this.addChild(this.baseGame);
        this.addChild(this.freeGame);
    }

    private hideShowState(isBaseGame : boolean) :void{
        isBaseGame ? this.showBaseGame() : this.showFreeGame();
    }

    private showBaseGame() :void{
        this.baseGame.visible = true;
        this.freeGame.visible = false;
        CommonConfig.the.setCurrentState(CommonConfig.BASE_GAME);
        Game.the.app.stage.emit(CommonConfig.UPDATE_BALANCE_TEXT);
        Game.the.app.stage.emit(CommonConfig.INIT_BASEGAME);
    }

    private showFreeGame() :void{
        this.baseGame.visible = false;
        this.freeGame.visible = true;
        CommonConfig.the.setCurrentState(CommonConfig.FREE_Game);
        Game.the.app.stage.emit(CommonConfig.FG_UPDATE_BALANCE_TEXT);
        Game.the.app.stage.emit(CommonConfig.INIT_FREEGAME);
    }


}