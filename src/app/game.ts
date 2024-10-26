// Game.ts
import { Application, Container, Loader, Renderer, Ticker } from 'pixi.js';
import { CommonConfig } from '../Common/CommonConfig';
import { CommonEvents } from '@/Common/CommonEvents';



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


    // @ts-ignore
    const loadAssets = () => {
      return new Promise<void>((resolve, reject) => {
        resolve()
        // this.loader.load(() => {
        //   resolve();
        // });
        // @ts-ignore
        this.loader.onError.add((error) => {
          console.error("Error loading assets:", error);
          reject(error);
        });
      });
    };


    try {
      if (this.isLocaltesting) {
        Promise.all([loadAssets()])
          .then(() => {
            this.onLoadComplete();
          })
          .catch((error) => {
            console.error("Error during asset loading or login:", error);
          });
      } else {
        Promise.all([loadAssets()])
          .then(() => {
            this.onLoadComplete();
          })
          .catch((error) => {
            console.error("Error during asset loading or login:", error);
          });
      }


    } catch (error) {
      console.error("Error during asset loading or login:", error);
    }
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
  }



  private onLoadComplete() {


  }




  resize() {
    this.app.stage.emit("RESIZE_THE_APP");
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }


}
