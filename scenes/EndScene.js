class EndScene extends Phaser.Scene {

    constructor(){
        super("EndScene");
    }

    create(){

        const width = this.scale.width;
        const height = this.scale.height;
        
        //Outro music
        this.sound.stopAll()
        this.sound.play("introoutroMusic", {
            loop: true,
            volume: 0.45
        })

        //Postcard framing concept inspired by Nathan Altice Phaser framing examples
        //https://github.com/nathanaltice/Framing
        const postcard = this.add.image(width/2, height/2 + 20, "postcard");

        //Scale postcard image to fill screen: Phaser responsive image scaling technique
        //https://photonstorm.github.io/phaser3-docs/

        const scaleX = width / postcard.width;
        const scaleY = height / postcard.height;
        const scale = Math.max(scaleX, scaleY);

        postcard.setScale(scale);

        //Postcard flip animation: Flips horizontally to simulate turning postcard
        //https://phaser.io/examples/v3/view/tweens/scale
        
        postcard.setScale(0, scale); 

        this.tweens.add({
            targets: postcard,
            scaleX: scale,
            duration: 900,
            ease: "Cubic.easeOut"
        });

        //Postcard message text
        const line1 = this.add.text(
            width * 0.22,
            height * 0.18,
            "You found all 5 memories!",
            {
                fontFamily: "Bagel",
                fontSize: "46px",
                color: "#000000"
            }
        ).setOrigin(0,0);


        const line2 = this.add.text(
            width * 0.42,
            height * 0.34,
            "#BESTSUMMEREVER",
            {
                fontFamily: "Bagel",
                fontSize: "40px",
                color: "#000000"
            }
        ).setOrigin(0,0);


        const line3 = this.add.text(
            width * 0.42,
            height * 0.44,
            "Until next time,",
            {
                fontFamily: "Indie Flower",
                fontSize: "36px",
                color: "#000000"
            }
        ).setOrigin(0,0);


        const line4 = this.add.text(
            width * 0.42,
            height * 0.52,
            "Bangkok.",
            {
                fontFamily: "Indie Flower",
                fontSize: "36px",
                color: "#000000"
            }
        ).setOrigin(0,0);


        //Restart text
        const restart = this.add.text(
            width * 0.42,
            height * 0.80,
            "Click anywhere to restart",
            {
                fontFamily: "Indie Flower",
                fontSize: "26px",
                color: "#444444"
            }
        ).setOrigin(0,0);
        
        restart.setAlpha(0);
        
        this.tweens.add({ //Text animation
            targets: restart,
            alpha: 1,
            delay: 1400,
            duration: 800
        });

        //Restart game
        this.input.once("pointerdown", () => {
            this.sound.play("collectSound")
        
            this.time.delayedCall(200, () => {
                this.sound.stopAll()
                this.scene.start("CreditScene")
            })
        })

    }

}

export default EndScene;