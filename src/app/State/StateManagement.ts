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
        this.hideShowState(false);
        Game.the.app.stage.on(CommonConfig.SHOW_HIDE_BASEGAME, this.hideShowState, this);
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
        Game.the.app.stage.emit(CommonConfig.INIT_BASEGAME);
    }

    private showFreeGame() :void{
        this.baseGame.visible = false;
        this.freeGame.visible = true;
        CommonConfig.the.setCurrentState(CommonConfig.FREE_Game);
        Game.the.app.stage.emit(CommonConfig.INIT_FREEGAME);
    }


}