import Phaser from 'phaser'
import { CharacterBaseActions } from '../character-base'
import { ControlCharacterHandlerConstructor } from './types.ts'

class ControlCharacterHandler {
    scene: Phaser.Scene
    keys: Record<CharacterBaseActions, Phaser.Input.Keyboard.Key>

    constructor(constructorParams: ControlCharacterHandlerConstructor) {
        const { scene } = constructorParams
        this.scene = scene
        this.keys = this.scene.input.keyboard?.addKeys({
            moveLeft: Phaser.Input.Keyboard.KeyCodes.A,
            moveRight: Phaser.Input.Keyboard.KeyCodes.D,
            crouch: Phaser.Input.Keyboard.KeyCodes.S,
            jerk: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        }) as Record<CharacterBaseActions, Phaser.Input.Keyboard.Key>
    }
}

export default ControlCharacterHandler
