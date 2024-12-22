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
        this.freeGameLeftMeter = new FreeGameLeftMeter();

       
    }

    private initCharacter(): void {
        this.character = new Character();
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
    }

    private initReelManager() {
        this.reelManager = new ReelManagerFG();
    }

    private initWinpresentationController(): void {
        this.winpresentationController = new WinpresentationControllerFG();
    }

    private initBigWinMeter(): void {
        this.bgWinMeter = new BigWinMeter();
    }

    private initLineMeter(): void {
        this.lineMeter = new LineMeter();
    }

    private initializeCheatPanel(): void {
        this.cheatPanel = new CheatPanel();
        this.cheatPanel.position.set(50, 50); // Position the panel in the top-left corner
    }

    private initBottomPanel(): void {
        this.bottomPanel = new BottomPanel();
    }

    private initpentagonalUpdateFeature(): void {
        this.pentagonalUpdateFeature = new PentagonalUpdateFeature();
    }

    private addContainerToStage() {
        this.addChild(this.backgroundView);
        this.addChild(this.reelContainer);
        this.reelContainer.addChild(this.reelView);
        this.reelContainer.addChild(this.reelManager);
        this.reelContainer.addChild(this.lineMeter);
        this.addChild(this.bottomPanelButton);
        this.addChild(this.cheatPanel);
        this.addChild(this.bottomPanel);
        this.addChild(this.bgWinMeter);
        this.addChild(this.pentagonalUpdateFeature);
        this.addChild(this.character);
        this.addChild(this.freeGameLeftMeter);
        
        // Create the GlowFilter
        // const glowFilter = new GlowFilter({
        //     color: 0xff00ff, // Glow color
        //     distance: 15,    // Glow distance
        //     outerStrength: 2, // Outer strength of the glow
        //     innerStrength: 1, // Inner strength of the glow
        // });
        
        // // Apply the filter to the line
        // line.filters = [glowFilter];

    }

    private setPosition() {
        this.reelContainer.position.set((window.innerWidth - this.reelView.width) / 2, (window.innerHeight - this.reelView.height) / 2 - 100);
        this.reelManager.position.set(135, 135);
        this.lineMeter.position.set(135, 135);
        this.reelContainer.scale.set(0.6);
        this.aspectRatio = this.reelContainer.height / 919;
        // this.bottomPanelButton.position.set(0, (window.innerHeight - this.bottomPanelButton.height));
    }

    private resizeApp(): void {
        let currentScale: number = 1;
        let assumedHeight: number = window.innerHeight * this.aspectRatio;
        this.reelContainer.scale.set(0.8);
        let height = this.reelContainer.height;
        currentScale = assumedHeight / height;
        this.reelContainer.scale.set(currentScale);
        let currentPanelHeight = this.cheatPanel.height;
        this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2 - 30);
        if (window.innerWidth < window.innerHeight) {
            this.reelContainer.scale.set(0.37);
            this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2);
        }
        this.freeGameLeftMeter.position.set(this.reelContainer.x + (this.reelContainer.width - this.freeGameLeftMeter.width)/2,this.reelContainer.y + this.reelContainer.height + this.freeGameLeftMeter.height);
    }
}