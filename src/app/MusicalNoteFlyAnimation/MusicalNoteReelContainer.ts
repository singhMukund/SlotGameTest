import {Container} from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import gsap from "gsap";
import { MusicalNoteContainer } from "./MusicalNoteContainer";

export class MusicalNoteReelContainer extends Container {
    private reelId: number = 0;
    constructor(reelId: number) {
        super();
        this.reelId = reelId;
        this.init();
    }

    

    private init(): void {
        for(let i : number = 0; i< CommonConfig.symbolsPerReel;i++){
            let musicalNoteContainer = new MusicalNoteContainer();
            musicalNoteContainer.position.set(0, CommonConfig.symbolHeight * i);
            musicalNoteContainer.name = `musicalNoteContainerPos_0${i}`;
            this.addChild(musicalNoteContainer);
        }
    }

    

    private killTweens(): void {
        gsap.killTweensOf(this.children);
    }
}