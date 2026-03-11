import BootScene from './scenes/BootScene.js'
import MenuScene from './scenes/MenuScene.js'
import PlayScene from './scenes/PlayScene.js'
import EndScene from './scenes/EndScene.js'
import InstructionScene from './scenes/InstructionScene.js'
import CreditScene from './scenes/CreditScene.js'

/**
 * Playable Postcard – Bangkok Memories
 * Author: Kiana Penner
 * Hours: ~25
 *
 * Phaser components used:
 * - Cameras
 * - Tweens
 * - Particles
 * - Physics
 * - Timers
 * - Text Objects
 * - Audio
 * Phaser sources: 
 * https://github.com/nathanaltice/Scenesters
 * https://github.com/nathanaltice/Dialoguing
 * https://github.com/nathanaltice/PartyCoolFX
 * https://github.com/nathanaltice/Framing
 *
Audio Credits
1) Background gameplay music:
https://pixabay.com/sound-effects/musical-cool-hip-hop-loop-275527/

2) Intro / outro music:
https://pixabay.com/sound-effects/musical-gamemusic-6082/

3) Thai tea sound:
https://tuna.voicemod.net/sound/2b5b079e-62de-4c0d-b6ee-d51a3d1dd9db

4) Toastie sound:
https://www.myinstants.com/en/instant/roblox-eating-nom-nom-nom-3223/

5) Cat meow sound:
https://pixabay.com/sound-effects/nature-cat-meow-8-fx-306184/

6) Collect sound:
https://pixabay.com/sound-effects/film-special-effects-collect-points-190037/

7) Spa sound:
https://pixabay.com/sound-effects/film-special-effects-chime-and-chomp-84419/

8) Starbucks sound:
https://pixabay.com/sound-effects/film-special-effects-thud-sound-effect-405470/

Creative Tilt:
For this project, I prioritized the animations and framing to feel as though you are visiting a digital postcard.
Firstly, I created the sprites, and even included a sprite of the person this postcard is designated to. This player sprite makes this project feel more personable.
The player moves horizontally through a postcard-like version of Bangkok and collects five memories by interacting with meaningful objects from the trip.
I used scene progression, custom fonts, music, sound effects, postcard framing, and a final flip animation to make the experience feel more interactive with the player.
I used text animation for text that says "Click to continue/restart" which draws the player to click on that text.
Each collectible object has its own designated sound, which helps each memory feel more engaging and interactive.
Lastly, I added a CreditScene after EndScene to give credit to myself as well as well direct players to find my sources.
*/

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [BootScene, MenuScene, InstructionScene, PlayScene, EndScene, CreditScene]
}

let game = new Phaser.Game(config)