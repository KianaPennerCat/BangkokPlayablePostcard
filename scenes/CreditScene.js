//Credit to myself and directs users to find sources
export default class CreditScene extends Phaser.Scene {

    constructor() {
        super("CreditScene");
    }

    create() {
        const { width, height } = this.scale; 

        this.cameras.main.setBackgroundColor("#1A2A44"); //Background

        if (!this.sound.get("introoutroMusic") || !this.sound.get("introoutroMusic").isPlaying) { //Continue music
            this.sound.stopAll();
            this.sound.play("introoutroMusic", {
                loop: true,
                volume: 0.45
            });
        }

        this.add.text(
            width / 2,
            90,
            "Credits",
            {
                fontFamily: "Arial",
                fontSize: "54px",
                color: "#FFD700",
                stroke: "#FFFFFF",
                strokeThickness: 8
            }
        ).setOrigin(0.5);

        this.add.text( //Credit text
            width / 2,
            300,
            "Created by Kiana Penner\n\n" +
            "Playable Postcard: Bangkok Memories\n\n" +
            "Sound and code sources credited in main.js\n\n" +
            "Thank you for playing!",
            {
                fontFamily: "Arial",
                fontSize: "30px",
                color: "#FFF4D6",
                align: "center",
                lineSpacing: 12
            }
        ).setOrigin(0.5);

        const restartText = this.add.text( //Restart text
            width / 2,
            540,
            "Click to Restart",
            {
                fontFamily: "Bagel",
                fontSize: "30px",
                color: "#FFD700",
                stroke: "#FFFFFF",
                strokeThickness: 6
            }
        ).setOrigin(0.5);

        this.tweens.add({ //Text animation
            targets: restartText,
            alpha: 0.45,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.input.once("pointerdown", () => {
            this.sound.play("collectSound");

            this.time.delayedCall(200, () => {
                this.sound.stopAll();
                this.scene.start("BootScene");
            });
        });
    }
}