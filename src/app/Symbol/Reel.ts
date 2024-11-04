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
    private normalSpintime: number = 3;
    private stopping: boolean = false;
    private notCheckArray: string[] = [];
    private reelId: number = 0;
    private delayStart: number = 0.05;
    private stopTween: gsap.core.Tween | null = null;
    private reelStartSpeed: number = 10;
    private reelStopSpeed: number = 10;
    private spinClicked: boolean = false;
    private maxPosition = CommonConfig.symbolHeight * 4;
    private speed: number = this.maxPosition / 0.4;
    private minPosition = -CommonConfig.symbolHeight;
    private positions: number[] = [CommonConfig.symbolHeight * 0, CommonConfig.symbolHeight * 1,
    CommonConfig.symbolHeight * 2, CommonConfig.symbolHeight * 3];
    private delays : number [] = [0.05,0.025,0.015,0.03];


    constructor(reelId: number) {
        super();
        this.reelId = reelId;
        this.init();
        Game.the.app.stage.on(CommonConfig.SPIN_STOPPED, this.playAnimation, this);
        Game.the.app.stage.on(CommonConfig.PLAY_STOP_SPIN, this.stopTheReel, this);
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
    }

    private playPosGsap(pos: Container, i: number): void {
        let distance = this.maxPosition - pos.y;
        let time = this.calculateTime(distance);
        gsap.to(pos, {
            duration: time,
            y: this.maxPosition,
            delay: (CommonConfig.symbolsPerReel - i) * this.delayStart,
            ease: "power1.in",
            // onUpdate: () => this.updatePositi   on(),
            onComplete: () => this.resetPositions(pos, i)
        });
    }



    private resetPositions(pos: Container, i: number): void {
        let y_pos: number = this.minPosition - ((CommonConfig.symbolsPerReel - i) * CommonConfig.symbolHeight);
        pos.position.set(pos.x, y_pos);
        if (i === 0 && this.reelId === CommonConfig.totalReel - 1) {
            Game.the.app.stage.emit(CommonConfig.SET_RESPONSE_AT_REEL);
            Game.the.app.stage.emit(CommonConfig.PLAY_STOP_SPIN);
        }
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

    private calculateTime(distance: number): number {
        return distance / this.speed;
    }

    private stopTheReel(): void {
        // this.setSymbolAtReel();
        let delay = this.delays[Math.floor(Math.random() * this.delays.length)];
        gsap.delayedCall(delay, () => {
            this.children.forEach((value, index) => {
                this.playStopPosGsap(value, index);
            })
        })
    }

    private resetAfterStop(pos: Container, i: number): void {
        gsap.to(pos, {
            duration: 0.1,
            y: this.positions[i] - 20,
            ease: "power1.out",
            onComplete: () =>{    
                gsap.to(pos, {
                    duration: 0.25,
                    y: this.positions[i],
                    ease: "power1.out"
                });
                if (this.reelId === CommonConfig.totalReel - 1) {
                    Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
                }
            }
        });
    }

    private playStopPosGsap(pos: Container, i: number): void {
        let distance = this.positions[i] - pos.y;
        let time = this.calculateTime(distance);
        gsap.to(pos, {
            duration: time,
            y: this.positions[i] + 20,
            delay: (CommonConfig.symbolsPerReel - i) * this.delayStart,
            ease: "power1.inOut",
            onComplete: () => this.resetAfterStop(pos, i)
        });
    }

    spinTheReel(): void {
        this.spinClicked = true;
        this.initializeReel();
        let delay = this.delays[Math.floor(Math.random() * this.delays.length)];
        gsap.delayedCall(delay, () => {
            this.children.forEach((value, index) => {
                this.playPosGsap(value, index);
            })
        })
    }

    private decelerateAndStop(): void {
        // this.setSymbolAtReel();
        let minPos = Math.min(...this.children.map(c => c.position.y));
        this.pos_02.position.set(0, minPos - CommonConfig.symbolHeight);
        this.pos_01.position.set(0, this.pos_02.y - CommonConfig.symbolHeight);
        this.pos_00.position.set(0, this.pos_01.y - CommonConfig.symbolHeight);

        this.stopTween = gsap.to(this, {
            ease: "power1.inOut",
            repeat: -1,
            onUpdate: () => this.updatePositionForStop(),
            // onComplete: () => this.resetAfterStop()
        });
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
            if (!this.spinClicked) {
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
            if ((this.children[i] as Container).y > this.maxPosition - 50) {
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