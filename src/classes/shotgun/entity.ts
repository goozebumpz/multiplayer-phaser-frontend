import { CharacterBase } from '@classes/character-base'
import { ShotgunConstructor } from './types.ts'

class Shotgun extends Phaser.GameObjects.Sprite {
    damage: number
    fireRate: number
    ammo: number
    isReloading: boolean
    character: CharacterBase | null
    width = 10
    height = 10
    offsetPosition = { x: 4, y: 5 }

    constructor(data: ShotgunConstructor) {
        const { scene, x, y, texture } = data
        super(scene, x, y, texture)

        this.init()
    }

    public init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.width = 32
        this.height = 10
    }

    public attachToPerson() {
        if (this.character) {
            const flipPersonX = this.character.flipX

            this.setFlipX(flipPersonX)

            if (flipPersonX) {
                this.setPosition(this.character.x, this.character.y + this.offsetPosition.y)
            } else {
                this.setPosition(this.character.x, this.character.y + this.offsetPosition.y)
            }
        }
    }

    public pickup(character: CharacterBase) {
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        body.enable = false
        this.character = character
    }

    shot() {
        if (!this.character) {
            return
        }
    }
}

export default Shotgun

// enum ShotgunState {
//     LIE = 'lie',
//     MOVE = 'move',
//     SHOOT = 'shoot',
// }
//
// interface StateMachineShotgunI {
//     currentState: ShotgunState
//     changeStage: (newState: ShotgunState) => void
// }
