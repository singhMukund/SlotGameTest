import { Assets, Container, Loader, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";

export class StaticWild3x3 extends Container{
    private symbol: Sprite;
    private symbolName !: string;

    constructor(texture: string) {
        super();
        this.symbol = new Sprite(Assets.get("symbols_atlas"));
        // @ts-ignore
        this.symbol.name = "Static_Symbol";
        this.addChild(this.symbol);
        this.symbolName = texture;
        this.symbol.anchor.set(0.5);  // Center the symbol
        this.name = 'SymbolContainer';
        this.symbol.scale.set(0.4);
    }

    public setPosition(x: number, y: number): void {
        this.position.set(x, y);
    }

    public clone(): StaticWild3x3 {
        const cloneSym = new StaticWild3x3(this.symbolName);
        return cloneSym;
    }

    playSpineAnimation() :void{
       
    }
    
}