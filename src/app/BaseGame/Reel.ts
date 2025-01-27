import { BlurFilter, Container } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import gsap from "gsap";
import { Game } from "../game";
import { Pos } from "./Pos";
import { SymbolPool } from "../Symbol/SymbolPool";
import { StaticSymbol } from "../Symbol/StaticSymbol";

export class Reel extends Container {
    posContainer !: Container;
    private looperContainer !: Container;
    private pos_00 !: Pos;
    private pos_01 !: Pos;
    private pos_02 !: Pos;
    private loop_pos_01 !: Pos;
    private loop_pos_02 !: Pos;
    private loop_pos_03 !: Pos;
    private loop_pos_04 !: Pos;
    private loop_pos_05 !: Pos;
    private reelId: number = 0;
    private maxPosition = CommonConfig.symbolHeight * 3;
    private speed: number = 5;
    private positions: number[] = [CommonConfig.symbolHeight * 2, CommonConfig.symbolHeight * 1, CommonConfig.symbolHeight * 0];
    toBeStopped: boolean = false;



    constructor(reelId: number) {
        super();
        this.reelId = reelId;
        this.init();
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.onSpinStopped, this);
        Game.the.app.stage.on(CommonConfig.START_SPIN, this.removeChildrenFromLooper, this);
    }

    private onSpinStopped(): void {
        this.pos_00.alpha = 0.35;
        this.pos_02.alpha = 0.35;
    }

    private resetAlpha() :void{
        this.posContainer.children.forEach((pos)=>{
            pos.alpha = 1;
        })
    }



    private init(): void {
        this.posContainer = new Container();
        this.addChild(this.posContainer);

        this.looperContainer = new Container();
        this.addChild(this.looperContainer);

        this.loop_pos_01 = new Pos();
        this.loop_pos_01.position.set(0, -1 * CommonConfig.symbolHeight);
        this.loop_pos_01.name = 'loop_pos_01';
        this.looperContainer.addChild(this.loop_pos_01);

        this.loop_pos_02 = new Pos();
        this.loop_pos_02.position.set(0, 1000);
        this.loop_pos_02.name = 'loop_pos_02';
        this.looperContainer.addChild(this.loop_pos_02);

        this.loop_pos_03 = new Pos();
        this.loop_pos_03.position.set(0, 1000);
        this.loop_pos_03.name = 'loop_pos_03';
        this.looperContainer.addChild(this.loop_pos_03);

        this.loop_pos_04 = new Pos();
        this.loop_pos_04.position.set(0, 1000);
        this.loop_pos_04.name = 'loop_pos_04';
        this.looperContainer.addChild(this.loop_pos_04);

        this.loop_pos_05 = new Pos();
        this.loop_pos_05.position.set(0, 1000);
        this.loop_pos_05.name = 'loop_pos_05';
        this.looperContainer.addChild(this.loop_pos_05);

        this.pos_00 = new Pos();
        this.pos_00.position.set(0, CommonConfig.symbolHeight * 0);
        this.pos_00.name = 'pos_00';
        this.posContainer.addChild(this.pos_00);

        this.pos_01 = new Pos();
        this.pos_01.position.set(0, CommonConfig.symbolHeight * 1);
        this.pos_01.name = 'pos_01';
        this.posContainer.addChild(this.pos_01);

        this.pos_02 = new Pos();
        this.pos_02.position.set(0, CommonConfig.symbolHeight * 2);
        this.pos_02.name = 'pos_02';
        this.posContainer.addChild(this.pos_02);
    }

    private playPosGsap(pos: Container): void {
        this.speed = this.toBeStopped ? 12 : 32;
        pos.y += this.speed;
    }

    private removeChildrenFromLooper() :void{
        this.looperContainer.children.forEach((pos) => {
            (pos as Pos).getSymContainer().removeChildren();
        });
        this.resetAlpha();
    }

    spinTheReel(): void {
        this.looperContainer.children.forEach((pos) => {
            if (this.checkPosIsInCurrentLoop(pos as Pos) && !(pos as Pos).getSymContainer().children.length) {
                this.updateSymbol(pos as Pos);
            }
        });
        this.posContainer.children.forEach((pos) => {
            this.checkPosIsInCurrentLoop(pos as Pos) && this.playPosGsap(pos);
        });
        this.looperContainer.children.forEach((pos) => {
            this.checkPosIsInCurrentLoop(pos as Pos) && this.playPosGsap(pos);
        });
        this.posContainer.children.forEach((pos, index) => {
            if (pos.y > this.maxPosition && (pos.y !== 1000) && !this.toBeStopped) {
                pos.y = 1000;
                let newPos: Pos | undefined = this.toBeInLoop();
                let min1: number = (Math.min(...this.posContainer.children.map(c => c.position.y)));
                let min2: number = (Math.min(...this.looperContainer.children.map(c => c.position.y)))
                const min: number = Math.min(min1, min2);
                newPos!.y = min - CommonConfig.symbolHeight;
                this.updateSymbol(newPos!);
            }
            if (this.toBeStopped && index === 2 && this.reelId === 2) {
                if (Math.abs(pos.y) <= 20) {
                    Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
                }
            }
        });
        this.looperContainer.children.forEach((pos) => {
            if (pos.y > this.maxPosition && (pos.y !== 1000)) {
                if (!this.toBeStopped) {
                    pos.y = (Math.min(...this.looperContainer.children.map(c => c.position.y))) - CommonConfig.symbolHeight;
                    const blurFilter = new BlurFilter();
                    blurFilter.blur = 1; 
                    pos.filters = [blurFilter];
                } else {
                    pos.y = 1000;
                }
            }

        });
    }

    updatePosition(): void {
        this.posContainer.children.forEach((pos) => {
            const min1: number = (Math.min(...this.posContainer.children.map(c => c.position.y)));
            const min2: number = (Math.min(...this.looperContainer.children.map(c => c.position.y)))
            const min: number = Math.min(min1, min2);
            pos.y = min - CommonConfig.symbolHeight;
        })
    }

    updateFinalPosition(): void {
        this.posContainer.children.forEach((pos, index) => {
            pos.y = this.positions[index];
        })
    }

    private toBeInLoop(): Pos | undefined {
        return this.looperContainer.children.find(pos => (pos as Pos).y === 1000) as Pos | undefined;
    }

    findMinYPosition(container: Container): number {
        return container.children.reduce((minY, child) => {
            if (child && child.y !== undefined) {
                return Math.min(minY, child.y);
            }
            return minY;
        }, Infinity);
    }

    private updateSymbol(pos: Pos): void {
        let symbol = SymbolPool.the.getSymbol(
            CommonConfig.symbolIds[Math.floor(Math.random() * CommonConfig.symbolIds.length)]
        );
        (pos as Pos).getSymContainer().removeChildren();
        (pos as Pos).updatePosWithSym(symbol as StaticSymbol);
    }

    private checkPosIsInCurrentLoop(pos: Pos): boolean {
        if (pos.y === 1000) {
            return false;
        } else {
            return true;
        }
    }

    public hideSymbolAnim(posId: number) {
        gsap.to(this.children[posId], {
            duration: 0.3,
            alpha: 0,
            ease: "power1.inOut"
        })
    }
}