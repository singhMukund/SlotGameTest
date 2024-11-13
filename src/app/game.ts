// Game.ts
import { Application, Assets, Container, Loader, Sprite, Ticker } from 'pixi.js';
import { CommonConfig } from '../Common/CommonConfig';
import { CommonEvents } from '@/Common/CommonEvents';
import { BackgroundView } from './Background/BackgroundView';
import { BaseGame } from './State/Basegame';
import { GameConfig } from './GameConfiguration/GameConfig';
// import manifest from "../../public/manifest.json";



export class Game {
  protected static _the: Game;
  public app: Application;
  private loader!: Loader;
  private gameContainer!: Container;
  private isLocaltesting: boolean = false;
  private ticker!: Ticker;




  static get the(): Game {
    if (!Game._the) {
      Game._the = new Game();
    }

    return Game._the;
  }

  constructor() {
    if (Game._the == null) Game._the = this;

    this.app = new Application();
    this.init();
  }

  async init(): Promise<void> {
    await this.app.init();
    const pixiContainer = document.getElementById('pixi-container');
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
    await Assets.loadBundle(["background-image", "ReelFrame-Component","static-symbol","static-button","win_animation"]);
    this.onLoadComplete();
  }

  isIOS(): boolean {
    const audio = document.createElement('audio');
    return audio.canPlayType('audio/ogg; codecs="vorbis"') === '';
    return false
  }



  private loadAssetsAndInitialize() {
    this.loadImages();
    new CommonEvents();
    new CommonConfig();
    new GameConfig();
  }



  private onLoadComplete() {
    this.app.stage.addChild(new BaseGame());
  }




  resize() {
    this.app.stage.emit("RESIZE_THE_APP");
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }


}
