import { CommonConfig } from "../../Common/CommonConfig";
import { StaticSymbol } from "./StaticSymbol";

export class SymbolPool {
    private static _the: SymbolPool;
    private symbolPool: Map<string, StaticSymbol> = new Map();
    private symbolGrids: number[] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9,
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11]

    static get the(): SymbolPool {
        if (!SymbolPool._the) {
            SymbolPool._the = new SymbolPool();
        }

        return SymbolPool._the;
    }

    constructor() {
        this.initializeSymbols();
        if (SymbolPool._the == null) SymbolPool._the = this;
        else throw 'SymbolPool is a Singleton!';
    }

    private initializeSymbols(): void {
        for (let i: number = 0; i < CommonConfig.symbolIds.length; i++) {
            let symbol: StaticSymbol = new StaticSymbol(CommonConfig.symbolIds[i])
                this.symbolPool.set(CommonConfig.symbolIds[i], symbol);   
        }
    }

    public getRandomSymbol(): StaticSymbol{
        const randomIndex = Math.floor(Math.random() * CommonConfig.symbolIds.length);
        const sym = this.getSymbol(CommonConfig.symbolIds[randomIndex]);
        return sym;
    }

    getSymbol(symbolName: string): StaticSymbol {
        const sym = this.symbolPool.get(symbolName)!.clone(); // Create one from the template.
        return sym;
    }

}