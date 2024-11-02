import { Container } from "pixi.js";
import { CommonConfig } from "../../Common/CommonConfig";
import { SymbolPool } from "./SymbolPool";
import gsap from "gsap";
import { StaticSymbol } from "./StaticSymbol";
import { Game } from "../game";

export class Reel extends Container {
    private pos_00 !: Container;
    private pos_01 !: Container;
    private pos_02 !: Container;
    private looper_00 !: Container;
    private looper_01 !: Container;
    private looper_02 !: Container;
    private looper_03 !: Container;
    private looper_04 !: Container;
    private normalSpintime: number = 3;
    private stopping: boolean = false;
    private notCheckArray: string[] = [];
    private reelId: number = 0;
    private delayStart: number = 0.3;
    private stopTween: gsap.core.Tween | null = null;
    private reelStartSpeed: number = 60;
    private reelStopSpeed: number = 60;
    private spinClicked : boolean = false;

    private maxPosition = CommonConfig.symbolHeight * 4;
    private minPosition = -CommonConfig.symbolHeight;
    private positions: number[] = [CommonConfig.symbolHeight * -1, CommonConfig.symbolHeight * 0, CommonConfig.symbolHeight * 1,
    CommonConfig.symbolHeight * 2, CommonConfig.symbolHeight * 3]


