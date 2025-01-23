import { Container } from "pixi.js";
import { BackgroundView } from "../Background/BackgroundView";
import { ReelView } from "../Background/ReelView";
import { ReelManager } from "../BaseGame/ReelManager";
import { Game } from "../game";
import { WinpresentationController } from "../BaseGame/WinpresentationController";
import { BottomPanel } from "../BottomPanel/BottomPanel";
import { BigWinMeter } from "../Meter/BigWinMeter";
import { LineMeter } from "../Meter/LineMeter";
import { CommonConfig } from "@/Common/CommonConfig";
import { ReelFrame } from "../Background/ReelFrame";

export class BaseGame extends Container {
    private backgroundView !: BackgroundView;
    private reelView !: ReelView; 
    private reelManager !: ReelManager;
    private reelContainer !: Container;
    private bottomPanelButton !: Container;
    private winpresentationController !: WinpresentationController;
    private normalRation: number = 1920 / 919;
    private aspectRatioMobile: number = 0;
    private bottomPanel !: BottomPanel;
    private bgWinMeter !: BigWinMeter;
    private aspectRatio: number = 0;
    private lineMeter !: LineMeter;
    private reelFrame !: ReelFrame;


    constructor() {
        super();
        this.init();
        this.addContainerToStage();
        this.setPosition();
        this.resizeApp();
        this.subscribeEvent();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private subscribeEvent(): void {
        // window.addEventListener("keydown", (event) => {
        //     if (event.key === "c") { // Press 'C' to toggle the cheat panel
        //         this.cheatPanel.visible = !this.cheatPanel.visible;
        //     }
        // });
    }

    private init() {
        this.initBackground();
        this.parentContainer();
        this.initReelView();
        this.initReelManager();
        this.initWinpresentationController();
        this.initBottomPanel();
        this.initBigWinMeter();
        this.initLineMeter();
    }

    private parentContainer(): void {
        this.reelContainer = new Container();
        this.bottomPanelButton = new Container();
    }

    private initBackground() {
        this.backgroundView = new BackgroundView();
    }

    private initReelView() {
        this.reelView = new ReelView();
        this.reelFrame = new ReelFrame();
    }

    private initReelManager() {
        this.reelManager = new ReelManager();
    }

    private initWinpresentationController(): void {
        this.winpresentationController = new WinpresentationController();
    }

    private initBigWinMeter(): void {
        this.bgWinMeter = new BigWinMeter(CommonConfig.BASE_GAME);
    }

    private initLineMeter(): void {
        this.lineMeter = new LineMeter(CommonConfig.BASE_GAME);
    }

    private initBottomPanel(): void {
        this.bottomPanel = new BottomPanel(CommonConfig.BASE_GAME);
    }


    private addContainerToStage() {
        this.addChild(this.backgroundView);
        this.addChild(this.reelContainer);
        this.reelContainer.addChild(this.reelView);
        this.reelContainer.addChild(this.reelManager);
        this.reelContainer.addChild(this.reelFrame);
        this.reelContainer.addChild(this.lineMeter);
        this.addChild(this.bottomPanelButton);
        this.addChild(this.bottomPanel);
        this.addChild(this.bgWinMeter);
    }

    private setPosition() {
        this.reelContainer.position.set((window.innerWidth - this.reelView.width) / 2, (window.innerHeight - this.reelView.height) / 2 - 100);
        this.reelManager.position.set(135, 135);
        this.lineMeter.position.set(135, 135);
        this.reelContainer.scale.set(0.6);
        this.aspectRatio = this.reelContainer.height / 919;
        this.aspectRatioMobile = this.reelContainer.width / 360;
        // this.bottomPanelButton.position.set(0, (window.innerHeight - this.bottomPanelButton.height));
    }

    private resizeApp(): void {
        let currentScale: number = 1;
        let assumedHeight: number = window.innerHeight * this.aspectRatio;
        let assumedWidthMobile: number = window.innerWidth * this.aspectRatioMobile;
        this.reelContainer.scale.set(0.8);
        let height = this.reelContainer.height;
        currentScale = assumedHeight / height;
        this.reelContainer.scale.set(currentScale);
        this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2 - 30);

        if (window.innerWidth < window.innerHeight) {
            this.reelContainer.scale.set(1.45);
            let width = this.reelContainer.width;;
            currentScale = assumedWidthMobile / width;
            this.reelContainer.scale.set(currentScale);
            this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, 50 * this.aspectRatioMobile);
            Game.the.app.stage.emit(CommonConfig.SET_RESIZE_WITH_REELS, [this.reelContainer.width, this.reelContainer.height, this.reelContainer.x, this.reelContainer.y]);
        }
    }

}