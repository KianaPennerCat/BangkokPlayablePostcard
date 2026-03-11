export default class InstructionScene extends Phaser.Scene {

    constructor() {
        super("InstructionScene");
    }

    create() {

        const { width, height } = this.scale;
        //Keep music playing during the instruction scene
        if (!this.sound.get("introoutroMusic") || !this.sound.get("introoutroMusic").isPlaying) {
            this.sound.stopAll();
            this.sound.play("introoutroMusic", {
                loop: true,
                volume: 0.45
            });
        }
        
        this.cameras.main.setBackgroundColor("#1A2A44");

        const skyline = this.add.image(width / 2, height / 2, "skyline");
        skyline.setAlpha(0.25);

        this.add.text( //Title
            width / 2, 95,
            "Your Objective",
            {
                fontFamily: "Bagel",
                fontSize: "58px",
                color: "#FFD700",
                stroke: "#FFFFFF",
                strokeThickness: 8,
                align: "center"
            }
        ).setOrigin(0.5);


        this.add.rectangle(width / 2, 165, 280, 4, 0xFFD700); //Gold divider

        //Instruction text
        this.add.text(
            width / 2,
            320,
            "To Max,\n" +
            "Walk through the postcard and click each object\n" +
            "to collect all 5 memories.\n\n" +
            "Once all 5 memories are found,\n" +
            "the final postcard message will appear!",
            {
                fontFamily: "Veranda",
                fontSize: "34px",
                color: "#FFF4D6",
                align: "center",
                lineSpacing: 10
            }
        ).setOrigin(0.5);


        const continueText = this.add.text(
            width / 2,
            560,
            "Click to Continue",
            {
                fontFamily: "Bagel",
                fontSize: "32px",
                color: "#FFD700",
                stroke: "#FFFFFF",
                strokeThickness: 6
            }
        ).setOrigin(0.5);

        this.tweens.add({ //Text animation
            targets: continueText,
            alpha: 0.45,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.input.once("pointerdown", () => {
            this.cameras.main.fade(400, 0, 0, 0);

            this.time.delayedCall(400, () => {
                this.scene.start("playScene");
            });
        });
    }
}