import Phaser from 'phaser'
import { CharacterBase } from '@classes/character-base'
import { getRelativePositionPoints } from '@utils/getAngle.ts'

type AttackRectangleConstructor = {
    scene: Phaser.Scene
    target: CharacterBase
    width: number
    height: number
    offsetsAttackRectangle?: { x: number; y: number }
}

class AttackRectangle extends Phaser.GameObjects.Rectangle {
    character: CharacterBase

    constructor(constructorParams: AttackRectangleConstructor) {
        const { scene, target, width, height } = constructorParams
        super(scene, 0, 0, width, height)
        this.character = target

        this.init()
    }

    private init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.setAllowGravity(false)
        bodyThis.setEnable()
    }

    public activate(positionMouse: Phaser.Math.Vector2) {
        const firstIsFurther = getRelativePositionPoints(
            { x: this.character.x },
            { x: positionMouse.x }
        )

        const bodyWidthCharacter = this.character.body?.width || 0
        const positionAttackX = firstIsFurther
            ? this.character.x - bodyWidthCharacter
            : this.character.x + bodyWidthCharacter
        const positionAttackY = this.character.y

        this.setPosition(positionAttackX, this.character.y)

        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.x = positionAttackX
        bodyThis.y = positionAttackY
        bodyThis.setEnable(true)
    }

    public deactivate() {
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.setEnable(false)
    }
}

export default AttackRectangle