    constructor(reelId: number) {
        super();
        this.reelId = reelId;
        this.init();
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.playAnimation, this);
    }

    private init(): void {
        this.pos_00 = new Container();
        this.pos_00.position.set(0, CommonConfig.symbolHeight * 0);
        this.pos_00.name = 'pos_00';
        this.addChild(this.pos_00);

        this.pos_01 = new Container();
        this.pos_01.position.set(0, CommonConfig.symbolHeight * 1);
        this.pos_01.name = 'pos_01';
        this.addChild(this.pos_01);

        this.pos_02 = new Container();
        this.pos_02.position.set(0, CommonConfig.symbolHeight * 2);
        this.pos_02.name = 'pos_02';
        this.addChild(this.pos_02);

        this.looper_00 = new Container();
        this.looper_00.position.set(0, CommonConfig.symbolHeight * -1);
        this.looper_00.name = 'looper_00';
        this.looper_00.alpha = 0;
        this.addChild(this.looper_00);

        this.looper_01 = new Container();
        this.looper_01.position.set(0, CommonConfig.symbolHeight * 3);
        this.looper_01.name = 'looper_01';
        this.looper_01.alpha = 0;
        this.addChild(this.looper_01);

        this.looper_02 = new Container();
        this.looper_02.position.set(0, 1000);
        this.looper_02.name = 'looper_02';
        this.looper_02.alpha = 0;
        this.addChild(this.looper_02);

        this.looper_03 = new Container();
        this.looper_03.position.set(0, 1000);
        this.looper_03.name = 'looper_03';
        this.looper_03.alpha = 0;
        this.addChild(this.looper_03);

        this.looper_04 = new Container();
        this.looper_04.position.set(0, 1000);
        this.looper_04.name = 'looper_04';
        this.looper_04.alpha = 0;
        this.addChild(this.looper_04);
    }

    updatePos_00WithSym(sym: StaticSymbol): void {
        if (this.pos_00.children.length) {
            this.pos_00.removeChildren();
            this.pos_00.addChild(sym);
        } else {
            this.pos_00.addChild(sym);
        }
    }

    updatePos_01WithSym(sym: StaticSymbol): void {
        if (this.pos_01.children.length) {
            this.pos_01.removeChildren();
            this.pos_01.addChild(sym);
        } else {
            this.pos_01.addChild(sym);
        }
    }

    updatePos_02WithSym(sym: StaticSymbol): void {
        if (this.pos_02.children.length) {
            this.pos_02.removeChildren();
            this.pos_02.addChild(sym);
        } else {
            this.pos_02.addChild(sym);
        }
    }

    initializeReel(): void {
        for (let i: number = 0; i < this.children.length; i++) {

            if (((this.children[i] as Container).name === "looper_00" && !(this.children[i] as Container).children.length) ||
                ((this.children[i] as Container).name === "looper_01" && !(this.children[i] as Container).children.length)) {
                const sym = SymbolPool.the.getRandomSymbol();
                (this.children[i] as Container).addChild(sym);
            }
        }
    }

    spinTheReel(): void {
        this.spinClicked = true;
        this.initializeReel();
        gsap.delayedCall(this.reelId * this.delayStart, () => {
            gsap.to(this, {
                duration: 3,
                ease: "power1.in",
                onUpdate: () => this.updatePosition(),
                onComplete: () => this.decelerateAndStop()
            });
        })
    }

    private decelerateAndStop(): void {
        this.setSymbolAtReel();
        let minPos = Math.min(...this.children.map(c => c.position.y));
        this.pos_02.position.set(0, minPos - CommonConfig.symbolHeight);
        this.pos_01.position.set(0, this.pos_02.y - CommonConfig.symbolHeight);
        this.pos_00.position.set(0, this.pos_01.y - CommonConfig.symbolHeight);

        this.stopTween = gsap.to(this, {
            ease: "power1.inOut",
            repeat: -1,
            onUpdate: () => this.updatePositionForStop(),
            onComplete: () => this.resetAfterStop()
        });
    }

    public setSymbolAtReel(): void {
        let stoppingResponseId: number = Number(Math.floor(Math.random() * 5));
        let response: string[][] = [];
        if (stoppingResponseId === 0) {
            response = CommonConfig.RESPONSE_01;
        } else if (stoppingResponseId === 1) {
            response = CommonConfig.RESPONSE_02;
        } else if (stoppingResponseId === 2) {
            response = CommonConfig.RESPONSE_03;
        } else if (stoppingResponseId === 3) {
            response = CommonConfig.RESPONSE_04;
        } else if (stoppingResponseId === 4) {
            response = CommonConfig.RESPONSE_05;
        }
        if (CommonConfig.the.getwinningSymbolIdFromUser() !== 0) {
            response = CommonConfig.RESPONSE_SAME_SYM_ALL_REEL;
            for (let i: number = 0; i < response.length; i++) {
                for (let j: number = 0; j < response[i].length; j++) {
                    response[i][j] = CommonConfig.the.getwinningSymbolIdFromUser().toString();
                }
            }
        }
        let symbol1 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[this.reelId][0]) - 1]);
        let symbol2 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[this.reelId][1]) - 1]);
        let symbol3 = SymbolPool.the.getSymbol(CommonConfig.symbolIds[Number(response[this.reelId][2]) - 1]);
        this.pos_00.removeChildren();
        this.pos_01.removeChildren();
        this.pos_02.removeChildren();
        this.updatePos_00WithSym(symbol1);
        this.updatePos_01WithSym(symbol2);
        this.updatePos_02WithSym(symbol3);
    }

    private resetAfterStop(): void {
        //    performance.now();
    }

    private updatePositionForStop(): void {
        if (this.pos_02.y >= (CommonConfig.symbolHeight * 2) + 40) {
            let y_diff = this.pos_02.y - CommonConfig.symbolHeight * 2;
            for (let i: number = 0; i < this.children.length; i++) {
                if ((this.children[i] as Container).y !== 1000) {
                    (this.children[i] as Container).position.y -= y_diff;
                    (this.children[i] as Container).position.y = Math.floor((this.children[i] as Container).position.y);
                }
            }
            this.stopTween?.kill();
            this.notCheckArray = [];
            if (this.reelId === CommonConfig.totalReel - 1) {
                Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
            }
            return;
        }
        for (let i: number = 0; i < this.children.length; i++) {
            if ((this.children[i] as Container).y !== 1000) {
                (this.children[i] as Container).position.y += this.reelStopSpeed;
                (this.children[i] as Container).position.y = Math.floor((this.children[i] as Container).position.y);
            }
        }
    }

    playAnimation(): void {
        this.spinClicked = false;
        gsap.delayedCall(0.1, () => {
            if(!this.spinClicked){
                (this.pos_00.children[0] as StaticSymbol).playSpineAnimation();
                (this.pos_01.children[0] as StaticSymbol).playSpineAnimation();
                (this.pos_02.children[0] as StaticSymbol).playSpineAnimation();
            }
        })

    }

    private updatePosition(): void {
        for (let i: number = 0; i < this.children.length; i++) {
            if (!this.notCheckArray.includes((this.children[i] as Container).name as string) && (this.children[i] as Container).y !== 1000) {
                (this.children[i] as Container).position.y += this.reelStartSpeed;
                (this.children[i] as Container).position.y = Math.floor((this.children[i] as Container).position.y);
            }
        }
        this.checkAndUpdateTheReel();
    }

    checkAndUpdateTheReel(): void {
        for (let i: number = 0; i < this.children.length; i++) {
            if((this.children[i] as Container).y > this.maxPosition - 50){
                let minPos = Math.min(...this.children.map(c => c.position.y));
                 
            }
            if (!this.notCheckArray.includes((this.children[i] as Container).name as string) && (this.children[i] as Container).y > this.maxPosition - 50 && (this.children[i] as Container).y !== 1000) {
                if (((this.children[i] as Container).name as string).includes('looper_')) {
                    (this.children[i] as Container).removeChildren();
                } else if (this.notCheckArray.length && !this.notCheckArray.includes((this.children[i] as Container).name as string)) {
                    this.notCheckArray.push((this.children[i] as Container).name as string);
                } else {
                    this.notCheckArray.push((this.children[i] as Container).name as string);
                }
                this.updateReel();
                break;
            }
        }
    }


    updateReel(): void {
        if (!this.stopping) {
            let minPos = Math.min(...this.children.map(c => c.position.y));
            for (let i: number = 0; i < this.children.length; i++) {
                if ((this.children[i].name as string).includes('looper_') && !(this.children[i] as Container).children.length) {
                    const sym = SymbolPool.the.getRandomSymbol();
                    (this.children[i] as Container).addChild(sym);
                    (this.children[i] as Container).position.set(0, minPos - CommonConfig.symbolHeight);
                    break;
                }

            }
        }

    }


}