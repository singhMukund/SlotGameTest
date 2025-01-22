import { Container } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";

export class SingleMusicalNote extends Container {
    private flyingNoteSpineInstance!: Spine;
    constructor() {
        super();
        this.initializeLine();
        this.addLineToStage();
        Game.the.app.stage.on(CommonConfig.HIDE_MUSICAL_NOTE_FROM_SCREEN, this.hideAnimation, this);
    }

    private initializeLine(): void {
        this.flyingNoteSpineInstance = Spine.from({ skeleton: "key_loop_spine_data", atlas: "key_loop_spine_atlas" });
        this.flyingNoteSpineInstance.pivot.set(-this.flyingNoteSpineInstance.width / 2, -this.flyingNoteSpineInstance.height / 2);
        this.flyingNoteSpineInstance.position.set(-(this.flyingNoteSpineInstance.width) / 2, (this.flyingNoteSpineInstance.height));
    }

    private addLineToStage(): void {
        this.addChild(this.flyingNoteSpineInstance);
    }

    playAnimation(): void {
        this.flyingNoteSpineInstance.visible = false;
        // this.flyingNoteSpineInstance.state.setAnimation(0, 'key1_loop', true);
    }

    private hideAnimation(): void {
        this.flyingNoteSpineInstance.visible = false;
    }
}