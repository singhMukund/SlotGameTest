import { Container } from "pixi.js";
import { BaseGame } from "./Basegame";
import { CommonConfig } from "@/Common/CommonConfig";

export class StateManagement extends Container{
    private baseGame !: BaseGame;
    constructor(){
        super();
        this.init();
        this.addContainerToStage();
        this.hideShowState();
    }

    private init(){
        this.baseGame = new BaseGame();
    }

    private addContainerToStage(){
        this.addChild(this.baseGame);
    }

    private hideShowState() :void{
        this.showBaseGame();
    }

    private showBaseGame() :void{
        this.baseGame.visible = true;
        CommonConfig.the.setCurrentState(CommonConfig.BASE_GAME);
    }

}