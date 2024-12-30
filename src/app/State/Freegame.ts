import { Container, Graphics } from "pixi.js";
import { BackgroundView } from "../Background/BackgroundView";
import { ReelView } from "../Background/ReelView";
import { ReelManager } from "../BaseGame/ReelManager";
import { SpinButton } from "../Button/SpinButton";
import { Game } from "../game";
import { WinpresentationController } from "../BaseGame/WinpresentationController";
import { CheatPanel } from "../CheatPanel/CheatPanel";
import { BottomPanel } from "../BottomPanel/BottomPanel";
import { BigWinMeter } from "../Meter/BigWinMeter";
import { LineMeter } from "../Meter/LineMeter";
import { PentagonalUpdateFeature } from "../FeatureComponent/PentagonalUpdateFeature";
import { Character } from "../Character/Character";
import { WinpresentationControllerFG } from "../FreeGame/WinpresentationControllerFG";
import { ReelManagerFG } from "../FreeGame/ReelManagerFG";
import { BackgroundViewFG } from "../Background/BackgroundViewFG";
import { ReelViewFG } from "../Background/ReelViewFG";
import { FreeGameLeftMeter } from "../Meter/FreeGameLeftMeter";
import { GlowFilter } from "pixi-filters";
import { CommonConfig } from "@/Common/CommonConfig";
import { RandomFeaturePopup } from "../FeatureComponent/RandomFeatureZwoom";
import { ReelFrameFG } from "../Background/ReelFrameFG";

