// Game.ts
import { Application, Assets, Container } from "pixi.js";
import { CommonConfig } from "../Common/CommonConfig";
import { CommonEvents } from "@/Common/CommonEvents";
import { GameConfig } from "./GameConfiguration/GameConfig";
import { StateManagement } from "./State/StateManagement";
import { LoadingScreen } from "./Loading/LoadingScreen";
import { Intro } from "./Intro/Intro";
export class Game {
  protected static _the: Game;
  public app: Application;
  private gameContainer!: Container;
  private isLocaltesting: boolean = false;
  private loadingScreen!: LoadingScreen;
  private intro ! : Intro;

  static get the(): Game {
    if (!Game._the) {
      Game._the = new Game();
    }

    return Game._the;
  }

  constructor() {
    if (Game._the == null) Game._the = this;

    this.app = new Application();
    (globalThis as any).__PIXI_APP__ = this.app;
    this.init();
  }

  async init(): Promise<void> {
    await this.app.init();
    const pixiContainer = document.getElementById("pixi-container");
    if (pixiContainer) {
      pixiContainer.appendChild(this.app.canvas);
    }
    this.app.resize = this.resize.bind(this);
    this.gameContainer = new Container();
    this.app.stage.addChild(this.gameContainer);
    this.loadAssetsAndInitialize();
    this.resize();
    window.onresize = this.resize.bind(this);
  }

  private initLoadingObj(): void {
    this.loadingScreen = new LoadingScreen();
    this.app.stage.addChild(this.loadingScreen);
    this.intro = new Intro();
    this.app.stage.addChild(this.intro);
  }

  private async loadLoadingSpine() {
    this.initLoadingObj();
    await Assets.init({ manifest: "./manifest.json" });
    await Assets.loadBundle([
      "Loading_logo"
    ])
    this.loadingScreen.playLogoSpine();
    this.loadImages();
    Game.the.app.stage.on(CommonConfig.HIDE_INTRO_PAGE_SHOW_BASEGAME,this.intoBaseGame, this);
  }

  private async loadImages() {
    // await Assets.init({ manifest: "./manifest.json" });
    await Assets.loadBundle([
      "intro-assets",
      "background-image",
      "ReelFrame-Component",
      "static-symbol",
      "static-button",
      "win_animation",
      "Feature-Assets",
      "randomfeature_animation"
    ],(data)=>{
      console.log(data);
      this.loadingScreen.loadingAnimation(data);
    });
    
    Game.the.app.stage.emit(CommonConfig.SHOW_INTRO_PAGE);
    // this.intoBaseGame();
  }

  private intoBaseGame() :void{
    this.onLoadComplete();
  }

  isIOS(): boolean {
    const audio = document.createElement("audio");
    return audio.canPlayType('audio/ogg; codecs="vorbis"') === "";
    return false;
  }

  private loadAssetsAndInitialize() {
    this.loadLoadingSpine();
    new CommonEvents();
    new CommonConfig();
    new GameConfig();
  }

  private onLoadComplete() {
    this.loadingScreen.visible = false;
    this.loadingScreen.alpha = 0;
    this.app.stage.addChild(new StateManagement());
    // new SoundManager();
  }

  resize() {
    this.app.stage.emit("RESIZE_THE_APP");
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}
