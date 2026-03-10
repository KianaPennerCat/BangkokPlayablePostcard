export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        // load Google font stylesheet
        // Citation: Phaser text rendering with web fonts
        // https://phaser.io/examples/v3/view/game-objects/text/google-webfont

        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        const { width, height } = this.scale;
        /*
        Floating lantern particle effect inspired by:
        Nathan Altice – PartyCoolFX example
        https://github.com/nathanaltice/PartyCoolFX

        Creates slow upward drifting particles during the loading screen
        to evoke floating lanterns often associated with Southeast Asian festivals.
        */

        const lanterns = this.add.particles(0, 0, "lantern", {
            x: { min: 0, max: width },
            y: height + 20,
            lifespan: 6000,
            speedY: { min: -20, max: -60 },
            speedX: { min: -10, max: 10 },
            scale: { start: 0.15, end: 0.05 },
            alpha: { start: 0.7, end: 0 },
            quantity: 1,
            frequency: 500
        });

        //Thai inspired loading screen
        //Color palette based on Thai flag + gold

        this.cameras.main.setBackgroundColor("#1A2A44")

        const loadingText = this.add.text(
            width/2,
            height/2 - 70,
            "Preparing Your Bangkok Postcard...",
            {
                fontFamily: "Bagel",
                fontSize: "38px",
                color: "#FFD700",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center"
            }
        ).setOrigin(0.5)

        //Decorative gold divider line
        this.add.rectangle(
            width/2,
            height/2 - 25,
            260,
            4,
            0xFFD700
        )

        //Progress box
        const progressBox = this.add.rectangle(
            width/2,
            height/2 + 10,
            320,
            40,
            0xFFFFFF,
            0.2
        ).setStrokeStyle(3, 0xFFD700)

        //Progress bar (Thai red)
        const progressBar = this.add.rectangle(
            width/2 - 150,
            height/2 + 10,
            0,
            32,
            0xD52B1E
        ).setOrigin(0,0.5)

        this.load.on("progress",(value)=>{
            progressBar.width = 300 * value
        })

        //Footer text
        this.add.text(
            width/2,
            height/2 + 80,
            "A playable postcard from Bangkok",
            {
                fontFamily:"Bagel",
                fontSize:"18px",
                color:"#FFF4D6"
            }
        ).setOrigin(0.5)

        //Game assets
        this.load.image("skyline", "assets/skyline.png")
        this.load.image("postcard", "assets/postcard.png")
        this.load.image("toastie", "assets/toastie.png")
        this.load.image("cat", "assets/cat.png")
        this.load.image("starbucks", "assets/starbucks.png")
        this.load.image("spa", "assets/letsrelax.png")
        this.load.image("tea", "assets/thaitea.png")
        this.load.image("lantern", "assets/lantern.png")
        this.load.image("walk1", "assets/maxwalk1.png")
        this.load.image("walk2", "assets/maxwalk2.png")

        this.load.on('complete', () => {

            this.anims.create({
                key: "walk",
                frames: [
                    { key: "walk1" },
                    { key: "walk2" }
                ],
                frameRate: 6,
                repeat: -1
            });

            //Scene transition pattern inspired by: Nathan Altice – Scenesters example project
            //https://github.com/nathanaltice/Scenesters
            //Used fade transitions between scenes to create smoother scene flow.

            this.cameras.main.fadeOut(400);

            this.time.delayedCall(400, () => {
                this.scene.start('MenuScene');
            });

        });

    }
}