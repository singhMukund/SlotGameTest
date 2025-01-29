import { Application, Container } from "pixi.js";
import { BackgroundView } from "../Background/BackgroundView";
import { ReelManager } from "../BaseGame/ReelManager";
import { WinpresentationController } from "../BaseGame/WinpresentationController";
import { BottomPanel } from "../BottomPanel/BottomPanel";
import { CommonConfig } from "@/Common/CommonConfig";
import { ReelFrame } from "../Background/ReelFrame";

export class BaseGame extends Container {
    private backgroundView !: BackgroundView;
    private reelManager !: ReelManager;
    private reelContainer !: Container;
    private winpresentationController !: WinpresentationController;
    private aspectRatioMobile: number = 0;
    private bottomPanel !: BottomPanel;
    private aspectRatio: number = 0;
    private reelFrame !: ReelFrame;


    constructor(private app: Application,private config: CommonConfig) {
        super();
        this.init();
        this.addContainerToStage();
        this.setPosition();
        this.resizeApp();
        this.subscribeEvent();
        this.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private subscribeEvent(): void {
    }

    private init() {
        this.initBackground();
        this.parentContainer();
        this.initReelView();
        this.initReelManager();
        this.initWinpresentationController();
        this.initBottomPanel();
    }

    private parentContainer(): void {
        this.reelContainer = new Container();
    }

    private initBackground() {
        this.backgroundView = new BackgroundView(this.app);
    }

    private initReelView() {
        this.reelFrame = new ReelFrame();
    }

    private initReelManager() {
        this.reelManager = new ReelManager(this.app,this.config);
    }

    private initWinpresentationController(): void {
        this.winpresentationController = new WinpresentationController(this.app,this.config);
    }

    private initBottomPanel(): void {
        this.bottomPanel = new BottomPanel(this.app,this.config);
    }


    private addContainerToStage() {
        this.addChild(this.backgroundView);
        this.addChild(this.reelContainer);
        this.reelContainer.addChild(this.reelFrame);
        this.reelContainer.addChild(this.reelManager);
        this.addChild(this.bottomPanel);
    }

    private setPosition() {
        this.reelContainer.position.set((window.innerWidth - this.reelFrame.width) / 2, (window.innerHeight - this.reelFrame.height) / 2 - 100);
        this.reelManager.position.set(157, 128);
        this.reelContainer.scale.set(0.6);
        this.aspectRatio = this.reelContainer.height / 919;
        this.aspectRatioMobile = this.reelContainer.width / 360;
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
            this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) * 0.4);
        }
        this.bottomPanel.position.set(this.reelContainer.x + (this.reelContainer.width - this.bottomPanel.width)/2,this.reelContainer.y + this.reelContainer.height + 30);
    }

}