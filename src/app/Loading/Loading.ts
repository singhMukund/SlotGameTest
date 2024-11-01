import { Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../game";
import gsap from "gsap";

export class Loading extends Container {
    private bgGraphics !: Graphics;
    private bg !: Sprite;
    private gameLogo !: Sprite;
    private loadingText !: Sprite;
    private loadingBarEmpty !: Sprite;
    private loadingBarFill !: Sprite;
    private LoadingBarDesign !: Sprite;
    private loadingFillContainer !: Container;
    private maskContainer !: Graphics;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.bgGraphics = new Graphics();
        this.bgGraphics.beginFill(0x000000);
        this.bgGraphics.drawRect(0, 0, 4000, 4000);
        this.bgGraphics.endFill();
        this.addChild(this.bgGraphics)

        this.bg = new Sprite(Game.the.app.loader.resources['Loading_Screen_Background'].texture);
        this.gameLogo = new Sprite(Game.the.app.loader.resources['Game_Logo_loading'].texture);
        this.loadingText = new Sprite(Game.the.app.loader.resources['Loading_text'].texture);
        this.loadingBarEmpty = new Sprite(Game.the.app.loader.resources['Loading_bar_empty_1'].texture);
        this.loadingFillContainer = new Container();
        this.loadingBarFill = new Sprite(Game.the.app.loader.resources['Loading_bar_fill_2'].texture);
        this.LoadingBarDesign = new Sprite(Game.the.app.loader.resources['Loading_bar_design_3'].texture);
        this.bg.scale.set(1,0.68)
        this.gameLogo.scale.set(0.7);
        this.loadingBarEmpty.scale.set(0.8);
        this.loadingBarFill.scale.set(0.8);
        this.LoadingBarDesign.scale.set(0.8);

        this.gameLogo.position.set((this.bg.width - this.gameLogo.width)*0.5,100);
        this.loadingBarEmpty.position.set((this.bg.width - this.loadingBarEmpty.width)*0.5,this.bg.height *0.6);
        this.loadingBarFill.position.set((this.bg.width - this.loadingBarFill.width)*0.5,this.bg.height *0.6);
        this.LoadingBarDesign.position.set((this.bg.width - this.LoadingBarDesign.width)*0.5,this.bg.height *0.6);
        this.loadingText.position.set((this.bg.width - this.loadingText.width)*0.5,this.loadingBarEmpty.y + 75);


        this.addChild(this.bg);
        this.addChild(this.gameLogo);
        this.addChild(this.loadingText);
        this.addChild(this.loadingBarEmpty);
        this.addChild(this.loadingFillContainer);
        this.loadingFillContainer.addChild(this.loadingBarFill);
        this.addChild(this.LoadingBarDesign);

        this.maskContainer = new Graphics();
        this.maskContainer.beginFill(0x000000);
        this.maskContainer.drawRect(this.LoadingBarDesign.x, this.LoadingBarDesign.y, this.LoadingBarDesign.width, this.LoadingBarDesign.height-10);
        this.maskContainer.endFill();
        this.addChild(this.maskContainer);

        this.loadingFillContainer.mask = this.maskContainer;


        this.loadingAnimation();

    }

    private loadingAnimation() :void{
        let x = this.maskContainer.x;
        this.maskContainer.x = -500;
        gsap.to(this.maskContainer,{
            x : x,
            duration : 5
        })
    }
}