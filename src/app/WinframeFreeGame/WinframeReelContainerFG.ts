import {Container} from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import gsap from "gsap";
import { WinframeContainerFG } from "./WinframeContainerFG";

export class WinframeReelContainerFG extends Container {
    private winframePos_00 !: WinframeContainerFG;
    private winframePos_01 !: WinframeContainerFG;
    private winframePos_02 !: WinframeContainerFG;
    private winframePos_03 !: WinframeContainerFG;
    private winframePos_04 !: WinframeContainerFG;
    private reelId: number = 0;

    constructor(reelId: number) {
        super();
        this.reelId = reelId;
        this.init();
    }

    

    private init(): void {
        this.winframePos_00 = new WinframeContainerFG();
        this.winframePos_00.position.set(0, CommonConfig.symbolHeight * 0);
        this.winframePos_00.name = 'winframePos_00';
        this.addChild(this.winframePos_00);

        this.winframePos_01 = new WinframeContainerFG();
        this.winframePos_01.position.set(0, CommonConfig.symbolHeight * 1);
        this.winframePos_01.name = 'winframePos_01';
        this.addChild(this.winframePos_01);

        this.winframePos_02 = new WinframeContainerFG();
        this.winframePos_02.position.set(0, CommonConfig.symbolHeight * 2);
        this.winframePos_02.name = 'winframePos_02';
        this.addChild(this.winframePos_02);

        this.winframePos_03 = new WinframeContainerFG();
        this.winframePos_03.position.set(0, CommonConfig.symbolHeight * 3);
        this.winframePos_03.name = 'winframePos_03';
        this.addChild(this.winframePos_03);

        this.winframePos_04 = new WinframeContainerFG();
        this.winframePos_04.position.set(0, CommonConfig.symbolHeight * 4);
        this.winframePos_04.name = 'winframePos_04';
        this.addChild(this.winframePos_04);
    }

    

    private killTweens(): void {
        gsap.killTweensOf(this.children);
    }
}