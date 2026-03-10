class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        const { width, height } = this.scale;

        // Camera zoom intro inspired by: https://github.com/nathanaltice/Framing

        this.cameras.main.setZoom(1.2);

        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1,
            duration: 800,
            ease: "Cubic.easeOut"
        });

        const skyline = this.add.image(width/2, height/2, "skyline");
        skyline.setDisplaySize(width, height);
        skyline.setAlpha(0.4);

        this.add.text(width/2, 150,
            "Playable Postcard\nBangkok",
            {
                fontFamily:"Bagel",
                fontSize:"64px",
                color:"#FFD700",
                stroke:"#ffffff",
                strokeThickness:8,
                shadow:{
                    offsetX:3,
                    offsetY:3,
                    color:"#b89600",
                    blur:4,
                    fill:true
                },
                align:"center"
            }
        ).setOrigin(0.5);

        const player = this.add.sprite(width/2, 350, "walk1");

        player.setScale(0.42);
        player.play("walk");

        this.tweens.add({
            targets: player,
            y: player.y - 10,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        const startText = this.add.text(width/2, 500,
            "Click to Start",
            {
                fontFamily:"Bagel",
                fontSize:"36px",
                color:"#FFD700",
                stroke:"#ffffff",
                strokeThickness:8
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0.5,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.input.once("pointerdown", () => {

            // Scene fade pattern inspired by: https://github.com/nathanaltice/Scenesters
            
            this.cameras.main.fade(400,0,0,0);

            this.time.delayedCall(400, () => {
                this.scene.start("playScene");
            });

        });

    }

}

export default MenuScene;