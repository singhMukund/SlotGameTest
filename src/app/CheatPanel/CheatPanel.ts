import { CommonConfig } from "@/Common/CommonConfig";
import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class CheatPanel extends Container {
    private background: Graphics;
    private isVisible: boolean;
    private normalWinButton: Text;
    private normalWinToggle: Text;
    private largeWinButton: Text;
    private largeWinToggle: Text;
    private normalWinActive: boolean = false;
    private largeWinActive: boolean = false;
    private normalWinCheatContainer !: Container;
    private largeWinCheatContainer !: Container;


    constructor() {
        super();
        this.isVisible = true;
        this.background = new Graphics();
        this.background.beginFill(0x222222, 0.9); // Dark background with transparency
        this.background.drawRect(0, 0, 350, 250);
        this.background.endFill();
        this.addChild(this.background);
        this.normalWinCheatContainer = new Container();
        this.largeWinCheatContainer = new Container();
        this.addChild(this.normalWinCheatContainer)
        this.addChild(this.largeWinCheatContainer)


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

        this.visible = this.isVisible;

        this.normalWinCheatContainer.interactive = true;
        // this.normalWinToggle.buttonMode = true;
        this.normalWinCheatContainer.on("pointerdown", () => this.toggleCheat("normal"));

        this.largeWinCheatContainer.interactive = true;
        // this.largeWinToggle.buttonMode = true;
        this.largeWinCheatContainer.on("pointerdown", () => this.toggleCheat("large"));
    }

    private toggleCheat(type: "normal" | "large"): void {
        if (type === "normal") {
            this.normalWinActive = !this.normalWinActive;
            this.updateToggleState(this.normalWinToggle, this.normalWinActive);
            this.normalWinToggle.position.x = this.normalWinActive ? 240 : 200
            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.normalWinActive ? "normal" : "");
            console.log(`Normal Win cheat is now ${this.normalWinActive ? "active" : "inactive"}`);
        } else if (type === "large") {
            this.largeWinActive = !this.largeWinActive;
            this.updateToggleState(this.largeWinToggle, this.largeWinActive);
            this.largeWinToggle.position.x = this.largeWinActive ? 240 : 200
            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.largeWinActive ? "large" : "");
            console.log(`Large Win cheat is now ${this.largeWinActive ? "active" : "inactive"}`);
        }
    }

    private updateToggleState(toggleButton: Text, isActive: boolean): void {
        toggleButton.text = isActive ? "Reset" : "Set";
        toggleButton.style.fill = isActive ? "#FF0000" : "#00FF00"; // Red for "Reset" and green for "Set"
    }

    // Optional method to enable or disable the entire panel
    public enablePanel(enable: boolean): void {
        this.isVisible = enable;
        this.visible = this.isVisible;
    }
}
