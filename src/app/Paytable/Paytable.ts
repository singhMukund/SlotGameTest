// import { Container, Graphics, Sprite } from "pixi.js";
// import { Paytable1 } from "./Paytable1";
// import { Paytable2 } from "./Paytable2";
// import { Paytable3 } from "./Paytable3";
// import { Paytable4 } from "./Paytable4";
// import { Game } from "../game";
// import { PaytableNavButton } from "../Button/PaytableNavButton";
// import { CommonConfig } from "../../Common/CommonConfig";
// import gsap from "gsap";
// import { CrossButton } from "../Button/SettingButton";

// export class Paytable extends Container{
//     private bg !: Graphics;
//     private pages !: Container;
//     private Paytable1 !: Paytable1;
//     private Paytable2 !: Paytable2;
//     private Paytable3 !: Paytable3;
//     private Paytable4 !: Paytable4;
//     private emptyButton1 !: Sprite;
//     private emptyButton2 !: Sprite;
//     private emptyButton3 !: Sprite;
//     private emptyButton4 !: Sprite;
//     private buttonContainer !:Container;
//     private paytablePrevNavButton !: PaytableNavButton;
//     private paytableNextNavButton !: PaytableNavButton;
//     private currentPageIndex : number = 0;
//     private crossButton !: CrossButton;

//     constructor() {
//         super();
//         this.init();
//         this.visible = false;
//         Game.the.app.stage.on(CommonConfig.PAYTABLE_NAV_BTN_CLICKED, this.navBtnClicked, this);
//         Game.the.app.stage.on(CommonConfig.INFO_BTN_CLICKED, this.showPaytable, this);
//         Game.the.app.stage.on(CommonConfig.PAYTABLE_CROSS_BTN_CLICKED, this.hidePaytable, this);
//         this.hideAllPages();
//         this.pages.children[this.currentPageIndex].visible = true;
//     }

//     private showPaytable() :void{
//         this.alpha = 0;
//         this.visible = true;
//         gsap.to(this,{
//             alpha : 1,
//             duration : 0.5
//         })
//     }

//     private hidePaytable() :void{
//         this.alpha = 1;
//         this.visible = true;
//         gsap.to(this,{
//             alpha : 0,
//             duration : 0.5
//         })
//     }

//     private navBtnClicked() :void{
//         this.hideAllPages();
//         this.currentPageIndex += 1;
//         if(this.currentPageIndex >= this.pages.children.length){
//             this.currentPageIndex = 0;
//         }
//         this.pages.children[this.currentPageIndex].visible = true;
//     }

//     private hideAllPages() :void{
//         for(let i : number = 0; i< this.pages.children.length; i++){
//             this.pages.children[i].visible = false;
//         }
//     }

//     private init() :void{
//       this.bg = new Graphics();
//       this.bg.beginFill(0x000000,0.65);
//       this.bg.drawRect(0,0,4000,4000);
//       this.bg.endFill();
//       this.addChild(this.bg);
//       this.pages = new Container();
//       this.pages.scale.set(0.7)
//       this.addChild(this.pages);
//     //   this.pages.position.set((window.innerWidth - 1200)/2,(window.innerHeight - 800)/2);
//       this.Paytable1 = new Paytable1();
//       this.Paytable2 = new Paytable2();
//       this.Paytable3 = new Paytable3();
//       this.Paytable4 = new Paytable4();

//       this.pages.addChild(this.Paytable1);
//       this.pages.addChild(this.Paytable2);
//       this.pages.addChild(this.Paytable3);
//       this.pages.addChild(this.Paytable4);
//       this.pages.position.set((window.innerWidth - this.pages.width)/2,(window.innerHeight - this.pages.height)/2)

//       this.buttonContainer = new Container();
//       this.paytablePrevNavButton = new PaytableNavButton();
//       this.emptyButton1 = new Sprite(Game.the.app.loader.resources['page_indicator_empty'].texture);
//       this.emptyButton2 = new Sprite(Game.the.app.loader.resources['page_indicator_empty'].texture);
//       this.emptyButton3 = new Sprite(Game.the.app.loader.resources['page_indicator_empty'].texture);
//       this.emptyButton4 = new Sprite(Game.the.app.loader.resources['page_indicator_empty'].texture);
//       this.paytableNextNavButton = new PaytableNavButton();
//       this.paytablePrevNavButton.x = 0;
//       this.paytablePrevNavButton.y = -this.paytablePrevNavButton.height/4 + 5;
//       this.emptyButton1.x = this.paytablePrevNavButton.x + this.paytablePrevNavButton.width + 80;
//       this.emptyButton2.x = this.emptyButton1.x + this.emptyButton1.width + 80;
//       this.emptyButton3.x = this.emptyButton2.x + this.emptyButton2.width + 80;
//       this.emptyButton4.x = this.emptyButton3.x + this.emptyButton3.width + 80;
//       this.paytableNextNavButton.x = this.emptyButton4.x + this.emptyButton4.width + 80 + this.paytablePrevNavButton.width;
//       this.paytableNextNavButton.y = -this.paytableNextNavButton.height/4 + 5;
//       this.paytableNextNavButton.scale.set(-1,1);
//       this.buttonContainer.addChild(this.paytablePrevNavButton);
//       this.buttonContainer.addChild(this.paytableNextNavButton);
//       this.buttonContainer.addChild(this.emptyButton1);
//       this.buttonContainer.addChild(this.emptyButton2);
//       this.buttonContainer.addChild(this.emptyButton3);
//       this.buttonContainer.addChild(this.emptyButton4);
//       this.addChild(this.buttonContainer);
//       this.buttonContainer.scale.set(0.35);
//       this.buttonContainer.position.set((window.innerWidth - this.buttonContainer.width)/2,this.pages.y + this.pages.height - 80);
//       this.crossButton = new CrossButton();
//       this.addChild(this.crossButton);
//       this.crossButton.scale.set(0.4);
//       this.crossButton.position.set(this.pages.x + (this.pages.width*0.85), this.pages.y + 70);
//       this.y = this.y - 70;
//     }
// }