import { CommonConfig } from "@/Common/CommonConfig";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "../game";

export class CheatPanel extends Container {
    private background!: Graphics;
    private isVisible: boolean;
    private normalWinButton!: Text;
    private normalWinToggle!: Text;
    private largeWinButton!: Text;
    private largeWinToggle!: Text;
    private normalWinActive: boolean = false;
    private largeWinActive: boolean = false;
    private bonusActive : boolean = false;
    private bonusButton!: Text;
    private bonusToggle!: Text;
    private normalWinCheatContainer !: Container;
    private largeWinCheatContainer !: Container;
    private bonusWinCheatContainer !: Container;



    constructor() {
        super();
        this.isVisible = true;
        this.init();
        this.setPosition();
        this.resizeApp();
        Game.the.app.stage.on("RESIZE_THE_APP", this.resizeApp, this);

        Game.the.app.stage.on(CommonConfig.ENABLE_DISABLE_CHEAT_PANEL, this.enablePanel, this);
        Game.the.app.stage.on(CommonConfig.RESET_CHEAT_PANEL, this.resetCheats, this);
    }

    private init(): void {
        this.background = new Graphics();
        this.background.beginFill(0x222222, 0.9); // Dark background with transparency
        this.background.drawRect(0, 0, 350, 250);
        this.background.endFill();
        this.addChild(this.background);
        this.normalWinCheatContainer = new Container();
        this.largeWinCheatContainer = new Container();
        this.bonusWinCheatContainer = new Container();
        this.addChild(this.normalWinCheatContainer);
        this.addChild(this.bonusWinCheatContainer);
        this.addChild(this.largeWinCheatContainer);


        // Panel background


        const roundedRectangle = new Graphics();
        roundedRectangle.beginFill(0x3498db); // Fill color, you can change this
        roundedRectangle.drawRoundedRect(180, 60, 150, 28, 5); // x, y, width, height, corner radius
        roundedRectangle.endFill();
        this.normalWinCheatContainer.addChild(roundedRectangle);


        // Toggle button style
        const buttonStyle = new TextStyle({
            fill: "#00FF00",
            fontSize: 24,
            fontWeight: "bold"
        });

        const buttonStyle2 = new TextStyle({
            fill: "#00FF00",
            fontSize: 24,
            fontWeight: "bold"
        });

        // Normal Win Cheat Button
        this.normalWinButton = new Text("Normal Win", buttonStyle);
        this.normalWinButton.position.set(20, 60);
        this.normalWinCheatContainer.addChild(this.normalWinButton);

        // Normal Win Toggle Button
        this.normalWinToggle = new Text("Set", buttonStyle);
        this.normalWinToggle.position.set(200, 60);

        this.normalWinCheatContainer.addChild(this.normalWinToggle);

        const roundedRectangle2 = new Graphics();
        roundedRectangle2.beginFill(0x3498db); // Fill color, you can change this
        roundedRectangle2.drawRoundedRect(180, 100, 150, 28, 5); // x, y, width, height, corner radius
        roundedRectangle2.endFill();
        this.largeWinCheatContainer.addChild(roundedRectangle2);

        // Large Win Cheat Button
        this.largeWinButton = new Text("Large Win", buttonStyle2);
        this.largeWinButton.position.set(20, 100);
        this.largeWinCheatContainer.addChild(this.largeWinButton);

        // Large Win Toggle Button
        this.largeWinToggle = new Text("Set", buttonStyle2);
        this.largeWinToggle.position.set(200, 100);

        this.largeWinCheatContainer.addChild(this.largeWinToggle);

        this.normalWinCheatContainer.interactive = true;
        // this.normalWinToggle.buttonMode = true;
        this.normalWinCheatContainer.on("pointerdown", () => this.toggleCheat("normal"));

        this.largeWinCheatContainer.interactive = true;
        // this.largeWinToggle.buttonMode = true;
        this.largeWinCheatContainer.on("pointerdown", () => this.toggleCheat("large"));

        //Bonus

        const roundedRectangle3 = new Graphics();
        roundedRectangle3.beginFill(0x3498db); // Fill color, you can change this
        roundedRectangle3.drawRoundedRect(180, 140, 150, 28, 5); // x, y, width, height, corner radius
        roundedRectangle3.endFill();
        this.bonusWinCheatContainer.addChild(roundedRectangle3);

        this.bonusButton = new Text("Bonus", buttonStyle2);
        this.bonusButton.position.set(20, 140);
        this.bonusWinCheatContainer.addChild(this.bonusButton);

        // Large Win Toggle Button
        this.bonusToggle = new Text("Set", buttonStyle2);
        this.bonusToggle.position.set(200, 140);

        this.bonusWinCheatContainer.addChild(this.bonusToggle);

        this.visible = this.isVisible;

        this.bonusWinCheatContainer.interactive = true;
        // this.largeWinToggle.buttonMode = true;
        this.bonusWinCheatContainer.on("pointerdown", () => this.toggleCheat("Bonus"));

    }

    private setPosition(): void {
    }

    private resizeApp(): void {
        this.scale.set(1);
        let height : number = this.height;
        let currentHeightPanel = height/999 * window.innerHeight ;
        let scale : number = currentHeightPanel / height;
        if (window.innerWidth < window.innerHeight) {
            this.scale.set(0.5);
            this.position.set(window.innerWidth - this.width - 20, window.innerHeight - this.height -20);
        } else {
            this.scale.set(scale);
            this.position.set(50, 50);
        }
    }

    private toggleCheat(type: "normal" | "large" |"Bonus"): void {
        if(CommonConfig.the.getCurrentState() !== CommonConfig.BASE_GAME){
            return
        }
        if (type === "normal") {
            this.normalWinActive = !this.normalWinActive;
            this.updateToggleState(this.normalWinToggle, this.normalWinActive);
            this.normalWinToggle.position.x = this.normalWinActive ? 240 : 200
            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.normalWinActive ? "normal" : "");
            // console.log(`Normal Win cheat is now ${this.normalWinActive ? "active" : "inactive"}`);
        } else if (type === "large") {
            this.largeWinActive = !this.largeWinActive;
            this.updateToggleState(this.largeWinToggle, this.largeWinActive);
            this.largeWinToggle.position.x = this.largeWinActive ? 240 : 200
            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.largeWinActive ? "large" : "");
            // console.log(`Large Win cheat is now ${this.largeWinActive ? "active" : "inactive"}`);
        }else if(type === "Bonus"){
            this.bonusActive = !this.bonusActive;
            this.updateToggleState(this.bonusToggle, this.bonusActive);
            this.bonusToggle.position.x = this.bonusActive ? 240 : 200
            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.bonusActive ? "bonus" : "");
        }
    }

    private resetCheats() :void{
        this.bonusActive = false;
        this.largeWinActive = false;
        this.normalWinActive = false;
        this.updateToggleState(this.bonusToggle, this.bonusActive);
        CommonConfig.the.setCheatType("");
    }

    private updateToggleState(toggleButton: Text, isActive: boolean): void {
        toggleButton.text = isActive ? "Reset" : "Set";
        toggleButton.style.fill = isActive ? "#FF0000" : "#00FF00"; // Red for "Reset" and green for "Set"
    }

    private enablePanel(enable: boolean): void {
        this.normalWinCheatContainer.interactive = enable;
        this.largeWinCheatContainer.interactive = enable;
    }
}
