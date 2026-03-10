import BootScene from './scenes/BootScene.js'
import MenuScene from './scenes/MenuScene.js'
import PlayScene from './scenes/PlayScene.js'
import EndScene from './scenes/EndScene.js'
/**
 * Playable Postcard – Bangkok Memories
 * Author: Kiana Penner
 * Hours: ~15
 *
 * Phaser components used:
 * - Cameras
 * - Tweens
 * - Particles
 * - Physics
 * - Timers
 * - Text Objects
 *
 * Sources:
 * https://github.com/nathanaltice/Scenesters
 * https://github.com/nathanaltice/Dialoguing
 * https://github.com/nathanaltice/PartyCoolFX
 * https://github.com/nathanaltice/Framing
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

    scene: [BootScene, MenuScene, PlayScene, EndScene]
}

let game = new Phaser.Game(config)