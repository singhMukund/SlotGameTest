// import { Container, Graphics, Sprite } from "pixi.js";
// import { Game } from "../game";
// import { SpinButton } from "../Button/SpinButton";
// import { InfoButton } from "../Button/HomeButton";

// export class BottomPanel extends Container{
//     private bg !: Graphics;
//     private bottomPanelBg !: Sprite;
//     private spinButton !: SpinButton;
//     private infoButton !: InfoButton;

//     constructor() {
//         super();
//         this.init();
//     }

//     private init() :void{
//         this.bg = new Graphics();
//         this.bg.beginFill(0X000000);
//         this.bg.alpha = 0.7;
//         this.bg.drawRect(0, 760, 1920, 300);
//         this.addChild(this.bg);
//         // this.bottomPanelBg = new Sprite(Game.the.app.loader.resources['bottomPanelBg'].texture);
//         // this.bottomPanelBg.scale.set(4,1.5);
//         // this.addChild(this.bottomPanelBg);
//         this.spinButton = new SpinButton();
//         this.addChild(this.spinButton);
//         this.spinButton.position.set(1400,770);
//         this.spinButton.scale.set(0.8)

//         this.infoButton = new InfoButton();
//         this.addChild(this.infoButton);
//         this.infoButton.position.set(380,840);
//         this.infoButton.scale.set(0.8)
//     }


// }