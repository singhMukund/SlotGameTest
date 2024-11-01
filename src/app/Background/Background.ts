import { Application, Container, Loader, Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { Spine } from "pixi-spine";

export class Background extends Container{
    constructor(){
        super();
        this.intializeBg();
    }

    private intializeBg() :void{
        // @ts-ignore
        const bgAnimation = new Spine(Game.the.app.loader.resources['BgSpine'].spineData);
        bgAnimation.x = Game.the.app.view.width / 2;
        bgAnimation.y = Game.the.app.view.height / 2;
        this.addChild(bgAnimation);
        // // @ts-ignore
        bgAnimation.state.setAnimation(0, 'animation', true);

       

        // // Add the spine character to the stage
        //  // @ts-ignore
        // this.addChild(bgAnimation);

        // // Play an animation
        // bgAnimation.state.setAnimation(0, 'animationName', true); 
    }

}


