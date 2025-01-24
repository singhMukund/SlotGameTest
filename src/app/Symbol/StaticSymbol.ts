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
        // @ts-ignore
        this.symbol.name = "Static_Symbol";
        //  // @ts-ignore
        // this.spinAnimation = new Spine(Game.the.app.loader.resources[`anim_${texture}`].spineData);
        //  // @ts-ignore
        // this.spinAnimation.name = "Spine_Symbol"
        this.addChild(this.symbol);
        // this.addChild(this.spinAnimation);
        // this.spinAnimation.visible = false;
        this.symbolName = texture;
        this.symbol.anchor.set(0.5);  // Center the symbol
        this.name = 'SymbolContainer';
        this.setSymbolOffset();
        this.symbol.scale.set(0.9);

    }

    private setSymbolOffset() :void{
        switch (this.symbolName) {
            case 'Sym_BONUS':
                // this.symbol.y = -20;
                break;
            case 'Sym_SCATTER':
                // this.symbol.y = -20;
                break;
            case 'sym_Wild':
              
                break;
            case 'Sym_H1':
               
                break;
            case 'Sym_H2':
               
                break;
            case 'Sym_H3':
             
                break;
            case 'Sym_H4':
               
                break;
            case 'Sym_L1':
              
                break;
            case 'Sym_L2':
              
                break;
            case 'Sym_L3':
               
                break;
            case 'Sym_L4':
              
                break;
            case 'Sym_L5':
              
                break;
            default:
               
                break;
        }
    }

    public setPosition(x: number, y: number): void {
        this.position.set(x, y);
    }

    public clone(): StaticSymbol {
        const cloneSym = new StaticSymbol(this.symbolName);
        return cloneSym;
    }

    playSpineAnimation() :void{
        // this.symbol.visible = false;
        // this.spinAnimation.visible = true;
        // this.spinAnimation.state.setAnimation(0, 'win', true);
        // this.spinAnimation.state.addListener({
        //     complete: () => {
        //         if (this.spinAnimation) {
        //             this.spinAnimation.state.clearListeners()
        //             this.spinAnimation.state.tracks = []
        //         }

        //         this.symbol.visible = true;
        //         this.spinAnimation.visible = false;
        //     }
        // })
    }
    
}