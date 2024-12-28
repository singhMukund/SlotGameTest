import { Container } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class SingleWinLine extends Container {
    private lineSpineInstance!: Spine;
    constructor() {
        super();
        this.initializeLine();
        this.addLineToStage();
    }

    private initializeLine(): void {
        this.lineSpineInstance = Spine.from({ skeleton: "LineAnimation_data", atlas: "LineAnimation_atlas" });
        this.lineSpineInstance.pivot.set(-this.lineSpineInstance.width / 2, -this.lineSpineInstance.height / 2);
        this.lineSpineInstance.scale.set(0.98, 1);
        // this.lineSpineInstance.position.set(-(this.lineSpineInstance.width) / 2, -(this.lineSpineInstance.height) / 2);
    }

    private addLineToStage(): void {
        this.addChild(this.lineSpineInstance);
    }

    playAnimation(): void {
        this.lineSpineInstance.state.setAnimation(0, 'animation', true);
    }
}