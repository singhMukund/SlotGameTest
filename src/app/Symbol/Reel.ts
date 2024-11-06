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
    private reelId: number = 0;
    private delayStart: number = 0.05;
    private spinClicked: boolean = false;
    private maxPosition = CommonConfig.symbolHeight * 4;
    private speed: number = this.maxPosition / 0.4;
    private minPosition = -CommonConfig.symbolHeight;
    private positions: number[] = [CommonConfig.symbolHeight * 0, CommonConfig.symbolHeight * 1,
    CommonConfig.symbolHeight * 2];
    private delays: number[] = [0.05, 0.025, 0.015, 0.03];
    private noOfTimeWinCount : number = 0;
    private notAffectedContainer : string[]= [];


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
            gsap.delayedCall(0.05, () => {
                Game.the.app.stage.emit(CommonConfig.SET_RESPONSE_AT_REEL);
                Game.the.app.stage.emit(CommonConfig.PLAY_STOP_SPIN);
            })
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

    private calculateTime(distance: number): number {
        return distance / this.speed;
    }

    private stopTheReel(): void {
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
            onComplete: () => {
                gsap.to(pos, {
                    duration: 0.25,
                    y: this.positions[i],
                    ease: "power1.out"
                });
                if (this.reelId === CommonConfig.totalReel - 1 && i === 0) {
                    Game.the.app.stage.emit(CommonConfig.SPIN_STOPPED);
                    this.playWinAnim([1]);
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
        let delay = this.delays[Math.floor(Math.random() * this.delays.length)];
        gsap.delayedCall(delay * this.reelId, () => {
            this.children.forEach((value, index) => {
                this.playPosGsap(value, index);
            })
        })
    }

    private playWinAnim(posId : number[]){
        if(this.noOfTimeWinCount >= 4){
            this.noOfTimeWinCount = 0;
            return
        }
        this.noOfTimeWinCount ++;
        for(let i : number = 0;i<posId.length;i++){
            gsap.to(this.children[posId[i]], {
                duration: 0.5,
                alpha : 0,
                ease: "power1.inOut",
                onComplete: () => {
                    i === posId.length-1 && this.playAfterHideCurrentSymbol(posId)
                }
            })
        }
       
    }

    private playAfterHideCurrentSymbol(posId : number[]){
        for(let i : number= 0;i<this.children.length; i++){
           if(this.children[i].y > this.children[posId[0]].y){
             this.notAffectedContainer.push(this.children[i].name);
           }
        }
        let minPos = Math.min(...this.children.map(c => c.position.y)); 
        let lastIndex : number = posId[0] + posId.length - 1;
        for(let i : number = 0;i<posId.length;i++){
            this.children[posId[i]].position.set(this.children[posId[i]].x,  minPos - CommonConfig.symbolHeight);
            minPos = minPos - CommonConfig.symbolHeight;
        }
        this.reshuffleChildrenInReel(posId[0],posId.length);
        for(let i : number = 0; i<this.children.length;i++){
            this.children[i].alpha = 1;
        }
        // gsap.delayedCall(1, () =>)
        this.dropWinReel();
    }

    private dropWinReel(): void {
        let delay = this.delays[Math.floor(Math.random() * this.delays.length)];
        gsap.delayedCall(delay, () => {
            this.children.forEach((value, index) => {
                if(!this.notAffectedContainer.includes(value.name)){
                    this.playStopPosGsap(value, index);
                }
                if(index === this.children.length - 1){
                    this.notAffectedContainer = [];
                }
            })
        })
    }

    private reshuffleChildrenInReel(startingIndex: number, countOfWinSym: number): void {
        let fromToBeReshuffledChildrens: Container[] = [];
        let pushedToLastChildrens: Container[] = [];
        let firstIndexToBeReshuffledChildren: number = startingIndex + countOfWinSym;
        for (let i: number = startingIndex; i < firstIndexToBeReshuffledChildren; i++) {
            fromToBeReshuffledChildrens.push(this.children[i])
        }
        for (let i: number = 0; i < this.children.length; i++) {
            if(!(i >= startingIndex && i < firstIndexToBeReshuffledChildren)){
                pushedToLastChildrens.push(this.children[i])
            }
        }
        let currentIndex: number = 0;
        for (let i = 0; i < fromToBeReshuffledChildrens.length; i++) {
            this.setChildIndex(fromToBeReshuffledChildrens[i], currentIndex);
            currentIndex++;
        }
        for (let i = 0; i < pushedToLastChildrens.length; i++) {
            this.setChildIndex(pushedToLastChildrens[i], currentIndex);
            currentIndex++;
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
}