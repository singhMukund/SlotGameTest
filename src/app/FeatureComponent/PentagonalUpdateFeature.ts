import { Assets, Circle, Container, Graphics, Point, Polygon, Sprite, Spritesheet, Text, Texture } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import { PentagonalMeter } from "../Meter/PentagonalMeter";

interface SIDESXY{
    x : number;
    y : number;
}

export class PentagonalUpdateFeature extends Container {

    private pentagonalBackContainer !: Container;
    private pentagonalTopContainer !: Container;
    private filledPentagonalContainer !: Container;
    private feature_Texture !: Spritesheet;
    private pentagon_fill_image !: Sprite;
    private pentagon_center_frame !: Sprite;
    private maskContainer !: Container;
    private maskGraphics !: Graphics;
    private filledtextureArray: string[] = ['pentagon_fill_1', 'pentagon_fill_2', 'pentagon_fill_3', 'pentagon_fill_4', 'pentagon_fill_5'];
    private counterMeter !: PentagonalMeter;
    private angleV : number = 360;
    private knownSidesLength : number = -15;
    private knownSidesXY : SIDESXY = {
        x : 0,
        y : -100
    }
    private totalTraingle : number = 0;
    private currentTraingle : number = 0;
    private lastTraingleAngle : number = 0;
    private currentTraingleAngle : number = 0;
    private currentotalAngle : number = 0;

