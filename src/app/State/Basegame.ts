import { Container } from "pixi.js";
import { BackgroundView } from "../Background/BackgroundView";
import { ReelView } from "../Background/ReelView";
import { ReelManager } from "../Symbol/ReelManager";
import { SpinButton } from "../Button/SpinButton";
import { Game } from "../game";
import { WinpresentationController } from "../Symbol/WinpresentationController";

export class BaseGame extends Container {
    private backgroundView !: BackgroundView;
    private reelView !: ReelView;
    private reelManager !: ReelManager;
    private reelContainer !: Container;
    private bottomPanelButton !: Container;
    private spinBtn !: SpinButton;
    private winpresentationController !: WinpresentationController;

    constructor() {
        super();
        this.init();
        this.addContainerToStage();
        this.setPosition();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private init() {
        this.initBackground();
        this.parentContainer();
        this.initReelView();
        this.initReelManager();
        this.initButton();
        this.initWinpresentationController();
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

    private addContainerToStage() {
        this.addChild(this.backgroundView);
        this.addChild(this.reelContainer);
        this.reelContainer.addChild(this.reelView);
        this.reelContainer.addChild(this.reelManager);
        this.addChild(this.bottomPanelButton);
        this.bottomPanelButton.addChild(this.spinBtn);
    }

    private setPosition() {
        this.reelContainer.position.set((window.innerWidth - this.reelView.width) / 2, (window.innerHeight - this.reelView.height) / 2);
        this.reelManager.position.set(370, 385);
        this.bottomPanelButton.position.set(0, (window.innerHeight - this.bottomPanelButton.height))
    }

    private resizeApp(): void {
        this.reelContainer.scale.set(0.7);
        this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2);
        if (window.innerWidth < window.innerHeight) {
            this.reelContainer.scale.set(0.37);
            this.reelContainer.position.set((window.innerWidth - this.reelContainer.width) / 2, (window.innerHeight - this.reelContainer.height) / 2);
        }
    }
}