export class FreeGame extends Container {
    private backgroundView !: BackgroundViewFG;
    private reelView !: ReelViewFG;
    private reelManager !: ReelManagerFG;
    private reelContainer !: Container;
    private bottomPanelButton !: Container;
    private winpresentationController !: WinpresentationControllerFG;
    private cheatPanel !: CheatPanel;
    private normalRation: number = 1920 / 919;
    private bottomPanel !: BottomPanel;
    private bgWinMeter !: BigWinMeter;
    private aspectRatio: number = 0;
    private lineMeter !: LineMeter;
    private pentagonalUpdateFeature !: PentagonalUpdateFeature;
    private character !: Character;
    private freeGameLeftMeter !: FreeGameLeftMeter;
    private aspectRatioMobile: number = 0;
    private randomFeaturePopup !: RandomFeaturePopup;
    private reelFrame !: ReelFrameFG;



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
        this.initializeCheatPanel();
        this.initBottomPanel();
        this.initBigWinMeter();
        this.initLineMeter();
        this.initpentagonalUpdateFeature();
        this.initCharacter();
        this.initRandomFeaturePopup();
        this.freeGameLeftMeter = new FreeGameLeftMeter();


    }

    private initCharacter(): void {
        this.character = new Character(CommonConfig.FREE_Game);
    }

    private parentContainer(): void {
        this.reelContainer = new Container();
        this.bottomPanelButton = new Container();
    }

    private initBackground() {
        this.backgroundView = new BackgroundViewFG();
    }

    private initReelView() {
        this.reelView = new ReelViewFG();
        this.reelFrame = new ReelFrameFG();
    }

    private initReelManager() {
        this.reelManager = new ReelManagerFG();
    }

    private initWinpresentationController(): void {
        this.winpresentationController = new WinpresentationControllerFG();
    }

    private initBigWinMeter(): void {
        this.bgWinMeter = new BigWinMeter(CommonConfig.FREE_Game);
    }

    private initLineMeter(): void {
        this.lineMeter = new LineMeter(CommonConfig.FREE_Game);
    }

    private initializeCheatPanel(): void {
        this.cheatPanel = new CheatPanel();
        this.cheatPanel.position.set(50, 50); // Position the panel in the top-left corner
    }

    private initRandomFeaturePopup() {
        this.randomFeaturePopup = new RandomFeaturePopup(CommonConfig.FREE_Game);
    }

    private initBottomPanel(): void {
        this.bottomPanel = new BottomPanel(CommonConfig.FREE_Game);
    }

    private initpentagonalUpdateFeature(): void {
        this.pentagonalUpdateFeature = new PentagonalUpdateFeature(CommonConfig.FREE_Game);
    }

    private addContainerToStage() {
        this.addChild(this.backgroundView);
        this.addChild(this.reelContainer);
        this.reelContainer.addChild(this.reelView);
        this.reelContainer.addChild(this.reelManager);
        this.reelContainer.addChild(this.reelFrame);
        this.reelContainer.addChild(this.lineMeter);
        this.addChild(this.character);
        this.addChild(this.freeGameLeftMeter);
        this.addChild(this.bottomPanelButton);
        this.addChild(this.cheatPanel);
        this.addChild(this.bottomPanel);
        this.addChild(this.bgWinMeter);
        this.addChild(this.pentagonalUpdateFeature);
        this.addChild(this.randomFeaturePopup);
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
        let currentPanelHeight = this.cheatPanel.height;
        this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2 - 30);
        if (window.innerWidth < window.innerHeight) {
            this.reelContainer.scale.set(1.45);
            let width = this.reelContainer.width;;
            currentScale = assumedWidthMobile / width;
            this.reelContainer.scale.set(currentScale);
            this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, 50 * this.aspectRatioMobile);
            Game.the.app.stage.emit(CommonConfig.FG_SET_RESIZE_WITH_REELS, [this.reelContainer.width, this.reelContainer.height, this.reelContainer.x, this.reelContainer.y]);
        }

        this.resizePentagonal();
        this.resizeCharacter();

        this.randomFeaturePopup.scale.set(currentScale);
        this.freeGameLeftMeter.scale.set(currentScale);
        this.randomFeaturePopup.position.set(this.reelContainer.x + (this.reelContainer.width - this.randomFeaturePopup.width) / 2, this.reelContainer.y + (this.reelContainer.height - this.randomFeaturePopup.height) / 2)
        this.freeGameLeftMeter.position.set(this.reelContainer.x + (this.reelContainer.width - this.freeGameLeftMeter.width)/2,this.reelContainer.y + this.reelContainer.height + this.freeGameLeftMeter.height);
    }

    private resizePentagonal(): void {
        let height: number = this.pentagonalUpdateFeature.height;
        let currentHeightPanel = height / 999 * window.innerHeight;
        let assumedWidthMobile: number = window.innerWidth * (this.pentagonalUpdateFeature.width / 360);
        let scale: number = currentHeightPanel / height;
        this.pentagonalUpdateFeature.scale.set(scale * 0.9);
        this.pentagonalUpdateFeature.position.set(50, (window.innerHeight - this.pentagonalUpdateFeature.height) / 2);
        if (window.innerWidth < window.innerHeight) {
            this.pentagonalUpdateFeature.scale.set(1.8);
            let width = this.pentagonalUpdateFeature.width;
            scale = assumedWidthMobile / width;
            this.pentagonalUpdateFeature.scale.set(scale * 0.9);
            this.pentagonalUpdateFeature.position.set(0, this.reelContainer.y + this.reelContainer.height);
        }
    }

    private resizeCharacter(): void {
        let height: number = this.character.height;
        let currentHeightPanel = height / 999 * window.innerHeight;
        let scale: number = currentHeightPanel / height;
        this.character.scale.set(scale);
        let assumedWidthMobile: number = window.innerWidth * (this.character.width / 360);
        this.character.position.set(window.innerWidth - (this.character.width * 1), (window.innerHeight - this.character.height) / 2);

        if (window.innerWidth < window.innerHeight) {
            this.character.scale.set(1.8);
            let width = this.character.width;
            scale = assumedWidthMobile / width;
            this.character.scale.set(scale * 0.9);
            this.character.position.set(window.innerWidth - this.character.width + 20, this.reelContainer.y + this.reelContainer.height);
        }
    }
}