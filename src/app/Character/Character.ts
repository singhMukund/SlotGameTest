import { Assets, Container, Matrix, Point, Sprite, Spritesheet } from "pixi.js";
import { Game } from "../game";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class Character extends Container{
    characterBodyContainer!: Container;
    keyContainer !: Container;
    private imageBase !: Sprite;
    private imageBaseTexture !: Spritesheet;
    private characterSpine !: Spine;
    private lock1 !: Spine;
    private lock2 !: Spine;
    private lock3 !: Spine;
    private key1_Animation !: Spine;
    private key2_Animation !: Spine;
    private key3_Animation !: Spine;

    private state : string
    constructor(state : string){
        super();
        this.state = state;
        this.imageBaseTexture = Assets.get("feature_popup");
        this.init();
        // this.resizeApp();
        // Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);
    }

    private init() :void{
        this.characterBodyContainer = new Container();
        this.addChild(this.characterBodyContainer);
        this.keyContainer = new Container();
        this.addChild(this.keyContainer);
        this.imageBase = new Sprite(this.imageBaseTexture.textures['characterPlatform.png']);
        this.characterBodyContainer.addChild(this.imageBase);
        this.characterSpine = Spine.from({ skeleton: "Basculo_chained_for_spine_data", atlas: "Basculo_chained_for_spine_atlas" });
        this.characterBodyContainer.addChild(this.characterSpine);
        this.lock1 = Spine.from({ skeleton: "Lock_Animation_spine_data", atlas: "Lock_Animation_spine_atlas" });
        this.characterBodyContainer.addChild(this.lock1);
        this.lock2 = Spine.from({ skeleton: "Lock_Animation_spine_data", atlas: "Lock_Animation_spine_atlas" });
        this.characterBodyContainer.addChild(this.lock2);
        this.lock3 = Spine.from({ skeleton: "Lock_Animation_spine_data", atlas: "Lock_Animation_spine_atlas" });
        this.characterBodyContainer.addChild(this.lock3);
        this.key1_Animation = Spine.from({ skeleton: "Key_Flying_part_spine_data", atlas: "Key_Flying_part_spine_atlas" });
        // this.keyContainer.addChild(this.key1_Animation);
        this.key1_Animation.scale.set(0.6);
        this.key1_Animation.position.set(-292,568);

        this.key2_Animation = Spine.from({ skeleton: "Key_Flying_part_spine_data", atlas: "Key_Flying_part_spine_atlas" });
        // this.keyContainer.addChild(this.key2_Animation);
        this.key2_Animation.scale.set(0.6);
        this.key2_Animation.position.set(-317.5,516.5);

        this.key3_Animation = Spine.from({ skeleton: "Key_Flying_part_spine_data", atlas: "Key_Flying_part_spine_atlas" });
        // this.keyContainer.addChild(this.key3_Animation);
        this.key3_Animation.scale.set(0.6);
        this.key3_Animation.position.set(-416.5,547);

        this.lock1.scale.set(0.6);
        this.lock1.position.set(82.5,291);
        this.lock2.scale.set(-0.6,0.6);
        this.lock2.position.set(255,365.5);
        this.lock3.scale.set(0.6);
        this.lock3.position.set(154.5,420);
        this.characterSpine.scale.set(0.6);
        this.characterSpine.position.set(165,393);
        this.characterSpine.state.setAnimation(0, '1_idle', true);
        
        this.imageBase.position.set(-10,this.characterSpine.height * 0.9 - 10);
        // this.keyAnimation();
        // this.key2Animation();
        // this.key3Animation();
    }

    private keyAnimation() :void{
        this.key1_Animation.state.setAnimation(0, 'key1_end', false).listener = {
            complete : () =>{
                this.lock1.state.clearListeners();
                this.lock1.state.setAnimation(0, 'Lock', false).listener = {
                    complete : () =>{
                        this.lock1.state.clearListeners();
                        this.keyAnimation();               
                    }
                }
            }
        }
    }

    private key2Animation() :void{
        this.key2_Animation.state.setAnimation(0, 'key2_end', false).listener = {
            complete : () =>{
                this.lock2.state.clearListeners();
                this.lock2.state.setAnimation(0, 'Lock', false).listener = {
                    complete : () =>{
                        this.lock1.state.clearListeners();
                        this.key2Animation();               
                    }
                }
            }
        }
    }

    private key3Animation() :void{
        this.key3_Animation.state.setAnimation(0, 'key3_end', false).listener = {
            complete : () =>{
                this.key3_Animation.state.clearListeners();
                this.lock3.state.setAnimation(0, 'Lock', false).listener = {
                    complete : () =>{
                        this.lock3.state.clearListeners();
                        this.key3Animation();               
                    }
                }
            }
        }
    }

    getLockGlobalPosition() :number[][]{
       let globalPosition : number[][] = [];
       console.clear();
       
       console.log(this.lock1.globalDisplayStatus);
       globalPosition.push([this.lock1.worldTransform.tx,this.lock1.worldTransform.ty]);
       globalPosition.push([this.lock2.worldTransform.tx,this.lock2.worldTransform.ty]);
       globalPosition.push([this.lock3.worldTransform.tx,this.lock3.worldTransform.ty]);
       return globalPosition;
    }

    
}