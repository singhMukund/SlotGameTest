import { Container } from "pixi.js";
import { BackgroundView } from "../Background/BackgroundView";
import { ReelView } from "../Background/ReelView";
import { ReelManager } from "../Symbol/ReelManager";
import { SpinButton } from "../Button/SpinButton";
import { Game } from "../game";
import { WinpresentationController } from "../Symbol/WinpresentationController";
import { CheatPanel } from "../CheatPanel/CheatPanel";

export class BaseGame extends Container {
    private backgroundView !: BackgroundView;
    private reelView !: ReelView;
    private reelManager !: ReelManager;
    private reelContainer !: Container;
    private bottomPanelButton !: Container;
    private spinBtn !: SpinButton;
    private winpresentationController !: WinpresentationController;
    private cheatPanel !: CheatPanel;
    private normalRation : number = 1920/1080;

    constructor() {
        super();
        this.init();
        this.addContainerToStage();
        this.setPosition();
        this.resizeApp();
        this.subscribeEvent();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private subscribeEvent() :void{
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
        this.initButton();
        this.initWinpresentationController();
        this.initializeCheatPanel();
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
    }

    private initReelManager() {
        this.reelManager = new ReelManager();
    }

    private initButton(): void {
        this.spinBtn = new SpinButton();
    }

    private initWinpresentationController(): void {
        this.winpresentationController = new WinpresentationController();
    }

    private initializeCheatPanel(): void {
        this.cheatPanel = new CheatPanel();
        this.cheatPanel.position.set(50, 50); // Position the panel in the top-left corner
    }

    private addContainerToStage() {
        this.addChild(this.backgroundView);
        this.addChild(this.reelContainer);
        this.reelContainer.addChild(this.reelView);
        this.reelContainer.addChild(this.reelManager);
        this.addChild(this.bottomPanelButton);
        this.bottomPanelButton.addChild(this.spinBtn);
        this.addChild(this.cheatPanel);
    }

    private setPosition() {
        this.reelContainer.position.set((window.innerWidth - this.reelView.width) / 2, (window.innerHeight - this.reelView.height) / 2);
        this.reelManager.position.set(370, 385);
        this.bottomPanelButton.position.set(0, (window.innerHeight - this.bottomPanelButton.height));
    }

    private resizeApp(): void {
        let currentAspectRatio : number = window.innerWidth/window.innerHeight;
        let currentScale : number = (0.6/this.normalRation) * currentAspectRatio
        this.reelContainer.scale.set(currentScale);
        this.bottomPanelButton.position.set(0, (window.innerHeight - this.bottomPanelButton.height));
        this.cheatPanel.scale.set((1/this.normalRation) * currentAspectRatio);
        this.cheatPanel.position.set(50, 50);
        this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2);
        if (window.innerWidth < window.innerHeight) {
            this.reelContainer.scale.set(0.37);
            this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2);
            this.cheatPanel.scale.set(0.5);
            this.cheatPanel.position.set(window.innerWidth - this.cheatPanel.width - 20, window.innerHeight - this.cheatPanel.height -20)
        }
    }
}