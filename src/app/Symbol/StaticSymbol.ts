import { Assets, Container, Loader, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";

export class StaticSymbol extends Container{
    private symbol: Sprite;
    private symbolName !: string;
    private staticSymTexture !: Spritesheet;

    constructor(texture: string) {
        super();
        this.staticSymTexture = Assets.get("symbols_atlas") 
        this.symbol = new Sprite(this.staticSymTexture.textures[`${texture}.png`]);
        this.symbol.name = texture;
        this.addChild(this.symbol);
        this.symbolName = texture;
        this.symbol.anchor.set(0.5); 
        this.name = 'SymbolContainer';
        this.symbol.scale.set(0.9);
    }

    public setPosition(x: number, y: number): void {
        this.position.set(x, y);
    }

    public clone(): StaticSymbol {
        const cloneSym = new StaticSymbol(this.symbolName);
        return cloneSym;
    }
}