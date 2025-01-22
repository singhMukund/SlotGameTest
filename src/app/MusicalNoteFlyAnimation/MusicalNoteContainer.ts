import { Container } from "pixi.js";
import { StaticSymbol } from "../Symbol/StaticSymbol";
import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import { SingleMusicalNote } from "./SingleMusicalNote";

export class MusicalNoteContainer extends Container {
    musicalNoteContainer !: Container;
    private singleMusicalNote !: SingleMusicalNote;

    constructor() {
        super();
        this.init();
        this.playWinLineAnim();
        this.addChildren();
        this.setWinLinePosition();
        // Game.the.app.stage.on(CommonConfig.FG_START_SPIN, this.hideWinlineAnimation,this);
        // Game.the.app.stage.on(CommonConfig.FG_HIDE_WINFRAME_ANIMATION, this.hideWinlineAnimation,this);
    }

    private hideWinlineAnimation() :void{
        for(let i : number = 0;i< this.musicalNoteContainer.children.length;i++){
            this.musicalNoteContainer.children[i].visible = false;
        }
    }

    private init(): void {
        this.musicalNoteContainer = new Container();
        this.singleMusicalNote = new SingleMusicalNote();
        this.singleMusicalNote.visible = true;
    }

    private addChildren(): void {
        this.addChild(this.musicalNoteContainer);
        this.musicalNoteContainer.position.set(-2,-4);
        this.musicalNoteContainer.addChild(this.singleMusicalNote);
    }

    private playWinLineAnim(): void {
        this.singleMusicalNote.playAnimation();   
    }

    private setWinLinePosition(): void {
        this.singleMusicalNote.position.set(0,CommonConfig.symbolHeight/2);
    }

    updatePosWithSym(sym: StaticSymbol): void {
       
    }

}