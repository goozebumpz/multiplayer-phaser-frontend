import Phaser from "phaser";
import Laboratory from "./scenes/Laboratory.ts";
import PreloadScene from './scenes/PreloadScene.ts';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [PreloadScene, Laboratory],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 1000
            }
        } as Phaser.Types.Physics.Arcade.ArcadeWorldConfig
    }
}

new Phaser.Game(config)
