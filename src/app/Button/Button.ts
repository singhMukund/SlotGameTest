// import { Sprite, Texture, Circle, Rectangle, Graphics } from 'pixi.js';
// export enum ButtonState {
//   UP,
//   DOWN,
//   OVER,
//   DISABLED,
// }
// export enum HitAreaType {
//   CIRCLE,
//   RECTANGLE,
// }

// export class ButtonGA extends Sprite {
//   public _state!: ButtonState;

//   public _textures: { [key in ButtonState]?: Texture } = {};

//   /**
//    * Callback that get's triggered when the button gets pressed
//    */
//   public onClick: (() => void) | undefined;

//   /**
//    * Callback that get's triggere's when the button is hovered (mouse only)
//    */
//   public onHover: (() => void) | undefined;

//   /**
//    * @deprecated This function is deprecated as we only wish to use onClick in the future. Kept for backwards compatibility
//    */
//   public onTouchStart: (() => void) | undefined;
//   public _isDebug : boolean = false;
//   /**
//    * Creates a interactable button
//    * @param upState - up state texture
//    * @param text - Text to display in the button
//    * @param downState - down state texture
//    * @param overState - over state texture
//    * @param disabledState - dissabled state texture
//    * @param hitAreaType - Which hitAreaType should the button use. see {@link HitAreaType}
//    * @param hitAreaRadius - Custom Radius/WidthHeight for event bounds. 
//    * @param isDebug - If true, Adds the hitAreaRadius graphic over the button (only for {@link HitAreaType.RECTANGLE})
//    * @param textStyle - TODO - not implemented yet
//    */
//   constructor(
//     upState: Texture,
//     text?: string,
//     downState?: Texture,
//     overState?: Texture,
//     disabledState?: Texture,
//     hitAreaType?: HitAreaType,
//     hitAreaRadius?:any,
//     isDebug?:boolean,
//   ) {
//     super();
//     this.anchor.set(0.5, 0.5);
//     this.buttonMode = true;
//     this.interactive = true;
//     isDebug && (this._isDebug = isDebug);
//     this._textures[ButtonState.UP] = upState;
//     this._textures[ButtonState.DOWN] = downState ? downState : upState;
//     this._textures[ButtonState.OVER] = overState ? overState : upState;
//     this._textures[ButtonState.DISABLED] = disabledState ? disabledState : upState;
//     if (hitAreaType === HitAreaType.CIRCLE) {
//       if(!hitAreaRadius)
// 		hitAreaRadius = upState.frame.width/2;
//       this.hitArea = new Circle(0, 0, hitAreaRadius);
//       if (this._isDebug) {
//         const circle = new Graphics().beginFill(0xfff).drawCircle(0, 0, hitAreaRadius).endFill();
//         circle.alpha = 0.5;
//         this.addChild(circle);
//       }
//     } else if (hitAreaType === HitAreaType.RECTANGLE) {
//       if(!hitAreaRadius)
// 		hitAreaRadius = [upState.frame.width, upState.frame.height]
//       const x = this.anchor.x;
//       const y = this.anchor.y;
//       const rotate = upState? upState.rotate : -1;
//       this.hitArea = new Rectangle(
//         -x * hitAreaRadius[rotate == 2 ? 1 : 0],
//         -y * hitAreaRadius[rotate == 2 ? 0 : 1],
//         hitAreaRadius[rotate == 2 ? 1 : 0],
//         hitAreaRadius[rotate == 2 ? 0 : 1]
//       );
//       if (this._isDebug) {
//         const rectangle = new Graphics()
//           .beginFill(0xfff)
//           .drawRect(-x * hitAreaRadius[0], -y * hitAreaRadius[1], hitAreaRadius[0], hitAreaRadius[1])
//           .endFill();
//         rectangle.alpha = 0.5;
//         this.addChild(rectangle);
//       }
//     }

//     this.changeState(ButtonState.UP);
// 	this.interactive = true;

//     this.on('pointerover', this.onMouseOverCallback);
//     this.on('pointerout', this.onMouseOutCallback);
//     this.on('pointerdown', this.onMouseDownCallback);
//     this.on('pointerup', this.onMouseUpCallback);
//   }

//   /**
//    * Updates the button with the provided string and textures
//    */
//   public updateButton(
//     upState: Texture,
//     text?: string,
//     downState?: Texture,
//     overState?: Texture,
//     disabledState?: Texture
//   ) {
//     this._textures[ButtonState.UP] = upState;
//     this._textures[ButtonState.DOWN] = downState ? downState : upState;
//     this._textures[ButtonState.OVER] = overState ? overState : upState;
//     this._textures[ButtonState.DISABLED] = disabledState ? disabledState : upState;
//   }

//   protected onMouseOverCallback(): void {
//     if (this._state === ButtonState.DISABLED) return;
//     if (this.onHover) {
//       this.onHover();
//     }
//     this.changeState(ButtonState.OVER);
//   }

//   protected onMouseOutCallback(): void {
//     if (this._state === ButtonState.DISABLED) return;
//     this.changeState(ButtonState.UP);
//   }

//   protected onMouseDownCallback(playSound = true): void {
//     if (this._state === ButtonState.DISABLED) return;
// 	this.changeState(ButtonState.DOWN);
// 	if (this.onClick) {
// 		this.onClick();
// 	}
// 	else if (this.onTouchStart && playSound) {
// 		this.onTouchStart();
//     }
//   }

//   protected onMouseUpCallback(): void {
//     if (this._state === ButtonState.DISABLED) return;
//     this.changeState(isMobile.any ? ButtonState.UP : ButtonState.OVER);
//   }

//   /**
//    * Dissables interactions with the button
//    */
//   public disable(): void {
//     this.changeState(ButtonState.DISABLED);
//   }
//   /**
//    * Enables interactions with the button
//    */
//   public enable(): void {
//     this.changeState(ButtonState.UP);
//   }

//   protected changeState(state: ButtonState): void {
//     this._state = state;
//     if (
//       state === ButtonState.DISABLED &&
//       this._textures[ButtonState.DISABLED] === this._textures[ButtonState.UP]
//     ) {
//       this.alpha = 0.5;
//     } else {
//       this.alpha = 1;
//     }
//     this.texture = this._textures[state];
//   }
// }
