import { Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../game";
import gsap from "gsap";

export class LoadingScreen extends Container {
    private bgGraphics !: Graphics;
    private loadingFillContainer !: Container;
    private maskContainer !: Graphics;
    private loaderBg !: Graphics;
    private loaderfilled !: Graphics;


    constructor() {
        super();
        this.init();
        this.resize();
    }

    private init(): void {
        this.bgGraphics = new Graphics();
        this.bgGraphics.beginFill(0x000000);
        this.bgGraphics.drawRect(0, 0, 4000, 4000);
        this.bgGraphics.endFill();
        this.addChild(this.bgGraphics)  ;

        this.loadingFillContainer = new Container();
        this.addChild(this.loadingFillContainer);
        
        this.loaderBg = new Graphics()
                        .roundRect(0,0,500,35,5)
                        .fill(0xffffff);
        this.loadingFillContainer.addChild(this.loaderBg);

        this.loaderfilled = new Graphics()
                        .roundRect(0,0,490,25,5)
                        .fill(0x0c60c7);
        this.loadingFillContainer.addChild(this.loaderfilled);

        this.loaderfilled.position.set((this.loaderBg.width - this.loaderfilled.width)/2,(this.loaderBg.height - this.loaderfilled.height)/2)

        this.maskContainer = new Graphics()
                             .rect(this.loaderfilled.x, this.loaderfilled.y, this.loaderfilled.width, this.loaderfilled.height)
                             .fill(0x000000);
        this.loadingFillContainer.addChild(this.maskContainer);

        this.loaderfilled.mask = this.maskContainer;
        this.maskContainer.x = -540;

        // this.loadingAnimation();

    }

    private resize() :void{
        this.loadingFillContainer.position.set((window.innerWidth - this.loadingFillContainer.width)/2,(window.innerHeight - this.loadingFillContainer.height)*0.7);
    }

    public loadingAnimation(data:number) :void{        
        this.maskContainer.x += 50*data;
    }

    // public hideLoadingScreen() :void{

    // }
}