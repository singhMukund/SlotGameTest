import { Container } from "pixi.js";
import { StaticSymbol } from "../Symbol/StaticSymbol";

export class FreeGamePos extends Container {
    private symContainer !: Container;

    constructor() {
        super();
        this.symContainer = new Container();
        this.addChildren();
    }

    private addChildren(): void {
        this.addChild(this.symContainer);
    }

    public getSymContainer(): Container {
        return this.symContainer;
    }

    updatePosWithSym(sym: StaticSymbol): void {
        // this.addChildren();
        if (this.symContainer.children.length) {
            this.symContainer.removeChildren();
            this.symContainer.addChild(sym);
        } else {
            this.symContainer.addChild(sym);
        }
    }

    updateSymbolContainerPosition(x: number, y: number): void {
        this.symContainer.position.set(x, y);
    }
}