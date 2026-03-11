class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    create() {
        //Gameplay music
        this.sound.stopAll()
        this.sound.play("gameplayMusic", {
            loop: true,
            volume: 0.4
        })

        this.physics.world.setBounds(0,0,2000,600) //Frame size
        this.cameras.main.setBounds(0,0,2000,600) //Camera follows player
        
        this.skyline = this.add.image(400,300,"skyline") //Skyline background

        this.skyline.setDisplaySize( //Reframe skyline background to fit
            this.cameras.main.width,
            this.cameras.main.height
        )
        
        this.skyline.setScrollFactor(0) //Make background static

        this.player = this.physics.add.sprite(40,520,"walk1") //Set player

        this.player.setScale(0.45) //Resized player sprite
        this.player.setCollideWorldBounds(true) //Keeps player within frame

        //Camera follow system inspired by: Nathan Altice – Framing example
        //https://github.com/nathanaltice/Framing

        this.cameras.main.startFollow(this.player)
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //Particle effect system inspired by: Nathan Altice – PartyCoolFX
        //https://github.com/nathanaltice/PartyCoolFX

        this.sparkles = this.add.particles(0,0,"lantern",{
            speed:{min:40,max:120},
            lifespan:600,
            scale:{start:0.3,end:0},
            quantity:15,
            emitting:false
        })
        
        this.memoriesFound = 0

        this.counterText = this.add.text(
            20,
            20,
            "Memories Found: 0 / 5",
            {
                fontFamily:"Bagel",
                fontSize:"28px",
                fill:"#ffffff",
                stroke:"#000000",
                strokeThickness:4
            }
        )

        this.counterText.setScrollFactor(0)
        //Memory object dialogue
        this.toastie = this.createMemoryObject(400,460,"toastie",0.25,"First night we went to 7-11 and filled our carts. This became a daily routine. Who knew someone can spend so much money at 7-11?")
        this.cat = this.createMemoryObject(650,470,"cat",0.35,"After 7-11, remember when we used to go feed all the stray cats?")
        this.starbucks = this.createMemoryObject(1000,340,"starbucks",0.28,"Days of locking in at the Starbucks Reserve in Central World Mall")
        this.spa = this.createMemoryObject(1350,180,"spa",0.6,"Living the good life, getting luxury massages on a weekly basis. All for just $40")
        this.tea = this.createMemoryObject(1700,460,"tea",0.35,"Never had good Thai Tea until I came to Thailand. I love the true taste of the tea aromatics, and not pure sugar.")

        this.messageBox = null
    }
    //Initialize memory objects
    createMemoryObject(x,y,key,scale,message){

        let obj = this.add.sprite(x,y,key)

        obj.setInteractive()
        obj.setScale(scale)

        this.tweens.add({ //Message text disappears after clicking another object
            targets: obj,
            y: y - 8,
            duration: 1200,
            yoyo: true,
            repeat: -1
        })
        //Collect memory
        obj.on("pointerdown",()=>{

            if(obj.visited) return

            obj.visited = true
            obj.setTint(0x888888) //Tint object once collected

            //Play sprite collect sound
            this.sound.play(key + "Sound")

            //Particle burst inspired by: Nathan Altice – PartyCoolFX
            //https://github.com/nathanaltice/PartyCoolFX

            this.sparkles.emitParticleAt(obj.x,obj.y,15)
            this.memoriesFound++

            this.counterText.setText(
                "Memories Found: " + this.memoriesFound + " / 5"
            )

            this.showMessage(message,obj.x,obj.y)

            if(this.memoriesFound === 5){

                this.time.delayedCall(3500, ()=> { // //Fades to EndScene once all 5 memories are found
                    this.cameras.main.fade(800, 0, 0, 0)
            
                    this.time.delayedCall(800, ()=> {
                        this.sound.stopAll()
                        this.scene.start("EndScene")
                    })
                })
            
            }

        })

        return obj
    }

    showMessage(text,x,y){

        //Destroy old message after another object is clicked
        if(this.messageBox){
            this.messageBox.destroy()
        }
    
        //Created dialogue boxes using containers and layered text objects
        //https://github.com/nathanaltice/Dialoguing

    
        const boxWidth = 520
        const boxHeight = 120
    
        const box = this.add.rectangle(
            x,
            y - 90,
            boxWidth,
            boxHeight,
            0x000000,
            0.85
        ).setStrokeStyle(3,0xffffff)
    
        const message = this.add.text(
            x,
            y - 90,
            text,
            {
                fontFamily:"Indie Flower",
                fontSize:"22px",
                color:"#ffffff",
                align:"center",
                wordWrap:{ width: boxWidth - 40 }
            }
        ).setOrigin(0.5)
    
        this.messageBox = this.add.container(0,0,[box,message])
        this.messageBox.setDepth(20)
    }

    update(){

        this.player.setVelocityX(0)

        if(this.cursors.left.isDown){

            this.player.setVelocityX(-180)
            this.player.flipX = true
            this.player.play("walk",true)

        }

        else if(this.cursors.right.isDown){

            this.player.setVelocityX(180)
            this.player.flipX = false
            this.player.play("walk",true)

        }

        else{

            this.player.stop()
            this.player.setTexture("walk1")

        }

    }

}

export default Play