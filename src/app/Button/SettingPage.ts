import { Assets, Container, Sprite, Spritesheet } from "pixi.js";
import { HistoryButton } from "./HistoryButton";
import { HomeButton } from "./HomeButton";
import { InfoButton } from "./InfoButton";
import { LeadershipButton } from "./LeadershipButton";
import { CommonConfig } from "@/Common/CommonConfig";
import { Game } from "../game";
import gsap from "gsap";

export class SettingPage extends Container {
  private textureSpritesSheet!: Spritesheet;
  private bg!: Sprite;
  private historyBtn!: HistoryButton;
  private homeBtn!: HomeButton;
  private intoBtn!: InfoButton;
  private leadershipBtn!: LeadershipButton;
  private gap: number = 10;
  constructor() {
    super();
    this.textureSpritesSheet = Assets.get("ui_button");
    this.init();
    this.addToStage();
    this.setToPosition();
    this.alpha = 0;
    this.visible = false;
    Game.the.app.stage.on(CommonConfig.OPEN_CLOSE_SETTING_PAGE, this.openCloseSettingBtn, this);
  }

  private init(): void {
    this.bg = new Sprite(
      this.textureSpritesSheet.textures["settings_background.png"]
    );
    this.historyBtn = new HistoryButton(CommonConfig.BASE_GAME);
    this.homeBtn = new HomeButton(CommonConfig.BASE_GAME);
    this.intoBtn = new InfoButton(CommonConfig.BASE_GAME);
    this.leadershipBtn = new LeadershipButton(CommonConfig.BASE_GAME);
  }

  private addToStage(): void {
    this.addChild(this.bg);
    this.addChild(this.historyBtn);
    this.addChild(this.homeBtn);
    this.addChild(this.intoBtn);
    this.addChild(this.leadershipBtn);
  }

  private setToPosition(): void {
    this.intoBtn.position.set(
      (this.bg.width - this.intoBtn.width) / 2,
      this.bg.y + this.y
    );
    this.leadershipBtn.position.set(
      this.intoBtn.x,
      this.intoBtn.y + this.intoBtn.height + this.gap
    );
    this.historyBtn.position.set(
      this.intoBtn.x,
      this.leadershipBtn.y + this.leadershipBtn.height + this.gap
    );
    this.homeBtn.position.set(
      this.intoBtn.x,
      this.historyBtn.y + this.historyBtn.height + this.gap
    );
  }

  private openCloseSettingBtn(): void {
    let aimAlpha: number = 1;
    if (this.visible) {
      aimAlpha = 0;
    } else {
      this.alpha = 0;
      this.visible = true;
    }

    gsap.to(this, {
      ease: "power1.out",
      duration: 0.5,
      alpha: aimAlpha,
      onComplete: () => {
        !this.alpha && (this.visible = false);
      },
    });
  }
}
