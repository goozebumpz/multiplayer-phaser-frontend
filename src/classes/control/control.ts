import { CharacterBaseActions } from '../character-base'

type ControlCharacterHandlerConstructor = {
    scene: Phaser.Scene
    keys: Record<CharacterBaseActions, Phaser.Input.Keyboard.Key>
}

class ControlCharacterHandler {
    scene: Phaser.Scene
    keys: Record<CharacterBaseActions, Phaser.Input.Keyboard.Key>

    constructor(constructorParams: ControlCharacterHandlerConstructor) {
        const { scene, keys } = constructorParams
        this.scene = scene
        this.keys = keys
    }
}

export default ControlCharacterHandler
