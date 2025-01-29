import { Application, Container } from "pixi.js";
import { BaseGame } from "./Basegame";
import { CommonConfig } from "@/Common/CommonConfig";

export class StateManagement extends Container{
    private baseGame !: BaseGame;
    constructor(private app: Application,private config: CommonConfig){
        super();
        this.init();
        this.addContainerToStage();
        this.hideShowState();
    }

    private init(){
        this.baseGame = new BaseGame(this.app,this.config);
    }

    private addContainerToStage(){
        this.addChild(this.baseGame);
    }

    private hideShowState() :void{
        this.showBaseGame();
    }

    private showBaseGame() :void{
        this.baseGame.visible = true;
        this.config.setCurrentState(CommonConfig.BASE_GAME);
    }

}