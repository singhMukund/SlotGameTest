import {Container} from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import gsap from "gsap";
import { Game } from "../game";
import { WinframeContainer } from "./WinframeContainer";

export class WinframeReelContainer extends Container {
    private winframePos_00 !: WinframeContainer;
    private winframePos_01 !: WinframeContainer;
    private winframePos_02 !: WinframeContainer;
    private winframePos_03 !: WinframeContainer;
    private winframePos_04 !: WinframeContainer;
    private reelId: number = 0;
    


    constructor(reelId: number) {
        super();
        this.reelId = reelId;
        this.init();
    }

    

    private init(): void {
        this.winframePos_00 = new WinframeContainer();
        this.winframePos_00.position.set(0, CommonConfig.symbolHeight * 0);
        this.winframePos_00.name = 'winframePos_00';
        this.addChild(this.winframePos_00);

        this.winframePos_01 = new WinframeContainer();
        this.winframePos_01.position.set(0, CommonConfig.symbolHeight * 1);
        this.winframePos_01.name = 'winframePos_01';
        this.addChild(this.winframePos_01);

        this.winframePos_02 = new WinframeContainer();
        this.winframePos_02.position.set(0, CommonConfig.symbolHeight * 2);
        this.winframePos_02.name = 'winframePos_02';
        this.addChild(this.winframePos_02);

        this.winframePos_03 = new WinframeContainer();
        this.winframePos_03.position.set(0, CommonConfig.symbolHeight * 3);
        this.winframePos_03.name = 'winframePos_03';
        this.addChild(this.winframePos_03);

        this.winframePos_04 = new WinframeContainer();
        this.winframePos_04.position.set(0, CommonConfig.symbolHeight * 4);
        this.winframePos_04.name = 'winframePos_04';
        this.addChild(this.winframePos_04);
    }

    

    private killTweens(): void {
        gsap.killTweensOf(this.children);
    }
}