    constructor() {
        super();
        this.feature_Texture = Assets.get("pentagon_assets");
        this.init();
        this.addToStage();
        this.resizeApp();
        this.subscribeEvent();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private subscribeEvent(): void {
        Game.the.app.stage.on(CommonConfig.UPDATE_PENTAGONAL_METER, this.updatePentagonalMeter, this);
    }

    private init(): void {
        this.pentagonalBackContainer = new Container();
        this.pentagonalTopContainer = new Container();
        this.filledPentagonalContainer = new Container();
        this.maskContainer = new Container();

        let pentagon_back_black_bg: Sprite = new Sprite(this.feature_Texture.textures['pentagon_back_black.png']);
        let pentagon_frame: Sprite = new Sprite(this.feature_Texture.textures['pentagon_back.png']);
        this.pentagon_fill_image = new Sprite(this.feature_Texture.textures['pentagon_fill_5.png']);
        let pentagon_front_frame: Sprite = new Sprite(this.feature_Texture.textures['pentagon_front.png']);
        this.pentagon_center_frame = new Sprite(this.feature_Texture.textures['pentagon_middle_icon.png']);
        this.pentagonalBackContainer.addChild(pentagon_back_black_bg);
        this.filledPentagonalContainer.addChild(this.pentagon_fill_image);
        this.pentagonalTopContainer.addChild(pentagon_frame);
        this.pentagonalTopContainer.addChild(pentagon_front_frame);
        this.pentagonalTopContainer.addChild(this.pentagon_center_frame);
        this.pentagon_center_frame.position.set((pentagon_back_black_bg.width - this.pentagon_center_frame.width) / 2, (pentagon_front_frame.height - this.pentagon_center_frame.height) / 2 + 5);

        this.maskGraphics = new Graphics()
            .arc(0, 0, pentagon_back_black_bg.width / 2, 0, this.returnRadian(180))
            .fill("0xffffff");
        this.maskGraphics.position.set(this.maskGraphics.width / 2, this.maskGraphics.height / 2);

        this.counterMeter = new PentagonalMeter();
        this.counterMeter.position.set(this.pentagon_center_frame.x + (this.pentagon_center_frame.width - this.counterMeter.width) / 2, this.pentagon_center_frame.y + (this.pentagon_center_frame.height - this.counterMeter.height) / 2);
        // this.maskContainer.addChild(this.maskGraphics);

        // this.filledPentagonalContainer.mask = this.maskContainer;
        // this.createMaskImages();

    }

    private returnRadian(degree: number) {
        return degree * (Math.PI / 180);
    }

    private addToStage(): void {
        this.addChild(this.pentagonalBackContainer);
        this.addChild(this.filledPentagonalContainer);
        this.addChild(this.pentagonalTopContainer);
        this.addChild(this.maskContainer);
        this.addChild(this.counterMeter);
    }

    private resizeApp(): void {
        let height: number = this.height;
        let currentHeightPanel = height / 999 * window.innerHeight;
        let scale: number = currentHeightPanel / height;
        this.scale.set(scale * 0.9);
        this.position.set(50, (window.innerHeight - this.height) / 2);
    }

    private updatePentagonalMeter(): void {
        let index: number = this.getFilledTextureIndex(CommonConfig.the.getTotalWinSymbolCount());
        this.pentagon_fill_image.texture = this.feature_Texture.textures[`${this.filledtextureArray[index - 1]}.png`];
        this.counterMeter.updatePentagonalCount(CommonConfig.the.getTotalWinSymbolCount());
        this.counterMeter.position.set(this.pentagon_center_frame.x + (this.pentagon_center_frame.width - this.counterMeter.width) / 2, this.pentagon_center_frame.y + (this.pentagon_center_frame.height - this.counterMeter.height) / 2);
    }

    private getFilledTextureIndex(input: number) {
        let value: number = input / 10
        return Math.ceil(value);
    }


    private calculatePointC(angleA: number): { x: number, y: number } {
        const angleARadians = angleA * (Math.PI / 180);
        const xc : number = this.knownSidesXY.x + 100 * Math.cos(angleARadians);
        const yc : number = this.knownSidesXY.y + 100 * Math.sin(angleARadians);
        // const AC = AB / Math.cos(angleARadians);
        // const xC = AC * Math.sin(angleARadians);
        // const yC = yB + AC * Math.cos(angleARadians);
        return { x: Math.round(xc), y: Math.round(yc) };
    }

    private drawTraigle(angleA: number): void {
        let ACKnownXY :SIDESXY = this.calculatePointC(angleA);
        const triangleGraphs = new Graphics();
        const triangle = new Polygon([ new Point(0, 0), new Point(this.knownSidesXY.x, this.knownSidesXY.y), new Point(ACKnownXY.x, ACKnownXY.y) ])
        triangleGraphs.lineStyle(2, 0x000000, 1);
        triangleGraphs.beginFill(0x000000, 1);
        triangleGraphs.drawPolygon(triangle.points);
        triangleGraphs.endFill();
        this.maskContainer.addChild(triangleGraphs);
        this.currentTraingle += 1;
        this.knownSidesXY = ACKnownXY;
        this.currentotalAngle += this.currentTraingleAngle;
        this.setKnownSidesXYAccordingCoordinate();
        this.currentTraingleAngle = this.calculateCurrentTraingleAngle();
        if(this.currentTraingleAngle && this.currentTraingle < this.totalTraingle){
            this.drawTraigle(this.currentTraingleAngle);
        }else if(this.lastTraingleAngle > 0 ){
            this.drawTraigle(this.lastTraingleAngle);
        }
    }

    private setKnownSidesXYAccordingCoordinate() : void{
        if(this.currentotalAngle > 0 && this.currentotalAngle <= 90){
            if(this.knownSidesXY.x < 0){
                this.knownSidesXY.x = - this.knownSidesXY.x;
            }

            if(this.knownSidesXY.y > 0){
                this.knownSidesXY.y = - this.knownSidesXY.y;
            }
        }else if(this.currentotalAngle > 90 && this.currentotalAngle <= 180){
            if(this.knownSidesXY.x < 0){
                this.knownSidesXY.x = - this.knownSidesXY.x;
            }

            if(this.knownSidesXY.y < 0){
                this.knownSidesXY.y = - this.knownSidesXY.y;
            }
        }else if(this.currentotalAngle > 180 && this.currentotalAngle <= 270){
            if(this.knownSidesXY.x > 0){
                this.knownSidesXY.x = - this.knownSidesXY.x;
            }

            if(this.knownSidesXY.y < 0){
                this.knownSidesXY.y = - this.knownSidesXY.y;
            }
        }else if(this.currentotalAngle > 270 && this.currentotalAngle <= 360){
            if(this.knownSidesXY.x > 0){
                this.knownSidesXY.x = - this.knownSidesXY.x;
            }

            if(this.knownSidesXY.y > 0){
                this.knownSidesXY.y = - this.knownSidesXY.y;
            }
        }
    }

    private createMaskImages() :void{
        this.totalTraingle = Math.round(this.angleV/30);
        this.lastTraingleAngle = this.angleV % 30;
        this.currentTraingle = 1;
        this.currentTraingleAngle = this.calculateCurrentTraingleAngle();
        this.currentotalAngle += this.currentTraingleAngle;
        // this.drawTraigle(this.currentTraingleAngle);
        this.setKnownSidesXYAccordingCoordinate();
        if(this.currentTraingleAngle && this.currentTraingle < this.totalTraingle){
            this.drawTraigle(this.currentTraingleAngle);
        }else if(this.lastTraingleAngle > 0 ){
            this.drawTraigle(this.lastTraingleAngle);
        }
    }

    private calculateCurrentTraingleAngle() : number{
        if(this.currentTraingle < this.totalTraingle){
            return 30;
        }else{
            return this.lastTraingleAngle;
        }
    }

    private calculateKnownSidesLength() : number{
        return Math.sqrt(Math.pow(this.knownSidesXY.x - 0, 2) + Math.pow(this.knownSidesXY.y - 0, 2));
    }


}