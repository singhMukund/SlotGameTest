// Game.ts
import { Application, Assets, Container, Loader, Sprite, Ticker } from 'pixi.js';
import { Howl } from 'howler';
import { CommonConfig } from '../Common/CommonConfig';
import { CommonEvents } from '@/Common/CommonEvents';
import { BaseGame } from './State/Basegame';
import { GameConfig } from './GameConfiguration/GameConfig';
import { FreeGame } from './State/Freegame';
import { StateManagement } from './State/StateManagement';
import SoundManager from './Sound/SoundManager';
// import manifest from "../../public/manifest.json";
export class Game {
  protected static _the: Game;
  public app: Application;
  private gameContainer!: Container;
  private isLocaltesting: boolean = false;

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
    await Assets.loadBundle(["background-image", "ReelFrame-Component", "static-symbol", "static-button", "win_animation", "Feature-Assets"]);

    // const sound = new Howl({
    //   src: ['audio.wav', 'audio.m4a', 'audio.mp3'],
    // });

    // // Define your audio files
    // const audioFiles = {
    //   background: ['./audio/BG_Music.wav', './audio/BG_Music.m4a'],
    // };

    // const audioConfig = {
    //   background: { src: ['./audio/BG_Music.wav', './audio/BG_Music.wav'], volume: 0.5, loop: true },
    // };

    // const sounds = Object.fromEntries(
    //   Object.entries(audioConfig).map(([key, config]) => [
    //     key,
    //     new Howl(config),
    //   ])
    // );

    // Assets.events.on('progress', (progress: number) => {
    //   const percentage = Math.round(progress * 100);
    //   this.updateLoadingScreen(percentage);
    // });
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
    this.app.stage.addChild(new StateManagement());
    // new SoundManager();
  }




  resize() {
    this.app.stage.emit("RESIZE_THE_APP");
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }


}
