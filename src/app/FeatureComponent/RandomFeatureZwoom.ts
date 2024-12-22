import { Container } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class RandomFeatureZwoom extends Container{

    constructor() {
        super();
    }

    subscribeEvent() :void{
        Game.the.app.stage.on(CommonConfig.START_ZWOOM_FEATURE, this.onStartZwoomFeature, this);
    }

    private onStartZwoomFeature() :void{
        let randomWild: number[][] = [
            [4, 5, 4, 6, 3],
            [0, 6, 0, 0, 4],
            [4, 0, 3, 3, 0],
            [0, 3, 3, 4, 0],
            [0, 0, 0, 3, 4]
        ];
    }
}