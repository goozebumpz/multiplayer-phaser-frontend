import { CharacterBase } from '@classes/character-base'
import { ShotgunConstructor } from './types.ts'

class Shotgun extends Phaser.GameObjects.Sprite {
    damage: number
    fireRate: number
    ammo: number
    isReloading: boolean
    character: CharacterBase | null

    constructor(data: ShotgunConstructor) {
        const { scene, x, y, texture } = data
        super(scene, x, y, texture)
    }

    init() {
        this.synchronizePosition()
    }

    private synchronizePosition() {
        this.scene.events.on('update', () => {
            if (this.character) {
                this.x = this.character.x
                this.y = this.character.y
            }
        })
    }

    public pickup(character: CharacterBase) {
        this.character = character
    }

    shot() {
        if (!this.character) {
            return
        }

        // const mouseX = this.character.positionMouse.x
        // const mouseY = this.character.positionMouse.y
    }
}

export default Shotgun
