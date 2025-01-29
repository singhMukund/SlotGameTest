// Game.ts
import { Application, Assets, Container } from "pixi.js";
import { CommonConfig } from "../Common/CommonConfig";
import { StateManagement } from "./State/StateManagement";

export class Game {
  public app: Application;
  private gameContainer!: Container;
  private config !:CommonConfig;

  constructor() {
    this.app = new Application();
    //Just for pixi extenstion 
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

  private async loadImages() {
    await Assets.init({ manifest: "./manifest.json" });
    await Assets.loadBundle([
      "background-image",
      "ReelFrame-Component",
      "static-symbol",
      "static-button"
    ],(data)=>{
      console.log(data);
    });
    
    this.intoBaseGame();
  }

  private intoBaseGame() :void{
    this.onLoadComplete();
  }

  private loadAssetsAndInitialize() {
    this.config = new CommonConfig();
    this.loadImages();
  }

  private onLoadComplete() {
    this.app.stage.addChild(new StateManagement(this.app,this.config));
    // new SoundManager();
  }

  resize() {
    this.app.stage.emit("RESIZE_THE_APP");
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}
