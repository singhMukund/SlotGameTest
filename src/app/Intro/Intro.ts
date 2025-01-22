import { Assets, Container, Graphics, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";
import { CommonConfig } from "@/Common/CommonConfig";
import gsap from "gsap";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class Intro extends Container {
    private bgGraphics !: Graphics;
    private bg !: Sprite;
    private logo !: Sprite;
    private page1 !: Container;
    private page2 !: Container;
    private continueBtn !: Sprite;
    private introContentTexture !: Spritesheet;
    private introTextBtnTexture !: Spritesheet;
    private introFrameBackground !: Sprite;
    private aspectRatio: number = 0;
    private aspectRatioMobile: number = 0;
    private maskGraphics !: Graphics;
    private pageContent !: Container;
    private pageContainer !: Container;
    private content !: Container;
    private isStopAnimaton : boolean = false;
    private introSpine !: Spine;
    private introContainer !: Container;

    constructor() {
        super();
        Game.the.app.stage.on(CommonConfig.SHOW_INTRO_PAGE, this.initializeIntro, this);
    }

    private hide(): void {
        this.visible = false;
    }

    private initializeIntro(): void {
        this.introContainer = new Container();
        this.introContainer.visible = false;
        this.init();
        this.initMask();
        this.addToStage();
        this.setToPosition();
        this.content.mask = this.maskGraphics;
        this.pageAnimation();
        this.continueBtn.interactive = true;
        this.subscribeEvent();
        Game.the.app.stage.on("RESIZE_THE_APP", this.setToPosition, this);
    }

    private subscribeEvent() :void{
        this.continueBtn.on('pointerdown', this.onButtonDown, this)
        .on('pointerup', this.onButtonUp, this);
    }

    private onButtonDown() :void{
        this.continueBtn.texture = this.introTextBtnTexture.textures["btn_continue_pressed.png"];
    }

    private onButtonUp() :void{
        this.continueBtn.texture = this.introTextBtnTexture.textures["btn_continue_regular.png"];
        this.continueBtn.interactive = false;
        if(this.introContainer.visible){
            gsap.killTweensOf(this);
            this.isStopAnimaton = true;
            Game.the.app.stage.emit(CommonConfig.HIDE_LOADING_SCREEN);
            gsap.to(this, {
                alpha : 0,
                duration : 0.5,
                ease: 'power1.out',
                onComplete:()=>{
                    this.visible = false;
                    Game.the.app.stage.emit(CommonConfig.HIDE_INTRO_PAGE_SHOW_BASEGAME);
                }
               }
            )
        }else{
            this.hideSpineShowPages();
        }
    }

    private initMask() :void{
        this.maskGraphics = new Graphics();
        this.maskGraphics.beginFill(0x000000, 0.65);
        this.maskGraphics.drawRect(0, 0, this.page1.width *  1.1, this.page1.height *  1.4);
        this.maskGraphics.endFill();
    }

    private init(): void {
        this.bgGraphics = new Graphics();
        this.bgGraphics.beginFill(0x000000, 0.65);
        this.bgGraphics.drawRect(0, 0, 4000, 4000);
        this.bgGraphics.endFill();
        // this.addChild(this.bgGraphics);
        // this.bgGraphics.interactive = true;
        this.bg = new Sprite(Assets.get("intro_background"));
        this.addChild(this.bg);
        this.content = new Container();
        this.pageContent = new Container();
        this.pageContainer = new Container();
        this.page1 = new Container();
        this.page2 = new Container();
        this.introTextBtnTexture = Assets.get("introTextBtn");
        this.introContentTexture = Assets.get("introContent");
        this.logo = new Sprite(this.introTextBtnTexture.textures["intro_logo.png"]);
        this.continueBtn = new Sprite(this.introTextBtnTexture.textures["btn_continue_regular.png"]);
       
        this.initPage1();
        this.initPage2();
        this.pageContent.scale.set(0.65);
        this.aspectRatio = this.pageContent.height / 919;
        this.aspectRatioMobile = this.pageContent.width / 360;
        this.introSpine = Spine.from({ skeleton: "Intro_page_spine_data", atlas: "Intro_page_spine_atlas" });
        this.introSpine.state.setAnimation(0, 'intro', true);
        this.introSpine.pivot.set(-this.introSpine.width/2,-this.introSpine.height/2);
    }

    private initPage1(): void {
        const introFrameBackground : Sprite = new Sprite(Assets.get("intro_frame_background"));
        const pentagonalFeature: Sprite = new Sprite(this.introContentTexture.textures["intro_symbol_special_game.png"]);
        const giantBasculoWild: Sprite = new Sprite(this.introContentTexture.textures["intro_symbol_giant_basculo_wild.png"]);
        const symbolZwoom: Sprite = new Sprite(this.introContentTexture.textures["intro_symbol_zwoom.png"]);
        const pentagonalFeatureText: Sprite = new Sprite(this.introTextBtnTexture.textures["intro_text_special_game.png"]);
        const giantBasculoWildText: Sprite = new Sprite(this.introTextBtnTexture.textures["intro_text_giant_basculo_wild.png"]);
        const symbolZwoomText: Sprite = new Sprite(this.introTextBtnTexture.textures["intro_text_zwoom.png"]);
        pentagonalFeature.position.set(50,100)
        giantBasculoWild.position.set(pentagonalFeature.x + (pentagonalFeature.width + 60),pentagonalFeature.y + (pentagonalFeature.height - giantBasculoWild.height)/2);
        symbolZwoom.position.set(giantBasculoWild.x + symbolZwoom.width + 50,pentagonalFeature.y + (pentagonalFeature.height - symbolZwoom.height)/2);
        pentagonalFeatureText.position.set(pentagonalFeature.x + (pentagonalFeature.width - pentagonalFeatureText.width)/2, pentagonalFeature.y + pentagonalFeature.height + 10);
        giantBasculoWildText.position.set(giantBasculoWild.x + (giantBasculoWild.width - giantBasculoWildText.width)/2, pentagonalFeatureText.y);
        symbolZwoomText.position.set(symbolZwoom.x + (symbolZwoom.width - symbolZwoomText.width)/2, pentagonalFeatureText.y);
        this.pageContent.addChild(introFrameBackground);
        this.page1.addChild(pentagonalFeature);
        this.page1.addChild(giantBasculoWild);
        this.page1.addChild(symbolZwoom);
        this.page1.addChild(pentagonalFeatureText);
        this.page1.addChild(giantBasculoWildText);
        this.page1.addChild(symbolZwoomText);
    }

    private initPage2(): void {
        const introFrameBackground : Sprite = new Sprite(Assets.get("intro_frame_background"));
        const image1: Sprite = new Sprite(this.introContentTexture.textures["intro_symbol_crepazione.png"]);
        const image2: Sprite = new Sprite(this.introContentTexture.textures["intro_symbol_bonus_game.png"]);
        const image3: Sprite = new Sprite(this.introContentTexture.textures["intro_symbol_pistole.png"]);
        const image1Text: Sprite = new Sprite(this.introTextBtnTexture.textures["intro_text_crepazione.png"]);
        const image2Text: Sprite = new Sprite(this.introTextBtnTexture.textures["intro_text_bonus_game.png"]);
        const image3Text: Sprite = new Sprite(this.introTextBtnTexture.textures["intro_text_pistole.png"]);
        image1.position.set(60,100)
        image2.position.set(image1.x + (image1.width + 56),image1.y + (image1.height - image2.height)/2);
        image3.position.set(image2.x + image3.width + 78,image1.y + (image1.height - image3.height)/2 - 9);
        image1Text.position.set(image1.x + (image1.width - image1Text.width)/2, image1.y + image1.height + 10);
        image2Text.position.set(image2.x + (image2.width - image2Text.width)/2, image1Text.y);
        image3Text.position.set(image3.x + (image3.width - image3Text.width)/2, image1Text.y);
        // this.page2.addChild(introFrameBackground);
        this.page2.addChild(image1);
        this.page2.addChild(image2);
        this.page2.addChild(image3);
        this.page2.addChild(image1Text);
        this.page2.addChild(image2Text);
        this.page2.addChild(image3Text);
    }

    private pageAnimation() :void{
        if(this.isStopAnimaton){
            return;
        }
        this.page2.x = -(this.page2.x + (this.page2.width * 1.3))
        gsap.to(this.page1, {
            x : this.page1.x + (this.page1.width * 1.3),
            duration : 0.5,
            delay : 0.5,
            ease: 'power1.out',
            onComplete:()=>{
                gsap.to(this.page2, {
                    x : 0,
                    duration : 0.5,
                    delay : 0,
                    ease: 'power1.out',
                    onComplete:()=>{
                        this.page1.x = -(this.page1.x + (this.page1.width * 1.3))
                        gsap.to(this.page2, {
                            x : this.page2.x + (this.page2.width * 1.3),
                            duration : 0.5,
                            delay : 0.5,
                            ease: 'power1.out',
                            onComplete:()=>{
                                gsap.to(this.page1, {
                                    x : 0,
                                    duration : 0.5,
                                    delay : 0,
                                    ease: 'power1.out',
                                    onComplete:()=>{
                                       this.pageAnimation();
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    private addToStage(): void {
        this.addChild(this.introContainer);
        this.introContainer.addChild(this.content);
        this.content.addChild(this.pageContent);
        this.content.addChild(this.pageContainer);
        this.introContainer.addChild(this.logo);
        this.pageContainer.addChild(this.page1);
        this.pageContainer.addChild(this.page2);
        this.introContainer.addChild(this.maskGraphics);
        this.addChild(this.introSpine);
        this.addChild(this.continueBtn);
    }

    private hideSpineShowPages() :void{
        gsap.to(this.introSpine,{
            duration : 0.5,
            alpha : 0,
            ease : "power4.in",
            onComplete :()=>{
                this.introContainer.visible = true;
                this.continueBtn.position.set(this.pageContent.x + (this.pageContent.width - this.continueBtn.width) / 2, this.pageContent.y + this.pageContent.height + 30);
                this.continueBtn.interactive = true;
            }
        })
    }

    private setToPosition(): void {
        this.logo.position.set((window.innerWidth - this.logo.width) / 2, 50);
        let currentScale: number = 1;
        let assumedHeight: number = window.innerHeight * this.aspectRatio;
        let assumedWidthMobile: number = window.innerWidth * this.aspectRatioMobile;
        this.pageContent.scale.set(0.8);
        let height = this.pageContent.height;
        currentScale = assumedHeight / height;
        this.pageContent.scale.set(currentScale);
        this.pageContainer.scale.set(currentScale);
        if (window.innerWidth < window.innerHeight) {
            this.pageContent.scale.set(1.45);
            let width = this.pageContent.width;;
            currentScale = assumedWidthMobile / width;
            this.pageContent.scale.set(currentScale);
        }
        this.pageContent.position.set((window.innerWidth - this.pageContent.width) / 2, this.logo.y + this.logo.height + 20);
        this.pageContainer.position.set((window.innerWidth - this.pageContent.width) / 2, this.logo.y + this.logo.height + 20);
        this.maskGraphics.scale.set(currentScale * 1);
        this.maskGraphics.position.set((window.innerWidth - this.maskGraphics.width) / 2, this.logo.y + this.logo.height - 20);
        this.introSpine.position.set((window.innerWidth - this.introSpine.width)/2,(window.innerHeight - this.introSpine.height) * 0.5);
        this.continueBtn.position.set(this.pageContent.x + (this.pageContent.width - this.continueBtn.width) / 2,
            window.innerHeight - (this.continueBtn.height* 1.2));

        if(this.introContainer.visible){
            this.continueBtn.position.set(this.pageContent.x + (this.pageContent.width - this.continueBtn.width) / 2, this.pageContent.y + this.pageContent.height + 30);
        }
    }
}