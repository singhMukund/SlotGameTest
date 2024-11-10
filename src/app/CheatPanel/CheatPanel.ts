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


    constructor() {
        super();
        this.isVisible = true;

        // Panel background
        this.background = new Graphics();
        this.background.beginFill(0x222222, 0.9); // Dark background with transparency
        this.background.drawRect(0, 0, 350, 250);
        this.background.endFill();
        this.addChild(this.background);

        const roundedRectangle = new Graphics();
        roundedRectangle.beginFill(0x3498db); // Fill color, you can change this
        roundedRectangle.drawRoundedRect(180, 60, 150, 28, 5); // x, y, width, height, corner radius
        roundedRectangle.endFill();
        this.addChild(roundedRectangle);

        // Toggle button style
        const buttonStyle = new TextStyle({
            fill: "#00FF00",
            fontSize: 24,
            fontWeight: "bold"
        });

        // Normal Win Cheat Button
        this.normalWinButton = new Text("Normal Win", buttonStyle);
        this.normalWinButton.position.set(20, 60);
        this.addChild(this.normalWinButton);

        // Normal Win Toggle Button
        this.normalWinToggle = new Text("Set", buttonStyle);
        this.normalWinToggle.position.set(200, 60);
        this.interactive = true;
        // this.normalWinToggle.buttonMode = true;
        this.on("pointerdown", () => this.toggleCheat("normal"));
        this.addChild(this.normalWinToggle);

        // Large Win Cheat Button
        this.largeWinButton = new Text("Large Win", buttonStyle);
        this.largeWinButton.position.set(20, 100);
        // this.addChild(this.largeWinButton);

        // Large Win Toggle Button
        this.largeWinToggle = new Text("Set", buttonStyle);
        this.largeWinToggle.position.set(200, 100);
        this.largeWinToggle.interactive = true;
        // this.largeWinToggle.buttonMode = true;
        this.largeWinToggle.on("pointerdown", () => this.toggleCheat("large"));
        // this.addChild(this.largeWinToggle);

        this.visible = this.isVisible;
    }

    private toggleCheat(type: "normal" | "large"): void {
        if (type === "normal") {
            this.normalWinActive = !this.normalWinActive;
            this.updateToggleState(this.normalWinToggle, this.normalWinActive);

            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.normalWinActive ? "normal" : "");
            console.log(`Normal Win cheat is now ${this.normalWinActive ? "active" : "inactive"}`);
        } else if (type === "large") {
            this.largeWinActive = !this.largeWinActive;
            this.updateToggleState(this.largeWinToggle, this.largeWinActive);

            // Set or reset the cheat based on toggle state
            CommonConfig.the.setCheatType(this.largeWinActive ? "large" : "");
            console.log(`Large Win cheat is now ${this.largeWinActive ? "active" : "inactive"}`);
        }
    }

    private updateToggleState(toggleButton: Text, isActive: boolean): void {
        toggleButton.text = isActive ? "Reset" : "Set";
        toggleButton.style.fill = isActive ? "#FF0000" : "#00FF00"; // Red for "Reset" and green for "Set"
        this.normalWinToggle.position.x = isActive ? 240 : 200
    }

    // Optional method to enable or disable the entire panel
    public enablePanel(enable: boolean): void {
        this.isVisible = enable;
        this.visible = this.isVisible;
    }
}
